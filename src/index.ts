import { server } from "./servidor/servidores";
import { con } from "./servidor/shared/envs/conexion"
con.connect()
  .then(() => console.log("PostgreSQL conectado"))
  .catch(err => console.error("Erro ao conectar:", err));


server.listen(process.env.PORT, () => {
  console.log(`App rodando na porta ${process.env.PORT}`);
});
