import express, { Express } from "express";
import { setupMiddlewares } from "./infrastructure/middlewares/middleware";
import { setupRoutes } from "./interfaces/http/routes";

export class Server {

  private readonly app: Express

  constructor(private readonly port: number) {
    this.app = express();
  }

  start() {

    setupMiddlewares(this.app);
    setupRoutes(this.app);

    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
  
}