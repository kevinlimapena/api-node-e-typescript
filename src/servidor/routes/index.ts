import { Router } from 'express';
import { CidadesController, PessoasController } from '../controllers/index';


const router = Router();

router.get('/', (_, res) => {
  res.send('Olá Dev');
});

router.get('/cidades', CidadesController.getAllValidation, CidadesController.getAll);
router.delete('/cidades/:id', CidadesController.deleteByIdValidation, CidadesController.deleteById);
router.post('/cidades', CidadesController.CreateValidation, CidadesController.create);
router.get('/cidades/:id', CidadesController.getByIdValidation, CidadesController.getById);
router.put('/cidades/:id', CidadesController.updateByIdValidation, CidadesController.updateById);



router.get('/pessoas', PessoasController.getAllValidation, PessoasController.getAll);
router.delete('/pessoas/:id', PessoasController.deleteByIdValidation, PessoasController.deleteById);
router.post('/pessoas', PessoasController.CreateValidation, PessoasController.create);
router.put('/pessoas/:id', PessoasController.updateByIdValidation, PessoasController.updateById);
router.get('/pessoas/:id', PessoasController.getByIdValidation, PessoasController.getById);





export { router };
