import { Router } from 'express';

import { ListNutritionistController } from '../../../useCases/listNutritionist/ListNutritionistController';

// http://localhost:3333/nutritionists
const nutritionistsRoutes = Router();
const listNutritionistController = new ListNutritionistController();

nutritionistsRoutes.get('/', listNutritionistController.handle);

export { nutritionistsRoutes };
