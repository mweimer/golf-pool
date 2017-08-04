// Configuration models

export interface Config {
    tournament: {
        id: number;
        name: string;
        espnId: string;
    }
   
    golfers: GolferConfig[];
    contestantEntries: ContestantEntriesConfig[];
}

export class IAppConfig {
    GOLFERS: GolferConfig[];
    CONTESTANT_ENTRIES: ContestantEntriesConfig[];
    LEADERBOARD_URL: string;
    PLAYER_INFO_URL: string;
    TOURNAMENT_ID: number;
    TOURNAMENT_NAME: string;
    TOURNAMENT_ESPNID: string;
}

export interface GolferConfig {
    id: number;
    name: string;
    tier: string;
    espnId: string;
}

export interface ContestantEntriesConfig {
    id: number;
    userName: string;
    userId: number;
    entries: number[][];
}

export interface EntryConfig {
    userId: number;
    name: string;
    golferIds: number[];
}

export class User {
    id: number;
    name: string;
    role: string;
    issuedAt: Date;
    expirationTime: Date;

    constructor(id: number, name: string, role: string, iat: number, exp: number) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.issuedAt = new Date(iat * 1000);
        this.expirationTime = new Date(exp * 1000);
    }
}

// Models for pool and golfer leaderboards

export class PoolData {
    entries: Entry[];
    golfersScores: GolferScore[];
    cutline?: {
        value: number;
        type: string;
    };
    selectedUserId = 0;
    timeStamp: Date;
}

export class Entry {
    name: string;
    golferScores: GolferScore[];
    overallRelativeScore: number;
    overallTotalScore: string;
    overallToPar: string;
    isDQ: boolean;
    isSelected: boolean;
    userId: number;
    position: string;
    positionNumber: number;
}

export class GolferScore {
    golferConfig: GolferConfig;
    score: Score;
    throwaway = false;
    entryCount = 0;
    isSelected = false;
}

export class Score {
    index: number;
    isDNF: boolean
    toPar: string;
    relativeScore: number;
    total: string;
    totalScore: number;
    position: string;
    currentRoundScore: string;
    thru: string;
    round1Score: string;
    round2Score: string;
    round3Score: string;
    round4Score: string;
    fullName: string;
    shortName: string;
    logoImage: string;
    startTime: Date;
    espnId: string;
    movement: {
        text: string;
        direction: MovementDirection
    }
}

export enum MovementDirection {
    Positive,
    Negative,
    None
}

export class PlayerInfo {
    golferId: number;
    profile: {
        age?: number;
        birthPlace?: string;
        college?: string;
        dateOfBirth?: Date;
        displayName: string;
        hand?: string;
        headshot?: string;
        link?: string;
    };
    rounds: {
        courseId: number;
        currentPosition: number;
        displayValue: string;
        hasStream: boolean;
        inScore: number;
        linescores: {
            displayValue: string
            par: number;
            period: number;
            scoreType: {
                displayName: string
                displayValue: string
                name: string;
            }
            value: number;
        }[];
        movement: number;
        outScore: number
        period: number
        startPosition: number
        teeTime: Date;
        value: number;
    }[];
}


