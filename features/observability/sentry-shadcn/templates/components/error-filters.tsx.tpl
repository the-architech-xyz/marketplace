'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { MonitoringFilters } from '@/types/monitoring';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface ErrorFiltersProps {
  filters: MonitoringFilters;
  onFiltersChange: (filters: MonitoringFilters) => void;
}

export function ErrorFilters({ filters, onFiltersChange }: ErrorFiltersProps) {
  const handleStatusChange = (status: string) => {
    const currentStatus = filters.status || [];
    const newStatus = currentStatus.includes(status as any)
      ? currentStatus.filter((s) => s !== status)
      : [...currentStatus, status as any];
    
    onFiltersChange({ ...filters, status: newStatus.length > 0 ? newStatus : undefined });
  };

  const handleLevelChange = (level: string) => {
    const currentLevel = filters.level || [];
    const newLevel = currentLevel.includes(level as any)
      ? currentLevel.filter((l) => l !== level)
      : [...currentLevel, level as any];
    
    onFiltersChange({ ...filters, level: newLevel.length > 0 ? newLevel : undefined });
  };

  const clearFilters = () => {
    onFiltersChange({ status: ['unresolved'] });
  };

  const hasActiveFilters = 
    (filters.level && filters.level.length > 0) ||
    (filters.environment) ||
    (filters.search);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search errors..."
            value={filters.search || ''}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value || undefined })}
          />
        </div>

        {/* Environment */}
        <div className="space-y-2">
          <Label htmlFor="environment">Environment</Label>
          <Select
            value={filters.environment || 'all'}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, environment: value === 'all' ? undefined : value })
            }
          >
            <SelectTrigger id="environment">
              <SelectValue placeholder="All environments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All environments</SelectItem>
              <SelectItem value="production">Production</SelectItem>
              <SelectItem value="staging">Staging</SelectItem>
              <SelectItem value="development">Development</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label>Status</Label>
          <div className="flex flex-wrap gap-2">
            {(['unresolved', 'resolved', 'ignored'] as const).map((status) => (
              <Badge
                key={status}
                variant={filters.status?.includes(status) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => handleStatusChange(status)}
              >
                {status}
              </Badge>
            ))}
          </div>
        </div>

        {/* Level */}
        <div className="space-y-2">
          <Label>Level</Label>
          <div className="flex flex-wrap gap-2">
            {(['error', 'warning', 'info', 'fatal'] as const).map((level) => (
              <Badge
                key={level}
                variant={filters.level?.includes(level) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => handleLevelChange(level)}
              >
                {level}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {filters.level?.map((level) => (
            <Badge key={level} variant="secondary">
              Level: {level}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => handleLevelChange(level)}
              />
            </Badge>
          ))}
          {filters.environment && (
            <Badge variant="secondary">
              Environment: {filters.environment}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => onFiltersChange({ ...filters, environment: undefined })}
              />
            </Badge>
          )}
          {filters.search && (
            <Badge variant="secondary">
              Search: {filters.search}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => onFiltersChange({ ...filters, search: undefined })}
              />
            </Badge>
          )}
          <button
            onClick={clearFilters}
            className="text-sm text-muted-foreground hover:text-foreground underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}

