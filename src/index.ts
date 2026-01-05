import { Knex } from "./servidor/database/knex";
import { server } from "./servidor/servidores";
import { con } from "./servidor/shared/envs/conexion"
// con.connect()
//   .then(() => console.log("PostgreSQL conectado"))
//   .catch(err => console.error("Erro ao conectar:", err));

const startServer = () => {

  server.listen(process.env.PORT, () => {
    console.log(`App rodando na porta ${process.env.PORT}`);
  });

}

if (process.env.IS_LOCALHOST !== 'true') {

  Knex.migrate.latest()
    .then(() => {
      Knex.seed.run().then(() => startServer())
        .catch(console.log);
    })
    .catch(console.log);
} else {
  startServer();
}
