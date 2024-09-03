import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Create Categories
  const categories = ['Fiction', 'Non-Fiction', 'Science', 'Fantasy', 'Biography'];
  const createdCategories = await Promise.all(
    categories.map(category =>
      prisma.category.create({ data: { name: category } })
    )
  );

  // Create Authors
  const authors = Array.from({ length: 5 }, () => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  }));
  
  const createdAuthors = await Promise.all(
    authors.map(author =>
      prisma.author.create({ data: author })
    )
  );

  // Create Products
  const products = Array.from({ length: 5 }, () => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
    stock: faker.number.int({ min: 0, max: 100 }),
    type: 'BOOK' as 'BOOK',  // Hardcoded type for simplicity
  }));
  
  const createdProducts = await Promise.all(
    products.map(product =>
      prisma.product.create({ data: product })
    )
  );

  // Create Books
  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese'];
  const books = Array.from({ length: 5 }, () => ({
    isbn: faker.string.alphanumeric(13),
    title: faker.lorem.words(3),
    publicationDate: faker.date.past(),
    pageCount: faker.number.int({ min: 100, max: 1000 }),
    language: faker.helpers.arrayElement(languages),
    authorId: faker.helpers.arrayElement(createdAuthors).id,
    categories: {
      connect: createdCategories.map(cat => ({ id: cat.id })),
    },
  }));

  const createdBooks = await Promise.all(
    books.map(book =>
      prisma.book.create({ data: book })
    )
  );

  // Create Book Editions
  const bookEditions = createdBooks.flatMap(book =>
    ['HARDCOVER', 'PAPERBACK'].map(type => ({
      type: type as 'HARDCOVER' | 'PAPERBACK',
      price: parseFloat(faker.commerce.price()),
      stock: faker.number.int({ min: 0, max: 100 }),
      bookId: book.id,
      productId: faker.helpers.arrayElement(createdProducts).id,
    }))
  );

  await Promise.all(
    bookEditions.map(bookEdition =>
      prisma.bookEdition.create({ data: bookEdition })
    )
  );

  console.log('Database has been seeded with faker data.');
}

main()
  .catch((e) => {
    console.error('An error occurred while seeding the database:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });