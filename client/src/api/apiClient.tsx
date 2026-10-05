const baseUrl = `http://localhost:3000`;

export const apiClient = async (endpoint: string, options = {}) => {
  const headers = { "Content-Type": "application/json", ...options.headers };
  
  const res = await fetch(`${baseUrl}/${endpoint}`, {
      ...options,
      headers,
    });
  const data = await res.json();

  if (!res.ok) {
    const err = new Error(data.error || "Something went wrong");
    err.status = res.status;
    throw err;
  }
  return data;
}