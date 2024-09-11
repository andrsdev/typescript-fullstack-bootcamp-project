import express,  { Express } from "express";
import { prisma } from "../../lib/prismaClient";
import { ProductsService } from "../../services/ProductsService";


export function productsRoute (app: Express):void {
    const router = express.Router();
    const service = new ProductsService();

    app.use('/app/products', router);

    // Get all products or search for products by name
    router.get('/', async function (req, res, next) {
        try {
            const search = req.query.search as string | undefined; // Extraemos el parámetro de búsqueda si existe
            let result;

            if (search) {
                // Si hay un término de búsqueda, filtramos por nombre
                result = await prisma.product.findMany({
                    where: {
                        name: {
                            contains: search,
                            mode: 'insensitive', // Búsqueda insensible a mayúsculas/minúsculas
                        },
                    },
                    include: {
                        variants: true,
                        collections: true,
                    },
                });
            } else {
                // Si no hay búsqueda, devolvemos todos los productos
                result = await service.getProducts();
            }

            return res.json({ result });
        } catch (e) {
            console.error(`Error Getting Products: ${e}`);
            return res.status(500).json({ error: 'Error fetching products' });
        }
    });

    // Gets a single product by ID
    router.get('/:id', async function (req, res, next) {
        try {
            const productId = parseInt(req.params.id);
            const result = await service.getProductById(productId);
            
            if (!result) {
                return res.status(404).json({ error: 'Product not found' });
            }

            return res.json({ result });
        } catch (e) {
            console.error(`Error fetching product by ID: ${e}`);
            return res.status(500).json({ error: 'Server error' });
        }
    });

    // Delete a product
    router.delete('/:id', async function (req, res, next) {
        try {
            const productId = parseInt(req.params.id);
            await service.deleteProduct(productId);
            return res.status(204).send();
        } catch (e) {
            console.error(`Error deleting product ${e}`);
        }
    });

    // Update an existing product
    router.put('/:id', async function (req, res, next) {
        try {
            const productId = parseInt(req.params.id);
            const productData = req.body;
            const result = await service.updateProduct(productId, productData);
            return res.json({ result });
        } catch (e) {
            console.error(`Error Updating product ${e}`);
        }
    });

    // Create a new product
    router.post('/', async function (req, res, next) {
        try {
            const productData = req.body;
            const result = await service.createProduct(productData);
            return res.status(201).json({ result });
        } catch (e) {
            console.error(`Error Creating product ${e}`);
        }
    });

}

