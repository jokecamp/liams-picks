
export interface IResult {
    gameId: string;

    home: {
        score: number;
    }

    away: {
        score: number;
    }
}


export class Result implements IResult {

    gameId: string;

    // how to handle dates?
    when: string;

    home: {
        score: number;
    }

    away: {
        score: number;
    }

    isFinal: boolean;

    constructor() { }
}
