import type { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shered/middlewares/validation.js';

export interface ICidade {
  nome: string;
  estado: string;
}

interface Filter {
  filter?: string;

}

const bodySchema: yup.ObjectSchema<ICidade> = yup.object({
  nome: yup.string().required().min(3),
  estado: yup.string().required().min(3),
});

const querySchema: yup.ObjectSchema<Filter> = yup.object({
  filter: yup.string().required().min(3),
});


export const CreateValidation = validation((getSchema) => ({
  body: getSchema<ICidade>(bodySchema),
  query: getSchema<Filter>(querySchema),
}));



export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  console.log(req.body);
  return res.send('Create!');
};