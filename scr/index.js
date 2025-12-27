import { server } from "./servidor/servico.js";

server.listen(3333, () => {
  console.log('App rodando na porta 3333');
});
