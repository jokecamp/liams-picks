let CONFIG = require('config');
import { Link } from '../models';

export class Root {
    links: Link[]

    constructor() {
        this.links = [];
    }

    addLink(rel: string, paths: string[]) {
        var href = CONFIG.domain + paths.join('/');
        var link = new Link(rel, href)
        this.links.push(link);
    }
}
