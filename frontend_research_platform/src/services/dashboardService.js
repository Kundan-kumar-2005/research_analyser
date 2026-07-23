import axiosInstance from "../api/axiosInstance";

export const getDashboardStats = async () => {
    const response = await axiosInstance.get("/api/dashboard/stats");
    return response.data;
};