import { APIRequestContext } from '@playwright/test';

export class veterinariansAPIHelper {

    static async getVets(request: APIRequestContext) {
        const response = await request.get('vets');
        const body = await response.json().catch(() => ({}));
        return {
            status: response.status(),
            body,
        };
    }
}
