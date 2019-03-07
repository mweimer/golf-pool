export interface Season {
    year: number;
}

export interface ScoringSystem {
    id: string;
    name: string;
}

export interface Link {
    language: string;
    rel: string[];
    href: string;
    text: string;
    shortText: string;
    isExternal: boolean;
    isPremium: boolean;
}

export interface BirthPlace {
    stateAbbreviation: string;
    countryAbbreviation: string;
}

export interface Headshot {
    href: string;
}

export interface Flag {
    href: string;
    alt: string;
}

export interface Athlete {
    id: string;
    displayName: string;
    amateur: boolean;
    links: Link[];
    birthPlace: BirthPlace;
    headshot: Headshot;
    flag: Flag;
}

export interface Type {
    id: string;
    name: string;
    state: string;
    completed: boolean;
    description: string;
    detail: string;
    shortDetail: string;
}

export interface Position {
    id: string;
    displayName: string;
    isTie: boolean;
}

export interface Status {
    period: number;
    type: Type;
    displayValue: string;
    teeTime: string;
    hole: number;
    startHole: number;
    position: Position;
    thru: number;
    playoff: boolean;
    behindCurrentRound: boolean;
    displayThru: string;
}

export interface Score {
    value: number;
    displayValue: string;
}

export interface Linescore {
    value: number;
    displayValue: string;
    period: number;
    inScore: number;
    outScore: number;
    hasStream: boolean;
    startPosition: number;
    currentPosition: number;
    teeTime: string;
}

export interface Statistic {
    name: string;
    value: number;
    displayValue: string;
}

export interface Competitor {
    id: string;
    uid: string;
    athlete: Athlete;
    status: Status;
    score: Score;
    linescores: Linescore[];
    statistics: Statistic[];
    movement: number;
    featured: boolean;
    sortOrder: number;
}

export interface LeaderAthlete {
    displayValue: string;
    value: number;
    athlete: Athlete;
}

export interface Leader {
    name: string;
    displayName: string;
    shortDisplayName: string;
    abbreviation: string;
    leaders: LeaderAthlete[];
}

export interface Competition {
    id: string;
    uid: string;
    date: string;
    endDate: string;
    scoringSystem: ScoringSystem;
    onWatchESPN: boolean;
    recent: boolean;
    competitors: Competitor[];
    status: Status;
    leaders: Leader[];
    dataFormat: string;
}


export interface League {
    id: string;
    name: string;
    abbreviation: string;
    shortName: string;
    slug: string;
}


export interface DefendingChampion {
    season: number;
    athlete: Athlete;
}

export interface Tournament {
    id: string;
    displayName: string;
    major: boolean;
    scoringSystem: ScoringSystem;
    numberOfRounds: number;
    cutRound: number;
    cutScore: number;
    cutCount: number;
}

export interface PlayoffType {
    id: number;
    description: string;
    minimumHoles: number;
}

export interface Winner {
    id: string;
    displayName: string;
}

export interface Address {
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

export interface Hole {
    number: number;
    shotsToPar: number;
    totalYards: number;
}

export interface Cours {
    id: string;
    name: string;
    address: Address;
    totalYards: number;
    shotsToPar: number;
    parIn: number;
    parOut: number;
    holes: Hole[];
}

export interface Event {
    id: string;
    uid: string;
    date: string;
    endDate: string;
    name: string;
    shortName: string;
    season: Season;
    competitions: Competition[];
    links: Link[];
    league: League;
    defendingChampion: DefendingChampion;
    tournament: Tournament;
    status: Status;
    purse: number;
    displayPurse: string;
    playoffType: PlayoffType;
    winner: Winner;
    courses: Cours[];
    primary: boolean;
    hasPlayerStats: boolean;
    hasCourseStats: boolean;
}

export interface EspnData {
    events: Event[];
}


