import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/candidates';

export const fetchCandidates = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to fetch candidates');
    }
};

export const createCandidate = async (formData) => {
    try {
        const response = await axios.post(API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to submit application');
    }
};

export const updateCandidateStatus = async (id, status) => {
    try {
        const response = await axios.put(`${API_URL}/${id}/status`, { status });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to update status');
    }
};
