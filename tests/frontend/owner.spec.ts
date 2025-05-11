import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { OwnerPage } from '../../src/pages/OwnerPage';
import ownerData from '../../src/testdata/frontend/owner.json';
import { getUniqueNames } from '../../src/utils/testDataUtils';

test.describe("Owner functionality", () => {

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goTo();
  });

  test("Register a new owner", async ({ page }) => {
    const ownerPage = new OwnerPage(page);
    const uniqueOwner = getUniqueNames();

    await test.step('When I navigate to Add Owner page', async () => {
      await ownerPage.navigateToAddOwner();
    });

    await test.step('And I add a new owner', async () => {
      await ownerPage.addOwner(uniqueOwner);
    });

    await test.step('Then I should see the new owner displayed on owners page', async () => {
      await expect(page.getByText(uniqueOwner.firstName)).toBeVisible();
      await expect(page.getByText(uniqueOwner.lastName)).toBeVisible();
    });
  });

  test("Search and view an existing owner with the first name", async ({ page }) => {
    const ownerPage = new OwnerPage(page);

    await test.step('When I navigate to All Owners', async () => {
      await ownerPage.navigateToAllOwners();
    });

    await test.step('And I search for an existing owner', async () => {
      await ownerPage.searchOwner.fill(ownerData.searchOwnerName);
    });

    await test.step('Then I should see the owner in the search results', async () => {
      await expect(page.getByText(ownerData.searchOwnerName)).toBeVisible();
    });

    await test.step('And I click on the owner link', async () => {
      await ownerPage.clickOnLink(ownerData.searchOwnerName);
    });

    await test.step('Then I should see the owner details page', async () => {
      await expect(page.getByText(ownerData.searchOwnerName)).toBeVisible();
    });
  });

  test("Add a new Pet to an owner", async ({ page }) => {
    const ownerPage = new OwnerPage(page);
    const uniquePet = getUniqueNames();

    await test.step('When I navigate to All Owners', async () => {
      await ownerPage.navigateToAllOwners();
    });

    await test.step('And I search for an existing owner', async () => {
      await ownerPage.searchOwner.fill(ownerData.searchOwnerName);
    });

    await test.step('And I click on the owner link', async () => {
      await ownerPage.clickOnLink(ownerData.searchOwnerName);
    });

    await test.step('And I add a new pet to the owner', async () => {
      await ownerPage.addNewPet.click();
      await ownerPage.addPet(uniquePet);
    });

    await test.step('Then I should see the new pet added to the owner profile', async () => {
      await expect(page.getByText(uniquePet.name)).toBeAttached();
      await expect(page.getByText(uniquePet.name)).toBeVisible();
    });
  });
});
