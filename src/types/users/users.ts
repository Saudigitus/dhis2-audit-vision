export interface User {
  name: string;
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
  NameX: number;
  NameY: number;
  NameZ: number;
  NameD: number;
  NameE: number;
}
