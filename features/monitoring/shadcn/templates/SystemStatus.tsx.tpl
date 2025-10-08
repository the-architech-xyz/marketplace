import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  RefreshCw,
  Server,
  Database,
  Wifi,
  HardDrive,
  Cpu,
  Memory
} from 'lucide-react';

interface SystemComponent {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'outage' | 'maintenance';
  uptime: string;
  lastIncident?: string;
  description: string;
  type: 'server' | 'database' | 'network' | 'storage' | 'cpu' | 'memory';
}

interface SystemStatusProps {
  components: SystemComponent[];
  overallStatus: 'operational' | 'degraded' | 'outage' | 'maintenance';
  lastUpdated: string;
  onRefresh?: () => void;
  className?: string;
}

export default function SystemStatus({
  components,
  overallStatus,
  lastUpdated,
  onRefresh,
  className = ''
}: SystemStatusProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800';
      case 'degraded': return 'bg-yellow-100 text-yellow-800';
      case 'outage': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="h-4 w-4" />;
      case 'degraded': return <AlertTriangle className="h-4 w-4" />;
      case 'outage': return <XCircle className="h-4 w-4" />;
      case 'maintenance': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getComponentIcon = (type: string) => {
    switch (type) {
      case 'server': return <Server className="h-4 w-4" />;
      case 'database': return <Database className="h-4 w-4" />;
      case 'network': return <Wifi className="h-4 w-4" />;
      case 'storage': return <HardDrive className="h-4 w-4" />;
      case 'cpu': return <Cpu className="h-4 w-4" />;
      case 'memory': return <Memory className="h-4 w-4" />;
      default: return <Server className="h-4 w-4" />;
    }
  };

  const getOverallStatusMessage = () => {
    switch (overallStatus) {
      case 'operational': return 'All systems operational';
      case 'degraded': return 'Some systems experiencing issues';
      case 'outage': return 'Major service disruption';
      case 'maintenance': return 'Scheduled maintenance in progress';
      default: return 'Status unknown';
    }
  };

  const getOverallStatusAlertVariant = () => {
    switch (overallStatus) {
      case 'operational': return 'default';
      case 'degraded': return 'default';
      case 'outage': return 'destructive';
      case 'maintenance': return 'default';
      default: return 'default';
    }
  };

  const operationalCount = components.filter(c => c.status === 'operational').length;
  const degradedCount = components.filter(c => c.status === 'degraded').length;
  const outageCount = components.filter(c => c.status === 'outage').length;
  const maintenanceCount = components.filter(c => c.status === 'maintenance').length;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Overall Status */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                System Status
              </CardTitle>
              <CardDescription>
                {getOverallStatusMessage()}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(overallStatus)}>
                {overallStatus.toUpperCase()}
              </Badge>
              {onRefresh && (
                <Button variant="outline" size="sm" onClick={onRefresh}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {overallStatus !== 'operational' && (
            <Alert variant={getOverallStatusAlertVariant()}>
              {getStatusIcon(overallStatus)}
              <AlertDescription>
                {overallStatus === 'outage' && 'We are experiencing a major service disruption. Our team is working to resolve this issue.'}
                {overallStatus === 'degraded' && 'Some systems are experiencing issues. We are monitoring the situation closely.'}
                {overallStatus === 'maintenance' && 'Scheduled maintenance is currently in progress. Some services may be temporarily unavailable.'}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="mt-4 text-sm text-muted-foreground">
            Last updated: {lastUpdated}
          </div>
        </CardContent>
      </Card>

      {/* Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Operational
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{operationalCount}</div>
            <p className="text-xs text-muted-foreground">Systems running normally</p>
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
              Outage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outageCount}</div>
            <p className="text-xs text-muted-foreground">Major service disruption</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Maintenance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{maintenanceCount}</div>
            <p className="text-xs text-muted-foreground">Scheduled maintenance</p>
          </CardContent>
        </Card>
      </div>

      {/* Component Status */}
      <Card>
        <CardHeader>
          <CardTitle>Component Status</CardTitle>
          <CardDescription>Detailed status of all system components</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {components.map((component) => (
              <div key={component.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="text-muted-foreground">
                    {getComponentIcon(component.type)}
                  </div>
                  <div>
                    <h4 className="font-medium">{component.name}</h4>
                    <p className="text-sm text-muted-foreground">{component.description}</p>
                    {component.lastIncident && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Last incident: {component.lastIncident}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium">Uptime: {component.uptime}</div>
                    <div className="text-xs text-muted-foreground">Last updated: {lastUpdated}</div>
                  </div>
                  <Badge className={getStatusColor(component.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(component.status)}
                      {component.status}
                    </div>
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
