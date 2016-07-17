
export interface IResult {
    gameId: string;
    homeScore: number;
    awayScore: number;
}

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

export class Game implements IResult {

    gameId: string;

    // how to handle dates?
    when: string;

    homeTeam: string;
    homeScore: number;

    awayTeam: string;
    awayScore: number;

    isFinal: boolean;

    constructor() { }
}

export class Result implements IResult {

    gameId: string;

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
