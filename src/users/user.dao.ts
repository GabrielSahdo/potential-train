import { eq } from "drizzle-orm";
import { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { UserDB, users } from "../db/schema";
import { IUserDAO } from "./user.dao.interface";

export class UserDAO implements IUserDAO {
    constructor(private db: BunSQLiteDatabase) {}

    async findByEmail(email: string) {
        return this.db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1)
            .execute();
    }

    async create(user: UserDB) {
        await this.db.insert(users).values(user).execute();
    }
}