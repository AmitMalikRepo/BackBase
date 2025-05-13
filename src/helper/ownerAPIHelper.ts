import { APIRequestContext } from '@playwright/test';

export interface Owner {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    telephone: string;
}

export class OwnerAPIHelper {

    static async createOwner(request: APIRequestContext, ownerData: Owner) {
        const response = await request.post('owners', { data: ownerData });
        const body = await response.json().catch(() => ({}));
        return {
            status: response.status(),
            body,
        };
    }

    static async getOwner(request: APIRequestContext, ownerId: number) {
        const response = await request.get(`owners/${ownerId}`);
        const body = await response.json().catch(() => ({}));
        return {
            status: response.status(),
            body,
        };
    }

    static async updateOwner(request: APIRequestContext, ownerId: number, updateOwnerData: Owner) {
        const response = await request.put(`owners/${ownerId}`, { data: updateOwnerData });
        const body = await response.json().catch(() => ({}));
        return {
            status: response.status(),
            body,
        };
    }
}
