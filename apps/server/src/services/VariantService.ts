import { prisma } from '../lib/prismaClient';
import { Variant } from '../model/Variant';

export class VariantService {
  // Obtener todas las variantes
  async getAllVariants(): Promise<Variant[]> {
    return prisma.variant.findMany({
      include: {
        optionValues: true, // Incluye los valores de opción relacionados
      },
    });
  }

  // Obtener una variante por ID
  async getVariantById(id: number): Promise<Variant | null> {
    return prisma.variant.findUnique({
      where: { id },
      include: {
        optionValues: true,
      },
    });
  }

  // Crear una variante
  async createVariant(data: Omit<Variant, 'id' | 'createdAt' | 'updatedAt' | 'optionValues'>): Promise<Variant> {
    return prisma.variant.create({
      data,
    });
  }

  // Actualizar una variante por ID
  async updateVariant(id: number, data: Partial<Omit<Variant, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Variant> {
    const existingVariant = await prisma.variant.findUnique({ where: { id } });
    if (!existingVariant) {
      throw new Error('Variante no encontrada');
    }

    if (Object.keys(data).length === 0) {
      throw new Error('No se han proporcionado datos para actualizar');
    }

    return prisma.variant.update({
      where: { id },
      data,
    });
  }

  // Eliminar una variante por ID
  async deleteVariant(id: number): Promise<Variant> {
    return prisma.variant.delete({
      where: { id },
    });
  }
}
