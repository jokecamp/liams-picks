let urljoin = require('url-join');
let CONFIG = require('config');

export class BaseModel {

    created: string;
    modified: string;
    deleted: string;
    links: Link[];

    isDeleted() {
        return this.deleted !== null && this.deleted > '';
    }

    populateFromRow(row: any) {
        this.created = row.created_at;
        this.modified = row.updated_at;
        this.deleted = row.deleted_at;
        this.links = [];
    }

    addLink(rel: string, paths: string[]) {
        var href = urljoin(CONFIG.domain, paths.join('/'));
        var link = new Link(rel, href)
        this.links.push(link);
    }
}

export class Link {
    rel: string;
    href: string;

    constructor(rel: string, href: string) {
        this.rel = rel;
        this.href = href;
    }

    static REL_SELF: string = 'self';
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
