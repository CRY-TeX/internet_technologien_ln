import App from './app/app';

/**
 * Main entry point
 */

const host: string = 'localhost' || process.env.HOST;
const port: number = 3000 || process.env.PORT;

const app: App = new App(host, port);
app.start();
