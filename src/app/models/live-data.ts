export interface Address {
    country: string;
    city: string;
}

export interface Hole {
    number: number;
    totalYards: number;
    shotsToPar: number;
}

export interface Course {
    totalYards: number;
    address: Address;
    parOut: number;
    name: string;
    id: string;
    shotsToPar: number;
    parIn: number;
    holes: Hole[];
}

export interface League {
    name: string;
    id: string;
    abbreviation: string;
    shortName: string;
    slug: string;
}

export interface Score {
    displayValue: string;
    value: number;
}

export interface BirthPlace {
    countryAbbreviation: string;
    stateAbbreviation: string;
}

export interface Flag {
    alt: string;
    href: string;
}

export interface Headshot {
    href: string;
}

export interface Link {
    href: string;
    isExternal?: boolean;
    shortText?: string;
    rel?: string[];
    language?: string;
    text?: string;
    isPremium?: boolean;
}

export interface Athlete {
    displayName: string;
    id: string;
    birthPlace?: BirthPlace;
    flag?: Flag;
    headshot?: Headshot;
    links?: Link[];
}


export interface Linescore {
    displayValue: string;
    period: number;
    teeTime: string;
    currentPosition: number;
    outScore: number;
    value: number;
    startPosition: number;
    inScore: number;
    hasStream: boolean;
}

export interface Position {
    displayName: string;
    id: string;
    isTie: boolean;
}

export interface Type {
    description: string;
    state: string;
    name?: string;
    id?: string;
    completed?: boolean;
    detail?: string;
    shortDetail?: string;
}

export interface Status {
    type: Type;

    displayValue?: any;
    hole?: number;
    thru?: number;
    period?: number;
    teeTime?: string;
    startHole?: number;
    behindCurrentRound?: boolean;
    displayThru?: string;
    position?: Position;
    playoff?: boolean;
}

export interface Statistic {
    displayValue: string;
    name: string;
}

export interface Competitor {
    uid: string;
    score: Score;
    featured: boolean;
    athlete: Athlete;
    sortOrder: number;
    id: string;
    linescores: Linescore[];
    movement: number;
    status: Status;
    statistics: Statistic[];
    isDNF?: boolean;
}

export interface Media {
    callLetters: string;
    name: string;
    id: string;
    shortName: string;
}

export interface Broadcast {
    media: Media;
    lang: string;
    region: string;
}

export interface CompetitionLeader {
    shortDisplayName: string;
    displayName: string;
    name: string;
    leaders: Leader[];
    abbreviation: string;
}

export interface Leader {
    displayValue: string;
    athlete: Athlete;
    value: number;
}


export interface ScoringSystem {
    name: string;
    id: string;
}

export interface Competition {
    competitors: Competitor[];
    onWatchESPN: boolean;
    dataFormat: string;
    broadcasts: Broadcast[];
    leaders: CompetitionLeader[];
    scoringSystem: ScoringSystem;
    status: Status;
}

export interface Tournament {
    major: boolean;
    displayName: string;
    id: string;
    cutRound: number;
    cutCount: number;
    numberOfRounds: number;
    cutScore: number;
}

export interface DefendingChampion {
    athlete: Athlete;
    season: number;
}

export interface PlayoffType {
    minimumHoles: number;
    description: string;
    id: number;
}

export interface Season {
    year: number;
}

export interface LiveData {
    date: string;
    courses: Course[];
    endDate: string;
    hasPlayerStats: boolean;
    league: League;
    competitions: Competition[];
    displayPurse: string;
    tournament: Tournament;
    defendingChampion: DefendingChampion;
    hasCourseStats: boolean;
    uid: string;
    name: string;
    playoffType: PlayoffType;
    season: Season;
    links: Link[];
    id: string;
    shortName: string;
    purse: number;
    primary: boolean;
    status: Status;
}



