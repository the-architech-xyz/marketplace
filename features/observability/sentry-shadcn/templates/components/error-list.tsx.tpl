'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { ErrorSummary } from '@/types/monitoring';
import { formatDistanceToNow } from 'date-fns';
import { AlertCircle, Users, Eye } from 'lucide-react';

interface ErrorListProps {
  errors: ErrorSummary[];
  isLoading: boolean;
  onErrorClick: (errorId: string) => void;
}

export function ErrorList({ errors, isLoading, onErrorClick }: ErrorListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="p-4 rounded-lg border">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (errors.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p className="text-lg font-medium">No errors found</p>
        <p className="text-sm">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {errors.map((error) => (
        <div
          key={error.id}
          className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  variant={
                    error.level === 'fatal'
                      ? 'destructive'
                      : error.level === 'error'
                      ? 'default'
                      : 'secondary'
                  }
                >
                  {error.level}
                </Badge>
                <Badge variant="outline">{error.status}</Badge>
                {error.environment && (
                  <Badge variant="outline">{error.environment}</Badge>
                )}
                <h3 className="font-semibold text-sm flex-1">
                  {error.title}
                </h3>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {error.message}
              </p>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  <span>{error.count} occurrences</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{error.affectedUsers} users affected</span>
                </div>
                <span>
                  Last seen {formatDistanceToNow(new Date(error.lastSeen), { addSuffix: true })}
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onErrorClick(error.id)}
            >
              <Eye className="h-4 w-4 mr-1" />
              Details
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

