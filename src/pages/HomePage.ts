import { Locator, Page } from '@playwright/test';

export class HomePage {
  page: Page;
  ownersMenu: Locator;
  addNewOwner: Locator;
  allOwners: Locator;
  veterinarians: Locator;
  petsImage: Locator;
  homePageLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.petsImage = page.getByRole('img', { name: 'pets logo' });
    this.homePageLink = page.getByRole('link', { name: 'Home' });
    this.ownersMenu = page.getByRole('button', { name: 'Owners' });
    this.addNewOwner = page.getByRole('link', { name: 'Register' });
    this.allOwners = page.getByRole('link', { name: 'All' });
    this.veterinarians = page.getByRole('link', { name: 'Veterinarians' });
  }

  async goTo() {
    await this.page.goto("/");
  }

  async navigateToHome() {
    await this.homePageLink.click();
  }

  getHeading(name: string): Locator {
    return this.page.getByRole('heading', { name });
  }

  async navigateToAddOwner() {
    await this.ownersMenu.click();
    await this.addNewOwner.click();
  }

  async navigateToAllOwners() {
    await this.ownersMenu.click();
    await this.allOwners.click();
  }

  async navigateToVeterinarians() {
    await this.veterinarians.click();
  }
}