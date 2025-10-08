import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Bell, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface AlertRule {
  id: string;
  name: string;
  metric: string;
  condition: 'greater_than' | 'less_than' | 'equals' | 'not_equals';
  threshold: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  enabled: boolean;
  description?: string;
}

interface NotificationChannel {
  id: string;
  name: string;
  type: 'email' | 'slack' | 'webhook' | 'sms';
  enabled: boolean;
  config: Record<string, any>;
}

const mockAlertRules: AlertRule[] = [
  {
    id: '1',
    name: 'High CPU Usage',
    metric: 'cpu_usage',
    condition: 'greater_than',
    threshold: 80,
    severity: 'high',
    enabled: true,
    description: 'Alert when CPU usage exceeds 80%'
  },
  {
    id: '2',
    name: 'Memory Usage Warning',
    metric: 'memory_usage',
    condition: 'greater_than',
    threshold: 90,
    severity: 'critical',
    enabled: true,
    description: 'Alert when memory usage exceeds 90%'
  },
  {
    id: '3',
    name: 'Disk Space Low',
    metric: 'disk_usage',
    condition: 'greater_than',
    threshold: 85,
    severity: 'medium',
    enabled: false,
    description: 'Alert when disk usage exceeds 85%'
  }
];

const mockNotificationChannels: NotificationChannel[] = [
  {
    id: '1',
    name: 'Admin Email',
    type: 'email',
    enabled: true,
    config: { email: 'admin@example.com' }
  },
  {
    id: '2',
    name: 'Slack #alerts',
    type: 'slack',
    enabled: true,
    config: { webhook: 'https://hooks.slack.com/...' }
  },
  {
    id: '3',
    name: 'SMS Notifications',
    type: 'sms',
    enabled: false,
    config: { phone: '+1234567890' }
  }
];

