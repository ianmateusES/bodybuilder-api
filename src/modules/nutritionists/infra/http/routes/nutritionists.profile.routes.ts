import { Router } from 'express';

import { DeleteNutritionistController } from '../../../useCases/deleteNutritionist/DeleteNutritionistController';
import { ShowProfileNutritionistController } from '../../../useCases/showProfileNutritionist/ShowProfileNutritionistController';
import { UpdateNutritionistController } from '../../../useCases/updateNutritionist/UpdateNutritionistController';
import {
  putNutritionistValidation,
  deleteNutritionistValidation,
} from '../validations/validationsNutritionistsRoutes';

// http://localhost:3333/nutritionists/profile
const nutritionistsProfileRouter = Router();
const showProfileNutritionistController =
  new ShowProfileNutritionistController();
const updateNutritionistController = new UpdateNutritionistController();
const deleteNutritionistController = new DeleteNutritionistController();

nutritionistsProfileRouter.get('/', showProfileNutritionistController.handle);

nutritionistsProfileRouter.put(
  '/',
  putNutritionistValidation,
  updateNutritionistController.handle,
);

nutritionistsProfileRouter.delete(
  '/',
  deleteNutritionistValidation,
  deleteNutritionistController.handle,
);

export { nutritionistsProfileRouter };
