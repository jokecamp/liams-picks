import { IResult } from '../common-models/result';
import { BaseModel } from '../common-models/base'

import { GameStorage } from './storage';
let storage: GameStorage = new GameStorage('games');

/*
    A game is a result/fixture.
    It can be scheduled or already completed
*/
export class Game extends BaseModel implements IResult {

    static ROUTE: string = 'games';

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
