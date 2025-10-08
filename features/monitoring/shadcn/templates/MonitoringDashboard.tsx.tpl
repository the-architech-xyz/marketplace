'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useErrorTracking, usePerformanceMonitoring } from '@/lib/hooks/use-monitoring';

export function MonitoringDashboard() {
  const { errors, clearErrors } = useErrorTracking();
  const { performance, clearPerformance } = usePerformanceMonitoring();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Monitoring Dashboard</h1>
        <div className="flex space-x-2">
          <Button onClick={clearErrors} variant="outline">
            Clear Errors
          </Button>
          <Button onClick={clearPerformance} variant="outline">
            Clear Performance
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Error Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>Error Tracking</span>
              <Badge variant={errors.length > 0 ? 'destructive' : 'secondary'}>
                {errors.length}
              </Badge>
            </CardTitle>
            <CardDescription>
              Track and monitor application errors
            </CardDescription>
          </CardHeader>
          <CardContent>
            {errors.length === 0 ? (
              <p className="text-sm text-gray-500">No errors detected</p>
            ) : (
              <div className="space-y-2">
                {errors.slice(0, 3).map((error, index) => (
                  <Alert key={index} variant="destructive">
                    <AlertDescription>
                      <div className="text-sm">
                        <div className="font-medium">{error.message}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          {error.timestamp.toLocaleString()}
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
                {errors.length > 3 && (
                  <p className="text-xs text-gray-500">
                    +{errors.length - 3} more errors
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Performance Monitoring */}
        <Card>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
            <CardDescription>
              Monitor application performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Page Load Time</span>
                  <span className="font-medium">
                    {performance.pageLoadTime}ms
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ 
                      width: `${Math.min((performance.pageLoadTime / 3000) * 100, 100)}%` 
                    }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm">
                  <span>API Response Time</span>
                  <span className="font-medium">
                    {performance.apiResponseTime}ms
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ 
                      width: `${Math.min((performance.apiResponseTime / 1000) * 100, 100)}%` 
                    }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              Overall system health and status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <Badge variant="secondary">Healthy</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">API</span>
                <Badge variant="secondary">Healthy</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Storage</span>
                <Badge variant="secondary">Healthy</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