export default function AlertSettings() {
  const [alertRules, setAlertRules] = useState<AlertRule[]>(mockAlertRules);
  const [notificationChannels, setNotificationChannels] = useState<NotificationChannel[]>(mockNotificationChannels);
  const [editingRule, setEditingRule] = useState<AlertRule | null>(null);
  const [editingChannel, setEditingChannel] = useState<NotificationChannel | null>(null);
  const [showAddRule, setShowAddRule] = useState(false);
  const [showAddChannel, setShowAddChannel] = useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getChannelTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return '📧';
      case 'slack': return '💬';
      case 'webhook': return '🔗';
      case 'sms': return '📱';
      default: return '📧';
    }
  };

  const handleToggleRule = (ruleId: string) => {
    setAlertRules(prev => 
      prev.map(rule => 
        rule.id === ruleId 
          ? { ...rule, enabled: !rule.enabled }
          : rule
      )
    );
  };

  const handleDeleteRule = (ruleId: string) => {
    setAlertRules(prev => prev.filter(rule => rule.id !== ruleId));
  };

  const handleEditRule = (rule: AlertRule) => {
    setEditingRule(rule);
  };

  const handleSaveRule = (updatedRule: AlertRule) => {
    if (editingRule) {
      setAlertRules(prev => 
        prev.map(rule => 
          rule.id === editingRule.id ? updatedRule : rule
        )
      );
    } else {
      setAlertRules(prev => [...prev, { ...updatedRule, id: Date.now().toString() }]);
    }
    setEditingRule(null);
    setShowAddRule(false);
  };

  const handleToggleChannel = (channelId: string) => {
    setNotificationChannels(prev => 
      prev.map(channel => 
        channel.id === channelId 
          ? { ...channel, enabled: !channel.enabled }
          : channel
      )
    );
  };

  const handleDeleteChannel = (channelId: string) => {
    setNotificationChannels(prev => prev.filter(channel => channel.id !== channelId));
  };

  const handleEditChannel = (channel: NotificationChannel) => {
    setEditingChannel(channel);
  };

  const handleSaveChannel = (updatedChannel: NotificationChannel) => {
    if (editingChannel) {
      setNotificationChannels(prev => 
        prev.map(channel => 
          channel.id === editingChannel.id ? updatedChannel : channel
        )
      );
    } else {
      setNotificationChannels(prev => [...prev, { ...updatedChannel, id: Date.now().toString() }]);
    }
    setEditingChannel(null);
    setShowAddChannel(false);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Alert Settings</h1>
          <p className="text-muted-foreground">Configure alert rules and notification channels</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Test Alerts
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="rules" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rules">Alert Rules</TabsTrigger>
          <TabsTrigger value="channels">Notification Channels</TabsTrigger>
          <TabsTrigger value="templates">Alert Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Alert Rules</CardTitle>
                  <CardDescription>Configure when and how alerts are triggered</CardDescription>
                </div>
                <Button onClick={() => setShowAddRule(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Rule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Switch
                        checked={rule.enabled}
                        onCheckedChange={() => handleToggleRule(rule.id)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{rule.name}</h4>
                          <Badge className={getSeverityColor(rule.severity)}>
                            {rule.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {rule.metric} {rule.condition} {rule.threshold}%
                        </p>
                        {rule.description && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {rule.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditRule(rule)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteRule(rule.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="channels" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Notification Channels</CardTitle>
                  <CardDescription>Configure how alerts are delivered</CardDescription>
                </div>
                <Button onClick={() => setShowAddChannel(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Channel
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notificationChannels.map((channel) => (
                  <div key={channel.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Switch
                        checked={channel.enabled}
                        onCheckedChange={() => handleToggleChannel(channel.id)}
                      />
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getChannelTypeIcon(channel.type)}</span>
                        <div>
                          <h4 className="font-medium">{channel.name}</h4>
                          <p className="text-sm text-muted-foreground capitalize">
                            {channel.type} • {channel.config.email || channel.config.webhook || channel.config.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditChannel(channel)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteChannel(channel.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alert Templates</CardTitle>
              <CardDescription>Customize alert message templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Email Template</h4>
                  <div className="space-y-2">
                    <Label htmlFor="email-subject">Subject</Label>
                    <Input
                      id="email-subject"
                      defaultValue="🚨 Alert: {alert_name} - {severity}"
                      placeholder="Alert subject template"
                    />
                    <Label htmlFor="email-body">Body</Label>
                    <textarea
                      id="email-body"
                      className="w-full p-2 border rounded-md min-h-32"
                      defaultValue="Alert: {alert_name}\nSeverity: {severity}\nValue: {value}\nThreshold: {threshold}\nTime: {timestamp}"
                      placeholder="Alert body template"
                    />
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Slack Template</h4>
                  <div className="space-y-2">
                    <Label htmlFor="slack-message">Message</Label>
                    <textarea
                      id="slack-message"
                      className="w-full p-2 border rounded-md min-h-32"
                      defaultValue="🚨 *{alert_name}*\nSeverity: {severity}\nValue: {value} {unit}\nThreshold: {threshold} {unit}\nTime: {timestamp}"
                      placeholder="Slack message template"
                    />
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">SMS Template</h4>
                  <div className="space-y-2">
                    <Label htmlFor="sms-message">Message</Label>
                    <Input
                      id="sms-message"
                      defaultValue="Alert: {alert_name} - {severity} - {value} {unit}"
                      placeholder="SMS message template"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Rule Modal */}
      {(showAddRule || editingRule) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>{editingRule ? 'Edit Rule' : 'Add New Rule'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="rule-name">Rule Name</Label>
                <Input
                  id="rule-name"
                  defaultValue={editingRule?.name || ''}
                  placeholder="Enter rule name"
                />
              </div>
              <div>
                <Label htmlFor="rule-metric">Metric</Label>
                <Select defaultValue={editingRule?.metric || ''}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select metric" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cpu_usage">CPU Usage</SelectItem>
                    <SelectItem value="memory_usage">Memory Usage</SelectItem>
                    <SelectItem value="disk_usage">Disk Usage</SelectItem>
                    <SelectItem value="response_time">Response Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="rule-condition">Condition</Label>
                <Select defaultValue={editingRule?.condition || ''}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="greater_than">Greater than</SelectItem>
                    <SelectItem value="less_than">Less than</SelectItem>
                    <SelectItem value="equals">Equals</SelectItem>
                    <SelectItem value="not_equals">Not equals</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="rule-threshold">Threshold</Label>
                <Input
                  id="rule-threshold"
                  type="number"
                  defaultValue={editingRule?.threshold || ''}
                  placeholder="Enter threshold value"
                />
              </div>
              <div>
                <Label htmlFor="rule-severity">Severity</Label>
                <Select defaultValue={editingRule?.severity || ''}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => {
                  setShowAddRule(false);
                  setEditingRule(null);
                }}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={() => {
                  // Handle save logic here
                  setShowAddRule(false);
                  setEditingRule(null);
                }}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
