import express, { Express } from 'express';
import { OptionController } from '../../controllers/optionController';

export function optionsRoute(app: Express): void {
  const router = express.Router();
  const optionController = new OptionController();

  // Prefijo de la ruta
  app.use('/api/options', router);

  // Endpoints
  router.get('/', optionController.getAllOptions.bind(optionController)); // Listar todas las opciones
  router.get('/:id', optionController.getOptionById.bind(optionController)); // Obtener opción por ID
  router.post('/', optionController.createOption.bind(optionController)); // Crear una opción
  router.put('/:id', optionController.updateOption.bind(optionController)); // Actualizar opción por ID
  router.delete('/:id', optionController.deleteOption.bind(optionController)); // Eliminar opción por ID
}
