import crypto from 'node:crypto';
import { UserDB } from '../db/schema';
import { password } from 'bun';

export class User {
    id: string;
    email: string;
    salt: string;
    passwordHash: string;

    constructor(id: string, email: string, salt: string, passwordHash: string) {
        this.id = id;
        this.email = email;
        this.salt = salt;
        this.passwordHash = passwordHash;
    }

    toDAO(): UserDB {
        return {
            id: this.id,
            email: this.email,
            salt: this.salt,
            passwordHash: this.passwordHash,
        };
    }

    static fromDAO(dao: Array<any>): User {
        return new User(
            dao[0] as string,
            dao[1] as string,
            dao[2] as string,
            dao[3] as string,
        );
    }

    static async build(email: string, password: string): Promise<User> {
        const salt = crypto.randomUUID();
        const key = User.buildHashKey(salt, password);
        const hash = await Bun.password.hash(key);

        return new User(
            crypto.randomUUID(),
            email,
            salt,
            hash,
        );
    }

    toDTO(): any {
        return {
            id: this.id,
            email: this.email,
        };
    }

    async login(password: string): Promise<boolean> {
        const key = User.buildHashKey(this.salt, password);

        return Bun.password.verify(key, this.passwordHash);
    }

    static buildHashKey(salt: string, password: string): string {
        return `${salt}${password}`;
    }
}