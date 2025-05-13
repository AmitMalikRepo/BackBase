import { test, expect } from '@playwright/test';
import { OwnerAPIHelper } from '../../src/helper/ownerAPIHelper';
import ownerData from '../../src/testdata/backend/owner.json';

test.describe('Pet Owners API', () => {
  test('Create a new pet owner', async ({ request }) => {
    const createOwnerResposne = await OwnerAPIHelper.createOwner(request, ownerData.owners.valid);
    expect(createOwnerResposne.status).toBe(201);
  });

  test("Get a pet owner by ID", async ({ request }) => {
    const getOwnerResponse = await OwnerAPIHelper.getOwner(request, ownerData.ownerIds[1]);
    expect(getOwnerResponse.status).toBe(200);

    const ownerResponseBody = await getOwnerResponse.body;

    expect(ownerResponseBody.firstName).toBe(ownerData.owners.retrievalSample.firstName);
    expect(ownerResponseBody.lastName).toBe(ownerData.owners.retrievalSample.lastName);
  });

  test("Update a pet owner details successfully", async ({ request }) => {
    const updateOwnerResponse = await OwnerAPIHelper.updateOwner(request, ownerData.ownerIds[0], ownerData.owners.update);
    expect(updateOwnerResponse.status).toBe(200);

    const ownerResponseBody = await updateOwnerResponse.body;

    expect(ownerResponseBody.lastName).toBe(ownerData.owners.update.lastName);
    expect(ownerResponseBody.city).toBe(ownerData.owners.update.city);
    expect(ownerResponseBody.address).toBe(ownerData.owners.update.address);
  });
});

// Negative Tests

test.describe('Pet Owners Negative API tests', () => {
  test('Fail to create a pet owner with missing required field (empty last name)', async ({ request }) => {
    const createOwnerResposne = await OwnerAPIHelper.createOwner(request, ownerData.owners.invalid.missingLastName);
    expect(createOwnerResposne.status).toBe(400);

    const ownerResponseBody = await createOwnerResposne.body;

    expect(ownerResponseBody.error).toBe('Bad Request');
    expect(ownerResponseBody.message).toContain('Validation failed');
    expect(ownerResponseBody.errors[0].field).toBe('lastName');
  });

  test('Fail to get a non-existent pet owner by ID', async ({ request }) => {
    const nonExistentOwnerId = 9999;
    const getOwnerResponse = await OwnerAPIHelper.getOwner(request, nonExistentOwnerId);
    expect(getOwnerResponse.status).toBe(500);

    const responseBody = await getOwnerResponse.body;

    expect(responseBody.error).toBe('Internal Server Error');
    expect(responseBody.message).toBe('No value present');
  });

  test("Fail to update owner when telephone is non-numeric", async ({ request }) => {
    const updateOwnerResponse = await OwnerAPIHelper.updateOwner(request, ownerData.ownerIds[0], ownerData.owners.invalid.invalidTelephone);
    expect(updateOwnerResponse.status).toBe(400);

    const ownerResponseBody = await updateOwnerResponse.body;

    expect(ownerResponseBody.error).toBe('Bad Request');
    expect(ownerResponseBody.message).toContain("Validation failed");
    expect(ownerResponseBody.errors[0].field).toBe("telephone");
    expect(ownerResponseBody.errors[0].defaultMessage).toContain("numeric value out of bounds");
    expect(ownerResponseBody.errors[0].rejectedValue).toBe("abc");
  });
});
