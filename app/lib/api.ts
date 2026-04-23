const isProd = process.env.NODE_ENV === 'production';
const defaultUrl = isProd ? "https://hawk-luponetn2623-4ci0me7u.leapcell.dev" : "http://localhost:6060";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || defaultUrl;

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onRefreshed = (token: string) => {
  refreshSubscribers.map((cb) => cb(token));
  refreshSubscribers = [];
};

export const api = async (endpoint: string, options: RequestInit = {}): Promise<any> => {
  const url = `${BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  (defaultOptions as any).credentials = "include";

  const response = await fetch(url, defaultOptions);

  // If unauthorized and not already trying to refresh
  if (response.status === 401 && !endpoint.includes("/auth/refresh-token") && !endpoint.includes("/auth/signin")) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const refreshRes = await fetch(`${BASE_URL}/auth/refresh-token`, {
          method: "POST",
          credentials: "include",
        });

        if (refreshRes.ok) {
          isRefreshing = false;
          onRefreshed("token"); // We just need to trigger the retry
          return api(endpoint, options);
        } else {
          // Refresh failed, clear session and go to login
          window.location.href = "/login?message=Session expired. Please log in again.";
          throw new Error("Session expired");
        }
      } catch (err) {
        isRefreshing = false;
        window.location.href = "/login";
        throw err;
      }
    }

    // If already refreshing, wait for it to finish and then retry
    return new Promise((resolve) => {
      refreshSubscribers.push(() => {
        resolve(api(endpoint, options));
      });
    });
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "An unknown error occurred" }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};
