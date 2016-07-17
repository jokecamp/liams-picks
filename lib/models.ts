
export interface IResult {
    gameId: number;
    homeScore: number;
    awayScore: number;
}

export class Pick implements IResult {

    gameId: number;
    userId: number;
    
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


export class Result implements IResult {

    gameId: number;

    // how to handle dates?
    when: string;

    homeScore: number;
    awayScore: number;

    isFinal: boolean;

    constructor() { }
}

export class User {
    userId: number;
    name: string;
}
