import { prisma } from '../lib/prismaClient';
import { OptionValueToVariant } from '../model/OptionValueToVariant';

export class OptionValueToVariantService {
  // Obtener todas las relaciones
  async getAllOptionValueToVariants(): Promise<OptionValueToVariant[]> {
    return prisma.optionValueToVariant.findMany({
      include: {
        variant: true,
        optionValue: true,
      },
    });
  }

  // Crear una relación
  async createOptionValueToVariant(data: OptionValueToVariant): Promise<OptionValueToVariant> {
    return prisma.optionValueToVariant.create({
      data,
    });
  }
}
