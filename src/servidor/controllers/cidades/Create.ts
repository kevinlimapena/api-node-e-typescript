import type { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares/validation';
import { StatusCodes } from 'http-status-codes';
import { ICidade } from '../../database/models';


export interface IBodyProps extends Omit<ICidade, 'id'> { }

interface Filter {
  filter?: string;
}

const bodySchema: yup.ObjectSchema<IBodyProps> = yup.object({
  nome: yup.string().required().min(3),
});
const querySchema: yup.ObjectSchema<Filter> = yup.object({
  filter: yup.string().required().min(3),
});

export const CreateValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(bodySchema),

}));


export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {



  console.log(req.body);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado!');
};