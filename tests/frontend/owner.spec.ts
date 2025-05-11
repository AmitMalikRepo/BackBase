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

  test("Search and view an existing owner by last name", async ({ page }) => {
    const ownerPage = new OwnerPage(page);

    await test.step('When I navigate to All Owners', async () => {
      await ownerPage.navigateToAllOwners();
    });

    await test.step('And I search for an existing owner', async () => {
      await ownerPage.searchOwner.fill(ownerData.searchOwner.lastName);
    });

    await test.step('Then I should see the owner in the search results', async () => {
      await expect(page.getByText(ownerData.searchOwner.lastName)).toBeVisible();
      await expect(page.getByText(ownerData.searchOwner.firstName)).toBeVisible();
    });

    await test.step('And I click on the owner link', async () => {
      await ownerPage.clickOnLink(ownerData.searchOwner.firstName);
    });

    await test.step('Then I should see the correct owner details displayed on the page', async () => {
      await expect(page.getByText(ownerData.searchOwner.firstName)).toBeVisible();
      await expect(page.getByText(ownerData.searchOwner.lastName)).toBeVisible();
      await expect(page.getByText(ownerData.searchOwner.address)).toBeVisible();
      await expect(page.getByText(ownerData.searchOwner.city)).toBeVisible();
    });
  });

  test("Add a new Pet to an owner", async ({ page }) => {
    const ownerPage = new OwnerPage(page);
    const uniquePet = getUniqueNames();

    await test.step('When I navigate to All Owners', async () => {
      await ownerPage.navigateToAllOwners();
    });

    await test.step('And I search for an existing owner', async () => {
      await ownerPage.searchOwner.fill(ownerData.searchOwner.firstName);
    });

    await test.step('And I click on the owner link', async () => {
      await ownerPage.clickOnLink(ownerData.searchOwner.firstName);
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

  test("Add a new owner", async ({ page }) => {
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

  // Negative Test

  test("Search for a non-existent owner should show no results", async ({ page }) => {
    const ownerPage = new OwnerPage(page);
  
    await test.step('When I navigate to All Owners', async () => {
      await ownerPage.navigateToAllOwners();
    });
  
    await test.step('And I search using a non-existent last name', async () => {
      await ownerPage.searchOwner.fill("NonExistOwner");
    });
  
    await test.step('Then I should see no owners listed in the results', async () => {
      const ownerRow = page.locator('table tbody tr');
      await expect(ownerRow).toHaveCount(0);
    });
  });
});
