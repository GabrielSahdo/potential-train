import { BunSQLiteDatabase } from 'drizzle-orm/bun-sqlite';
import { users } from '../db/schema';
import { User } from './user.entity';
import { eq } from 'drizzle-orm';

export default class UsersService {
    private db;

    constructor(db: BunSQLiteDatabase) {
        this.db = db;
    }

    async findByEmail(email: string): Promise<User | null> {
        const userFound = await this.db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1)
            .execute();

        return userFound.length === 0
            ? null
            : User.fromDAO(userFound);
    }

    async create(email: string, password: string): Promise<string> {
        const userFound = await this.findByEmail(email);

        if (userFound)
            throw new Error('User already exists');

        const user = await User.build(email, password);

        await this.db.insert(users).values(user.toDAO()).execute();

        return user.toDTO().id;
    }

    async login(email: string, password: string) {
        const userFound = await this.findByEmail(email);

        if (!userFound)
            throw new Error('User not found');

        const validLogin = await userFound.login(password)

        if (!validLogin)
            throw new Error('Invalid password');

        return userFound.toDTO();
    }
}