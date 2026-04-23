import { api } from "../lib/api";

export interface createWebhookPayload {
    name: string;
    url: string;
    subscriptions: string[];
}

export const webhooksService = {
    async getWebhooks() {
        return await api("/webhooks", {
            method: "GET",
        })
    },

    async createWebhook(payload: createWebhookPayload) {
        return await api("/webhooks", {
            method: "POST",
            body: JSON.stringify(payload)
        })
    },

    async getWebhookById(id: string) {
        return await api(`/webhooks/${id}`, {
            method: "GET",
        })
    }
}