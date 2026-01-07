import type { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares/validation';
import { StatusCodes } from 'http-status-codes';
import { IPessoa } from '../../database/models';
import { Result } from 'pg';
import { PessoasProvider } from '../../database/providers/pessoas';


export interface IBodyProps extends Omit<IPessoa, 'id'> { }



const bodySchema: yup.ObjectSchema<IBodyProps> = yup.object({

  email: yup.string().required().email(),
  cidadeId: yup.number().integer().required(),
  nomeCompleto: yup.string().required().min(3),
});


export const CreateValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(bodySchema),

}));


export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

  const result = await PessoasProvider.create(req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      {
        error: {
          default: result.message
        }
      }
    );
  }

  console.log(req.body);
  return res.status(StatusCodes.CREATED).json(result);
};