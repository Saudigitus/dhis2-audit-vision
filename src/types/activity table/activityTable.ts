export interface ActivityTableCheck {
    items: itemsArray[]
    title: string
    action: {
        label: string
        onClick: () => void
    }
}

interface itemsArray {
    id: number;
    category: string;
    check: string;
    status: string;
    description: string;
}