import { IResult } from '../common-models/result';

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
