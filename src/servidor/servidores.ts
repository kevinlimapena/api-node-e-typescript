import express from 'express';
import 'dotenv/config'

import './shered/services/translateZod.js';

import { router } from './routes/index.js';

const server = express();

server.use(express.json());
server.use(router);

export { server };
