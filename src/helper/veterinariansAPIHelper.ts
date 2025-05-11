import { APIRequestContext } from '@playwright/test';

export class veterinariansAPIHelper {

    static async getVets(request: APIRequestContext) {
        return await request.get(`vets`);
    }
}
