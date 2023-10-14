import { UserDB } from "../db/schema";

export interface IUserDAO {
    findByEmail(email: string): Promise<Array<UserDB>>;
    create(user: any): Promise<void>;
}