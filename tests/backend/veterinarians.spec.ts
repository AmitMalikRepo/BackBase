import { test, expect } from '@playwright/test';
import { veterinariansAPIHelper } from '../../src/helper/veterinariansAPIHelper';

test.describe('Veterinarians API', () => {
  test("Get a lists of vets", async ({ request }) => {
    const getVetsResponse = await veterinariansAPIHelper.getVets(request);
    expect(getVetsResponse.status()).toBe(200);

    const vetsResponseBody = await getVetsResponse.json();

    expect(vetsResponseBody[0].firstName).toBe('James');
    expect(vetsResponseBody[0].lastName).toBe('Carter');
  });
});