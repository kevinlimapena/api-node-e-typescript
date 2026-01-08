import type { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares/validation';
import { StatusCodes } from 'http-status-codes';
import { IUsuario } from '../../database/models';
import { Result } from 'pg';
import { UsuariosProvider } from '../../database/providers/usuarios';
import { json } from 'zod';


export interface IBodyProps extends Omit<IUsuario, 'id' | 'nome'> { }



const bodySchema: yup.ObjectSchema<IBodyProps> = yup.object({


  email: yup.string().required().email().min(5),
  senha: yup.string().required().min(6),
});


export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(bodySchema),

}));


export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {


  const { email, senha } = req.body;

  const result = await UsuariosProvider.getByEmail(email);
  if (result instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json(
      {
        error: {
          default: 'Email ou Senha são Inválidos'
        }
      }
    );
  }

  if (senha !== result.senha) {
    return res.status(StatusCodes.UNAUTHORIZED).json(
      {
        error: {
          default: 'Email ou Senha são Inválidos'
        }
      }
    );

  } else {
    return res.status(StatusCodes.OK).json({ accessToken: 'teste.teste.tes' })
  }

  //console.log(req.body);
  // return res.status(StatusCodes.CREATED).json(result);
};