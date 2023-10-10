import DatabaseFactory from "./src/db/databaseFactory";
import { users } from "./src/db/schema";

const db = DatabaseFactory.create({}, true);

const usersDB = db.select().from(users);

console.log(usersDB.values());