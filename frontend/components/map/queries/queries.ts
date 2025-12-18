import {
    getOptions,
    getMapData
} from '@/lib/api';

import {
    useQuery
} from '@tanstack/react-query';

export const useGetOptions = () => {
    return useQuery({
        queryKey: ['options'],
        queryFn: async () => getOptions()
    });
};

export const useGetMapData = () => {
    return useQuery({
        queryKey: ['mapData'],
        queryFn: async () => getMapData()
    });
};