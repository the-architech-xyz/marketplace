'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useErrorDetails } from '@/hooks/use-monitoring-data';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow, format } from 'date-fns';

interface ErrorDetailsDialogProps {
  errorId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ErrorDetailsDialog({
  errorId,
  open,
  onOpenChange,
}: ErrorDetailsDialogProps) {
  const { data: error, isLoading } = useErrorDetails(errorId || '');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Error Details</DialogTitle>
          <DialogDescription>
            Detailed information about this error
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        ) : error ? (
          <div className="space-y-4">
            {/* Error Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant={error.level === 'fatal' ? 'destructive' : 'default'}>
                  {error.level}
                </Badge>
                <Badge variant="outline">{error.status}</Badge>
                {error.environment && (
                  <Badge variant="outline">{error.environment}</Badge>
                )}
              </div>
              <h3 className="text-lg font-semibold">{error.title}</h3>
              <p className="text-sm text-muted-foreground">{error.message}</p>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Occurrences:</span>{' '}
                <span className="font-medium">{error.count}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Affected Users:</span>{' '}
                <span className="font-medium">{error.affectedUsers}</span>
              </div>
              <div>
                <span className="text-muted-foreground">First Seen:</span>{' '}
                <span className="font-medium">
                  {format(new Date(error.firstSeen), 'PPpp')}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Last Seen:</span>{' '}
                <span className="font-medium">
                  {formatDistanceToNow(new Date(error.lastSeen), { addSuffix: true })}
                </span>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="stacktrace" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="stacktrace">Stack Trace</TabsTrigger>
                <TabsTrigger value="breadcrumbs">Breadcrumbs</TabsTrigger>
                <TabsTrigger value="context">Context</TabsTrigger>
              </TabsList>

              <TabsContent value="stacktrace" className="space-y-2">
                <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                  <pre className="text-xs font-mono">
                    {error.stackTrace.join('\n')}
                  </pre>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="breadcrumbs" className="space-y-2">
                <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                  <div className="space-y-3">
                    {error.breadcrumbs.map((breadcrumb, index) => (
                      <div key={index} className="border-l-2 pl-3 py-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{breadcrumb.category}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(breadcrumb.timestamp), 'HH:mm:ss')}
                          </span>
                        </div>
                        <p className="text-sm mt-1">{breadcrumb.message}</p>
                        {breadcrumb.data && (
                          <pre className="text-xs text-muted-foreground mt-1">
                            {JSON.stringify(breadcrumb.data, null, 2)}
                          </pre>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="context" className="space-y-2">
                <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                  <div className="space-y-4">
                    {/* User Info */}
                    {error.user && (
                      <div>
                        <h4 className="font-semibold mb-2">User</h4>
                        <div className="space-y-1 text-sm">
                          <div>
                            <span className="text-muted-foreground">ID:</span>{' '}
                            {error.user.id}
                          </div>
                          {error.user.email && (
                            <div>
                              <span className="text-muted-foreground">Email:</span>{' '}
                              {error.user.email}
                            </div>
                          )}
                          {error.user.username && (
                            <div>
                              <span className="text-muted-foreground">Username:</span>{' '}
                              {error.user.username}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    {Object.keys(error.tags).length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(error.tags).map(([key, value]) => (
                            <Badge key={key} variant="outline">
                              {key}: {value}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Context */}
                    <div>
                      <h4 className="font-semibold mb-2">Additional Context</h4>
                      <pre className="text-xs font-mono bg-muted p-3 rounded">
                        {JSON.stringify(error.context, null, 2)}
                      </pre>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Error not found
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

