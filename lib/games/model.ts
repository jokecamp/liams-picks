import { IResult } from '../common-models/result';
import { BaseModel } from '../common-models/base'

/*
    A game is a result/fixture.
    It can be scheduled or already completed
*/
export class Game extends BaseModel implements IResult {

    gameId: string;

    // how to handle dates?
    when: string;

    home: {
        team: string;
        score: number;
    }

    away: {
        team: string;
        score: number;
    }

    isFinal: boolean;
}
