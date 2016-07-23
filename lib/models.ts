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
        var href = CONFIG.domain + paths.join('/');
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


export class Result implements IResult {

    gameId: string;

    // how to handle dates?
    when: string;

    homeScore: number;
    awayScore: number;

    isFinal: boolean;

    constructor() { }
}
