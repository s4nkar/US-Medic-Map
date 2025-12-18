import {
    getOptions,
    getMapData
} from '@/lib/api';

import {
    useQuery
} from '@tanstack/react-query';

export const useGetOptions = (topic?: string) => {
    return useQuery({
        queryKey: ['options', topic],
        queryFn: async () => getOptions(topic)
    });
};

export const useGetMapData = (topic?: string, year?: number, demographic?: string, indicator?: string) => {
    return useQuery({
        queryKey: ['mapData', topic, year, demographic, indicator],
        queryFn: async () => getMapData({ topic, year, demographic, indicator })
    });
};