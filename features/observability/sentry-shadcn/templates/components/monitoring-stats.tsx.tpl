'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { MonitoringStats } from '@/types/monitoring';
import { AlertCircle, Users, Activity, Clock } from 'lucide-react';

interface MonitoringStatsProps {
  stats?: MonitoringStats;
}

export function MonitoringStats({ stats }: MonitoringStatsProps) {
  if (!stats) return null;

  const statCards = [
    {
      title: 'Total Errors',
      value: stats.totalErrors.toLocaleString(),
      icon: AlertCircle,
      description: 'Errors captured',
      trend: stats.errorRate > 0 ? `${stats.errorRate.toFixed(2)}% error rate` : 'No errors'
    },
    {
      title: 'Affected Users',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      description: 'Users impacted',
      trend: 'Across all errors'
    },
    {
      title: 'Uptime',
      value: `${stats.uptime.toFixed(2)}%`,
      icon: Activity,
      description: 'System availability',
      trend: 'Last 30 days'
    },
    {
      title: 'Avg Response Time',
      value: `${stats.avgResponseTime}ms`,
      icon: Clock,
      description: 'API response time',
      trend: 'Last 24 hours'
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
              <p className="text-xs text-muted-foreground mt-1 opacity-70">
                {stat.trend}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

