import { Config, IAppConfig } from '../models/models';

export class AppConfig implements IAppConfig {

    constructor(private config: Config) {}

    public GOLFERS = this.config.golferData;

    public CONTESTANTS = this.config.contestantData;

    public LEADERBOARD_URL = `http://www.espn.com/golf/leaderboard?tournamentId=${this.config.tourneyId}`;

    public PLAYER_INFO_URL = `http://site.api.espn.com/apis/site/v2/sports/golf/pga/leaderboard/${this.config.tourneyId}/playersummary?player=`;

    public TOURNEY_TITLE = this.config.tourneyTitle;

    public TOURNEY_ID = this.config.tourneyId;
}
