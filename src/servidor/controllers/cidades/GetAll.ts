import type { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shered/middlewares/validation.js';
import { StatusCodes } from 'http-status-codes';

export interface IQueryProps {
  page: number;
  filter?: string;
  limit?: number | undefined;
}

const querySchema: yup.ObjectSchema<IQueryProps> = yup.object().shape({
  page: yup.number().required().moreThan(0),
  limit: yup.number().optional(),
  filter: yup.string().required(),
});

export const getAllValidation = validation((getSchema) => ({

  query: getSchema<IQueryProps>(querySchema),
}));


export const getAll = async (req: Request<{}, IQueryProps, {}/*, IQueryProps */>, res: Response) => {
  console.log(req.query);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado!');
};