import UsersService from "./components/users/user.service";

export class ServerFactory {
    static create = (port: number, hostname: string, usersService: UsersService) =>
        Bun.serve({
            port,
            hostname,
            async fetch(req) {
                const url = new URL(req.url);

                if (url.pathname === '/user/login' && req.method === 'POST') {
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

                if (url.pathname === '/user' && req.method === 'POST') {
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

                throw new Error('Url path not found');
            },
            error(error) {
                return new Response(JSON.stringify({
                    message: error.message
                }), {
                    status: 500,
                });
            }
        });
}