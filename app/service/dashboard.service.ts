import { api } from "../lib/api";

export const getDashboardStats = async () => {
  return await api("/dashboard/stats");
};

export const getDeliveries = async (params: { page?: number; limit?: number; status?: string } = {}) => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== undefined)
  );
  const query = new URLSearchParams(cleanParams as any).toString();
  return await api(`/dashboard/deliveries?${query}`);
};
