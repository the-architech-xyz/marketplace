"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  Clock, 
  Copy,
  Check
} from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  source: string;
  service: string;
  traceId?: string;
  metadata?: Record<string, any>;
}

interface LogViewerProps {
  logs: LogEntry[];
  onRefresh?: () => void;
  onExport?: () => void;
  className?: string;
}

export default function LogViewer({
  logs,
  onRefresh,
  onExport,
  className = ''
}: LogViewerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getLevelColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'error': return 'bg-red-100 text-red-800';
      case 'warn': return 'bg-yellow-100 text-yellow-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'debug': return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           log.traceId?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
      const matchesService = serviceFilter === 'all' || log.service === serviceFilter;
      
      return matchesSearch && matchesLevel && matchesService;
    });
  }, [logs, searchTerm, levelFilter, serviceFilter]);

  const copyToClipboard = async (text: string, logId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(logId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getLogLevelCounts = () => {
    const counts = { error: 0, warn: 0, info: 0, debug: 0 };
    filteredLogs.forEach(log => {
      counts[log.level]++;
    });
    return counts;
  };

  const levelCounts = getLogLevelCounts();

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Log Viewer</CardTitle>
              <CardDescription>
                {filteredLogs.length} of {logs.length} log entries
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {onRefresh && (
                <Button variant="outline" size="sm" onClick={onRefresh}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              )}
              {onExport && (
                <Button variant="outline" size="sm" onClick={onExport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              )}
            </div>
          </div>
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
                <SelectItem value="error">Error ({levelCounts.error})</SelectItem>
                <SelectItem value="warn">Warning ({levelCounts.warn})</SelectItem>
                <SelectItem value="info">Info ({levelCounts.info})</SelectItem>
                <SelectItem value="debug">Debug ({levelCounts.debug})</SelectItem>
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

      {/* Log Entries */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Logs</TabsTrigger>
          <TabsTrigger value="errors">Errors ({levelCounts.error})</TabsTrigger>
          <TabsTrigger value="warnings">Warnings ({levelCounts.warn})</TabsTrigger>
          <TabsTrigger value="info">Info ({levelCounts.info})</TabsTrigger>
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
                            <p className="text-sm font-mono break-all mb-2">{log.message}</p>
                            {log.metadata && Object.keys(log.metadata).length > 0 && (
                              <details className="text-xs">
                                <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                                  Metadata
                                </summary>
                                <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                                  {JSON.stringify(log.metadata, null, 2)}
                                </pre>
                              </details>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(log.message, log.id)}
                          >
                            {copiedId === log.id ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
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
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(log.message, log.id)}
                          >
                            {copiedId === log.id ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
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
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(log.message, log.id)}
                          >
                            {copiedId === log.id ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
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
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(log.message, log.id)}
                          >
                            {copiedId === log.id ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
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
