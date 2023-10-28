import DatabaseFactory from './src/db/databaseFactory.ts';
import UsersService from './src/components/users/user.service.ts';
import { UserDAO } from './src/components/users/user.dao.ts';
import { ServerFactory } from './src/server.ts';

const port: number = Number(process.env.PORT) || 3000;
const hostname = process.env.HOSTNAME || '0.0.0.0';

const db = DatabaseFactory.create({}, true);
const userDao = new UserDAO(db);
const usersService = new UsersService(userDao);

ServerFactory.create(port, hostname, usersService);