import { Config, IAppConfig } from '../models/models';

export class AppConfig implements IAppConfig {

    constructor(private config: Config) {}

    public GOLFERS = this.config.golferData;

    public CONTESTANTS = this.config.contestantData;

    public LEADERBOARD_URL = `https://site.web.api.espn.com/apis/site/v2/sports/golf/leaderboard?league=pga&region=us&lang=en&event=${this.config.tourneyId}&showAirings=true`;

    public PLAYER_INFO_URL = `https://site.web.api.espn.com/apis/site/v2/sports/golf/pga/leaderboard/${this.config.tourneyId}/playersummary?player=`;

    public TOURNEY_TITLE = this.config.tourneyTitle;

    public TOURNEY_ID = this.config.tourneyId;
}
