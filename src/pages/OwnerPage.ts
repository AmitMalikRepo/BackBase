import { Page, Locator } from "@playwright/test";
import { HomePage } from "./HomePage";

export class OwnerPage extends HomePage {
    searchOwner: Locator;
    ownerFirstNameInput: Locator;
    ownerLastNameInput: Locator;
    ownerAddressInput: Locator;
    ownerCityInput: Locator;
    ownerTelephoneInput: Locator;
    submitBtn: Locator;
    editOwner: Locator;
    addNewPet: Locator;
    petName: Locator;
    petBirthDate: Locator;
    petType: Locator;
    editPet: (petName: string) => Locator;

    constructor(page: Page) {
        super(page);
        this.searchOwner = page.getByRole('textbox', { name: 'Search Filter' });
        this.ownerFirstNameInput = page.locator('input[name="firstName"]');
        this.ownerLastNameInput = page.locator('input[name="lastName"]');
        this.ownerAddressInput = page.locator('input[name="address"]');
        this.ownerCityInput = page.locator('input[name="city"]');
        this.ownerTelephoneInput = page.locator('input[name="telephone"]');
        this.submitBtn = page.getByRole('button', { name: 'Submit' });
        this.editOwner = page.getByRole('link', { name: 'Edit Owner' });
        this.addNewPet = page.getByRole('link', { name: 'Add New Pet' });
        this.petName = page.locator('input[name="name"]');
        this.petBirthDate = page.locator('input[type="date"]');
        this.petType = page.getByRole('combobox');
        this.editPet = (petName: string) =>
            page.locator('tr', {
                has: page.locator('td', { hasText: petName })
            }).getByRole('link', { name: 'Edit Pet' });
    }

    async fillOwnerForm(owner: {
        firstName: string;
        lastName: string;
        address: string;
        city: string;
        telephone: string;
    }) {
        await this.ownerFirstNameInput.fill(owner.firstName);
        await this.ownerLastNameInput.fill(owner.lastName);
        await this.ownerAddressInput.fill(owner.address);
        await this.ownerCityInput.fill(owner.city);
        await this.ownerTelephoneInput.fill(owner.telephone);
        await this.submitBtn.click();
    }

    async addPet(pet: {
        name: string;
        birthDate: string;
        type: string;
    }) {
        await this.petName.click();
        await this.petName.fill(pet.name);
        await this.petBirthDate.fill(pet.birthDate);
        await this.petType.selectOption({ label: pet.type });
        await this.submitBtn.click();
    }

    async editPetName(petName: string) {
        await this.petName.fill(petName);
        await this.submitBtn.click();
    }

    async clickOnLink(linkName: string) {
        await this.page.getByRole("link", { name: linkName }).click();
    }
}
