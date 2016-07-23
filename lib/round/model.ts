import { BaseModel } from '../common-models/base';

export class Round extends BaseModel {
    roundId: string;
    leagueId: string;
    number: number;
}
