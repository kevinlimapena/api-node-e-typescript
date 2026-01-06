import { Knex } from 'knex';
import { ETableNames } from '../../ETableNames';

export async function up(knex: Knex) {
  const hasTable = await knex.schema.hasTable(ETableNames.pessoa);

  if (!hasTable) {
    return knex
      .schema
      .createTable(ETableNames.pessoa, table => {
        table.bigIncrements('id').primary().index();
        table.string('nomeCompleto').index().notNullable();
        table.string('email').unique().notNullable();

        table
          .bigInteger('cidadeId')
          .index()
          .notNullable()
          .references('id')
          .inTable(ETableNames.cidade)
          .onUpdate('CASCADE')
          .onDelete('RESTRICT');

        table.comment('Tabela usada para armazenar pessoas do sistema.');
      })
      .then(() => {
        console.log(`# Created table ${ETableNames.pessoa}`);
      });
  } else {
    console.log(`# Table ${ETableNames.pessoa} already exists, skipping...`);
  }
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTableIfExists(ETableNames.pessoa)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.pessoa}`);
    });
}