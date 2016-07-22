export class DatedRecord {

    created: string;
    modified: string;
    deleted: string;

    isDeleted() {
        return this.deleted !== null && this.deleted > '';
    }

    populateFromRow(row: any) {
        this.created = row.created_at;
        this.modified = row.updated_at;
        this.deleted = row.deleted_at;
    }
}

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
    userId: string;
    name: string;
}

export class Round {
    roundId: string;
    leagueId: string;
    number: number;
}
