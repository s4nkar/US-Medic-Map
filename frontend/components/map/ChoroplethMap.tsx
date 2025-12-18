"use client";

import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import chroma from 'chroma-js';
import 'leaflet/dist/leaflet.css';
import { MapDataItem } from '@/types/api';

// Fix for default marker icons in Next.js
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface ChoroplethMapProps {
    data: MapDataItem[];
}

const US_CENTER: [number, number] = [37.8, -96];
const ZOOM_LEVEL = 4;

const GEOJSON_URL = "https://raw.githubusercontent.com/python-visualization/folium/master/examples/data/us-states.json";

function Legend({ scale, min, max, unit }: { scale: chroma.Scale, min: number, max: number, unit: string }) {
    const map = useMap();

    useEffect(() => {
        const legend = new L.Control({ position: 'bottomright' });

        legend.onAdd = () => {
            const div = L.DomUtil.create('div', 'info legend bg-white/90 p-4 rounded-lg shadow-lg text-xs');
            const grades = [0, 0.2, 0.4, 0.6, 0.8, 1];

            let labels = [`<div class="mb-2 font-bold">${unit}</div>`];

            // Generate gradient bar
            const gradientColors = grades.map(g => scale(min + g * (max - min)).hex()).join(', ');
            labels.push(
                `<div style="background: linear-gradient(to right, ${gradientColors}); height: 10px; width: 100%; border-radius: 2px; margin-bottom: 5px;"></div>`
            );

            // Labels for min and max
            labels.push(
                `<div class="flex justify-between w-full"><span>${Math.round(min)}</span><span>${Math.round(max)}</span></div>`
            );

            div.innerHTML = labels.join('');
            return div;
        };

        legend.addTo(map);
        return () => {
            legend.remove();
        };
    }, [map, scale, min, max, unit]);

    return null;
}

import { Plus, Minus, Layers } from 'lucide-react';

// Custom Map Controls Component
function MapControls({ onToggleLabels, showLabels }: { onToggleLabels: () => void, showLabels: boolean }) {
    const map = useMap();

    return (
        <div className="leaflet-top leaflet-right">
            <div className="leaflet-control flex flex-col gap-2 mt-4 mr-4 pointer-events-auto">
                {/* Zoom Controls */}
                <div className="flex flex-col bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden">
                    <button
                        onClick={() => map.zoomIn()}
                        className="w-10 h-10 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors border-b border-zinc-100 dark:border-zinc-800"
                    >
                        <Plus size={18} />
                    </button>
                    <button
                        onClick={() => map.zoomOut()}
                        className="w-10 h-10 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
                    >
                        <Minus size={18} />
                    </button>
                </div>

                {/* Layer Toggle */}
                <button
                    onClick={onToggleLabels}
                    className={`w-10 h-10 rounded-xl shadow-xl border border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-center transition-colors
                        ${showLabels
                            ? 'bg-blue-600 text-white border-blue-500'
                            : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                        }
                    `}
                    title="Toggle Labels"
                >
                    <Layers size={18} />
                </button>
            </div>
        </div>
    );
}

// Component to render labels on top of the GeoJSON layer using a custom pane
function MapLabels({ show }: { show: boolean }) {
    const map = useMap();
    const [paneReady, setPaneReady] = useState(false);

    useEffect(() => {
        if (!map.getPane('labels')) {
            map.createPane('labels');
            const pane = map.getPane('labels');
            if (pane) {
                pane.style.zIndex = '650'; // Higher than vectors (400) and markers (600)
                pane.style.pointerEvents = 'none'; // Click through to map
            }
        }
        setPaneReady(true);
    }, [map]);

    if (!paneReady || !show) return null;

    return (
        <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
            attribution='&copy; CARTO'
            pane="labels"
        />
    );
}

