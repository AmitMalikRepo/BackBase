import { test, expect } from '@playwright/test';
import { PetAPIHelper } from '../../src/helper/petAPIHelper';
import petData from '../../src/testdata/backend/pet.json';
import ownerData from '../../src/testdata/backend/owner.json';
import { OwnerAPIHelper } from '../../src/helper/ownerAPIHelper';


test.describe('Pet API', () => {
  test('Add a pet to an owner', async ({ request }) => {
    const addPetResposne = await PetAPIHelper.addPet(request, ownerData.ownerIds[2], petData.petDetails);
    expect(addPetResposne.status).toBe(204);

    const getOwner = await OwnerAPIHelper.getOwner(request, ownerData.ownerIds[2]);
    const ownerResponseBody = await getOwner.body;

    expect(ownerResponseBody.pets[0].name).toBe(petData.petDetails.name);
    expect(ownerResponseBody.pets[0].birthDate).toBe(petData.petDetails.birthDate);

  });

  test("Get a pet by ID", async ({ request }) => {
    const getPetResponse = await PetAPIHelper.getPet(request, ownerData.ownerIds[2], petData.petIds[3]);
    expect(getPetResponse.status).toBe(200);

    const petResponseBody = await getPetResponse.body;

    expect(petResponseBody.name).toBe(petData.petDetails.name);
    expect(petResponseBody.birthDate).toBe(petData.petDetails.birthDate);
  });

  test("Update a pet details successfully", async ({ request }) => {
    const updatePetResponse = await PetAPIHelper.updatePet(request, ownerData.ownerIds[4], petData.petIds[5], petData.updatePetDetails);
    expect(updatePetResponse.status).toBe(204);

    const getPetResponse = await PetAPIHelper.getPet(request, ownerData.ownerIds[4], petData.petIds[5]);
    expect(getPetResponse.status).toBe(200);

    const petResponseBody = await getPetResponse.body;

    expect(petResponseBody.name).toBe(petData.updatePetDetails.name);
    expect(petResponseBody.birthDate).toBe(petData.updatePetDetails.birthDate);
  });
});