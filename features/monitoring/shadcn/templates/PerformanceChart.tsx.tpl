import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Zap, Clock, Database, Cpu, HardDrive, Wifi } from 'lucide-react';

interface PerformanceData {
  timestamp: string;
  value: number;
  label: string;
}

interface PerformanceChartProps {
  title: string;
  description?: string;
  data: PerformanceData[];
  type: 'line' | 'bar' | 'area';
  metric: 'response-time' | 'throughput' | 'cpu' | 'memory' | 'disk' | 'network';
  unit: string;
  color?: string;
  showTrend?: boolean;
  trend?: 'up' | 'down' | 'stable';
  change?: number;
  className?: string;
}

export default function PerformanceChart({
  title,
  description,
  data,
  type,
  metric,
  unit,
  color = 'blue',
  showTrend = true,
  trend,
  change,
  className = ''
}: PerformanceChartProps) {
  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'response-time': return <Clock className="h-4 w-4" />;
      case 'throughput': return <Zap className="h-4 w-4" />;
      case 'cpu': return <Cpu className="h-4 w-4" />;
      case 'memory': return <Database className="h-4 w-4" />;
      case 'disk': return <HardDrive className="h-4 w-4" />;
      case 'network': return <Wifi className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-500 text-blue-600';
      case 'green': return 'bg-green-500 text-green-600';
      case 'red': return 'bg-red-500 text-red-600';
      case 'yellow': return 'bg-yellow-500 text-yellow-600';
      case 'purple': return 'bg-purple-500 text-purple-600';
      case 'orange': return 'bg-orange-500 text-orange-600';
      default: return 'bg-blue-500 text-blue-600';
    }
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      case 'stable': return '→';
      default: return '→';
    }
  };

  const getTrendColor = (trend?: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getCurrentValue = () => {
    if (data.length === 0) return '0';
    return data[data.length - 1]?.value.toFixed(2) || '0';
  };

  const getAverageValue = () => {
    if (data.length === 0) return '0';
    const sum = data.reduce((acc, item) => acc + item.value, 0);
    return (sum / data.length).toFixed(2);
  };

  const getMinValue = () => {
    if (data.length === 0) return '0';
    return Math.min(...data.map(item => item.value)).toFixed(2);
  };

  const getMaxValue = () => {
    if (data.length === 0) return '0';
    return Math.max(...data.map(item => item.value)).toFixed(2);
  };

  return (
    <Card className={`hover:shadow-lg transition-shadow ${className}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              {getMetricIcon(metric)}
              {title}
            </CardTitle>
            {description && (
              <CardDescription className="mt-1">{description}</CardDescription>
            )}
          </div>
          {showTrend && trend && change !== undefined && (
            <div className="flex items-center gap-2">
              <Badge className={`${getTrendColor(trend)} bg-transparent`}>
                {getTrendIcon(trend)} {Math.abs(change)}%
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Chart Placeholder */}
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-2 rounded-full ${getColorClasses(color)} flex items-center justify-center`}>
                {getMetricIcon(metric)}
              </div>
              <p className="text-sm text-muted-foreground">
                {type === 'line' && 'Line Chart'}
                {type === 'bar' && 'Bar Chart'}
                {type === 'area' && 'Area Chart'}
              </p>
              <p className="text-xs text-muted-foreground">
                {data.length} data points
              </p>
            </div>
          </div>

          {/* Metrics Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{getCurrentValue()}</p>
              <p className="text-xs text-muted-foreground">Current {unit}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{getAverageValue()}</p>
              <p className="text-xs text-muted-foreground">Average {unit}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{getMinValue()}</p>
              <p className="text-xs text-muted-foreground">Min {unit}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{getMaxValue()}</p>
              <p className="text-xs text-muted-foreground">Max {unit}</p>
            </div>
          </div>

          {/* Data Table */}
          {data.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Recent Data</h4>
              <div className="max-h-32 overflow-y-auto">
                <div className="space-y-1">
                  {data.slice(-5).reverse().map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">{item.timestamp}</span>
                      <span className="font-mono">{item.value.toFixed(2)} {unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center pt-2 border-t">
            <div className="text-xs text-muted-foreground">
              Last updated: {data.length > 0 ? data[data.length - 1]?.timestamp : 'Never'}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Activity className="h-4 w-4 mr-2" />
                Real-time
              </Button>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
