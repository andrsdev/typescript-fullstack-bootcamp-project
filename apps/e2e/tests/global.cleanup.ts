import { PrismaClient } from '@repo/db';

import { test as teardown } from '@playwright/test';
import { cleanup } from '@repo/db/cleanup';
const prisma = new PrismaClient();

teardown.describe('global teardown', () => {
  teardown('cleanup database', async () => {
    console.log('Cleanup database...');
    await cleanup(prisma);
    console.log('Completed database cleanup.');
  });
});