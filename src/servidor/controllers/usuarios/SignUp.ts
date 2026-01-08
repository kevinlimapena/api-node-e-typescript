import type { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares/validation';
import { StatusCodes } from 'http-status-codes';
import { IUsuario } from '../../database/models';
import { Result } from 'pg';
import { UsuariosProvider } from '../../database/providers/usuarios';


export interface IBodyProps extends Omit<IUsuario, 'id'> { }



const bodySchema: yup.ObjectSchema<IBodyProps> = yup.object({

  nome: yup.string().required().min(3),
  email: yup.string().required().email().min(5),
  senha: yup.string().required().min(6),
});


export const signUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(bodySchema),

}));


export const signUp = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

  const result = await UsuariosProvider.create(req.body);
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