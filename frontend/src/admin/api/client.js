const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthToken = () => localStorage.getItem("adminToken")?.trim() || "";

const redirectToLogin = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminName");
  localStorage.removeItem("adminRole");
  window.location.href = "/admin/login";
};

const getAuthHeaders = (extraHeaders = {}) => {
  const token = getAuthToken();
  return {
    ...extraHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handleAuthResponse = async (response) => {
  if (response.status === 401 || response.status === 403) {
    redirectToLogin();
    throw new Error("Session expired. Please login again.");
  }

  return response;
};

const fetchJson = async (url, options = {}) => {
  const response = await fetch(url, options);
  await handleAuthResponse(response);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Request failed");
  }

  return response.json();
};

export const authAPI = {
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to login");
    }

    return data;
  },

  getProfile: async () => {
    return fetchJson(`${API_URL}/auth/profile`, {
      headers: getAuthHeaders(),
    });
  },
};

export const servicesAPI = {
  getAll: async () => {
    return fetchJson(`${API_URL}/services`, {
      headers: getAuthHeaders(),
    });
  },

  getOne: async (id) => {
    return fetchJson(`${API_URL}/services/${id}`, {
      headers: getAuthHeaders(),
    });
  },

  create: async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (data.shortCode) formData.append("shortCode", data.shortCode);
    if (data.iconUrl) formData.append("iconUrl", data.iconUrl);
    if (data.iconFile) formData.append("icon", data.iconFile);

    return fetchJson(`${API_URL}/services`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: formData,
    });
  },

  update: async (id, data) => {
    const formData = new FormData();
    if (data.name) formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);
    if (data.shortCode) formData.append("shortCode", data.shortCode);
    if (data.iconUrl) formData.append("iconUrl", data.iconUrl);
    if (data.iconFile) formData.append("icon", data.iconFile);

    return fetchJson(`${API_URL}/services/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: formData,
    });
  },

  delete: async (id) => {
    return fetchJson(`${API_URL}/services/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
  },
};

export const projectsAPI = {
  getAll: async () => {
    return fetchJson(`${API_URL}/projects`, {
      headers: getAuthHeaders(),
    });
  },

  getOne: async (id) => {
    return fetchJson(`${API_URL}/projects/${id}`, {
      headers: getAuthHeaders(),
    });
  },

  create: async (data) => {
    return fetchJson(`${API_URL}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(data),
    });
  },

  update: async (id, data) => {
    return fetchJson(`${API_URL}/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(data),
    });
  },

  delete: async (id) => {
    return fetchJson(`${API_URL}/projects/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
  },
};

export const contactFormsAPI = {
  getAll: async () => {
    return fetchJson(`${API_URL}/contact-forms`, {
      headers: getAuthHeaders(),
    });
  },

  getOne: async (id) => {
    return fetchJson(`${API_URL}/contact-forms/${id}`, {
      headers: getAuthHeaders(),
    });
  },

  update: async (id, status) => {
    return fetchJson(`${API_URL}/contact-forms/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify({ status }),
    });
  },

  delete: async (id) => {
    return fetchJson(`${API_URL}/contact-forms/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
  },
};

export const logoutAdmin = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminName");
  localStorage.removeItem("adminRole");
};
