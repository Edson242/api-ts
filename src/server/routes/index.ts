import { Router } from 'express';
// import {StatusCodes } from 'http-status-codes';

import { CidadesController } from '../controllers/controller.config';


const router = Router();

router.get('/', (req, res) => {
  return res.send('Hello Dev!');
} );

router.post(
  '/cidades', 
  CidadesController.crateBodyValidator, 
  CidadesController.crateQueryValidator, 
  CidadesController.create);



export { router };
