import { prisma } from "../lib/PrismaClient";
import { Product } from "../model/Product";

export class ProductService {

    async getAllProducts(): Promise<Product[]> {
        const products = await prisma.product.findMany();
        return products.map((product) => ({
            name: product.name,
            description: product.description
        }))
    }

    async getProductById(id: number) {
        return prisma.product.findUnique({ where: { id } })
    }

    async createProduct(data: any) {
        return prisma.product.create({ data })
    }

    async updateProduct(id: number, data: any) {
        return prisma.product.update({ where: { id }, data });
    }

    async deleteProduct(id: number) {
        return prisma.product.delete({
            where: { id },
        });
    }
}