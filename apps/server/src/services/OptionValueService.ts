import { prisma } from '../lib/prismaClient';
import { OptionValue } from '../model/OptionValue';

export class OptionValueService {
  // Obtener todos los valores de opción
  async getAllOptionValues(): Promise<OptionValue[]> {
    return prisma.optionValue.findMany({
      include: {
        option: true // Incluye la opción relacionada// Incluye las relaciones con variantes
      },
    });
  }

  // Obtener un valor de opción por ID
  async getOptionValueById(id: number): Promise<OptionValue | null> {
    return prisma.optionValue.findUnique({
      where: { id },
      include: {
        option: true
      },
    });
  }

  // Crear un valor de opción
  async createOptionValue(data: Omit<OptionValue, 'id'>): Promise<OptionValue> {
    return prisma.optionValue.create({
      data,
    });
  }

  // Actualizar un valor de opción por ID
  async updateOptionValue(id: number, data: Partial<Omit<OptionValue, 'id'>>): Promise<OptionValue> {
    const existingOptionValue = await prisma.optionValue.findUnique({ where: { id } });
    if (!existingOptionValue) {
      throw new Error('Valor de opción no encontrado');
    }

    if (Object.keys(data).length === 0) {
      throw new Error('No se han proporcionado datos para actualizar');
    }

    return prisma.optionValue.update({
      where: { id },
      data,
    });
  }

  // Eliminar un valor de opción por ID
  async deleteOptionValue(id: number): Promise<OptionValue> {
    return prisma.optionValue.delete({
      where: { id },
    });
  }
}
