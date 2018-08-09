import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';
import * as jQuery from 'jquery';
import { cloneDeep, orderBy, sortBy, union } from 'lodash';
import {_throw} from 'rxjs/observable/throw';

import { GolferConfig, EntryConfig, LiveData, Entry, GolferScore, Score, MovementDirection, PlayerInfo, IAppConfig } from '../models/models';
import { SettingsService } from '../settings/settings.service';
import { ConfigService } from '../config/config.service';
import { Constants } from '../config/constants';

@Injectable()
export class DataService {

    private entryConfig: EntryConfig[];
    private _liveData: ReplaySubject<LiveData> = new ReplaySubject<LiveData>(1);
    private cacheData: LiveData = null;
    private selectedContestantId: number = 0;
    private config: IAppConfig;
    private interval: any;

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
        this.http.get(this.config.LEADERBOARD_URL, {responseType: 'text'})
            .pipe(
                map((responseHtml: string) => this.mapLiveData(responseHtml)),
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

    private mapLiveData(responseHtml: string): LiveData {
        const now = new Date();
        const scorePage = jQuery(responseHtml);
        const golferRows = scorePage.find('.leaderboard-table .player-overview');
        const scores: Score[] = [];

        golferRows.each((index, row) => {
            scores.push(this.extractScore(jQuery(row), index));
        });

        const golfersScores = this.getGolferScores(scores);

        const data: LiveData = {
            timeStamp: now,
            golfersScores,
            entries: this.getEntries(golfersScores),
            cutline: this.getCutline(scorePage),
            selectedContestantId: 0
        }

        return data;
    }

    private getCutline(scorePage: jQuery) {
        const cutlineScoreRow = scorePage.find('.leaderboard-table .cutline .cut-score');
        const cutlineMsgRow = scorePage.find('.leaderboard-table .cutline .msg');
        let cutlineValue, cutlineType; 
        if (cutlineScoreRow.length > 0) {
            cutlineValue = parseInt(cutlineScoreRow.text(), 10);
            cutlineType = cutlineMsgRow.text().toLowerCase().includes('projected') ? 'projected' : 'actual';
        }

        return {
            value: cutlineValue,
            type: cutlineType
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

    private extractScore(row: jQuery, index: number): Score {
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
