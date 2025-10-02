'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Mail, 
  Users, 
  MousePointer, 
  TrendingUp, 
  Calendar,
  Download,
  RefreshCw
} from 'lucide-react';

interface EmailStats {
  totalSent: number;
  totalDelivered: number;
  totalOpened: number;
  totalClicked: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
}

interface CampaignStats {
  id: string;
  name: string;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  createdAt: string;
}

interface TimeSeriesData {
  date: string;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
}

export function EmailAnalytics() {
  const [stats, setStats] = useState<EmailStats | null>(null);
  const [campaigns, setCampaigns] = useState<CampaignStats[]>([]);
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedCampaign, setSelectedCampaign] = useState<string>('all');

  useEffect(() => {
    loadAnalytics();
  }, [timeRange, selectedCampaign]);

  const loadAnalytics = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement actual API calls
      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      setStats({
        totalSent: 12543,
        totalDelivered: 12321,
        totalOpened: 8943,
        totalClicked: 2341,
        deliveryRate: 98.2,
        openRate: 72.6,
        clickRate: 19.0,
        bounceRate: 1.8,
      });

      setCampaigns([
        {
          id: '1',
          name: 'Welcome Series',
          sent: 5432,
          delivered: 5321,
          opened: 3891,
          clicked: 1023,
          deliveryRate: 98.0,
          openRate: 73.1,
          clickRate: 19.2,
          createdAt: '2024-01-15',
        },
        {
          id: '2',
          name: 'Product Launch',
          sent: 3210,
          delivered: 3156,
          opened: 2103,
          clicked: 567,
          deliveryRate: 98.3,
          openRate: 66.7,
          clickRate: 18.0,
          createdAt: '2024-01-20',
        },
        {
          id: '3',
          name: 'Newsletter',
          sent: 3901,
          delivered: 3844,
          opened: 2949,
          clicked: 751,
          deliveryRate: 98.5,
          openRate: 76.7,
          clickRate: 19.5,
          createdAt: '2024-01-25',
        },
      ]);

      setTimeSeriesData([
        { date: '2024-01-20', sent: 1200, delivered: 1176, opened: 856, clicked: 234 },
        { date: '2024-01-21', sent: 1500, delivered: 1470, opened: 1089, clicked: 312 },
        { date: '2024-01-22', sent: 1800, delivered: 1764, opened: 1296, clicked: 378 },
        { date: '2024-01-23', sent: 2100, delivered: 2058, opened: 1512, clicked: 441 },
        { date: '2024-01-24', sent: 2400, delivered: 2352, opened: 1728, clicked: 504 },
        { date: '2024-01-25', sent: 2700, delivered: 2646, opened: 1944, clicked: 567 },
        { date: '2024-01-26', sent: 3000, delivered: 2940, opened: 2160, clicked: 630 },
      ]);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const StatCard = ({ 
    title, 
    value, 
    change, 
    icon: Icon, 
    color = 'default' 
  }: {
    title: string;
    value: string | number;
    change?: string;
    icon: any;
    color?: 'default' | 'success' | 'warning' | 'destructive';
  }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {change && (
              <p className={`text-sm ${color === 'success' ? 'text-green-600' : color === 'warning' ? 'text-yellow-600' : color === 'destructive' ? 'text-red-600' : 'text-muted-foreground'}`}>
                {change}
              </p>
            )}
          </div>
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading analytics...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Email Analytics</h1>
            <p className="text-muted-foreground mt-2">
              Track your email performance and engagement metrics
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Sent"
            value={stats.totalSent.toLocaleString()}
            icon={Mail}
          />
          <StatCard
            title="Delivery Rate"
            value={`${stats.deliveryRate}%`}
            change="+2.1% from last period"
            icon={TrendingUp}
            color="success"
          />
          <StatCard
            title="Open Rate"
            value={`${stats.openRate}%`}
            change="+1.3% from last period"
            icon={MousePointer}
            color="success"
          />
          <StatCard
            title="Click Rate"
            value={`${stats.clickRate}%`}
            change="-0.5% from last period"
            icon={BarChart3}
            color="warning"
          />
        </div>
      )}

      {/* Detailed Analytics */}
      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{campaign.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Sent on {new Date(campaign.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Sent</p>
                        <p className="font-semibold">{campaign.sent.toLocaleString()}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Open Rate</p>
                        <p className="font-semibold">{campaign.openRate}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Click Rate</p>
                        <p className="font-semibold">{campaign.clickRate}%</p>
                      </div>
                      <Badge variant={campaign.deliveryRate > 98 ? 'default' : 'secondary'}>
                        {campaign.deliveryRate}% delivered
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                  <p>Chart visualization would go here</p>
                  <p className="text-sm">Integration with charting library needed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Delivery Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Total Delivered</span>
                      <span className="font-semibold">{stats?.totalDelivered.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Rate</span>
                      <span className="font-semibold text-green-600">{stats?.deliveryRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bounce Rate</span>
                      <span className="font-semibold text-red-600">{stats?.bounceRate}%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Engagement Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Total Opens</span>
                      <span className="font-semibold">{stats?.totalOpened.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Open Rate</span>
                      <span className="font-semibold text-green-600">{stats?.openRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Clicks</span>
                      <span className="font-semibold">{stats?.totalClicked.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Click Rate</span>
                      <span className="font-semibold text-blue-600">{stats?.clickRate}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
