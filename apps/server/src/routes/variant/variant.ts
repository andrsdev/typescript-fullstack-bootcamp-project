import express, { Express } from 'express'
import { prisma } from '../../lib/prismaClient';

export function variantRouter(app: Express): void {
    const router = express.Router();
    app.use('/api/variant', router);

    router.get('/', async (req, res, next) => {
        try {
            const variants = await prisma.variant.findMany({
                include: { product: true },
            });
            res.status(200).json(variants);
        } catch (error) {
            next({ statusCode: 500, message: 'Error fetching variants'});
        }
    });

    router.get('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const variant = await prisma.variant.findUnique({
                where: { id: Number(id) },
                include: { product: true },
            });
            if (!variant) {
                return next({ statusCode: 404, message: 'variants not found'});
            }
            res.status(200).json(variant);
        } catch (error) {
            next({ statusCode: 500, message: 'Error fetching variant'});
        }
    });

    router.post('/', async (req, res, next) => {
        try {
            const { productId, name, price, sku, stockQuantity } = req.body;
            const newVariant = await prisma.variant.create({
                data: { productId, name, price, sku, stockQuantity },
            });
            res.status(201).json(newVariant);
        } catch (error) {
            next({ statusCode: 500, message: 'Error saving variant'});
        }
    });

    router.put('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name, price, sku, stockQuantity } = req.body;
            const updatedVariant = await prisma.variant.update({
                where: { id: Number(id) },
                data: { name, price, sku, stockQuantity },
            });
            res.status(200).json(updatedVariant);
        } catch (error) {
            next({ statusCode: 500, message: 'Error updating variant'});
        }
    });

    router.delete('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            await prisma.variant.delete({
                where: { id: Number(id) },
            });
            res.status(204).json({ message: 'Variant deleted' });
        } catch (error) {
            next({ statusCode: 500, message: 'Error deleting variant'});
        }
    });

}