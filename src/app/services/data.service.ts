import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as jQuery from 'jquery';
import { cloneDeep, orderBy, sortBy, union } from 'lodash';

import { Golfer, MovementDirection, Score, GolferScore, GolfData, Entry, EntryConfig, PlayerInfo } from '../models/models';
import { AppConfig} from '../app.config';
import { SettingsService } from '../services/settings.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class DataService {

    private entryConfig: EntryConfig[];
    private dataObservable: Observable<GolfData>;
    private intervalSubscription: Subscription;
    private cacheData: GolfData;

    public constructor(private titleService: Title, private http: Http, private settingsService: SettingsService,
        private notificationService: NotificationService) {
        this.entryConfig = AppConfig.CONTESTANTS
            .map(c => c.entries.map((e, i) => ({ name: c.name + ' ' + (i + 1), golferIds: e, contestantId: c.id})))
            .reduce((prev, curr) => prev.concat(curr));

        this.dataObservable = Observable.create((observer: Observer<GolfData>) => {
            if (this.cacheData) {
                this.setSelected(this.cacheData);
                observer.next(this.cacheData);
            } else {
                this.getThenPushData(observer);
            }

            if (!this.intervalSubscription) {
                this.intervalSubscription = IntervalObservable
                .create(AppConfig.REFRESH_TIME)
                .subscribe(() => this.getThenPushData(observer));
            }
        });
    }

    get(): Observable<GolfData> {
        return this.dataObservable;
    }

    getPlayerInfo(golferScore: GolferScore): Observable<PlayerInfo> {
        return this.http.get(AppConfig.PLAYER_INFO_URL + golferScore.score.espnId)
            .map((res: Response) => this.handlePlayerResponse(res, golferScore))
            .catch(this.handleError);
    }

    private handlePlayerResponse(res: Response, golferScore: GolferScore): PlayerInfo {
        const playerInfo: PlayerInfo = res.json();
        playerInfo.golferId = golferScore.golfer.id;
        return playerInfo;
    }

    private getThenPushData(observer: Observer<GolfData>) {
        this.http.get(AppConfig.LEADERBOARD_URL)
            .map((res: Response) => this.convertToData(res))
            .catch(this.handleError)
            .subscribe((data: GolfData) => {
                this.setSelected(data);
                const previousEntries = this.cacheData ? this.cacheData.entries : null;

                this.cacheData = data;

                this.updateTitle(data.entries);
                this.notificationService.update(previousEntries, data.entries);

                observer.next(data);
            });
    }

    private convertToData(res: Response): GolfData {
        const now = new Date();
        const scorePage = jQuery(res.text());
        const golferRows = scorePage.find('.leaderboard-table .player-overview');
        const scores: Score[] = [];

        golferRows.each((index, row) => {
            scores.push(this.extractScore(jQuery(row), index));
        });

        const data: GolfData = new GolfData();
        data.timeStamp = now;
        data.golfersScores = this.getGolferScores(scores);
        data.entries = this.getEntries(data.golfersScores);
        return data;
    }

    private setSelected(data: GolfData) {
        const selectedContestantId: number = this.settingsService.selectedContestantId;
        if (selectedContestantId !== data.selectedContestantId) {
            data.selectedContestantId = selectedContestantId;
            let selectedGolferIds: number[] = [];
            data.entries.forEach((entry: Entry) => {
                entry.isSelected = entry.contestantId === selectedContestantId;
                if (entry.isSelected) {
                    selectedGolferIds = union(selectedGolferIds, entry.golferScores.map(golferScore => golferScore.golfer.id));
                }
            });

            data.golfersScores.forEach(golferScore => {
                golferScore.isSelected = selectedGolferIds.includes(golferScore.golfer.id);
            });
        }
    }

    private getGolferScores(scores: Score[]): GolferScore[] {
        const golferScores: GolferScore[] = AppConfig.GOLFERS.map(golfer => {
            const firstName: string = golfer.firstName.toLowerCase();
            const lastName: string = golfer.lastName.toLowerCase();
            const matchingScore: Score = scores.find(score => {
                const fullName = score.fullName.toLowerCase();
                return fullName.includes(firstName) && fullName.includes(lastName);
            });

            const golferCopy: Golfer = cloneDeep(golfer);
            const golferScore: GolferScore = new GolferScore();
            golferScore.golfer = golferCopy;

            if (matchingScore) {
                golferScore.score = matchingScore;
            } else {
                golferScore.score = this.emptyScore(golferCopy);
            }

            golferScore.entryCount = this.entryConfig.filter((e: EntryConfig) => e.golferIds.includes(golferCopy.id)).length;

            return golferScore;
        });

        return sortBy(golferScores, (golferScore: GolferScore) => golferScore.score.index);
    }

    private emptyScore(golfer: Golfer): Score {
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
        score.shortName = `${golfer.firstName[0]}. ${golfer.lastName}`;
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
                return cloneDeep(golferScores.find(golferScore => golferScore.golfer.id === gid));
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

    private updateTitle(entries: Entry[]) {
        const selectedContestantId: number = this.settingsService.selectedContestantId;
        let positions = null;
        if (selectedContestantId > 0) {
            positions = entries.filter(e => e.contestantId === selectedContestantId && !e.isDQ)
                .map(e => e.position)
                .reduce((c, n) => c !== null ? c + ', ' + n : n , null);

        }
        const title = positions ? positions + ' - ' + AppConfig.TOURNEY_TITLE + ' Player Pool' : AppConfig.TOURNEY_TITLE + ' Player Pool';
        this.titleService.setTitle(title);
    }
}
