import axiosInstance from "../api/axiosInstance";

export const getAllPapers = async () => {
    const response = await axiosInstance.get("/api/papers");
    return response.data;
};

export const getPaperById = async (id) => {
    const response = await axiosInstance.get(`/api/papers/${id}`);
    return response.data;
};

export const downloadPaper = async (id) => {
    window.open(`http://localhost:8080/api/papers/download/${id}`, "_blank");
};

export const uploadPaper = async (formData) => {
    const response = await axiosInstance.post("/api/papers", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data;
};

export const searchPapers = async (keyword) => {
    const response = await axiosInstance.get(`/api/papers/search?keyword=${keyword}`);
    return response.data;
};