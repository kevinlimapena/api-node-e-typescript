import { Router } from 'express';
import { CidadesController, PessoasController, UsuariosController } from '../controllers/index';
import { ensureAuthenticated } from '../shared/middlewares';


const router = Router();

router.get('/', (_, res) => {
  res.send('Olá Dev');
});

router.get('/cidades', ensureAuthenticated, CidadesController.getAllValidation, CidadesController.getAll);
router.delete('/cidades/:id', ensureAuthenticated, CidadesController.deleteByIdValidation, CidadesController.deleteById);
router.post('/cidades', ensureAuthenticated, CidadesController.CreateValidation, CidadesController.create);
router.get('/cidades/:id', ensureAuthenticated, CidadesController.getByIdValidation, CidadesController.getById);
router.put('/cidades/:id', ensureAuthenticated, CidadesController.updateByIdValidation, CidadesController.updateById);



router.get('/pessoas', ensureAuthenticated, PessoasController.getAllValidation, PessoasController.getAll);
router.delete('/pessoas/:id', ensureAuthenticated, PessoasController.deleteByIdValidation, PessoasController.deleteById);
router.post('/pessoas', ensureAuthenticated, PessoasController.CreateValidation, PessoasController.create);
router.put('/pessoas/:id', ensureAuthenticated, PessoasController.updateByIdValidation, PessoasController.updateById);
router.get('/pessoas/:id', ensureAuthenticated, PessoasController.getByIdValidation, PessoasController.getById);

router.post('/entrar', UsuariosController.signInValidation, UsuariosController.signIn);
router.post('/cadastrar', UsuariosController.signUpValidation, UsuariosController.signUp);





export { router };
