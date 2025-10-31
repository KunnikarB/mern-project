/* eslint-disable @typescript-eslint/no-explicit-any */
import { Scatter } from 'react-chartjs-2';
import 'chart.js/auto';
import type { TooltipItem } from 'chart.js';

interface UserWeeklyStat {
  userId: number;
  username: string;
  numOfSessionsPerWeek: number;
  averageSessionLengthPerWeek: number;
  isCurrentUser: boolean;
}

interface Props {
  weeklyStats: UserWeeklyStat[];
  color?: string;
  height?: number | string;
}

export default function ScatterChart({
  weeklyStats,
  color = '#f15bb5',
  height = 360,
}: Props) {
  if (!weeklyStats || weeklyStats.length === 0) {
    return (
      <div className="text-gray-500 text-center py-10">
        No data available for this game.
      </div>
    );
  }

  const dataPoints = weeklyStats.map((s) => ({
    x: s.numOfSessionsPerWeek,
    y: Math.ceil(s.averageSessionLengthPerWeek),
  }));

  const backgroundColors = weeklyStats.map((s) =>
    s.isCurrentUser ? color : 'rgba(255,255,255,0)'
  );
  const borderColors = weeklyStats.map(() => color);
  const radii = weeklyStats.map((s) => (s.isCurrentUser ? 10 : 7));
  const borderWidths = weeklyStats.map((s) => (s.isCurrentUser ? 2.5 : 2));

  const maxX =
    Math.max(...weeklyStats.map((d) => d.numOfSessionsPerWeek || 0), 0) + 2;
  const maxY =
    Math.max(
      ...weeklyStats.map((d) => Math.ceil(d.averageSessionLengthPerWeek) || 0),
      0
    ) + 2;

  const data = {
    datasets: [
      {
        label: 'Sessions vs Average Session Length',
        data: dataPoints,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        pointRadius: (ctx: any) => radii[ctx.dataIndex] / 2,
        pointHoverRadius: (ctx: any) => radii[ctx.dataIndex] / 2 + 1,
        pointBorderWidth: (ctx: any) => borderWidths[ctx.dataIndex],
        pointStyle: 'circle' as const,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'scatter'>) => {
            const stat = weeklyStats[context.dataIndex];
            return `${stat.username}: (${
              stat.numOfSessionsPerWeek
            } sessions, ${Math.ceil(
              stat.averageSessionLengthPerWeek
            )} minutes)`;
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'Number of Sessions' },
        beginAtZero: true,
        suggestedMax: maxX,
      },
      y: {
        title: { display: true, text: 'Average Session Length (minutes)' },
        beginAtZero: true,
        suggestedMax: maxY,
      },
    },
  };

  return (
    <div style={{ height }}>
      <Scatter data={data} options={options} />
    </div>
  );
}
