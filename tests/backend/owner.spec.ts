import { test, expect } from '@playwright/test';
import { ownerAPIHelper } from '../../src/helper/ownerAPIHelper';
import ownerData from '../../src/testdata/backend/owner.json';

test.describe('Pet Owners API', () => {
  test('Create a new pet owner', async ({ request }) => {
    const createOwnerResposne = await ownerAPIHelper.createOwner(request, ownerData.validOwner);
    expect(createOwnerResposne.status()).toBe(201);
  });

  test("Get a pet owner by ID", async ({ request }) => {
    const getOwnerResponse = await ownerAPIHelper.getOwner(request, ownerData.ownerId.id2);
    expect(getOwnerResponse.status()).toBe(200);

    const ownerResponseBody = await getOwnerResponse.json();

    expect(ownerResponseBody.firstName).toBe(ownerData.getOwner.firstName);
    expect(ownerResponseBody.lastName).toBe(ownerData.getOwner.lastName);
  });

  test("Update a pet owner details successfully", async ({ request }) => {
    const updateOwnerResponse = await ownerAPIHelper.updateOwner(request, ownerData.ownerId.id1, ownerData.updateOwner);
    expect(updateOwnerResponse.status()).toBe(200);

    const ownerResponseBody = await updateOwnerResponse.json();

    expect(ownerResponseBody.lastName).toBe(ownerData.updateOwner.lastName);
    expect(ownerResponseBody.city).toBe(ownerData.updateOwner.city);
    expect(ownerResponseBody.address).toBe(ownerData.updateOwner.address);
  });
});

// Negative Tests

test.describe('Pet Owners Negative API tests', () => {
  test('Fail to create a pet owner with missing required field (empty last name)', async ({ request }) => {
    const createOwnerResposne = await ownerAPIHelper.createOwner(request, ownerData.inValidOwner);
    expect(createOwnerResposne.status()).toBe(400);

    const ownerResponseBody = await createOwnerResposne.json();

    expect(ownerResponseBody.error).toBe('Bad Request');
    expect(ownerResponseBody.message).toContain('Validation failed');
    expect(ownerResponseBody.errors[0].field).toBe('lastName');
  });

  test('Fail to get a non-existent pet owner by ID', async ({ request }) => {
    const nonExistentOwnerId = 9999;
    const getOwnerResponse = await ownerAPIHelper.getOwner(request, nonExistentOwnerId);
    expect(getOwnerResponse.status()).toBe(500);

    const responseBody = await getOwnerResponse.json();

    expect(responseBody.error).toBe('Internal Server Error');
    expect(responseBody.message).toBe('No value present');
  });

  test("Fail to update owner when telephone is non-numeric", async ({ request }) => {
    const updateOwnerResponse = await ownerAPIHelper.updateOwner(request, ownerData.ownerId.id1, ownerData.inValidUpdateOwner);
    expect(updateOwnerResponse.status()).toBe(400);

    const ownerResponseBody = await updateOwnerResponse.json();

    expect(ownerResponseBody.error).toBe('Bad Request');
    expect(ownerResponseBody.message).toContain("Validation failed");
    expect(ownerResponseBody.errors[0].field).toBe("telephone");
    expect(ownerResponseBody.errors[0].defaultMessage).toContain("numeric value out of bounds");
    expect(ownerResponseBody.errors[0].rejectedValue).toBe("abc");
  });
});
