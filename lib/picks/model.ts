import { IResult } from '../common-models/result';

export class Pick implements IResult {

    gameId: string;
    userId: string;

    homeScore: number;
    awayScore: number;
    isBonus: boolean;
    pointsEarned: number;

    constructor() {
        this.homeScore = null;
        this.awayScore = null;
        this.isBonus = false;
        this.pointsEarned = null;
    }
}
