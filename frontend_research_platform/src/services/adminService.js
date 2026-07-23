import axiosInstance from "../api/axiosInstance";

export const approvePaper = async (id) => {
    const response = await axiosInstance.put(`/api/papers/${id}/approve`);
    return response.data;
};

export const rejectPaper = async (id) => {
    const response = await axiosInstance.put(`/api/papers/${id}/reject`);
    return response.data;
};

export const deletePaper = async (id) => {
    const response = await axiosInstance.delete(`/api/papers/${id}`);
    return response.data;
};