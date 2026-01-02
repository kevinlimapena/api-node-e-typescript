import supertest from 'supertest';
import { server } from "../src/servidor/servidores";
import { Knex } from "../src/servidor/database/knex";


beforeAll(async () => {
  await Knex.migrate.latest();
});

afterAll(async () => {
  await Knex.destroy();
});


export const testServer = supertest(server);