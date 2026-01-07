import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const count = async (filter = ''): Promise<number | Error> => {
  try {
    const result = await Knex(ETableNames.pessoa)
      .where('nomeCompleto', 'like', `%${filter}%`)
      .count<{ count: number }>('* as count')
      .first(); // Usa first() para pegar apenas um resultado

    if (!result || result.count === undefined) {
      return new Error('Erro ao consultar a quantidade total de registros');
    }

    const countValue = Number(result.count);

    if (Number.isInteger(countValue)) return countValue;

    return new Error('Erro ao consultar a quantidade total de registros');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar a quantidade total de registros');
  }
};