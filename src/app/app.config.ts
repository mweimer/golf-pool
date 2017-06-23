import { tourneyTitle, leaderboardUrl, golferData, contestantData } from './config';
import { Golfer } from './models/models';

export class AppConfig {
    public static REFRESH_TIME = 60000;

    public static GOLFERS: Golfer[] = golferData;

    public static CONTESTANTS = contestantData;

    public static LEADERBOARD_URL: string = leaderboardUrl;

    public static TOURNEY_TITLE: string = tourneyTitle;
}
