import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, Zap, Clock, Database, Cpu, HardDrive, Wifi } from 'lucide-react';

interface PerformanceMetric {
  name: string;
  value: string;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  change: number;
}

const mockMetrics: PerformanceMetric[] = [
  {
    name: 'Response Time',
    value: '245',
    unit: 'ms',
    status: 'good',
    trend: 'down',
    change: -12.5
  },
  {
    name: 'Throughput',
    value: '1,234',
    unit: 'req/s',
    status: 'good',
    trend: 'up',
    change: 8.3
  },
  {
    name: 'Error Rate',
    value: '0.12',
    unit: '%',
    status: 'good',
    trend: 'down',
    change: -0.05
  },
  {
    name: 'CPU Usage',
    value: '68',
    unit: '%',
    status: 'warning',
    trend: 'up',
    change: 5.2
  },
  {
    name: 'Memory Usage',
    value: '82',
    unit: '%',
    status: 'warning',
    trend: 'up',
    change: 3.1
  },
  {
    name: 'Disk I/O',
    value: '156',
    unit: 'MB/s',
    status: 'good',
    trend: 'stable',
    change: 0.0
  }
];

export default function PerformancePage() {
  const getStatusColor = (status: PerformanceMetric['status']) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
    }
  };

  const getTrendIcon = (trend: PerformanceMetric['trend']) => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      case 'stable': return '→';
    }
  };

  const getTrendColor = (trend: PerformanceMetric['trend']) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Performance</h1>
          <p className="text-muted-foreground">System performance metrics and monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Activity className="h-4 w-4 mr-2" />
            Real-time
          </Button>
          <Button variant="outline" size="sm">
            <Zap className="h-4 w-4 mr-2" />
            Optimize
          </Button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.name}
                </CardTitle>
                <Badge className={getStatusColor(metric.status)}>
                  {metric.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">
                {metric.value} <span className="text-sm text-muted-foreground">{metric.unit}</span>
              </div>
              <div className="flex items-center text-xs">
                <span className={getTrendColor(metric.trend)}>
                  {getTrendIcon(metric.trend)} {Math.abs(metric.change)}%
                </span>
                <span className="text-muted-foreground ml-1">from last hour</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Performance Analysis */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="response-time">Response Time</TabsTrigger>
          <TabsTrigger value="throughput">Throughput</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Key performance indicators over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Activity className="h-12 w-12 mx-auto mb-2" />
                    <p>Performance chart</p>
                    <p className="text-sm">Response time, throughput, and error rate trends</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Slow Endpoints</CardTitle>
                <CardDescription>Endpoints with highest response times</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { endpoint: '/api/users/search', time: '1.2s', requests: 234 },
                    { endpoint: '/api/products/export', time: '890ms', requests: 45 },
                    { endpoint: '/api/analytics/report', time: '756ms', requests: 123 },
                    { endpoint: '/api/upload/image', time: '634ms', requests: 89 }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">{item.endpoint}</p>
                        <p className="text-xs text-muted-foreground">{item.requests} requests</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-mono">{item.time}</p>
                        <Badge variant="outline" className="text-xs">
                          {item.time}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="response-time" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Response Time Analysis</CardTitle>
              <CardDescription>Detailed response time metrics and breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Clock className="h-12 w-12 mx-auto mb-2" />
                  <p>Response time chart</p>
                  <p className="text-sm">P50, P95, P99 response times over time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="throughput" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Throughput Analysis</CardTitle>
              <CardDescription>Request throughput and capacity metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Zap className="h-12 w-12 mx-auto mb-2" />
                  <p>Throughput chart</p>
                  <p className="text-sm">Requests per second and capacity utilization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>CPU Usage</CardTitle>
                <CardDescription>CPU utilization across all instances</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Cpu className="h-12 w-12 mx-auto mb-2" />
                    <p>CPU usage chart</p>
                    <p className="text-sm">CPU utilization over time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Memory Usage</CardTitle>
                <CardDescription>Memory consumption and allocation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Database className="h-12 w-12 mx-auto mb-2" />
                    <p>Memory usage chart</p>
                    <p className="text-sm">Memory consumption over time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Disk I/O</CardTitle>
                <CardDescription>Disk read/write operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <HardDrive className="h-12 w-12 mx-auto mb-2" />
                    <p>Disk I/O chart</p>
                    <p className="text-sm">Disk read/write operations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Network I/O</CardTitle>
                <CardDescription>Network traffic and bandwidth usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Wifi className="h-12 w-12 mx-auto mb-2" />
                    <p>Network I/O chart</p>
                    <p className="text-sm">Network traffic over time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
