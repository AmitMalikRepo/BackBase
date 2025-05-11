import { test, expect } from '@playwright/test';
import { visitsAPIHelper } from '../../src/helper/visitsAPIHelper';
import visitData from '../../src/testdata/backend/visits.json';

test.describe('Visits API', () => {
  test('Adds a new vet visit', async ({ request }) => {
    const addvisitResposne = await visitsAPIHelper.addVisit(request, 1, 1, visitData.visitDetails);
    expect(addvisitResposne.status()).toBe(204);
  });
});