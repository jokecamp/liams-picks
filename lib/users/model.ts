import { BaseModel, Link } from '../models';

export class User extends BaseModel {
    userId: string;
    name: string;
}
