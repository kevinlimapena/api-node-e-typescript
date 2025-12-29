import { Router } from 'express';
import { CidadesController } from '../controllers/index.js';

const router = Router();

router.get('/', (_, res) => {
  res.send('Olá Dev');
});

router.get('/cidades', CidadesController.getAllValidation, CidadesController.getAll);
router.post('/cidades', CidadesController.CreateValidation, CidadesController.create);
router.get('/cidades/:id', CidadesController.getByIdValidation, CidadesController.getById);
router.put('/cidades/:id', CidadesController.updateByIdValidation, CidadesController.updateById);


export { router };
