
export interface SeverityRule {
  id: string;
  level: 'High' | 'Medium' | 'Low';
  action: string;
  objectType: string;
  includeMessage: boolean;
  emails: string[];
  includeWhatsapp: boolean;
  customMessage?: string;
}

export interface NotificationContact {
  id: string;
  type: 'email' | 'whatsapp';
  value: string;
  label: string;
}
