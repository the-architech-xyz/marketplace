import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Download, RefreshCw, Calendar, Clock } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  source: string;
  service: string;
  traceId?: string;
}

const mockLogs: LogEntry[] = [
  {
    id: '1',
    timestamp: '2024-01-15 14:30:25.123',
    level: 'error',
    message: 'Database connection failed: timeout after 30s',
    source: 'api-server-01',
    service: 'user-service',
    traceId: 'abc123'
  },
  {
    id: '2',
    timestamp: '2024-01-15 14:30:20.456',
    level: 'warn',
    message: 'High memory usage detected: 85%',
    source: 'api-server-01',
    service: 'user-service',
    traceId: 'abc123'
  },
  {
    id: '3',
    timestamp: '2024-01-15 14:30:15.789',
    level: 'info',
    message: 'User login successful: user@example.com',
    source: 'auth-service',
    service: 'auth-service',
    traceId: 'def456'
  },
  {
    id: '4',
    timestamp: '2024-01-15 14:30:10.012',
    level: 'debug',
    message: 'Cache hit for key: user:12345',
    source: 'cache-service',
    service: 'cache-service'
  },
  {
    id: '5',
    timestamp: '2024-01-15 14:30:05.345',
    level: 'error',
    message: 'Payment processing failed: insufficient funds',
    source: 'payment-service',
    service: 'payment-service',
    traceId: 'ghi789'
  }
];

export default function LogsPage() {
  const [logs] = useState<LogEntry[]>(mockLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');

  const getLevelColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'error': return 'bg-red-100 text-red-800';
      case 'warn': return 'bg-yellow-100 text-yellow-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'debug': return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.traceId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    const matchesService = serviceFilter === 'all' || log.service === serviceFilter;
    
    return matchesSearch && matchesLevel && matchesService;
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Logs</h1>
          <p className="text-muted-foreground">System logs and debugging information</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 24h
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Log Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{logs.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Errors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {logs.filter(l => l.level === 'error').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Warnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {logs.filter(l => l.level === 'warn').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(logs.map(l => l.service)).size}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Log Filters</CardTitle>
          <CardDescription>Search and filter log entries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="warn">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="debug">Debug</SelectItem>
              </SelectContent>
            </Select>
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                {Array.from(new Set(logs.map(l => l.service))).map(service => (
                  <SelectItem key={service} value={service}>{service}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Logs</TabsTrigger>
          <TabsTrigger value="errors">Errors</TabsTrigger>
          <TabsTrigger value="warnings">Warnings</TabsTrigger>
          <TabsTrigger value="info">Info</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-2">
          <Card>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {filteredLogs.length === 0 ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="text-center">
                      <Clock className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">No logs found</p>
                    </div>
                  </div>
                ) : (
                  <div className="divide-y">
                    {filteredLogs.map((log) => (
                      <div key={log.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-3">
                          <Badge className={getLevelColor(log.level)}>
                            {log.level.toUpperCase()}
                          </Badge>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                              <span>{log.timestamp}</span>
                              <span>•</span>
                              <span>{log.source}</span>
                              <span>•</span>
                              <span>{log.service}</span>
                              {log.traceId && (
                                <>
                                  <span>•</span>
                                  <span className="font-mono">Trace: {log.traceId}</span>
                                </>
                              )}
                            </div>
                            <p className="text-sm font-mono break-all">{log.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="errors" className="space-y-2">
          <Card>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {filteredLogs.filter(l => l.level === 'error').length === 0 ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="text-center">
                      <Clock className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">No error logs found</p>
                    </div>
                  </div>
                ) : (
                  <div className="divide-y">
                    {filteredLogs.filter(l => l.level === 'error').map((log) => (
                      <div key={log.id} className="p-4 hover:bg-red-50 transition-colors">
                        <div className="flex items-start gap-3">
                          <Badge className="bg-red-100 text-red-800">
                            ERROR
                          </Badge>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                              <span>{log.timestamp}</span>
                              <span>•</span>
                              <span>{log.source}</span>
                              <span>•</span>
                              <span>{log.service}</span>
                              {log.traceId && (
                                <>
                                  <span>•</span>
                                  <span className="font-mono">Trace: {log.traceId}</span>
                                </>
                              )}
                            </div>
                            <p className="text-sm font-mono break-all text-red-800">{log.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="warnings" className="space-y-2">
          <Card>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {filteredLogs.filter(l => l.level === 'warn').length === 0 ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="text-center">
                      <Clock className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">No warning logs found</p>
                    </div>
                  </div>
                ) : (
                  <div className="divide-y">
                    {filteredLogs.filter(l => l.level === 'warn').map((log) => (
                      <div key={log.id} className="p-4 hover:bg-yellow-50 transition-colors">
                        <div className="flex items-start gap-3">
                          <Badge className="bg-yellow-100 text-yellow-800">
                            WARN
                          </Badge>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                              <span>{log.timestamp}</span>
                              <span>•</span>
                              <span>{log.source}</span>
                              <span>•</span>
                              <span>{log.service}</span>
                              {log.traceId && (
                                <>
                                  <span>•</span>
                                  <span className="font-mono">Trace: {log.traceId}</span>
                                </>
                              )}
                            </div>
                            <p className="text-sm font-mono break-all text-yellow-800">{log.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="info" className="space-y-2">
          <Card>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {filteredLogs.filter(l => l.level === 'info').length === 0 ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="text-center">
                      <Clock className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">No info logs found</p>
                    </div>
                  </div>
                ) : (
                  <div className="divide-y">
                    {filteredLogs.filter(l => l.level === 'info').map((log) => (
                      <div key={log.id} className="p-4 hover:bg-blue-50 transition-colors">
                        <div className="flex items-start gap-3">
                          <Badge className="bg-blue-100 text-blue-800">
                            INFO
                          </Badge>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                              <span>{log.timestamp}</span>
                              <span>•</span>
                              <span>{log.source}</span>
                              <span>•</span>
                              <span>{log.service}</span>
                              {log.traceId && (
                                <>
                                  <span>•</span>
                                  <span className="font-mono">Trace: {log.traceId}</span>
                                </>
                              )}
                            </div>
                            <p className="text-sm font-mono break-all text-blue-800">{log.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
