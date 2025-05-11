import { test, expect } from '@playwright/test';
import { visitsAPIHelper } from '../../src/helper/visitsAPIHelper';
import visitData from '../../src/testdata/backend/visits.json';
import petData from '../../src/testdata/backend/pet.json';
import ownerData from '../../src/testdata/backend/owner.json';

test.describe('Visits API', () => {
  test('Adds a new vet visit', async ({ request }) => {
    const addvisitResposne = await visitsAPIHelper.addVisit(request, ownerData.ownerId.id1, petData.petId.id1, visitData.visitDetails);
    expect(addvisitResposne.status()).toBe(204);
  });
});