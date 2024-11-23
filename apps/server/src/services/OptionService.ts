import { prisma } from '../lib/prismaClient';
import { Option } from '../model/Option';

export class OptionService {
  // Obtener todas las opciones
  async getAllOptions(): Promise<Option[]> {
    return prisma.option.findMany({
      include: {
        values: true, // Incluye los valores relacionados
      },
    });
  }

  // Obtener una opción por ID
  async getOptionById(id: number): Promise<Option | null> {
    return prisma.option.findUnique({
      where: { id },
      include: {
        values: true,
      },
    });
  }

  // Crear una opción
  async createOption(data: Omit<Option, 'id' | 'createdAt' | 'updatedAt' | 'values'>): Promise<Option> {
    return prisma.option.create({
      data,
    });
  }

  // Actualizar una opción por ID
  async updateOption(id: number, data: Partial<Omit<Option, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Option> {
    const existingOption = await prisma.option.findUnique({ where: { id } });
    if (!existingOption) {
      throw new Error('Opción no encontrada');
    }

    if (Object.keys(data).length === 0) {
      throw new Error('No se han proporcionado datos para actualizar');
    }

    return prisma.option.update({
      where: { id },
      data,
    });
  }

  // Eliminar una opción por ID
  async deleteOption(id: number): Promise<Option> {
    return prisma.option.delete({
      where: { id },
    });
  }
}
