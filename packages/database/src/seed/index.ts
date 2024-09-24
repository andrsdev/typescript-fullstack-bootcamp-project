import { PrismaClient } from '../index';
import { seed } from '../../scripts/seed';

const prisma = new PrismaClient();

async function main() {
  await seed(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });