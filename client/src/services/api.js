import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
    },
});


api.interceptors.response.use(
    (response) => response, // Pass through successful responses untouched
    async (error) => {
        const originalRequest = error.config;
        // If the server returned 401 and we haven't already retried this request
        if (
            error.response?.status === 401 && 
            originalRequest &&
            !originalRequest._retry &&
            !originalRequest.url?.includes('/auth/login') &&
            !originalRequest.url?.includes('/auth/logout') &&
            !originalRequest.url?.includes('/auth/jwt/refresh')
        ) {
            originalRequest._retry = true; // Mark as retried to prevent infinite loops
            try {
                // Silently call your refresh route
                await axios.post(`${BASE_URL}/api/auth/jwt/refresh`, {}, { withCredentials: true });
                // Re-run the exact original request that failed
                return api(originalRequest);
            } catch (refreshError) {
                // If refresh also fails (session > 7 days old), log out cleanly
                localStorage.removeItem('isAuthenticated');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export const fetchCanvases = async () => {
    return api.get('/api/canvases');
};

export const createCanvas = async (canvasTitle) => {
    return api.post(`/api/canvases/`, {title: canvasTitle});
}

export const deleteCanvas = async(canvasId) => {
    return api.delete(`/api/canvases/${canvasId}`);
}

export const fetchGraphData = async (canvasId) => {
    return api.get(`/api/canvases/${canvasId}/graph`);
};

export const createConcept = async (canvasId, conceptData) => {
    return api.post(`/api/canvases/${canvasId}/concepts`, conceptData);
};

export const updateConcept = async (conceptId, conceptData) => {
    return api.patch(`/api/concepts/${conceptId}`, conceptData);
};

export const deleteConcept = async (conceptId) => {
    return api.delete(`/api/concepts/${conceptId}`);
};

export const createConnection = async (connectionData) => {
    return api.post('/api/connections', connectionData);
};

export const updateConnection = async(connectionId, connectionData) => {
    return api.patch(`/api/connections/${connectionId}`, connectionData);
};

export const deleteConnection = async (connectionId) => {
    return api.delete(`/api/connections/${connectionId}`);
};

// AUTHENTICATION API'S
export const registerUser = async (userData) => {
    return api.post('/api/auth/register', userData);
}

export const loginUser = async (userData) => {
    return api.post('/api/auth/login', userData);
}

export const logoutUser = async () => {
    return api.post('/api/auth/logout');
};

export default api;