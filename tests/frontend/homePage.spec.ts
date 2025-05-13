import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

test.describe('Home Page Functionality', () => {

    test.beforeEach('Given user is on the Home Page', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.goTo();
    });

    test('Verify home page elements are visible', async ({ page }) => {
        const homePage = new HomePage(page);

        await test.step('Then I should see welcome heading, pet image, and navigation menus', async () => {

            await expect(homePage.getHeadingByName('Welcome to Petclinic')).toBeVisible();
            await expect(homePage.getPetsImage()).toBeVisible();
            await expect(homePage.getOwnersMenu()).toBeVisible();
            await expect(homePage.getVeterinarians()).toBeVisible();
        });
    });

    test('Navigate to All Owners, Add Owner, Veterinarians, and return Home', async ({ page }) => {
        const homePage = new HomePage(page);

        await test.step('When I navigate to All Owners', async () => {
            await homePage.navigateToAllOwners();
        });

        await test.step('Then I should be on the Owners page with correct heading', async () => {
            await expect(page).toHaveURL(/.*owners/);
            await expect(homePage.getHeadingByName('Owners')).toBeVisible();
        });

        await test.step('And I navigate to Add Owner', async () => {
            await homePage.navigateToAddOwner();
        });

        await test.step('Then I should be on the Add Owner page with correct heading', async () => {
            await expect(page).toHaveURL(/.*owners\/new/);
            await expect(homePage.getHeadingByName('Owner')).toBeVisible();
        });

        await test.step('And I navigate to Veterinarians', async () => {
            await homePage.navigateToVeterinarians();
        });

        await test.step('Then I should be on the Veterinarians page with correct heading', async () => {
            await expect(page).toHaveURL(/.*vets/);
            await expect(homePage.getHeadingByName('Veterinarians')).toBeVisible();
        });

        await test.step('And I return to the Home page', async () => {
            await homePage.navigateToHome();
        });

        await test.step('Then I should be on the Welcome page with correct heading', async () => {
            await expect(page).toHaveURL(/.*welcome/);
            await expect(homePage.getHeadingByName('Welcome to Petclinic')).toBeVisible();
        });
    });
});
