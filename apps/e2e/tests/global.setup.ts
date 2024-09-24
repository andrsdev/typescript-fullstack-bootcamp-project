import { PrismaClient } from '@repo/db';

import { test as setup } from '@playwright/test';
import { seed } from '@repo/db/seed';
const prisma = new PrismaClient();

setup.describe('global setup', () => {
  setup('seed database', async () => {
    console.log('Seeding database...');
    await seed(prisma);
    console.log('Completed seeding database.');
  });
});