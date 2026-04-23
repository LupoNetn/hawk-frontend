import { api } from "../lib/api";

export interface CreateApiKeyPayload {
    name: string;
}

export const apiKeyService = {
    async getApiKeys() {
        return await api("/api-keys", {
            method: "GET",
        });
    },

    async createApiKey(payload: CreateApiKeyPayload) {
        return await api("/api-keys", {
            method: "POST",
            body: JSON.stringify(payload)
        });
    },

    async deleteApiKey(id: string) {
        return await api(`/api-keys/${id}`, {
            method: "DELETE"
        });
    }
};
