
export interface IResult {
    gameId: string;
    homeScore: number;
    awayScore: number;
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
