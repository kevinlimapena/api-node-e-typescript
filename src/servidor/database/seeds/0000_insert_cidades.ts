import { Knex } from 'knex';
import { ETableNames } from "../ETableNames";

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.cidade).count<[{ count: number }]>('* as count') as [{ count: number }];
  if (!Number.isInteger(count) || Number(count) > 0) return;

  const cidadesToInsert = cidadesDoRioGrandeDoSul.map(nomeDaCidade => ({ nome: nomeDaCidade }));
  await knex(ETableNames.cidade).insert(cidadesToInsert);
};

const cidadesDoRioGrandeDoSul = [
  'Victor Graeff',
  'Vila Flores',
  'Vila Lângaro',
  'Vila Maria',
  'Vila Nova do Sul',
  'Vista Alegre',
  'Vista Alegre do Prata',
  'Vista Gaúcha',
  'Vitória das Missões',
  'Westfália',
  'Xangri-lá'
];