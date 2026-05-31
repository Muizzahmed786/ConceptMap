import axios from 'axios';

const BASE_URL = 'http://localhost:5000'

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

export const fetchGraphData = async (canvasId) => {
    return api.get(`/api/canvases/${canvasId}/graph`);
};

export const createConcept = async (canvasId, conceptData) => {
    return api.post(`/api/canvases/${canvasId}/concepts`, conceptData);
};

export const updateConcept = async (conceptId, conceptData) => {
    return api.patch(`/api/concepts/${conceptId}`, conceptData);
};

export default api;