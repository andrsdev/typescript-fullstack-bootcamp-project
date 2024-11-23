import express, { Express } from 'express';
import { VariantController } from '../../controllers/variantController';

export function variantsRoute(app: Express): void {
  const router = express.Router();
  const variantController = new VariantController();

  // Prefijo de la ruta
  app.use('/api/variants', router);

  // Endpoints
  router.get('/', variantController.getAllVariants.bind(variantController)); // Listar todas las variantes
  router.get('/:id', variantController.getVariantById.bind(variantController)); // Obtener variante por ID
  router.post('/', variantController.createVariant.bind(variantController)); // Crear una variante
  router.put('/:id', variantController.updateVariant.bind(variantController)); // Actualizar variante por ID
  router.delete('/:id', variantController.deleteVariant.bind(variantController)); // Eliminar variante por ID
}
