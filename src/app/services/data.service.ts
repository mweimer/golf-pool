import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';

import { Observable ,  ReplaySubject , throwError as _throw} from 'rxjs';
import { map ,  tap } from 'rxjs/operators';
import { cloneDeep, orderBy, sortBy, union, last } from 'lodash';

import { GolferConfig, EntryConfig, LiveData, Entry, GolferScore, Score, MovementDirection, PlayerInfo, IAppConfig } from '../models/models';
import { SettingsService } from '../settings/settings.service';
import { ConfigService } from '../config/config.service';
import { Constants } from '../config/constants';
import { EspnData, Competitor, Linescore } from '../models/espn';
import {DatePipe} from '@angular/common';

@Injectable()
export class DataService {

    private entryConfig: EntryConfig[];
    private _liveData: ReplaySubject<LiveData> = new ReplaySubject<LiveData>(1);
    private cacheData: LiveData = null;
    private selectedContestantId: number = 0;
    private config: IAppConfig;
    private interval: any;
    private static datePipe: DatePipe = new DatePipe('en-US');

    public constructor(private titleService: Title,
                       private http: HttpClient,
                       private settingsService: SettingsService,
                       private configService: ConfigService) {

        this.configService.current.subscribe((config: IAppConfig) => {
            this.config = config;
            this.entryConfig = config.CONTESTANTS
                .map(c => c.entries.map((e, i) => ({ name: c.name + ' ' + (i + 1), golferIds: e, contestantId: c.id})))
                .reduce((prev, curr) => prev.concat(curr));

            this.init();
        });


        this.settingsService.selectedContestantId.subscribe(selectedContestantId => {
            this.selectedContestantId = selectedContestantId;

            if (this.cacheData !== null) {
                this.updateTitle(this.cacheData.entries);
                this.setSelected(this.cacheData);
            } else {
                this.updateTitle();  
            }
        });
    }

