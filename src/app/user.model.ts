import { IUser } from './user.interface';

export class User implements IUser {
    constructor(
        public name: string,
        public email: string,
        public password:string,
    ){}
}