"use client";

import { useEffect, useState } from 'react';
import { FilterSelect } from '@/components/map/FilterSelect';
import LeafletMap from '@/components/map/LeafletMap';
import { useGetMapData, useGetOptions } from '@/components/map/queries/queries';
import { ReportModal } from '@/components/map/ReportModal';
import { Filter, Layers, Map as MapIcon, Search, Plus, Minus, Info, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { MapDataItem } from '@/types/api';

export default function MapPage() {
    // State for filters
    const [topic, setTopic] = useState<string>("");
    const [year, setYear] = useState<number | "">("");
    const [demographic, setDemographic] = useState<string>("");
    const [indicator, setIndicator] = useState<string>("");

    // Modal State
    const [isReportOpen, setIsReportOpen] = useState(false);

    const { data: options, isLoading: isLoadingOptions } = useGetOptions(topic || undefined);

    // Set defaults when options load
    useEffect(() => {
        if (options) {
            if (options.topics?.length > 0 && !topic) {
                const strokeTopic = options.topics.find((t: string) => t.toLowerCase().includes("stroke"));
                setTopic(strokeTopic || options.topics[0]);
            }
            if (options.years?.length > 0 && !year) setYear(options.years[0]);
            if (options.demographics?.length > 0 && !demographic) {
                // Default to Overall (Aggregate) if available, otherwise first option
                setDemographic(options.demographics.includes("Overall") ? "Overall" : options.demographics[0]);
            }
            if (options.indicators?.length > 0) {
                // If no indicator selected, OR current indicator is not valid for this topic/options
                if (!indicator || !options.indicators.includes(indicator)) {
                    setIndicator(options.indicators[0]);
                }
            }
        }
    }, [options, topic, year, demographic, indicator]);

    // Fetch map data based on current filters
    // We only fetch if we have at least some basic filters set to avoid massive unaggregated data
    const canFetch = !!topic && !!year;
    const { data: mapData, isLoading: isLoadingMapData } = useGetMapData(
        topic || undefined,
        year ? Number(year) : undefined,
        demographic || undefined,
        indicator || undefined
    );

    const displayData: MapDataItem[] = Array.isArray(mapData) ? mapData : [];

    return (
        <div className="relative w-full h-screen bg-zinc-50 dark:bg-zinc-950 overflow-hidden font-sans text-zinc-900 dark:text-zinc-100">

            {/* Report Modal */}
            <ReportModal
                isOpen={isReportOpen}
                onClose={() => setIsReportOpen(false)}
                data={displayData}
                filters={{ topic, year, demographic, indicator }}
            />

            {/* Map Area */}
            {/* Map Area */}
            <div className="absolute inset-0 z-0 bg-zinc-100 dark:bg-zinc-900">
                <LeafletMap
                    // FORCE RE-MOUNT ON FILTER CHANGE
                    // This ensures Leaflet instance is fresh and event listeners (mouseover/out)
                    // have the correct closure for the new data.
                    key={`${topic}-${year}-${indicator}-${demographic}`}
                    data={displayData}
                    topic={topic}
                    year={year}
                    indicator={indicator}
                    demographic={demographic}
                />

                {(!canFetch) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-100/50 dark:bg-zinc-900/50 z-10 backdrop-blur-sm">
                        <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-2xl max-w-md text-center">
                            <Info className="mx-auto mb-4 text-blue-500" size={32} />
                            <h3 className="text-xl font-bold mb-2">Select Filters</h3>
                            <p className="text-zinc-500 dark:text-zinc-400">Please select a Topic and Year to visualize data.</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Floating Sidebar */}
            <div className="absolute left-6 top-6 bottom-6 w-[360px] flex flex-col z-10 pointer-events-none">
                {/* Main Panel */}
                <div className="flex-1 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-zinc-200/50 dark:border-zinc-800/50 flex flex-col overflow-hidden pointer-events-auto">

                    {/* Header */}
                    <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <Link href="/" className="w-10 h-10 bg-blue-600 hover:bg-blue-700 transition-colors rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                <MapIcon size={20} />
                            </Link>
                            <div>
                                <h1 className="font-bold text-lg leading-tight">MedicMap Explorer</h1>
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-7 scrollbar-hide">

                        {/* Search */}
                        {/* <div className="relative group">
                            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search zip code, county, or state..."
                                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                            />
                        </div> */}

                        {/* Data Controls */}
                        <div className="space-y-5">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Data Parameters</span>
                                <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800"></div>
                            </div>

                            {isLoadingOptions ? (
                                <div className="flex justify-center py-4 text-zinc-400">
                                    <Loader2 className="animate-spin" />
                                </div>
                            ) : (
                                <>
                                    <FilterSelect
                                        label="Topic"
                                        icon={<Filter size={14} />}
                                        value={topic}
                                        onChange={(e) => {
                                            setTopic(e.target.value);
                                        }}
                                    >
                                        <option value="" disabled>Select Topic</option>
                                        {options?.topics?.map((t: string) => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </FilterSelect>

                                    <div className="grid grid-cols-2 gap-4">
                                        <FilterSelect
                                            label="Year"
                                            value={year}
                                            onChange={(e) => setYear(Number(e.target.value))}
                                        >
                                            <option value="" disabled>Select Year</option>
                                            {options?.years?.map((y: number) => (
                                                <option key={y} value={y}>{y}</option>
                                            ))}
                                        </FilterSelect>
                                        <FilterSelect label="Region Level" disabled>
                                            <option>State</option>
                                        </FilterSelect>
                                    </div>

                                    <FilterSelect
                                        label="Demographic Group"
                                        value={demographic}
                                        onChange={(e) => setDemographic(e.target.value)}
                                    >
                                        {options?.demographics?.includes('Overall') && (
                                            <option value="Overall">All Patients (Aggregate)</option>
                                        )}
                                        {options?.demographics?.filter((d: string) => d !== 'Overall').map((d: string) => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </FilterSelect>

                                    <FilterSelect
                                        label="Specific Indicator"
                                        value={indicator}
                                        onChange={(e) => setIndicator(e.target.value)}
                                    >
                                        <option value="" disabled>Select Indicator</option>
                                        {options?.indicators?.map((ind: string) => (
                                            <option key={ind} value={ind}>{ind}</option>
                                        ))}
                                    </FilterSelect>
                                </>
                            )}
                        </div>

                        {/* Stats Preview Mockup */}
                        <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
                            <div className="flex items-start gap-3">
                                <Info size={16} className="text-blue-500 mt-0.5 shrink-0" />
                                <div>
                                    <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Quick Insight</h4>
                                    <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                                        Visualize {topic || 'Health Data'} across states for {year || 'selected year'}.
                                        {isLoadingMapData && <span className="block mt-1 font-bold animate-pulse">Loading Data...</span>}
                                        {!isLoadingMapData && displayData.length > 0 && (
                                            <span className="block mt-1">Found {displayData.length} records.</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800">
                        <button
                            onClick={() => setIsReportOpen(true)}
                            disabled={!canFetch}
                            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all shadow-md active:scale-[0.98]
                                ${canFetch
                                    ? 'bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900'
                                    : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed shadow-none'
                                }
                            `}
                        >
                            View Detailed Report
                        </button>
                    </div>
                </div>
            </div>

            {/* Map Controls */}
            {/* Map Controls - Moved to inside Leaflet Map component */}

        </div>
    );
}


