// Configuration models

export interface Config {
    tourneyTitle: string;
    tourneyId: string;
    golferData: GolferConfig[];
    contestantData: ContestantConfig[];
}

export interface IAppConfig {
    GOLFERS: GolferConfig[];
    CONTESTANTS: ContestantConfig[];
    LEADERBOARD_URL: string;
    PLAYER_INFO_URL: string;
    TOURNEY_TITLE: string;
    TOURNEY_ID: string;
}

export interface GolferConfig {
    id: number;
    name: string;
    tier: string;
    espnId: string;
}

export interface ContestantConfig {
    id: number;
    name: string;
    entries: number[][];
}

export interface EntryConfig {
    name: string;
    golferIds: number[];
    contestantId: number;
}


// Models for pool and golfer leaderboards

export interface LiveData {
    entries: Entry[];
    golfersScores: GolferScore[];
    cutline?: {
        value: number;
        type: string;
        displayValue: string;
    };
    selectedContestantId: number;
    timeStamp: Date;
}

export interface Entry {
    name: string;
    golferScores: GolferScore[];
    overallRelativeScore: number;
    overallTotalScore: string;
    overallToPar: string;
    isDQ: boolean;
    isSelected: boolean;
    contestantId: number;
    position: string;
    positionNumber: number;
}

export interface GolferScore {
    golferConfig: GolferConfig;
    score: Score;
    throwaway: boolean;
    entryCount: number;
    isSelected: boolean;
}

export interface Score {
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
    espnId: string;
    movement: {
        text: string;
        class: string
    }
}

export interface PlayerInfo {
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
    rounds?: {
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

export interface NotificationStatus {
    supported: boolean;
    granted: boolean;
}


