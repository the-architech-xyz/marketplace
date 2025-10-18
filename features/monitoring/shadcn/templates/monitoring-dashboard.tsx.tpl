'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock,
  TrendingUp,
  TrendingDown,
  Server,
  Database,
  Globe,
  Zap,
  Shield,
  Eye,
  Settings,
  RefreshCw,
  Filter,
  Download,
  Bell,
  BellOff
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { MetricsCard } from '@/components/monitoring/MetricsCard';
import { AlertCard } from '@/components/monitoring/AlertCard';
import { SystemStatus } from '@/components/monitoring/SystemStatus';
import { PerformanceChart } from '@/components/monitoring/PerformanceChart';
import { RealTimeMetrics } from '@/components/monitoring/RealTimeMetrics';
import { useMonitoring } from '@/lib/hooks/use-monitoring';
import { useAlerts } from '@/lib/hooks/use-alerts';
import { useMetrics } from '@/lib/hooks/use-metrics';

export default function MonitoringDashboard() {
  const [timeRange, setTimeRange] = useState('1h');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30);
  
  const { data: systemHealth, isLoading: healthLoading } = useMonitoring();
  const { data: alerts, isLoading: alertsLoading } = useAlerts();
  const { data: metrics, isLoading: metricsLoading } = useMetrics();

  // Mock data for demonstration
  const mockData = {
    systemHealth: {
      status: 'healthy' as const,
      uptime: 99.9,
      lastCheck: new Date().toISOString(),
      services: [
        { name: 'API Server', status: 'healthy' as const, responseTime: 120, lastCheck: new Date().toISOString() },
        { name: 'Database', status: 'healthy' as const, responseTime: 45, lastCheck: new Date().toISOString() },
        { name: 'Cache', status: 'degraded' as const, responseTime: 200, lastCheck: new Date().toISOString() },
        { name: 'Queue', status: 'healthy' as const, responseTime: 80, lastCheck: new Date().toISOString() }
      ],
      overallScore: 95
    },
    alerts: [
      {
        id: 'alert-1',
        title: 'High CPU Usage',
        description: 'CPU usage has exceeded 80% for the last 5 minutes',
        severity: 'high' as const,
        status: 'active' as const,
        source: 'system',
        triggeredAt: new Date(Date.now() - 300000).toISOString(),
        currentValue: 85,
        threshold: 80
      },
      {
        id: 'alert-2',
        title: 'Database Connection Pool Exhausted',
        description: 'Database connection pool is at 95% capacity',
        severity: 'critical' as const,
        status: 'active' as const,
        source: 'database',
        triggeredAt: new Date(Date.now() - 600000).toISOString(),
        currentValue: 95,
        threshold: 90
      },
      {
        id: 'alert-3',
        title: 'Memory Usage Warning',
        description: 'Memory usage is approaching the threshold',
        severity: 'medium' as const,
        status: 'acknowledged' as const,
        source: 'system',
        triggeredAt: new Date(Date.now() - 1800000).toISOString(),
        currentValue: 75,
        threshold: 80
      }
    ],
    metrics: {
      cpu: { usage: 65, cores: 8, loadAverage: [1.2, 1.5, 1.8] },
      memory: { used: 12.5, total: 16, free: 3.5, percentage: 78 },
      disk: { used: 450, total: 500, free: 50, percentage: 90 },
      network: { bytesIn: 1024000, bytesOut: 2048000, packetsIn: 1500, packetsOut: 1200 }
    }
  };

  const data = systemHealth || mockData.systemHealth;
  const alertData = alerts || mockData.alerts;
  const metricsData = metrics || mockData.metrics;

  const activeAlerts = alertData.filter(alert => alert.status === 'active');
  const criticalAlerts = activeAlerts.filter(alert => alert.severity === 'critical');
  const highAlerts = activeAlerts.filter(alert => alert.severity === 'high');

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Monitoring Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Real-time system monitoring and alerting
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Switch
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
              id="auto-refresh"
            />
            <Label htmlFor="auto-refresh" className="text-sm">
              Auto Refresh
            </Label>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5m">Last 5m</SelectItem>
              <SelectItem value="15m">Last 15m</SelectItem>
              <SelectItem value="1h">Last 1h</SelectItem>
              <SelectItem value="6h">Last 6h</SelectItem>
              <SelectItem value="24h">Last 24h</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Critical Alerts Banner */}
      {criticalAlerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              <strong>{criticalAlerts.length} Critical Alert{criticalAlerts.length > 1 ? 's' : ''}</strong> - 
              {criticalAlerts.map(alert => alert.title).join(', ')}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className={`border-0 shadow-lg ${
            data.status === 'healthy' ? 'bg-gradient-to-br from-green-500 to-green-600 text-white' :
            data.status === 'degraded' ? 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white' :
            'bg-gradient-to-br from-red-500 to-red-600 text-white'
          }`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              {data.status === 'healthy' ? <CheckCircle className="h-4 w-4" /> :
               data.status === 'degraded' ? <AlertTriangle className="h-4 w-4" /> :
               <XCircle className="h-4 w-4" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{data.status}</div>
              <div className="text-xs opacity-90">
                Uptime: {data.uptime}%
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <Bell className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeAlerts.length}</div>
              <div className="text-xs opacity-90">
                {criticalAlerts.length} critical, {highAlerts.length} high
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
              <Activity className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metricsData.cpu.usage}%</div>
              <div className="text-xs opacity-90">
                Load: {metricsData.cpu.loadAverage[0].toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
              <Database className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metricsData.memory.percentage}%</div>
              <div className="text-xs opacity-90">
                {metricsData.memory.used}GB / {metricsData.memory.total}GB
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* System Health */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <SystemStatus health={data} />
          </motion.div>

          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    CPU & Memory Trends
                  </CardTitle>
                  <CardDescription>
                    System resource usage over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PerformanceChart metrics={metricsData} />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Real-time Metrics
                  </CardTitle>
                  <CardDescription>
                    Live system performance data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RealTimeMetrics metrics={metricsData} />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>System Alerts</CardTitle>
                    <CardDescription>
                      Monitor and manage system alerts
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alertData.map((alert, index) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <AlertCard alert={alert} />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>System Metrics</CardTitle>
                <CardDescription>
                  Detailed system performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <MetricsCard
                    title="CPU Usage"
                    value={`${metricsData.cpu.usage}%`}
                    trend="up"
                    change="+2.5%"
                    icon={Activity}
                  />
                  <MetricsCard
                    title="Memory Usage"
                    value={`${metricsData.memory.percentage}%`}
                    trend="up"
                    change="+1.2%"
                    icon={Database}
                  />
                  <MetricsCard
                    title="Disk Usage"
                    value={`${metricsData.disk.percentage}%`}
                    trend="stable"
                    change="0%"
                    icon={Server}
                  />
                  <MetricsCard
                    title="Network I/O"
                    value={`${(metricsData.network.bytesIn / 1024 / 1024).toFixed(1)}MB/s`}
                    trend="down"
                    change="-0.5%"
                    icon={Globe}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>System Logs</CardTitle>
                <CardDescription>
                  Real-time system log monitoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  Log viewer component coming soon...
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Performance Analysis</CardTitle>
                <CardDescription>
                  Detailed performance metrics and analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  Performance analysis component coming soon...
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
