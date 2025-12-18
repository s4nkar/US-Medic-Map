import axiosInstance from "../utils/axiosInstance";
import { mapDataRoute, optionsRoute } from "../constants/api";

export const getMapData = async (filters: any) => {
    const params: any = {};

    // CHECK: Only add parameters if they are NOT "undefined" string or null
    if (filters.topic && filters.topic !== "undefined") params.topic = filters.topic;
    if (filters.indicator && filters.indicator !== "undefined") params.indicator = filters.indicator;
    if (filters.demographic && filters.demographic !== "undefined") params.demographic = filters.demographic;

    // CRITICAL FIX: Ensure year is a valid number before sending
    if (filters.year && filters.year !== "undefined") {
        params.year = filters.year;
    }

    // Debug log to confirm clean data
    console.log("Fetching map data with params:", params);

    const response = await axiosInstance.get("map/map-data/", { params });
    return response.data;
};

export const getOptions = async (topic?: string) => {
    try {
        const response = await axiosInstance.get(optionsRoute, {
            params: { topic: topic && topic !== "undefined" ? topic : undefined }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching options:", error);
        throw error;
    }
};
