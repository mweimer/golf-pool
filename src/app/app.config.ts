import { tourneyTitle, tourneyId, golferData, contestantData } from './config';
import { GolferConfig, ContestantConfig } from './models/models';


export class AppConfig {

    public static REFRESH_TIME = 60000;

    public static GOLFERS: GolferConfig[] = golferData;

    public static CONTESTANTS: ContestantConfig[] = contestantData;

    public static LEADERBOARD_URL = `http://www.espn.com/golf/leaderboard?tournamentId=${tourneyId}`;

    public static PLAYER_INFO_URL = `http://site.api.espn.com/apis/site/v2/sports/golf/pga/leaderboard/${tourneyId}/playersummary?player=`;

    public static TOURNEY_TITLE: string = tourneyTitle;
}
