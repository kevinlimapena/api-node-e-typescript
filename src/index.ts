import { server } from "./servidor/servidores.js";




server.listen(process.env.PORT, () => {
  console.log(`App rodando na porta ${process.env.PORT}`);
});
