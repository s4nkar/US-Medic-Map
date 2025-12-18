"use client";

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

// Dynamically import the Map component to avoid SSR issues with Leaflet
const ChoroplethMap = dynamic(
    () => import('./ChoroplethMap'),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 text-zinc-400">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm font-medium">Loading Map...</p>
                </div>
            </div>
        )
    }
);

export default ChoroplethMap;
