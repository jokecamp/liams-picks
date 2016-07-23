import { BaseModel, Link, IResult } from '../models';

export class Game implements IResult {

    gameId: string;

    // how to handle dates?
    when: string;

    homeTeam: string;
    homeScore: number;

    awayTeam: string;
    awayScore: number;

    isFinal: boolean;
}
