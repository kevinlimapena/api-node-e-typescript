import { Knex } from 'knex';
import { ETableNames } from '../../ETableNames';

export async function up(knex: Knex) {
  const hasTable = await knex.schema.hasTable(ETableNames.usuario);

  if (!hasTable) {
    return knex
      .schema
      .createTable(ETableNames.usuario, table => {
        table.bigIncrements('id').primary().index();
        table.string('nome').index().notNullable().checkLength('>', 3);
        table.string('senha').unique().notNullable().checkLength('>', 6);
        table.string('email').unique().notNullable().checkLength('>', 5);


        table.comment('Tabela usada para armazenar usuarios do sistema.');
      })
      .then(() => {
        console.log(`# Created table ${ETableNames.usuario}`);
      });
  } else {
    console.log(`# Table ${ETableNames.usuario} already exists, skipping...`);
  }
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTableIfExists(ETableNames.usuario)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.usuario}`);
    });
}