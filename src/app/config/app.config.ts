import { Config, IAppConfig } from '../models/models';

export class AppConfig implements IAppConfig {

    constructor(private config: Config) {}

    public REFRESH_TIME = 60000;

    public UPDATE_CHECK_INTERVAL = 1800000; // 30 mins

    public GOLFERS = this.config.golferData;

    public CONTESTANTS = this.config.contestantData;

    public LEADERBOARD_URL = `http://www.espn.com/golf/leaderboard?tournamentId=${this.config.tourneyId}`;

    public PLAYER_INFO_URL = `http://site.api.espn.com/apis/site/v2/sports/golf/pga/leaderboard/${this.config.tourneyId}/playersummary?player=`;

    public TOURNEY_TITLE = this.config.tourneyTitle;
}
