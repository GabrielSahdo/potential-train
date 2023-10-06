import Database from 'bun:sqlite';
import { drizzle } from 'drizzle-orm/bun-sqlite';
import { migrate } from 'drizzle-orm/bun-sqlite/migrator';

export default class DatabaseFactory {
    static create(config: any, migrateOnInit = false) {
        const databaseDriver = new Database('sqlite.db');
        const db = drizzle(databaseDriver);

        if (migrateOnInit)
            migrate(db, { migrationsFolder: './drizzle' });

        return db;
    }
}