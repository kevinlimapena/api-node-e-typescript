import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { PessoasProvider } from '../../database/providers/pessoas';

import { validation } from '../../shared/middlewares';

// Interface mais flexível
export interface IQueryProps {

  page?: number;
  limit?: number;
  filter?: string;
}

const querySchema: yup.ObjectSchema<IQueryProps> = yup.object().shape({

  page: yup.number().optional().moreThan(0).default(1),
  limit: yup.number().optional().default(7),
  filter: yup.string().optional().default(''),
});

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(querySchema),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  // Valores com fallback
  const page = req.query.page ?? 1;
  const limit = req.query.limit ?? 7;
  const filter = req.query.filter ?? '';


  const result = await PessoasProvider.getAll(page, limit, filter);
  const count = await PessoasProvider.count(filter);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message }
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: count.message }
    });
  }

  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', count);

  return res.status(StatusCodes.OK).json(result);
};