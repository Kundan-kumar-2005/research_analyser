import axiosInstance from "../api/axiosInstance";

export const addReview = async (paperId, reviewData) => {
    const response = await axiosInstance.post(`/api/reviews/${paperId}`, reviewData);
    return response.data;
};

export const getReviewsByPaper = async (paperId) => {
    const response = await axiosInstance.get(`/api/reviews/paper/${paperId}`);
    return response.data;
};