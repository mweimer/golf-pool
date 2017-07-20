import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as jQuery from 'jquery';
import { cloneDeep, orderBy, sortBy, union } from 'lodash';

import { GolferConfig, EntryConfig, PoolData, Entry, GolferScore, Score, MovementDirection, PlayerInfo } from '../models/models';
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

        setInterval(() => this.getLiveData(), AppConfig.REFRESH_TIME);
    }

    get(): Observable<PoolData> {
        return this.dataObservable;
    }

    getPlayerInfo(golferScore: GolferScore): Observable<PlayerInfo> {
        return this.http.get(AppConfig.PLAYER_INFO_URL + golferScore.score.espnId)
            .map((res: Response) => this.handlePlayerResponse(res, golferScore))
            .catch(this.handleError);
    }

    highlightGolfer(golferId: number) {
        if (this.cacheData) {
            const golferScore = this.cacheData.golfersScores.find(g => g.golferConfig.id == golferId);
            if (golferScore) {
                golferScore.isHighlighted = true;
                this.dataObservable.next(this.cacheData);
                setTimeout(() => {
                    golferScore.isHighlighted = false;
                    this.dataObservable.next(this.cacheData);
                }, 3000);
            }
        }
    }

    private handlePlayerResponse(res: Response, golferScore: GolferScore): PlayerInfo {
        const playerInfo: PlayerInfo = res.json();
        playerInfo.golferId = golferScore.golferConfig.id;
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
        const scorePage = jQuery(res.text());
        const golferRows = scorePage.find('.leaderboard-table .player-overview');
        const scores: Score[] = [];

        golferRows.each((index, row) => {
            scores.push(this.extractScore(jQuery(row), index));
        });

        const data: PoolData = new PoolData();
        data.timeStamp = now;
        data.golfersScores = this.getGolferScores(scores);
        data.entries = this.getEntries(data.golfersScores);
        return data;
    }

    private getGolferScores(scores: Score[]): GolferScore[] {
        const golferScores: GolferScore[] = AppConfig.GOLFERS.map(golferConfig => {
            const firstName: string = golferConfig.firstName.toLowerCase();
            const lastName: string = golferConfig.lastName.toLowerCase();
            const matchingScore: Score = scores.find(score => {
                const fullName = score.fullName.toLowerCase();
                return fullName.includes(firstName) && fullName.includes(lastName);
            });

            const golferConfigCopy: GolferConfig = cloneDeep(golferConfig);
            const golferScore: GolferScore = new GolferScore();
            golferScore.golferConfig = golferConfigCopy;

            if (matchingScore) {
                golferScore.score = matchingScore;
            } else {
                golferScore.score = this.emptyScore(golferConfigCopy);
            }

            golferScore.entryCount = this.entryConfig.filter((e: EntryConfig) => e.golferIds.includes(golferConfigCopy.id)).length;

            return golferScore;
        });

        return sortBy(golferScores, (golferScore: GolferScore) => golferScore.score.index);
    }

    private emptyScore(golferConfig: GolferConfig): Score {
        const score = new Score();

        score.index = Number.MAX_SAFE_INTEGER;
        score.isDNF = true;
        score.toPar = '--';
        score.relativeScore = Number.MAX_SAFE_INTEGER;
        score.total = '--';
        score.totalScore = Number.MAX_SAFE_INTEGER;
        score.position = '--';
        score.currentRoundScore = '--';
        score.thru = '--';
        score.round1Score = '--';
        score.round2Score = '--';
        score.round3Score = '--';
        score.round4Score = '--';
        score.fullName = '';
        score.shortName = `${golferConfig.firstName[0]}. ${golferConfig.lastName}`;
        score.logoImage = '';
        score.startTime = null;
        score.movement = { text: '-', direction: MovementDirection.None };

        return score;
    }

    private extractScore(row, index): Score {
        let isDNF = false;

        const toPar: string = row.find('.relativeScore').text();
        let relativeScore = toPar === 'E' ? 0 : parseInt(toPar, 10);
        if (isNaN(relativeScore)) {
            relativeScore = Number.MAX_SAFE_INTEGER;
            isDNF = true;
        }

        const total: string = row.find('.totalScore').text();
        let totalScore = total === '--' ? 0 : parseInt(total, 10);
        if (isNaN(totalScore)) {
            totalScore = Number.MAX_SAFE_INTEGER;
        }

        const thru: string = row.find('.thru').text();
        let startTime;
        if (thru === '') {
            const time = row.find('.thru .date-container').attr('data-date');
            startTime = new Date(time);
        } else {
            startTime = null;
        }

        const position: string = row.find('.position').text();
        const currentRoundScore: string = row.find('.currentRoundScore').text();

        const round1Score: string = row.find('.round1').text();
        const round2Score: string = row.find('.round2').text();
        const round3Score: string = row.find('.round3').text();
        const round4Score: string = row.find('.round4').text();
        const fullName: string = row.find('.full-name').text();
        const shortName: string = row.find('.short-name').text();
        const logoImage: string = row.find('.team-logo img').attr('src');

        const match: string[] = row.attr('class').match(/player-overview-([0-9]{1,5})/);
        const espnId = match[match.length - 1];

        const movementElement = row.find('.movement');
        const movementText: string = movementElement.text();
        let movementDirection: MovementDirection;
        if (movementElement.hasClass('positive')) {
            movementDirection = MovementDirection.Positive;
        } else if (movementElement.hasClass('negative')) {
            movementDirection = MovementDirection.Negative;
        } else {
            movementDirection = MovementDirection.None;
        }

        const score = new Score();

        score.index = index;
        score.isDNF = isDNF;
        score.toPar = toPar;
        score.relativeScore = relativeScore;
        score.total = total;
        score.totalScore = totalScore;
        score.position = position;
        score.currentRoundScore = currentRoundScore;
        score.thru = thru;
        score.round1Score = round1Score;
        score.round2Score = round2Score;
        score.round3Score = round3Score;
        score.round4Score = round4Score;
        score.fullName = fullName;
        score.shortName = shortName;
        score.logoImage = logoImage;
        score.startTime = startTime;
        score.espnId = espnId;
        score.movement = { text: movementText, direction: movementDirection };

        return score;
    }

    private getEntries(golferScores: GolferScore[]): Entry[] {
        const entries: Entry[] = this.entryConfig.map((config: EntryConfig)  => {

            const entryGolferScores: GolferScore[] = config.golferIds.map(gid => {
                return cloneDeep(golferScores.find(golferScore => golferScore.golferConfig.id === gid));
            });

            let overallRelativeScore: number, overallTotalScore: string, overallToPar: string;
            const isDQ: boolean = entryGolferScores.filter(golferScore => golferScore.score.isDNF).length > 1;

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

    private setSelected(data: PoolData) {
        if (this.selectedContestantId !== data.selectedContestantId) {
            data.selectedContestantId = this.selectedContestantId;
            let selectedGolferIds: number[] = [];
            data.entries.forEach((entry: Entry) => {
                entry.isSelected = entry.contestantId === this.selectedContestantId;
                if (entry.isSelected) {
                    selectedGolferIds = union(selectedGolferIds, entry.golferScores.map(golferScore => golferScore.golferConfig.id));
                }
            });

            data.golfersScores.forEach(golferScore => {
                golferScore.isSelected = selectedGolferIds.includes(golferScore.golferConfig.id);
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
