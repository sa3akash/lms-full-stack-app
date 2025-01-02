import {Role} from "@middleware/auth";


export interface IUserDocument {
    _id: string;
    name: string;
    email: string;
    role: Role;
    password: string;
    comparePassword(password: string): Promise<boolean>;
    hashPassword(password: string): Promise<string>;
}