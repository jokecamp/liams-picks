
export interface IResult {
    gameId: number;
    homeScore: number;
    awayScore: number;
}

export class Pick implements IResult {

    gameId: number;
    homeScore: number;
    awayScore: number;
    pointsEarned: number;

    constructor() { }
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