export default function ChoroplethMap({
    data,
    topic,
    year,
    indicator,
    demographic
}: {
    data: MapDataItem[],
    topic: string,
    year: number | string,
    indicator: string,
    demographic: string
}) {
    const [geoJson, setGeoJson] = useState<any>(null);
    const [showLabels, setShowLabels] = useState(true);

    useEffect(() => {
        fetch(GEOJSON_URL)
            .then(res => res.json())
            .then(data => setGeoJson(data))
            .catch(err => console.error("Failed to load US GeoJSON", err));
    }, []);

    // Create a map of state_abbr -> value
    const dataMap = useMemo(() => {
        const map = new Map<string, { value: number, unit: string, indicator: string }>();
        data.forEach(item => {
            const abbr = item.state_abbr.trim();
            map.set(abbr, {
                value: item.value,
                unit: item.unit,
                indicator: item.indicator
            });
        });
        return map;
    }, [data]);

    // Calculate Min/Max for color scale
    const { min, max, unit } = useMemo(() => {
        let min = Infinity;
        let max = -Infinity;
        let unit = "";

        if (data.length === 0) return { min: 0, max: 100, unit: "" };

        data.forEach(d => {
            const val = Number(d.value);
            if (val < min) min = val;
            if (val > max) max = val;
            if (d.unit) unit = d.unit;
        });

        return { min, max, unit };
    }, [data]);

    // Dynamic Color Scale based on Topic
    const colorScale = useMemo(() => {
        let colors = ['#f7fbff', '#08519c']; // Default Blue

        if (topic && topic.toLowerCase().includes('heart')) {
            // Yellow -> Orange -> Red -> Brown-ish Red
            colors = ['#ffeda0', '#feb24c', '#f03b20', '#bd0026'];
        } else if (topic && topic.toLowerCase().includes('stroke')) {
            // Light Purple -> Dark Purple
            colors = ['#efedf5', '#bcbddc', '#756bb1', '#54278f'];
        }

        return chroma.scale(colors).domain([min, max]);
    }, [topic, min, max]);

    // Style function - extracted to be reusable
    const getStyle = (feature: any) => {
        const stateAbbr = feature.id;
        const stateData = dataMap.get(stateAbbr);
        const value = stateData?.value;

        return {
            fillColor: value !== undefined ? colorScale(value).hex() : '#ececec',
            weight: 1,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.9 // Increased from 0.75 to match hover opacity to prevent "fading" effect
        };
    };

    const onEachFeature = (feature: any, layer: L.Layer) => {
        const stateAbbr = feature.id;
        const stateData = dataMap.get(stateAbbr);
        const stateName = feature.properties.name;

        // Tooltip
        if (stateData) {
            layer.bindTooltip(`
                <div class="text-sm font-sans">
                    <div class="font-bold border-b border-zinc-700 pb-1 mb-1 text-white">${stateName}</div>
                    <div class="flex justify-between gap-4">
                        <span class="text-zinc-400">${topic}:</span>
                        <span class="font-bold text-white">${stateData.value.toLocaleString()}</span>
                    </div>
                    <div class="text-xs text-zinc-500 mt-1">${stateData.unit}</div>
                </div>
            `, {
                sticky: true,
                className: '!bg-zinc-900/95 !backdrop-blur-sm !shadow-2xl !border !border-zinc-700/50 !p-3 !rounded-xl !text-white' // Reduced blur for performance
            });
        } else {
            layer.bindTooltip(`<div class="font-sans text-white font-bold">${stateName}: No Data</div>`, {
                sticky: true,
                className: '!bg-zinc-900/95 !backdrop-blur-sm !shadow-2xl !border !border-zinc-700/50 !p-2 !rounded-lg' // Reduced blur for performance
            });
        }

        // Interactions
        layer.on({
            mouseover: (e) => {
                const l = e.target;
                l.setStyle({
                    weight: 2, // Thinner border
                    color: '#ffffff', // White border on hover
                    dashArray: '',
                    fillOpacity: 0.9,
                });
                l.bringToFront();
            },
            mouseout: (e) => {
                const l = e.target;
                // CRITICAL KEY FIX: Ensure this style calculation uses the *current* render's closure
                // by forcing re-mount via key.
                const originalStyle = getStyle(feature);
                l.setStyle(originalStyle);
            }
        });
    };

    return (
        <MapContainer
            center={US_CENTER}
            zoom={ZOOM_LEVEL}
            style={{ height: '100%', width: '100%', background: 'transparent' }}
            zoomControl={false}
        >
            <TileLayer
                // Switch to NO LABELS for base layer, because we add them on top
                url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
                attribution='&copy; CARTO'
            />
            {geoJson && (
                <GeoJSON
                    // KEY PROP IS CRITICAL: Forces re-creation of layer when filters change,
                    // ensuring onEachFeature has access to FRESH dataMap closure.
                    key={`${topic}-${year}-${indicator}-${demographic}`}
                    data={geoJson}
                    style={getStyle}
                    onEachFeature={onEachFeature}
                />
            )}

            {/* Render labels ON TOP of GeoJSON */}
            <MapLabels show={showLabels} />
            <MapControls onToggleLabels={() => setShowLabels(!showLabels)} showLabels={showLabels} />

            {data.length > 0 && <Legend scale={colorScale} min={min} max={max} unit={unit} />}
        </MapContainer>
    );
}

