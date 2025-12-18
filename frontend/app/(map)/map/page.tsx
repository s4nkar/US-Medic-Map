"use client";

import { FilterSelect } from '@/components/FilterSelect';
import { Filter, Layers, Map as MapIcon, Search, Plus, Minus, Info } from 'lucide-react';
import Link from 'next/link';

export default function MapPage() {
    return (
        <div className="relative w-full h-screen bg-zinc-50 dark:bg-zinc-950 overflow-hidden font-sans text-zinc-900 dark:text-zinc-100">

            {/* Map Placeholder Area */}
            <div className="absolute inset-0 z-0 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                <div className="text-center opacity-40 select-none pointer-events-none">
                    <MapIcon size={80} className="mx-auto mb-6 text-zinc-300 dark:text-zinc-700" />
                    <h2 className="text-3xl font-bold mb-2 tracking-tight text-zinc-400 dark:text-zinc-600">Map Visualization Area</h2>
                    <p className="text-zinc-400 dark:text-zinc-600">Integration pending...</p>
                </div>
                {/* Grid pattern to simulate map texture */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: 'linear-gradient(#00000008 1px, transparent 1px), linear-gradient(90deg, #00000008 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                ></div>
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
                        <div className="relative group">
                            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search zip code, county, or state..."
                                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>

                        {/* Data Controls */}
                        <div className="space-y-5">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Data Parameters</span>
                                <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800"></div>
                            </div>

                            <FilterSelect label="Topic" icon={<Filter size={14} />}>
                                <option>Asthma Prevalence</option>
                                <option>Diabetes Monitoring</option>
                                <option>Cardiac Health</option>
                                <option>Mental Health Services</option>
                            </FilterSelect>

                            <div className="grid grid-cols-2 gap-4">
                                <FilterSelect label="Year">
                                    <option>2024</option>
                                    <option>2023</option>
                                    <option>2022</option>
                                </FilterSelect>
                                <FilterSelect label="Region Level">
                                    <option>County</option>
                                    <option>State</option>
                                    <option>Zip Code</option>
                                </FilterSelect>
                            </div>

                            <FilterSelect label="Demographic (Optional)">
                                <option>All Demographics</option>
                                <option>Age 0-18</option>
                                <option>Age 19-64</option>
                                <option>Age 65+</option>
                            </FilterSelect>
                        </div>

                        {/* Stats Preview Mockup */}
                        <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
                            <div className="flex items-start gap-3">
                                <Info size={16} className="text-blue-500 mt-0.5 shrink-0" />
                                <div>
                                    <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Quick Insight</h4>
                                    <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                                        Select a region on the map to view detailed breakdown of health metrics and historical comparisons.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800">
                        <button className="w-full py-3 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 rounded-xl font-semibold text-sm transition-all shadow-md active:scale-[0.98]">
                            View Detailed Report
                        </button>
                    </div>
                </div>
            </div>

            {/* Map Controls */}
            <div className="absolute right-6 bottom-8 flex flex-col gap-3 z-10 pointer-events-auto">
                <div className="flex flex-col bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden">
                    <button className="w-11 h-11 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors border-b border-zinc-100 dark:border-zinc-800">
                        <Plus size={20} />
                    </button>
                    <button className="w-11 h-11 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors">
                        <Minus size={20} />
                    </button>
                </div>

                <button className="w-11 h-11 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors">
                    <Layers size={20} />
                </button>
            </div>

        </div>
    );
}


