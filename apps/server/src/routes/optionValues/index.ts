import express, { Express } from 'express';
import { OptionValueController } from '../../controllers/optionValueController';

export function optionValuesRoute(app: Express): void {
  const router = express.Router();
  const optionValueController = new OptionValueController();

  // Prefijo de la ruta
  app.use('/api/option-values', router);

  // Endpoints
  router.get('/', optionValueController.getAllOptionValues.bind(optionValueController)); // Listar todos los valores de opción
  router.get('/:id', optionValueController.getOptionValueById.bind(optionValueController)); // Obtener valor de opción por ID
  router.post('/', optionValueController.createOptionValue.bind(optionValueController)); // Crear un valor de opción
  router.put('/:id', optionValueController.updateOptionValue.bind(optionValueController)); // Actualizar valor de opción por ID
  router.delete('/:id', optionValueController.deleteOptionValue.bind(optionValueController)); // Eliminar valor de opción por ID
}
