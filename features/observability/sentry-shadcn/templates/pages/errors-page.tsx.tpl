'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ErrorList } from '@/components/monitoring/error-list';
import { ErrorFilters } from '@/components/monitoring/error-filters';
import { ErrorDetailsDialog } from '@/components/monitoring/error-details-dialog';
import { useErrorList } from '@/hooks/use-monitoring-data';
import type { MonitoringFilters } from '@/types/monitoring';

export default function ErrorsPage() {
  const [filters, setFilters] = useState<MonitoringFilters>({
    status: ['unresolved']
  });
  const [selectedErrorId, setSelectedErrorId] = useState<string | null>(null);

  const { data: errors, isLoading } = useErrorList(filters);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Errors</h1>
          <p className="text-muted-foreground">
            Browse and manage application errors
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Error Browser</CardTitle>
          <CardDescription>
            Filter and search through captured errors
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ErrorFilters filters={filters} onFiltersChange={setFilters} />
          
          <ErrorList
            errors={errors || []}
            isLoading={isLoading}
            onErrorClick={setSelectedErrorId}
          />
        </CardContent>
      </Card>

      <ErrorDetailsDialog
        errorId={selectedErrorId}
        open={!!selectedErrorId}
        onOpenChange={(open) => !open && setSelectedErrorId(null)}
      />
    </div>
  );
}

