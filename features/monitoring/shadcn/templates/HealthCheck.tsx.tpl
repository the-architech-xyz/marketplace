"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  RefreshCw,
  Activity,
  Server,
  Database,
  Wifi,
  HardDrive
} from 'lucide-react';

interface HealthCheck {
  id: string;
  name: string;
  status: 'healthy' | 'degraded' | 'unhealthy' | 'unknown';
  responseTime: number;
  lastChecked: string;
  uptime: string;
  description: string;
  type: 'api' | 'database' | 'service' | 'external';
  endpoint?: string;
  error?: string;
}

const mockHealthChecks: HealthCheck[] = [
  {
    id: '1',
    name: 'API Server',
    status: 'healthy',
    responseTime: 45,
    lastChecked: '2 minutes ago',
    uptime: '99.9%',
    description: 'Main API server health check',
    type: 'api',
    endpoint: '/api/health'
  },
  {
    id: '2',
    name: 'Database',
    status: 'healthy',
    responseTime: 12,
    lastChecked: '1 minute ago',
    uptime: '99.8%',
    description: 'Primary database connection',
    type: 'database',
    endpoint: '/api/health/db'
  },
  {
    id: '3',
    name: 'Redis Cache',
    status: 'degraded',
    responseTime: 150,
    lastChecked: '3 minutes ago',
    uptime: '98.5%',
    description: 'Redis cache service',
    type: 'service',
    endpoint: '/api/health/redis',
    error: 'High response time detected'
  },
  {
    id: '4',
    name: 'External API',
    status: 'unhealthy',
    responseTime: 0,
    lastChecked: '5 minutes ago',
    uptime: '95.2%',
    description: 'Third-party payment API',
    type: 'external',
    endpoint: 'https://api.payment-provider.com/health',
    error: 'Connection timeout'
  }
];

export default function HealthCheck() {
  const [healthChecks, setHealthChecks] = useState<HealthCheck[]>(mockHealthChecks);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const getStatusColor = (status: HealthCheck['status']) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'degraded': return 'bg-yellow-100 text-yellow-800';
      case 'unhealthy': return 'bg-red-100 text-red-800';
      case 'unknown': return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: HealthCheck['status']) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4" />;
      case 'degraded': return <AlertTriangle className="h-4 w-4" />;
      case 'unhealthy': return <XCircle className="h-4 w-4" />;
      case 'unknown': return <Clock className="h-4 w-4" />;
    }
  };

  const getTypeIcon = (type: HealthCheck['type']) => {
    switch (type) {
      case 'api': return <Server className="h-4 w-4" />;
      case 'database': return <Database className="h-4 w-4" />;
      case 'service': return <Activity className="h-4 w-4" />;
      case 'external': return <Wifi className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getOverallStatus = () => {
    const unhealthy = healthChecks.filter(h => h.status === 'unhealthy').length;
    const degraded = healthChecks.filter(h => h.status === 'degraded').length;
    const healthy = healthChecks.filter(h => h.status === 'healthy').length;

    if (unhealthy > 0) return 'unhealthy';
    if (degraded > 0) return 'degraded';
    if (healthy > 0) return 'healthy';
    return 'unknown';
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastRefresh(new Date());
    setIsRefreshing(false);
  };

  const overallStatus = getOverallStatus();
  const healthyCount = healthChecks.filter(h => h.status === 'healthy').length;
  const degradedCount = healthChecks.filter(h => h.status === 'degraded').length;
  const unhealthyCount = healthChecks.filter(h => h.status === 'unhealthy').length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Health Check</h1>
          <p className="text-muted-foreground">Monitor system health and service availability</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Overall Status */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                {getStatusIcon(overallStatus)}
                Overall System Health
              </CardTitle>
              <CardDescription>
                Last updated: {lastRefresh.toLocaleTimeString()}
              </CardDescription>
            </div>
            <Badge className={getStatusColor(overallStatus)}>
              {overallStatus.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {overallStatus === 'unhealthy' && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                Critical services are down. Immediate attention required.
              </AlertDescription>
            </Alert>
          )}
          {overallStatus === 'degraded' && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Some services are experiencing issues. Monitor closely.
              </AlertDescription>
            </Alert>
          )}
          {overallStatus === 'healthy' && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                All systems are operating normally.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Healthy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{healthyCount}</div>
            <p className="text-xs text-muted-foreground">Services running normally</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Degraded
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{degradedCount}</div>
            <p className="text-xs text-muted-foreground">Minor issues detected</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Unhealthy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{unhealthyCount}</div>
            <p className="text-xs text-muted-foreground">Services down</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{healthChecks.length}</div>
            <p className="text-xs text-muted-foreground">Monitored services</p>
          </CardContent>
        </Card>
      </div>

      {/* Health Checks List */}
      <Card>
        <CardHeader>
          <CardTitle>Service Health Checks</CardTitle>
          <CardDescription>Detailed status of all monitored services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {healthChecks.map((check) => (
              <div key={check.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="text-muted-foreground">
                    {getTypeIcon(check.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{check.name}</h4>
                      <Badge className={getStatusColor(check.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(check.status)}
                          {check.status}
                        </div>
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{check.description}</p>
                    {check.endpoint && (
                      <p className="text-xs text-muted-foreground font-mono">{check.endpoint}</p>
                    )}
                    {check.error && (
                      <p className="text-xs text-red-600 mt-1">{check.error}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {check.responseTime > 0 ? `${check.responseTime}ms` : 'N/A'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Uptime: {check.uptime}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {check.lastChecked}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
