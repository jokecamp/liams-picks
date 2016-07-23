import { IResult } from '../common-models/result';

export class Pick implements IResult {

    gameId: string;
    userId: string;


    home: {
        score: number;
    }

    away: {
        score: number;
    }

    isBonus: boolean;
    pointsEarned: number;

    constructor() {
        this.home = {
            score: null
        };
        this.away = {
            score: null
        };
        this.isBonus = false;
        this.pointsEarned = null;
    }
}
