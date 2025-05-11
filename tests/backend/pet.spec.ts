import { test, expect } from '@playwright/test';
import { petAPIHelper } from '../../src/helper/petAPIHelper';
import petData from '../../src/testdata/backend/pet.json';
import { ownerAPIHelper } from '../../src/helper/ownerAPIHelper';


test.describe('Pet API', () => {
  test('Add a pet to an owner', async ({ request }) => {
    const addPetResposne = await petAPIHelper.addPet(request, 3, petData.petDetails);
    expect(addPetResposne.status()).toBe(204);

    const getOwner = await ownerAPIHelper.getOwner(request, 3);
    const ownerResponseBody = await getOwner.json();

    expect(ownerResponseBody.pets[0].name).toBe(petData.petDetails.name);
    expect(ownerResponseBody.pets[0].birthDate).toBe(petData.petDetails.birthDate);

  });

  test("Get a pet by ID", async ({ request }) => {
    const getPetResponse = await petAPIHelper.getPet(request, 3, 4);
    expect(getPetResponse.status()).toBe(200);

    const petResponseBody = await getPetResponse.json();

    expect(petResponseBody.name).toBe(petData.petDetails.name);
    expect(petResponseBody.birthDate).toBe(petData.petDetails.birthDate);
  });

  test("Update a pet details successfully", async ({ request }) => {
    const updatePetResponse = await petAPIHelper.updatePetDetails(request, 5, 8, petData.updatePetDetails);
    expect(updatePetResponse.status()).toBe(204);

    const getPetResponse = await petAPIHelper.getPet(request, 5, 8);
    expect(getPetResponse.status()).toBe(200);

    const petResponseBody = await getPetResponse.json();

    expect(petResponseBody.name).toBe(petData.updatePetDetails.name);
    expect(petResponseBody.birthDate).toBe(petData.updatePetDetails.birthDate);
  });
});