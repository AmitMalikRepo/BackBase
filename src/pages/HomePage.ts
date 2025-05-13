import { Locator, Page } from '@playwright/test';

export class HomePage {
  protected page: Page;
  private ownersMenu: Locator;
  private registerNewOwner: Locator;
  private allOwners: Locator;
  private veterinarians: Locator;
  private petsImage: Locator;
  private homePageLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.petsImage = page.getByRole('img', { name: 'pets logo' });
    this.homePageLink = page.getByRole('link', { name: 'Home' });
    this.ownersMenu = page.getByRole('button', { name: 'Owners' });
    this.registerNewOwner = page.getByRole('link', { name: 'Register' });
    this.allOwners = page.getByRole('link', { name: 'All' });
    this.veterinarians = page.getByRole('link', { name: 'Veterinarians' });
  }

  async goTo(): Promise<void> {
    await this.page.goto('/');
  }

  getHeadingByName(name: string): Locator {
    return this.page.getByRole('heading', { name });
  }

  async waitForHeading(name: string): Promise<void> {
    await this.getHeadingByName(name).waitFor({ state: 'visible', timeout: 5000 });
  }

  async navigateToHome(): Promise<void> {
    await this.homePageLink.click();
    await this.waitForHeading('Welcome to Petclinic');
  }

  async openOwnersMenu(): Promise<void> {
    if (await this.ownersMenu.isVisible()) {
      await this.ownersMenu.click();
    } else {
      console.error('Owners menu is not accessible.');
    }
  }

  async navigateToAddOwner(): Promise<void> {
    await this.openOwnersMenu();
    await this.registerNewOwner.click();
    await this.waitForHeading('Owner');
  }

  async navigateToAllOwners(): Promise<void> {
    await this.openOwnersMenu();
    await this.allOwners.click();
    await this.waitForHeading('Owners');
  }

  async navigateToVeterinarians(): Promise<void> {
    if (await this.veterinarians.isVisible()) {
      await this.veterinarians.click();
      await this.waitForHeading('Veterinarians');
    } else {
      console.error('Veterinarians link is not accessible.');
    }
  }

  getPetsImage(): Locator {
    return this.petsImage;
  }

  getOwnersMenu(): Locator {
    return this.ownersMenu;
  }

  getVeterinarians(): Locator {
    return this.veterinarians;
  }
}
