import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
    },
});

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

export default api;