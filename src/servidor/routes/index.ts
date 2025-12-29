import { Router } from 'express';
import { CidadesController } from '../controllers/index.js';

const router = Router();

router.get('/', (_, res) => {
  res.send('Olá Dev');
});

router.post('/cidades',
  CidadesController.CreateValidation,
  CidadesController.create);

export { router };
