import * as deleteById from './DeleteById.js';
import * as updateById from './UpdateById.js';
import * as getById from './GetById.js';
import * as create from './Create.js';
import * as getAll from './GetAll.js';


export const CidadesController = {
  ...deleteById,
  ...updateById,
  ...getById,
  ...create,
  ...getAll,
};