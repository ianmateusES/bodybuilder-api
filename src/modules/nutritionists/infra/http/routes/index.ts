import { Router } from 'express';

import { nutritionistsProfileRouter } from './nutritionists.profile.routes';
import { nutritionistsRoutes } from './nutritionists.routes';

// http://localhost:3333/nutritionists
const NutritionistRoutes = Router();

NutritionistRoutes.use('/profile', nutritionistsProfileRouter);
NutritionistRoutes.use('/list', nutritionistsRoutes);

export { NutritionistRoutes };
