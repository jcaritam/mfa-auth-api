import  express from 'express';
import { Server } from './server';
import { env } from '../src/infrastructure/config/envs';
import { setupMiddlewares } from './infrastructure/middlewares/middleware';
import { setupRoutes } from './interfaces/http/routes';

const server = new Server(env.PORT)

server.start();
