import axiosInstance from "../utils/axiosInstance";
import { mapDataRoute, optionsRoute } from "../constants/api";

export const getMapData = async (topic?: string, year?: number, demographic?: string, indicator?: string) => {
    try {
        const response = await axiosInstance.get(`${mapDataRoute}?topic=${topic}&year=${year}&demographic=${demographic}&indicator=${indicator}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching map data:", error);
        throw error;
    }
};

export const getOptions = async () => {
    try {
        const response = await axiosInstance.get(optionsRoute);
        return response.data;
    } catch (error) {
        console.error("Error fetching options:", error);
        throw error;
    }
};
