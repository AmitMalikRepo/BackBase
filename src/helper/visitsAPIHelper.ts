import { APIRequestContext } from '@playwright/test';

export class visitsAPIHelper {

    static async addVisit(request: APIRequestContext, ownerId: number, petID: number, visitData: object) {
        return await request.post(`owners/${ownerId}/pets/${petID}/visits`, { data: visitData });
    }
}
