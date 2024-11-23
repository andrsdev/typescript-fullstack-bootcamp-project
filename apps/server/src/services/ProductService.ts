import { prisma } from '../lib/prismaClient';
import { Product } from '../model/Product';

export class ProductService {
  // Obtener todos los productos, incluyendo relaciones opcionales
  async getAllProducts(): Promise<Product[]> {
    return prisma.product.findMany({
      include: {
        variants: true, // Incluye variantes
        options: true, // Incluye opciones
        collections: { include: { collection: true } }, // Incluye colecciones relacionadas
      },
    });
  }

  // Obtener un producto por ID, incluyendo relaciones opcionales
  async getProductById(id: number): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { id },
      include: {
        variants: true,
        options: true,
        collections: { include: { collection: true } },
      },
    });
  }

  // Crear un producto
  async createProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'variants' | 'options' | 'collections'>): Promise<Product> {
    return prisma.product.create({
      data,
    });
  }

  // Actualizar un producto por ID
  async updateProduct(id: number, data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Product> {
    // Verificar si el producto existe antes de actualizar
    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) {
      throw new Error('Producto no encontrado');
    }

    // Validar que data no esté vacío
    if (Object.keys(data).length === 0) {
      throw new Error('No se han proporcionado datos para actualizar');
    }

    // Actualizar el producto
    return prisma.product.update({
      where: { id },
      data,
    });
  }



  // Eliminar un producto por ID
  async deleteProduct(id: number): Promise<Product> {
    return prisma.product.delete({
      where: { id },
    });
  }
}
