import { MapDataItem } from '@/types/api';
import { X, TrendingUp, TrendingDown, Activity, Calendar } from 'lucide-react';
import { useMemo } from 'react';

interface ReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: MapDataItem[];
    filters: {
        topic: string;
        year: number | string;
        demographic: string;
        indicator: string;
    };
}

export function ReportModal({ isOpen, onClose, data, filters }: ReportModalProps) {
    // Prevent rendering if not open
    if (!isOpen) return null;

    // Calculate Statistics
    const stats = useMemo(() => {
        if (!data || data.length === 0) return null;

        const values = data.map(d => d.value);
        const sum = values.reduce((a, b) => a + b, 0);
        const avg = sum / values.length;

        // Find Max
        const maxVal = Math.max(...values);
        const maxState = data.find(d => d.value === maxVal);

        // Find Min
        const minVal = Math.min(...values);
        const minState = data.find(d => d.value === minVal);

        // Sort for Top 5
        const top5 = [...data].sort((a, b) => b.value - a.value).slice(0, 5);

        return {
            avg,
            maxState,
            minState,
            top5,
            count: data.length,
            unit: data[0]?.unit || ''
        };
    }, [data]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-start bg-zinc-50/50 dark:bg-zinc-900/50">
                    <div>
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                            <Activity className="text-blue-500" />
                            Health Analysis Report
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-2 text-sm">
                            <Calendar size={14} />
                            {filters.year} • {filters.topic} • {filters.demographic}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-500"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto">
                    {!stats ? (
                        <div className="text-center py-12 text-zinc-400">
                            No data available to generate report.
                        </div>
                    ) : (
                        <div className="space-y-8">

                            {/* Key Metrics Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                                    <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">Average Value</div>
                                    <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                                        {stats.avg.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                                        <span className="text-sm font-normal text-blue-600/70 ml-1">{stats.unit}</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800">
                                    <div className="text-sm text-red-600 dark:text-red-400 font-medium mb-1 flex items-center gap-1">
                                        <TrendingUp size={14} /> Highest State
                                    </div>
                                    <div className="text-lg font-bold text-red-900 dark:text-red-100 truncate">
                                        {stats.maxState?.state_name}
                                    </div>
                                    <div className="text-sm text-red-700 dark:text-red-300">
                                        {stats.maxState?.value.toLocaleString()} {stats.unit}
                                    </div>
                                </div>
                                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800">
                                    <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-1 flex items-center gap-1">
                                        <TrendingDown size={14} /> Lowest State
                                    </div>
                                    <div className="text-lg font-bold text-emerald-900 dark:text-emerald-100 truncate">
                                        {stats.minState?.state_name}
                                    </div>
                                    <div className="text-sm text-emerald-700 dark:text-emerald-300">
                                        {stats.minState?.value.toLocaleString()} {stats.unit}
                                    </div>
                                </div>
                            </div>

                            {/* Indicator Description */}
                            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                                <h4 className="font-semibold text-sm text-zinc-900 dark:text-white mb-1">Measured Indicator</h4>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                    {filters.indicator}
                                </p>
                            </div>

                            {/* Top 5 Table */}
                            <div>
                                <h3 className="font-bold text-lg mb-4 text-zinc-900 dark:text-white">Top 5 Regions</h3>
                                <div className="overflow-hidden border border-zinc-200 dark:border-zinc-800 rounded-xl">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-zinc-50 dark:bg-zinc-900 text-zinc-500 font-medium border-b border-zinc-200 dark:border-zinc-800">
                                            <tr>
                                                <th className="px-4 py-3">Rank</th>
                                                <th className="px-4 py-3">State</th>
                                                <th className="px-4 py-3 text-right">Value ({stats.unit})</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                            {stats.top5.map((item, index) => (
                                                <tr key={item.state_abbr} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                                    <td className="px-4 py-3 font-medium text-zinc-400">#{index + 1}</td>
                                                    <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">{item.state_name}</td>
                                                    <td className="px-4 py-3 text-right font-mono text-zinc-600 dark:text-zinc-300">{item.value.toLocaleString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 cursor-pointer py-2 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 rounded-lg font-medium transition-colors"
                    >
                        Close Report
                    </button>
                </div>
            </div>
        </div>
    );
}
