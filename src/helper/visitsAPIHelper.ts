import { APIRequestContext } from '@playwright/test';

interface VisitDetails {
    date: string;
    description: string;
}

export class visitsAPIHelper {

    static async addVisit(request: APIRequestContext, ownerId: number, petId: number, visitData: VisitDetails) {
        const response = await request.post(`owners/${ownerId}/pets/${petId}/visits`, { data: visitData });
        const body = await response.json().catch(() => ({}));
        return {
            status: response.status(),
            body,
        };
    }
}