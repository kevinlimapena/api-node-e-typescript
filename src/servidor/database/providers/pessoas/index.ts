import * as deleteById from './DeleteById';
import * as updateById from './UpdateById';
import * as getById from './GetbyId';
import * as create from './Create';
import * as getAll from './GetAll';
import * as count from './count';

export const PessoasProvider = {
  ...deleteById,
  ...updateById,
  ...getById,
  ...create,
  ...getAll,
  ...count
};