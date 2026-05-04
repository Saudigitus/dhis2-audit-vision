import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartData } from '../../types/users/users';

interface UserChangesChartProps {
  data: ChartData[];
  usernames: string[];
}

const colors = ['#6366f1', '#f43f5e', '#fb923c', '#8b5cf6', '#b91c1c'];

const UserChangesChart: React.FC<UserChangesChartProps> = ({ data, usernames }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <h3 className="text-sm font-medium text-indigo-600 mb-6">Top 5 Active Users</h3>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              label={{ value: 'Changes', angle: -90, position: 'insideLeft', offset: -10, style: { textAnchor: 'middle', fill: '#6b7280', fontSize: 12 } }}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="diamond"
              wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }}
            />
            {usernames.map((username, index) => (
              <Line
                key={username}
                type="monotone"
                dataKey={username}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserChangesChart;
