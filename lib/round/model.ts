import { BaseModel, Link } from '../models';

export class Round extends BaseModel {
    roundId: string;
    leagueId: string;
    number: number;
}
