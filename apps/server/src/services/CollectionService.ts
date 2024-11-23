import { prisma } from '../lib/prismaClient';
import { Collection } from '../model/Collection';

export class CollectionService {
  // Obtener todas las colecciones
  async getAllCollections(): Promise<Collection[]> {
    return prisma.collection.findMany({
      include: {
        products: { include: { product: true } },
      },
    });
  }

  // Obtener una colección por ID
  async getCollectionById(id: number): Promise<Collection | null> {
    return prisma.collection.findUnique({
      where: { id },
      include: {
        products: { include: { product: true } },
      },
    });
  }

  // Crear una colección
  async createCollection(data: Omit<Collection, 'id' | 'createdAt' | 'updatedAt' | 'products'>): Promise<Collection> {
    return prisma.collection.create({
      data,
    });
  }

  // Actualizar una colección por ID
  async updateCollection(id: number, data: Partial<Omit<Collection, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Collection> {
    const existingCollection = await prisma.collection.findUnique({ where: { id } });
    if (!existingCollection) {
      throw new Error('Colección no encontrada');
    }

    if (Object.keys(data).length === 0) {
      throw new Error('No se han proporcionado datos para actualizar');
    }

    return prisma.collection.update({
      where: { id },
      data,
    });
  }

  // Eliminar una colección por ID
  async deleteCollection(id: number): Promise<Collection> {
    return prisma.collection.delete({
      where: { id },
    });
  }
}
