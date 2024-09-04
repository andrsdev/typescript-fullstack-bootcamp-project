import express, {Express} from 'express'
import { bookServices } from '../../services/bookServices'
import { prisma } from '../../lib/prismaClient'

export function bookRoute(app: Express): void {
    const router = express.Router()
    const service = new bookServices()
    
    app.use('/api/book', router)

    router.get('/', async function (_req, res, next) {
        try{
          const result = await service.getBook()
        return res.json({ result })
         } catch (e){
            next(e)
        }
    })
    router.post('/', async (req, res) => {
        const {isbn, title,publicationDate, pageCount, language,author } = req.body;
        try {
          const newBook = await prisma.book.create({
            data: {
                isbn,
                title,
                publicationDate,
                pageCount,
                language,
                author: { connect: { id: 1 } }
            },
          });
          res.status(201).json(newBook);
        } catch (error) {
          res.status(500).json({ error: 'Failed to create product' });
        }
      });
      router.put('/:id', async (req, res) => {
        const { id } = req.params;
        const {isbn, title,publicationDate, pageCount, language,author } = req.body;
        try {
          const updatedBook = await prisma.book.update({
            where: { id: parseInt(id) },
            data: {
                isbn,
                title,
                publicationDate,
                pageCount,
                language,
                author: { connect: { id: 1 } }
            },
          });
          res.json(updatedBook);
        } catch (error) {
          res.status(500).json({ error: 'Failed to update product' });
        }
      });
      router.delete('/:id', async (req, res) => {
        const { id } = req.params;
        try {
          await prisma.book.delete({
            where: { id: parseInt(id) },
          });
          res.json({ message: 'Product deleted' });
        } catch (error) {
          res.status(500).json({ error: 'Failed to delete product' });
        }
      });
}

