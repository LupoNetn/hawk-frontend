import { api } from "../lib/api";

export const webhooksService = {
    async getWebhooks() {
        return await api("/webhooks", {
            method: "GET",
        })
    }
}