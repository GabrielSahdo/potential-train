import DatabaseFactory from './src/db/databaseFactory.ts';
import UsersService from './src/users/users.service.ts';

const port: number = Number(process.env.PORT) || 3000;
const hostname = process.env.HOSTNAME || 'localhost';

const db = DatabaseFactory.create({}, true);

const usersService = new UsersService(db);

Bun.serve({
    port,
    hostname,
    async fetch(req) {
        const url = new URL(req.url);

        if (url.pathname === '/user') {
            switch (req.method) {
                case 'GET':
                    return new Response('GET user');

                case 'POST':
                    const { email, password } = await req.json();

                    try {
                        const userId = await usersService.create(
                            email,
                            password,
                        );

                        return new Response(userId);
                    } catch (error: any) {
                        return new Response(error.message, {
                            status: 400,
                        });
                    }
            }
        }

        if (url.pathname === '/login') {
            switch (req.method) {
                case 'POST':
                    const { email, password } = await req.json();

                    try {
                        const user = await usersService.login(
                            email,
                            password,
                        );

                        return new Response(user.id);
                    } catch (error: any) {
                        return new Response(error.message, {
                            status: 400,
                        });
                    }
            }
        }

        throw new Error('Not found');
    },
});