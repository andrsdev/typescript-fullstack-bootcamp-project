import { type Locator, type Page } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('Search...');
  }

  async goto() {
    await this.page.goto('http://localhost:4173/');
  }

  async selectFilter(name: string) {
    await this.page.getByRole('link', { name }).click();
  }

  async search(value: string) {
    await this.searchInput.fill(value);
  }
}