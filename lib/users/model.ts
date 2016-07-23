import { BaseModel } from '../common-models/base';

export class User extends BaseModel {
    userId: string;
    name: string;
}
