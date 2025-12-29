import request from "supertest";
import { server } from "../src/servidor/servidores";

export const testServer = request(server);

