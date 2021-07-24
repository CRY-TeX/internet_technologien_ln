import App from './app/app';

const host: string = 'localhost' || process.env.HOST;
const port: number = 3000 || process.env.PORT;
const debug: boolean = false;

const app: App = new App(host, port, debug);
app.start();
