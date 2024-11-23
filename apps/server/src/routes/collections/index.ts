import express, { Express } from 'express';
import { CollectionController } from '../../controllers/collectionController';

export function collectionsRoute(app: Express): void {
  const router = express.Router();
  const collectionController = new CollectionController();

  // Prefijo de la ruta
  app.use('/api/collections', router);

  // Endpoints
  router.get('/', collectionController.getAllCollections.bind(collectionController)); // Listar todas las colecciones
  router.get('/:id', collectionController.getCollectionById.bind(collectionController)); // Obtener colección por ID
  router.post('/', collectionController.createCollection.bind(collectionController)); // Crear una colección
  router.put('/:id', collectionController.updateCollection.bind(collectionController)); // Actualizar colección por ID
  router.delete('/:id', collectionController.deleteCollection.bind(collectionController)); // Eliminar colección por ID
}
