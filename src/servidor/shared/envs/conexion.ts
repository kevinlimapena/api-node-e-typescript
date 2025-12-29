import { Client } from "pg";
const port = Number(process.env.port)

export const con = new Client({
  host: process.env.Host,
  user: process.env.user,
  port: 5432,
  password: process.env.password,
  database: process.env.database
});