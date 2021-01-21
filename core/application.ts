/**
 * Date     05 December 2020
 * Time     21:31
 * Author   Trian Damai
 * */

import { app, appRouter, bodyparser, cors, dotenv } from ".";

dotenv.config();
const port = process.env.PORT || 4000;

class App {
  app: app.Application = app();
  constructor() {
    const corsOptions: cors.CorsOptions = {
      allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "COntent-Type",
        "Accept",
        "X-Access-Token",
      ],
      credentials: false,
      methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
      origin: "http://localhost:8080",
    };
    this.app.use(cors(corsOptions));
    this.app.use(bodyparser.json({ limit: "50mb" }));
    this.app.use(bodyparser.urlencoded({ extended: true, limit: "50mb" }));
    // this.app.use();
    this.app.use(appRouter);
  }
  public setHeader() {}
  public run() {
    this.app.listen(port, () => {
      this.log(`running at http://localhost:${port}`);
    });
    this.app.on("error", () => {
      this.log(`run err`);
    });
  }
  public log(str) {
    if (process.env.MODE == "dev") {
      console.log(`[DEV]`, str);
    } else if (process.env.MODE == "prod") {
      console.log(`[PRODUCTION]`);
    } else {
      console.log(`[DEV]`, str);
    }
  }
}

export default new App();
