import { tourneyTitle, tourneyId, golferData, contestantData } from './config';
import { Golfer, Contestant } from './models/models';


export class AppConfig {

    public static REFRESH_TIME = 60000;

    public static GOLFERS: Golfer[] = golferData;

    public static CONTESTANTS: Contestant[] = contestantData;

    public static LEADERBOARD_URL: string = `http://www.espn.com/golf/leaderboard?tournamentId=${tourneyId}`;

    public static PLAYER_INFO_URL: string = `http://site.api.espn.com/apis/site/v2/sports/golf/pga/leaderboard/${tourneyId}/playersummary?player=`;

    public static TOURNEY_TITLE: string = tourneyTitle;
}
