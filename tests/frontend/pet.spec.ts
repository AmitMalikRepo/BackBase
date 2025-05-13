import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { OwnerPage } from '../../src/pages/OwnerPage';
import ownerData from '../../src/testdata/frontend/owner.json';
import { getUniqueNames } from '../../src/utils/testDataUtils';
import petData from '../../src/testdata/frontend/pet.json';

test.describe("Pet functionality", () => {

    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.goTo();
    });

    test("Add a new Pet to an owner", async ({ page }) => {
        const ownerPage = new OwnerPage(page);
        const uniquePet = getUniqueNames();

        await test.step('When I navigate to All Owners', async () => {
            await ownerPage.navigateToAllOwners();
        });

        await test.step('And I search for an existing owner', async () => {
            await ownerPage.searchOwner(ownerData.searchOwner.firstName);
        });

        await test.step('And I click on the owner name', async () => {
            await ownerPage.clickOnLink(ownerData.searchOwner.firstName);
        });

        await test.step('And I click on add new pet button', async () => {
            await ownerPage.clickAddNewPet();
        });

        await test.step('And I add a new pet to the owner', async () => {
            await ownerPage.addPet(uniquePet);
        });

        await test.step('Then I should see the new pet added to the owner profile', async () => {
            await expect(page.getByText(uniquePet.name)).toBeVisible();
        });
    });

    test("Edit Pet Details", async ({ page }) => {
        const ownerPage = new OwnerPage(page);
        const uniquePet = getUniqueNames();

        await test.step('When I navigate to All Owners', async () => {
            await ownerPage.navigateToAllOwners();
        });

        await test.step('And I click on the owner link', async () => {
            await ownerPage.clickOnLink(petData.ownerName.name);
        });

        await test.step('And I add a new pet to the owner', async () => {
            await ownerPage.clickAddNewPet();
            await ownerPage.addPet(uniquePet);
        });

        await test.step('And I click on Edit pet link', async () => {
            ownerPage.clickEditPet(uniquePet.name);
        });

        await test.step('And I update the pet name', async () => {
            ownerPage.updatePetName(uniquePet.updatedName);
        });

        await test.step('Then I should see the updated pet name displayed on the page', async () => {
            await expect(page.getByText(uniquePet.updatedName)).toBeVisible();
        });
    });
});
