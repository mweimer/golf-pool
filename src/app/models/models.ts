export class EntryConfig {
    name: string;
    golferIds: number[];
    contestantId: number;
}

export class GolfData {
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
    golfer: Golfer;
    score: Score;
    throwaway = false;
    entryCount = 0;
    isSelected = false;
    isHighlighted = false;
}

export class Golfer {
    id: number;
    firstName: string;
    lastName: string;
    tier: string
    isAmateur? = false;
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
