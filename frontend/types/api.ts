export interface MapDataItem {
    id: number;
    year: number;
    state_abbr: string;
    state_name: string;
    topic: string;
    indicator: string;
    value: number;
    unit: string;
    demographic: string;
}

export interface FilterOptions {
    topics: string[];
    indicators: string[];
    years: number[];
    demographics: string[];
}
