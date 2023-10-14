import { UserDB } from '../../db/schema';

export interface IUserDTO {
    id: string;
    email: string;
}

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

    static fromDAO(dao: UserDB): User {
        return new User(
            dao.id as string,
            dao.email as string,
            dao.salt as string,
            dao.passwordHash as string,
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

    toDTO(): IUserDTO {
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