    private init() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }

        this.cacheData = null;

        this.updateLiveData()

        this.interval = setInterval(() => this.updateLiveData(), Constants.REFRESH_TIME);
    }


    get liveData(): Observable<LiveData> {
        return this._liveData;
    }

    getPlayerInfo(golferScore: GolferScore): Observable<PlayerInfo> {
        return this.http.get(this.config.PLAYER_INFO_URL + golferScore.score.espnId)
           .pipe(map((res: PlayerInfo) => this.handlePlayerResponse(res, golferScore)))
    }

    private handlePlayerResponse(playerInfo: PlayerInfo, golferScore: GolferScore): PlayerInfo {
        playerInfo.golferId = golferScore.golferConfig.id;
        return playerInfo;
    }

    private updateLiveData() {
        this.http.get(this.config.LEADERBOARD_URL)
            .pipe(
                map((response: EspnData) => this.mapEspnDataToLiveData(response)),
                tap((data: LiveData) => {
                    this.setSelected(data);
                    const previousEntries = this.cacheData ? this.cacheData.entries : null;

                    this.cacheData = data;

                    this.updateTitle(data.entries);
                    this._liveData.next(data);
                })
            )
            .subscribe();
    }

    private mapEspnDataToLiveData(response: EspnData): LiveData {
        const now = new Date();

        const competitors = response.events[0].competitions[0].competitors;
        const sortCompetitors = sortBy(competitors, (competitor: Competitor) => competitor.sortOrder);

        const scores: Score[] = sortCompetitors.map((competitor, index) => this.mapCompetitorToScore(competitor, index));

        const golfersScores = this.getGolferScores(scores);

        const data: LiveData = {
            timeStamp: now,
            golfersScores,
            entries: this.getEntries(golfersScores),
            cutline: this.getCutline(response),
            selectedContestantId: 0
        }

        return data;
    }



    private getCutline(data: EspnData): { value: number, type: string } {
        return {
            value: undefined,
            type: undefined
        };
    }

    private getGolferScores(scores: Score[]): GolferScore[] {
        const golferScores: GolferScore[] = this.config.GOLFERS.map(golferConfig => {

           
            let score: Score;
            if (golferConfig.espnId) {
                score = scores.find(s => s.espnId === golferConfig.espnId);
            } 
            if (!score && golferConfig.espnId) {
                const altId = golferConfig.espnId.substring(0, golferConfig.espnId.length - 2)
                const possibleScores = scores.filter(s => s.espnId === altId);
                if (possibleScores.length > 0) {
                    score = possibleScores.find(s => s.fullName === golferConfig.name);
                }
                if (score) {
                    score.espnId = golferConfig.espnId;
                }
            }

 
            const golferScore: GolferScore = {
                entryCount: this.entryConfig.filter((e: EntryConfig) => e.golferIds.includes(golferConfig.id)).length,
                score: score ? score : this.emptyScore(golferConfig),
                golferConfig: cloneDeep(golferConfig),
                throwaway: false,
                isSelected: false
            };

            return golferScore;
        });

        return sortBy(golferScores, (golferScore: GolferScore) => golferScore.score.index);
    }

    private emptyScore(golferConfig: GolferConfig): Score {
        const nameMatch = golferConfig.name.match(/^([a-zA-Z,.'-]+) ([a-zA-Z ,.'-]+)$/);
        const firstName = nameMatch[1];
        const lastName = nameMatch[2];

        const score: Score = {
            index: Number.MAX_SAFE_INTEGER,
            isDNF: true,
            toPar: '--',
            relativeScore: Number.MAX_SAFE_INTEGER,
            total: '--',
            totalScore: Number.MAX_SAFE_INTEGER,
            position: '--',
            currentRoundScore: '--',
            thru: '--',
            round1Score: '--',
            round2Score: '--',
            round3Score: '--',
            round4Score: '--',
            fullName: golferConfig.name,
            shortName: `${firstName[0]}. ${lastName}`,
            logoImage: '',
            startTime: null,
            movement: { text: '-', direction: MovementDirection.None },
            espnId: null
        }

        return score;
    }
    

    private mapCompetitorToScore(competitor: Competitor, index: number): Score {
        const isDNF: boolean = competitor.status.type.name === "STATUS_CUT";

        const toPar: string = isDNF ? competitor.status.displayValue : competitor.score.displayValue;
        let relativeScore: number;
        if (isDNF) {
            relativeScore = Number.MAX_SAFE_INTEGER;
        } else {
            relativeScore = toPar === 'E' ? 0 : parseInt(toPar, 10);
        }

        const totalScore: number = competitor.score.value;
        const total: string = totalScore.toString();
        const position: string = competitor.status.position.displayName;
        const currentRound: Linescore = last(competitor.linescores);
        const currentRoundScore: string = currentRound && !isDNF ? currentRound.value.toString() :  '--';
        let thru: string = competitor.status.displayValue ? competitor.status.displayValue : '--';
        if (thru.startsWith('2019')) {
            thru = DataService.datePipe.transform(thru, 'shortTime');
        }
        const round1Score: string = competitor.linescores.length > 0 ? competitor.linescores[0].value.toString() : '--';
        const round2Score: string = competitor.linescores.length > 1 ? competitor.linescores[1].value.toString() : '--';
        const round3Score: string = competitor.linescores.length > 2 ? competitor.linescores[2].value.toString() : '--';
        const round4Score: string = competitor.linescores.length > 3 ? competitor.linescores[3].value.toString() : '--';
        const fullName: string = competitor.athlete.displayName;
        const shortName: string = competitor.athlete.displayName;
        const logoImage: string = competitor.athlete.flag.href;
        const startTime: Date = competitor.status.teeTime ? new Date(competitor.status.teeTime) : null;
        const espnId = competitor.id;


        let movementDirection = MovementDirection.None;
        if (competitor.movement > 0) {
            movementDirection = MovementDirection.Positive
        } else if (competitor.movement < 0) {
            movementDirection = MovementDirection.Negative;
        }
        const movementText = competitor.movement === 0 ? null : Math.abs(competitor.movement).toString();

        const score: Score = {
            index: index,
            isDNF: isDNF,
            toPar: toPar,
            relativeScore: relativeScore,
            total: total,
            totalScore: totalScore,
            position: position,
            currentRoundScore: currentRoundScore,
            thru: thru,
            round1Score: round1Score,
            round2Score: round2Score,
            round3Score: round3Score,
            round4Score: round4Score,
            fullName: fullName,
            shortName: shortName,
            logoImage: logoImage,
            startTime: startTime,
            espnId: espnId,
            movement: { text: movementText, direction: movementDirection }
        }

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
                    ['score.relativeScore', 'score.totalScore', 'golferConfig.tier', 'golferConfig.id'], ['desc', 'desc', 'desc', 'desc']);
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

            const entry: Entry = {
                name: config.name,
                golferScores: entryGolferScores,
                overallRelativeScore,
                overallTotalScore,
                overallToPar,
                isDQ,
                contestantId: config.contestantId,
                isSelected: false,
                position: null,
                positionNumber: 0
            };

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
        const title = positions ? positions + ' - ' + this.config.TOURNEY_TITLE + ' Player Pool' : this.config.TOURNEY_TITLE + ' Player Pool';
        this.titleService.setTitle(title);
    }

    private setSelected(data: LiveData) {
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

}
