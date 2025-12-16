"use client";

import { motion } from "framer-motion";
import { ArrowRight, Activity, Map as MapIcon, BarChart3, ShieldCheck, Globe } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans selection:bg-blue-500/20">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                            <Activity size={20} />
                        </div>
                        <span className="font-bold text-xl tracking-tight">MedicMap</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="/about" className="text-sm font-medium hover:text-blue-600 transition-colors hidden sm:block">
                            About
                        </Link>
                        <Link href="/data" className="text-sm font-medium hover:text-blue-600 transition-colors hidden sm:block">
                            Data Sources
                        </Link>
                        <Link href="/map" className="flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
                            Launch Map
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-16 px-6">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto mb-20 md:mb-32">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 text-center md:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wide mb-6">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                    </span>
                                    Live Health Data Visualization
                                </div>
                                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                                    Visualizing America's <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                                        Health Landscape
                                    </span>
                                </h1>
                                <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                                    Explore interactive health metrics, demographic trends, and predictive insights across the United States with our advanced geospatial analytics platform.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                                    <Link href="/map" className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20">
                                        <MapIcon size={18} />
                                        Explore the Map
                                    </Link>
                                    <Link href="/about" className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all">
                                        Learn More
                                        <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </motion.div>
                        </div>

                        {/* Abstract Map Visual */}
                        <motion.div
                            className="flex-1 w-full max-w-lg md:max-w-none relative"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                                {/* Decorative Gradients */}
                                <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl"></div>
                                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-500/30 rounded-full blur-3xl"></div>

                                {/* Abstract UI Elements representing the map */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative grid grid-cols-2 gap-4 w-4/5 h-4/5 opacity-80 rotate-3">
                                        <div className="bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-between border border-white/20 dark:border-zinc-700/50">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                                                <Activity size={20} />
                                            </div>
                                            <div>
                                                <div className="h-2 w-16 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-2"></div>
                                                <div className="h-2 w-24 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
                                            </div>
                                        </div>
                                        <div className="bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-between border border-white/20 dark:border-zinc-700/50 mt-8">
                                            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                                                <BarChart3 size={20} />
                                            </div>
                                            <div>
                                                <div className="h-2 w-20 bg-zinc-200 dark:bg-zinc-700 rounded-full mb-2"></div>
                                                <div className="h-8 w-full bg-zinc-100 dark:bg-zinc-900/50 rounded-lg mt-2 relative overflow-hidden">
                                                    <div className="absolute left-0 top-0 bottom-0 w-[70%] bg-green-500/20 rounded-lg"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-between border border-white/20 dark:border-zinc-700/50 -mt-8">
                                            <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
                                                <ShieldCheck size={20} />
                                            </div>
                                            <div className="mt-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="h-2 w-8 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
                                                    <div className="h-2 w-8 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
                                                </div>
                                                <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                                                    <div className="h-full w-2/3 bg-orange-500 rounded-full"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 flex flex-col justify-center text-center text-white shadow-xl">
                                            <div className="text-3xl font-bold mb-1">98%</div>
                                            <div className="text-blue-100 text-xs font-medium">Coverage Analysis</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="max-w-7xl mx-auto mb-20">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Why use MedicMap?</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                            Our platform provides unprecedented access to unified health datasets, empowering researchers, policymakers, and the public.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Globe className="text-blue-500" />}
                            title="Nationwide Coverage"
                            description="Access comprehensive health metrics across state, county, and zip-code levels with granular precision."
                        />
                        <FeatureCard
                            icon={<BarChart3 className="text-purple-500" />}
                            title="Real-time Analytics"
                            description="Visualize trends as they evolve with dynamic charts, heatmaps, and year-over-year comparisons."
                        />
                        <FeatureCard
                            icon={<ShieldCheck className="text-emerald-500" />}
                            title="Verified Data Sources"
                            description="Trust in data agregated from CDC, NIH, and verified clinical partners for high-fidelity insights."
                        />
                    </div>
                </section>
            </main>

            <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-12">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-zinc-900 dark:bg-zinc-100 rounded flex items-center justify-center text-white dark:text-zinc-900">
                            <Activity size={14} />
                        </div>
                        <span className="font-semibold text-lg">MedicMap</span>
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                        © 2025 MedicMap Inc. All rights reserved.
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="text-zinc-500 hover:text-blue-600 transition-colors">Privacy</a>
                        <a href="#" className="text-zinc-500 hover:text-blue-600 transition-colors">Terms</a>
                        <a href="#" className="text-zinc-500 hover:text-blue-600 transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="w-12 h-12 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
}
