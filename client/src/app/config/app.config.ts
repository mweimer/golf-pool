import { Config, IAppConfig } from '../models/models';
import { Constants } from './constants'

export class AppConfig implements IAppConfig {

    constructor(private config: Config) {}

    public GOLFERS = this.config.golfers;

    public SELECTIONS = this.config.selections;

    public LEADERBOARD_URL = Constants.LEADERBOARD_URL_TEMPLATE.replace('${espnId}', this.config.tournament.espnId);

    public PLAYER_INFO_URL = `http://site.api.espn.com/apis/site/v2/sports/golf/pga/leaderboard/${this.config.tournament.espnId}/playersummary?player=`;

    public TOURNAMENT_ID = this.config.tournament.id;

    public TOURNAMENT_NAME = this.config.tournament.name;

    public TOURNAMENT_ESPNID = this.config.tournament.espnId;
}
