const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:6060";

export const api = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  // If using credentials (cookies)
  (defaultOptions as any).credentials = "include";

  const response = await fetch(url, defaultOptions);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "An unknown error occurred" }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};
