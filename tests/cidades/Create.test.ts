import { testServer } from "../jest.setup";




describe('Cidades - Create', () => {


  it('Cria Registro', async () => {
    testServer.post('/cidades').send({
      nome: 'Caixas do Sul'
    });

    expect('a').toEqual('b')
  });

});