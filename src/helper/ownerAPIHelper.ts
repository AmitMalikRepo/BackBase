import { APIRequestContext } from '@playwright/test';

export class ownerAPIHelper {

    static async createOwner(request: APIRequestContext, ownerData: object) {
        return await request.post('owners', { data: ownerData });
    }

    static async getOwner(request: APIRequestContext, ownerId: number) {
        return await request.get(`owners/${ownerId}`);
    }

    static async updateOwner(request: APIRequestContext, ownerId: number, updateOwnerData: object) {
        return await request.put(`owners/${ownerId}`, { data: updateOwnerData });
    }
}
