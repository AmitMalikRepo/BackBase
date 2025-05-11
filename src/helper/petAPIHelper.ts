import { APIRequestContext } from '@playwright/test';

export class petAPIHelper {

    static async addPet(request: APIRequestContext, ownerId: number, petData: object) {
        return await request.post(`owners/${ownerId}/pets`, { data: petData });
    }

    static async getPet(request: APIRequestContext, ownerId: number, petId: number) {
        return await request.get(`owners/${ownerId}/pets/${petId}`);
    }

    static async updatePetDetails(request: APIRequestContext, ownerId: number, petId: number, petData: object) {
        return await request.put(`owners/${ownerId}/pets/${petId}`, { data: petData });
    }
}
