import { api } from "../lib/api";

export const signup = async (data: any) => {
  return api("/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const login = async (data: any) => {
  return api("/auth/signin", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const logout = async () => {
  return api("/auth/logout", {
    method: "POST",
  });
};

export const refreshToken = async () => {
  return api("/auth/refresh-token", {
    method: "POST",
  });
};

export const getMe = async () => {
  return api("/auth/me", {
    method: "GET",
  });
};
