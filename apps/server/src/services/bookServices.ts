import { Book } from '../model/book';
import { prisma } from '../lib/prismaClient'

export class bookServices {
    async getBook(): Promise<Book[]> {
        const book = await prisma.book.findMany()

        return book.map((book)=>({
            title: book.title,
            isbn: book.isbn,
            pageCount: book.pageCount
        }))

    }
}