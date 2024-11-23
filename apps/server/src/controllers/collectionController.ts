import { Request, Response } from 'express';
import { CollectionService } from '../services/CollectionService';

export class CollectionController {
  private collectionService: CollectionService;

  constructor() {
    this.collectionService = new CollectionService();
  }

  async getAllCollections(req: Request, res: Response): Promise<void> {
    try {
      const collections = await this.collectionService.getAllCollections();
      res.json(collections);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las colecciones', error });
    }
  }

  async getCollectionById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const collection = await this.collectionService.getCollectionById(Number(id));

      if (!collection) {
        res.status(404).json({ message: 'Colección no encontrada' });
        return;
      }

      res.json(collection);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la colección', error });
    }
  }

  async createCollection(req: Request, res: Response): Promise<void> {
    try {
      const collectionData = req.body;
      const newCollection = await this.collectionService.createCollection(collectionData);
      res.status(201).json(newCollection);
    } catch (error) {
      res.status(400).json({ message: 'Error al crear la colección', error });
    }
  }

  async updateCollection(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const collectionData = req.body;

      const updatedCollection = await this.collectionService.updateCollection(Number(id), collectionData);
      res.json(updatedCollection);
    } catch (error) {
      res.status(400).json({ message: 'Error al actualizar la colección', error });
    }
  }

  async deleteCollection(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.collectionService.deleteCollection(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la colección', error });
    }
  }
}
