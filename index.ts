import DatabaseFactory from './src/db/databaseFactory.ts';

const port: number = Number(process.env.PORT) || 3000;
const hostname = process.env.HOSTNAME || 'localhost';

const db = DatabaseFactory.create({}, true);

Bun.serve({
    port,
    hostname,
    fetch(req) {
        const url = new URL(req.url);

        if (url.pathname === '/') return new Response('Home page!!');

        if (url.pathname === '/about') return new Response('About page!!');

        throw new Error('Not found');
    },
})