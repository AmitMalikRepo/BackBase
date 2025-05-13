import { Page, Locator } from "@playwright/test";
import { HomePage } from "./HomePage";
import { Owner } from "../helper/ownerAPIHelper";
import { Pet } from "../helper/petAPIHelper";

export class OwnerPage extends HomePage {
  private searchOwnerInput: Locator;
  private ownerFirstNameInput: Locator;
  private ownerLastNameInput: Locator;
  private ownerAddressInput: Locator;
  private ownerCityInput: Locator;
  private ownerTelephoneInput: Locator;
  private submitBtn: Locator;
  private editOwnerBtn: Locator;
  private addNewPetBtn: Locator;
  private petNameInput: Locator;
  private petBirthDateInput: Locator;
  private petTypeDropdown: Locator;
  private editPetLink: (petName: string) => Locator;

  constructor(page: Page) {
    super(page);
    this.searchOwnerInput = page.getByRole('textbox', { name: 'Search Filter' });
    this.ownerFirstNameInput = page.locator('input[name="firstName"]');
    this.ownerLastNameInput = page.locator('input[name="lastName"]');
    this.ownerAddressInput = page.locator('input[name="address"]');
    this.ownerCityInput = page.locator('input[name="city"]');
    this.ownerTelephoneInput = page.locator('input[name="telephone"]');
    this.submitBtn = page.getByRole('button', { name: 'Submit' });
    this.editOwnerBtn = page.getByRole('link', { name: 'Edit Owner' });
    this.addNewPetBtn = page.getByRole('link', { name: 'Add New Pet' });
    this.petNameInput = page.locator('input[name="name"]');
    this.petBirthDateInput = page.locator('input[type="date"]');
    this.petTypeDropdown = page.getByRole('combobox');
    this.editPetLink = (petName: string) =>
      page.locator('tr', {
        has: page.locator('td', { hasText: petName })
      }).getByRole('link', { name: 'Edit Pet' });
  }

  async fillOwnerForm(owner: Owner): Promise<void> {
    await this.ownerFirstNameInput.fill(owner.firstName);
    await this.ownerLastNameInput.fill(owner.lastName);
    await this.ownerAddressInput.fill(owner.address);
    await this.ownerCityInput.fill(owner.city);
    await this.ownerTelephoneInput.fill(owner.telephone);
  }

  async fillPetForm(pet: Pet): Promise<void> {
    await this.petNameInput.click();
    await this.petNameInput.fill(pet.name);
    await this.petBirthDateInput.fill(pet.birthDate);
    await this.petTypeDropdown.selectOption({ label: pet.type });
  }

  async submitForm(): Promise<void> {
    await this.submitBtn.click();
  }

  async addPet(pet: Pet): Promise<void> {
    await this.fillPetForm(pet);
    await this.submitForm();
  }

  async addOwner(owner: Owner): Promise<void> {
    await this.fillOwnerForm(owner);
    await this.submitForm();
  }

  async updatePetName(name: string): Promise<void> {
    await this.petNameInput.clear();
    await this.petNameInput.fill(name);
    await this.submitForm();
  }

  async clickEditPet(petName: string): Promise<void> {
    const petLink = this.editPetLink(petName);
    try {
      await petLink.waitFor({ state: 'visible', timeout: 5000 });
      await petLink.click();
    } catch (error) {
      throw new Error(`Edit link for pet "${petName}" not found or not visible`);
    }
  }

  async searchOwner(lastName: string): Promise<void> {
    await this.searchOwnerInput.fill(lastName);
  }

  async clickEditOwner(): Promise<void> {
    await this.editOwnerBtn.click();
  }

  async clickAddNewPet(): Promise<void> {
    await this.addNewPetBtn.click();
  }

  async clickOnLink(linkName: string): Promise<void> {
    await this.page.getByRole("link", { name: linkName }).click();
  }
}
