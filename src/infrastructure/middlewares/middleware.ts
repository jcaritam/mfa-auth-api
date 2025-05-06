import express, { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

export function setupMiddlewares(app: Express): void {
  app.use(helmet());
  app.use(morgan('dev'));
  app.use(express.json());
}
