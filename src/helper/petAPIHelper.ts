import { APIRequestContext } from '@playwright/test';

export interface Pet {
    name: string;
    birthDate: string;
    typeId?: number;
    type?: string;
}

export class PetAPIHelper {

    static async addPet(request: APIRequestContext, ownerId: number, petData: Pet) {
        const response = await request.post(`owners/${ownerId}/pets`, { data: petData });
        const body = await response.json().catch(() => ({}));
        return {
            status: response.status(),
            body,
        };
    }

    static async getPet(request: APIRequestContext, ownerId: number, petId: number) {
        const response = await request.get(`owners/${ownerId}/pets/${petId}`);
        const body = await response.json().catch(() => ({}));
        return {
            status: response.status(),
            body,
        };
    }

    static async updatePet(request: APIRequestContext, ownerId: number, petId: number, petData: Pet) {
        const response = await request.put(`owners/${ownerId}/pets/${petId}`, { data: petData });
        const body = await response.json().catch(() => ({}));
        return {
            status: response.status(),
            body,
        };
    }
}
