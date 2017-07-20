import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { cloneDeep, orderBy, sortBy, union } from 'lodash';

import { MovementDirection, PoolData, Entry, EntryConfig, PlayerInfo, GolferData, GolferConfig } from '../models/models';
import { LiveData, Competitor } from '../models/live-data';
import { AppConfig} from '../app.config';
import { SettingsService } from '../services/settings.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class DataService {

    private entryConfig: EntryConfig[];
    private dataObservable: ReplaySubject<PoolData>;
    private cacheData: PoolData = null;
    private selectedContestantId: number = 0;

    public constructor(private titleService: Title, private http: Http, private settingsService: SettingsService,
        private notificationService: NotificationService) {

        this.entryConfig = AppConfig.CONTESTANTS
            .map(c => c.entries.map((e, i) => ({ name: c.name + ' ' + (i + 1), golferIds: e, contestantId: c.id})))
            .reduce((prev, curr) => prev.concat(curr));

        this.settingsService.getSelectedContestantId().subscribe(selectedContestantId => {
            this.selectedContestantId = selectedContestantId;

            if (this.cacheData !== null) {
                this.updateTitle(this.cacheData.entries);
                this.setSelected(this.cacheData);
            } else {
                this.updateTitle();  
            }
        });

        this.dataObservable = new ReplaySubject<PoolData>();

        this.getLiveData();

        IntervalObservable.create(AppConfig.REFRESH_TIME).subscribe(() => this.getLiveData());
    }

    get(): Observable<PoolData> {
        return this.dataObservable;
    }

    getPlayerInfo(golfer: GolferData): Observable<PlayerInfo> {
        return this.http.get(AppConfig.PLAYER_INFO_URL + golfer.competitor.id)
            .map((res: Response) => this.handlePlayerResponse(res, golfer))
            .catch(this.handleError);
    }

    private handlePlayerResponse(res: Response, golfer: GolferData): PlayerInfo {
        const playerInfo: PlayerInfo = res.json();
        playerInfo.golferId = golfer.golferConfig.id;
        return playerInfo;
    }

    private getLiveData() {
        this.http.get(AppConfig.LEADERBOARD_URL)
            .map((res: Response) => this.convertToData(res))
            .catch(this.handleError)
            .subscribe((data: PoolData) => {
                this.setSelected(data);
                const previousEntries = this.cacheData ? this.cacheData.entries : null;

                this.cacheData = data;

                this.updateTitle(data.entries);
                this.notificationService.update(previousEntries, data.entries);
                this.dataObservable.next(data);
            });
    }

    private convertToData(res: Response): PoolData {
        const now = new Date();
        const liveData = res.json().json;

        const data: PoolData = new PoolData();
        data.timeStamp = now;
        data.liveData = liveData;
        data.golfers = this.getGolferData(liveData);
        data.entries = this.getEntries(data.golfers);
        return data;
    }

    private getGolferData(liveData: LiveData): GolferData[] {
        const golferDataList: GolferData[] = AppConfig.GOLFERS.map(golferConfig => {
            const firstName: string = golferConfig.firstName.toLowerCase();
            const lastName: string = golferConfig.lastName.toLowerCase();
            const matchingCompetitor: Competitor = liveData.competitions[0].competitors.find(competitor => {
                const fullName = competitor.athlete.displayName.toLowerCase();
                return fullName.includes(firstName) && fullName.includes(lastName);
            });

            const golferConfigCopy: GolferConfig = cloneDeep(golferConfig);
            const golferData: GolferData = new GolferData();
            golferData.golferConfig = golferConfigCopy;

            if (matchingCompetitor) {
                golferData.competitor = matchingCompetitor;
            } else {
                golferData.competitor = this.emptyCompetitor(golferConfigCopy);
            }

            golferData.entryCount = this.entryConfig.filter((e: EntryConfig) => e.golferIds.includes(golferConfigCopy.id)).length;

            return golferData;
        });

        return sortBy(golferDataList, (golferData: GolferData) => golferData.competitor.sortOrder);
    }

    private emptyCompetitor(golfer: GolferConfig): Competitor {
        const name = `${golfer.firstName[0]}. ${golfer.lastName}`; 

        const competitor = {
            uid: '',
            id: '',
            score: null,
            featured: false,
            athlete: {
                displayName: name,
                id: ''
            },
            sortOrder: Number.MAX_SAFE_INTEGER,
            linescores: null,
            movement: 0,
            status: null,
            statistics: null,
            isDNF: true
        };

        return competitor;
    }

    private getEntries(golferDataList: GolferData[]): Entry[] {
        const entries: Entry[] = this.entryConfig.map((config: EntryConfig)  => {

            const entryGolferDataList: GolferData[] = config.golferIds.map(gid => {
                return cloneDeep(golferDataList.find(golferData => golferData.golferConfig.id === gid));
            });

            let overallRelativeScore: number, overallTotalScore: string, overallToPar: string;
            const isDQ: boolean = entryGolferDataList.filter(golferData => golferData.score.isDNF).length > 1;

            if (!isDQ) {
                const worstGolferScores: GolferScore[] = orderBy(entryGolferScores,
                    ['score.relativeScore', 'score.totalScore', 'golfer.id'], ['desc', 'desc', 'desc']);
                worstGolferScores[0].throwaway = true;

                overallRelativeScore = entryGolferScores
                    .filter(golferScore => golferScore.throwaway !== true)
                    .reduce((prev, curr) => prev + curr.score.relativeScore, 0);

                overallTotalScore = entryGolferScores
                    .filter(golferScore => golferScore.throwaway !== true)
                    .reduce((prev, curr) => prev + curr.score.totalScore, 0).toString();

                overallToPar = overallRelativeScore === 0 ? 'E' : overallRelativeScore.toString();
            } else {
                overallRelativeScore = Number.MAX_SAFE_INTEGER;
                overallTotalScore = '--';
                overallToPar = '--';
            }

            const entry = new Entry();
            entry.name = config.name;
            entry.golferScores = entryGolferScores;
            entry.overallRelativeScore = overallRelativeScore;
            entry.overallTotalScore = overallTotalScore;
            entry.overallToPar = overallToPar;
            entry.isDQ = isDQ;
            entry.contestantId = config.contestantId;

            return entry;
        });

        return this.sortAddPostionsToEntries(entries);
    }

    private sortAddPostionsToEntries(entries: Entry[]): Entry[] {
        const sortedEntries: Entry[] = sortBy(entries, ['overallRelativeScore', 'overallTotalScore']);

        let position = 1;
        let lastScore = 0;
        sortedEntries.forEach((entry, index) => {
            const isTied = sortedEntries.filter(e => e.overallRelativeScore === entry.overallRelativeScore).length > 1;
            if (entry.overallRelativeScore > lastScore) {
                position = index + 1;
            }
            entry.position = isTied ? 'T' + position : position.toString() ;
            entry.positionNumber = position;
            lastScore = entry.overallRelativeScore;
        });

        return sortedEntries;
    }

    private updateTitle(entries: Entry[] = null) {
        let positions = null;
        if (this.selectedContestantId > 0 && entries !== null) {
            positions = entries.filter(e => e.contestantId === this.selectedContestantId && !e.isDQ)
                .map(e => e.position)
                .reduce((c, n) => c !== null ? c + ', ' + n : n , null);

        }
        const title = positions ? positions + ' - ' + AppConfig.TOURNEY_TITLE + ' Player Pool' : AppConfig.TOURNEY_TITLE + ' Player Pool';
        this.titleService.setTitle(title);
    }

    private setSelected(data: GolfData) {
        if (this.selectedContestantId !== data.selectedContestantId) {
            data.selectedContestantId = this.selectedContestantId;
            let selectedGolferIds: number[] = [];
            data.entries.forEach((entry: Entry) => {
                entry.isSelected = entry.contestantId === this.selectedContestantId;
                if (entry.isSelected) {
                    selectedGolferIds = union(selectedGolferIds, entry.golferScores.map(golferScore => golferScore.golfer.id));
                }
            });

            data.golfersScores.forEach(golferScore => {
                golferScore.isSelected = selectedGolferIds.includes(golferScore.golfer.id);
            });
        }
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
