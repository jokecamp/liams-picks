let CONFIG = require('config');
import * as logger from 'winston';
import { Link } from './link';

export class BaseModel {

    created: string;
    modified: string;
    deleted: string;
    links: Link[];

    constructor() {
    }

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
