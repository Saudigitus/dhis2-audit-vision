interface MonitoringGroupItem {
    id: string;
    // name: string;
    type: 'program' | 'dataSet';
}

interface MonitoringGroup {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    description: string;
    items: MonitoringGroupItem[];
}

export type { MonitoringGroup, MonitoringGroupItem }
