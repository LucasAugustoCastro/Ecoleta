import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import multer from 'multer';
import multerConfig from '../config/multer';

import PointController from '../controllers/PointsController';

const itemsRouter = Router();
const upload = multer(multerConfig);
const pointController = new PointController();

itemsRouter.post(
  '/',
  upload.single('image'),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required(),
        items: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    },
  ),
  pointController.create,
);

itemsRouter.get('/', pointController.index);

itemsRouter.get('/:id', pointController.show);

export default itemsRouter;
