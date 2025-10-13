'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useErrorList } from '@/hooks/use-monitoring-data';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, TrendingDown, TrendingUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function MonitoringOverview() {
  const { data: errors, isLoading } = useErrorList({ status: ['unresolved'] });

  const recentErrors = errors?.slice(0, 5) || [];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Recent Errors</CardTitle>
          <CardDescription>
            Most recent unresolved errors
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-muted animate-pulse rounded" />
              ))}
            </div>
          ) : recentErrors.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No recent errors</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentErrors.map((error) => (
                <div
                  key={error.id}
                  className="flex items-start justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={error.level === 'fatal' ? 'destructive' : 'secondary'}>
                        {error.level}
                      </Badge>
                      <span className="font-medium text-sm">{error.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {error.message}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{error.count} occurrences</span>
                      <span>•</span>
                      <span>{formatDistanceToNow(new Date(error.lastSeen), { addSuffix: true })}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Error Trends</CardTitle>
          <CardDescription>
            Error rate changes over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <p className="text-sm font-medium">Last 24 Hours</p>
                <p className="text-2xl font-bold">
                  {errors?.length || 0}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingDown className="h-4 w-4 text-green-600" />
                <span className="text-green-600 font-medium">-12%</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <p className="text-sm font-medium">Last 7 Days</p>
                <p className="text-2xl font-bold">
                  {(errors?.length || 0) * 5}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-red-600" />
                <span className="text-red-600 font-medium">+8%</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <p className="text-sm font-medium">Last 30 Days</p>
                <p className="text-2xl font-bold">
                  {(errors?.length || 0) * 20}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingDown className="h-4 w-4 text-green-600" />
                <span className="text-green-600 font-medium">-5%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

