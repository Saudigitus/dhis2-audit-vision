export interface User {
  name: string;
  username?: string;
  initial: string;
  color: string;
  role: string;
  roleColor: string;
  status: string;
  lastActive: string;
  changes: number;
  email: string;
}

export interface UserActivity {
  date: string;
  type: string;
  object: string;
  action: string;
}

export interface ChartData {
  name: string;
  [key: string]: string | number;
}
