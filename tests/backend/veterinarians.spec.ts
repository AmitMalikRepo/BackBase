import { test, expect } from '@playwright/test';
import { veterinariansAPIHelper } from '../../src/helper/veterinariansAPIHelper';
import vetData from '../../src/testdata/backend/vetData.json';

test.describe('Veterinarians API', () => {
  test("Get all veterinarians and validate them", async ({ request }) => {
    const getVetsResponse = await veterinariansAPIHelper.getVets(request);
    expect(getVetsResponse.status()).toBe(200);

    const vetsResponseBody = await getVetsResponse.json();
    const actualVets = vetsResponseBody.map((vet: { firstName: String; lastName: String; }) => `${vet.firstName} ${vet.lastName}`);

    vetData.expectedVets.forEach(vet => {
      expect(actualVets).toContain(vet);
    });
  });
});