import type { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares/validation';
import { StatusCodes } from 'http-status-codes';
import { IUsuario } from '../../database/models';
import { Result } from 'pg';
import { UsuariosProvider } from '../../database/providers/usuarios';
import { json } from 'zod';
import { JWTService, PasswordCrypto } from '../../shared/services';


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

  const usuario = await UsuariosProvider.getByEmail(email);
  if (usuario instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json(
      {
        error: {
          default: 'Email ou Senha são Inválidos'
        }
      }
    );
  }
  const passwordMatch = await PasswordCrypto.verifyPassoword(senha, usuario.senha);
  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json(
      {
        error: {
          default: 'Email ou Senha são Inválidos'
        }
      }
    );

  } else {

    const accessToken = JWTService.sign({ uid: usuario.id })

    if (accessToken === 'JWT_SECRET_NOT_FOUND') {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
        {
          error: {
            default: 'Erro ao Gerar Token De Acesso'
          }
        }
      );
    }

    return res.status(StatusCodes.OK).json({ accessToken })
  }

  //console.log(req.body);
  // return res.status(StatusCodes.CREATED).json(result);
};