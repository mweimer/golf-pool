// Configuration models

export class GolferConfig {
    id: number;
    firstName: string;
    lastName: string;
    tier: string
    isAmateur? = false;
}

export class ContestantConfig {
    id: number;
    name: string;
    entries: number[][];
}

export class EntryConfig {
    name: string;
    golferIds: number[];
    contestantId: number;
}


// Models for pool and golfer leaderboards

export class PoolData {
    entries: Entry[];
    golfersScores: GolferScore[];
    selectedContestantId = 0;
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
    contestantId: number;
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
        age: number;
        birthPlace: string;
        college: string;
        dateOfBirth: Date;
        displayName: string;
        hand: string;
        headshot: string;
        link: string;
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


