"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  Play, 
  Pause, 
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Minus,
  Zap,
  Cpu,
  Database,
  Wifi,
  HardDrive
} from 'lucide-react';

interface MetricData {
  id: string;
  name: string;
  value: number;
  unit: string;
  timestamp: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
  status: 'good' | 'warning' | 'critical';
  type: 'cpu' | 'memory' | 'disk' | 'network' | 'response_time' | 'throughput';
}

const mockMetrics: MetricData[] = [
  {
    id: '1',
    name: 'CPU Usage',
    value: 68.5,
    unit: '%',
    timestamp: new Date().toISOString(),
    trend: 'up',
    change: 2.3,
    status: 'warning',
    type: 'cpu'
  },
  {
    id: '2',
    name: 'Memory Usage',
    value: 82.1,
    unit: '%',
    timestamp: new Date().toISOString(),
    trend: 'up',
    change: 1.8,
    status: 'warning',
    type: 'memory'
  },
  {
    id: '3',
    name: 'Disk I/O',
    value: 156.7,
    unit: 'MB/s',
    timestamp: new Date().toISOString(),
    trend: 'stable',
    change: 0.0,
    status: 'good',
    type: 'disk'
  },
  {
    id: '4',
    name: 'Network I/O',
    value: 45.2,
    unit: 'Mbps',
    timestamp: new Date().toISOString(),
    trend: 'down',
    change: -5.1,
    status: 'good',
    type: 'network'
  },
  {
    id: '5',
    name: 'Response Time',
    value: 245,
    unit: 'ms',
    timestamp: new Date().toISOString(),
    trend: 'down',
    change: -12.5,
    status: 'good',
    type: 'response_time'
  },
  {
    id: '6',
    name: 'Throughput',
    value: 1234,
    unit: 'req/s',
    timestamp: new Date().toISOString(),
    trend: 'up',
    change: 8.3,
    status: 'good',
    type: 'throughput'
  }
];

export default function RealTimeMetrics() {
  const [metrics, setMetrics] = useState<MetricData[]>(mockMetrics);
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [selectedType, setSelectedType] = useState<string>('all');

  const getTypeIcon = (type: MetricData['type']) => {
    switch (type) {
      case 'cpu': return <Cpu className="h-4 w-4" />;
      case 'memory': return <Database className="h-4 w-4" />;
      case 'disk': return <HardDrive className="h-4 w-4" />;
      case 'network': return <Wifi className="h-4 w-4" />;
      case 'response_time': return <Activity className="h-4 w-4" />;
      case 'throughput': return <Zap className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: MetricData['status']) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: MetricData['trend']) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4" />;
      case 'down': return <TrendingDown className="h-4 w-4" />;
      case 'stable': return <Minus className="h-4 w-4" />;
    }
  };

  const getTrendColor = (trend: MetricData['trend']) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
    }
  };

  const filteredMetrics = selectedType === 'all' 
    ? metrics 
    : metrics.filter(m => m.type === selectedType);

  // Simulate real-time updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, metric.value + (Math.random() - 0.5) * 10),
        timestamp: new Date().toISOString(),
        change: (Math.random() - 0.5) * 20,
        trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'down' : 'stable'
      })));
      setLastUpdate(new Date());
    }, 2000);

    return () => clearInterval(interval);
  }, [isLive]);

  const handleRefresh = () => {
    setMetrics(prev => prev.map(metric => ({
      ...metric,
      value: Math.max(0, metric.value + (Math.random() - 0.5) * 10),
      timestamp: new Date().toISOString(),
      change: (Math.random() - 0.5) * 20,
      trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'down' : 'stable'
    })));
    setLastUpdate(new Date());
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Real-Time Metrics</h1>
          <p className="text-muted-foreground">Live system performance monitoring</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              checked={isLive}
              onCheckedChange={setIsLive}
            />
            <span className="text-sm">Live Updates</span>
          </div>
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Status Indicator */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-sm font-medium">
                {isLive ? 'Live' : 'Paused'} • Last update: {lastUpdate.toLocaleTimeString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {isLive ? (
                <Button variant="outline" size="sm" onClick={() => setIsLive(false)}>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </Button>
              ) : (
                <Button size="sm" onClick={() => setIsLive(true)}>
                  <Play className="h-4 w-4 mr-2" />
                  Resume
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Overview */}
      <Tabs value={selectedType} onValueChange={setSelectedType} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Metrics</TabsTrigger>
          <TabsTrigger value="cpu">CPU</TabsTrigger>
          <TabsTrigger value="memory">Memory</TabsTrigger>
          <TabsTrigger value="disk">Disk</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
          <TabsTrigger value="response_time">Response Time</TabsTrigger>
          <TabsTrigger value="throughput">Throughput</TabsTrigger>
        </TabsList>
        
        <TabsContent value={selectedType} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMetrics.map((metric) => (
              <Card key={metric.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      {getTypeIcon(metric.type)}
                      {metric.name}
                    </CardTitle>
                    <Badge className={`${getStatusColor(metric.status)} bg-transparent`}>
                      {metric.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-1">
                    {metric.value.toFixed(1)} <span className="text-sm text-muted-foreground">{metric.unit}</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <div className={`flex items-center gap-1 ${getTrendColor(metric.trend)}`}>
                      {getTrendIcon(metric.trend)}
                      <span>{Math.abs(metric.change).toFixed(1)}%</span>
                    </div>
                    <span className="text-muted-foreground ml-1">from last update</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Updated: {new Date(metric.timestamp).toLocaleTimeString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Real-time Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Live Performance Chart</CardTitle>
          <CardDescription>Real-time visualization of system metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <Activity className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">Real-time chart visualization</p>
              <p className="text-sm text-muted-foreground">
                {isLive ? 'Live data streaming' : 'Paused - click resume to start'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.filter(m => m.type === 'response_time')[0]?.value.toFixed(0) || 0}ms
            </div>
            <p className="text-xs text-muted-foreground">Last 5 minutes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Peak Throughput
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.max(...metrics.filter(m => m.type === 'throughput').map(m => m.value)).toFixed(0)} req/s
            </div>
            <p className="text-xs text-muted-foreground">Current session</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round((metrics.filter(m => m.status === 'good').length / metrics.length) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">Healthy services</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
