import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";


export async function up(knex: Knex): Promise<void> {

  return knex
    .schema
    .createTable(ETableNames.cidade, table => {
      table.bigIncrements('id').primary().index();


      table.string('nome', 150).checkLength('<=', 150).index().notNullable();

      table.comment('Tabela Usada para armazenar cidades do sistema.')
    })
    .then(() => {
      console.log(`# Created Table ${ETableNames.cidade}`)
    })
}


export async function down(knex: Knex): Promise<void> {

  return knex
    .schema
    .dropTable(ETableNames.cidade)
    .then(() => {
      console.log(`# Dropped Table ${ETableNames.cidade}`)
    });
}

