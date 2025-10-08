import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Types
export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'resolved' | 'dismissed';
  source: string;
  timestamp: string;
  acknowledged: boolean;
  metadata?: Record<string, any>;
}

export interface AlertFilters {
  severity?: string;
  status?: string;
  source?: string;
  search?: string;
  acknowledged?: boolean;
}

export interface AlertStats {
  total: number;
  active: number;
  resolved: number;
  dismissed: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  acknowledged: number;
  unacknowledged: number;
}

// API functions
const fetchAlerts = async (filters: AlertFilters = {}): Promise<Alert[]> => {
  const searchParams = new URLSearchParams();
  if (filters.severity) searchParams.append('severity', filters.severity);
  if (filters.status) searchParams.append('status', filters.status);
  if (filters.source) searchParams.append('source', filters.source);
  if (filters.search) searchParams.append('search', filters.search);
  if (filters.acknowledged !== undefined) searchParams.append('acknowledged', filters.acknowledged.toString());

  const response = await fetch(`/api/monitoring/alerts?${searchParams}`);
  if (!response.ok) {
    throw new Error('Failed to fetch alerts');
  }
  return response.json();
};

const fetchAlertStats = async (): Promise<AlertStats> => {
  const response = await fetch('/api/monitoring/alerts/stats');
  if (!response.ok) {
    throw new Error('Failed to fetch alert stats');
  }
  return response.json();
};

const acknowledgeAlert = async (alertId: string): Promise<void> => {
  const response = await fetch(`/api/monitoring/alerts/${alertId}/acknowledge`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to acknowledge alert');
  }
};

const dismissAlert = async (alertId: string): Promise<void> => {
  const response = await fetch(`/api/monitoring/alerts/${alertId}/dismiss`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to dismiss alert');
  }
};

const resolveAlert = async (alertId: string): Promise<void> => {
  const response = await fetch(`/api/monitoring/alerts/${alertId}/resolve`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to resolve alert');
  }
};

const bulkAcknowledgeAlerts = async (alertIds: string[]): Promise<void> => {
  const response = await fetch('/api/monitoring/alerts/bulk/acknowledge', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ alertIds }),
  });
  if (!response.ok) {
    throw new Error('Failed to acknowledge alerts');
  }
};

const bulkDismissAlerts = async (alertIds: string[]): Promise<void> => {
  const response = await fetch('/api/monitoring/alerts/bulk/dismiss', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ alertIds }),
  });
  if (!response.ok) {
    throw new Error('Failed to dismiss alerts');
  }
};

// Hooks
export const useAlerts = (filters: AlertFilters = {}) => {
  return useQuery({
    queryKey: ['monitoring', 'alerts', filters],
    queryFn: () => fetchAlerts(filters),
    refetchInterval: 15000, // Refetch every 15 seconds
    staleTime: 5000, // Consider data stale after 5 seconds
  });
};

export const useAlertStats = () => {
  return useQuery({
    queryKey: ['monitoring', 'alerts', 'stats'],
    queryFn: fetchAlertStats,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 10000, // Consider data stale after 10 seconds
  });
};

export const useAcknowledgeAlert = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: acknowledgeAlert,
    onSuccess: () => {
      // Invalidate and refetch alerts
      queryClient.invalidateQueries({ queryKey: ['monitoring', 'alerts'] });
    },
  });
};

export const useDismissAlert = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: dismissAlert,
    onSuccess: () => {
      // Invalidate and refetch alerts
      queryClient.invalidateQueries({ queryKey: ['monitoring', 'alerts'] });
    },
  });
};

export const useResolveAlert = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: resolveAlert,
    onSuccess: () => {
      // Invalidate and refetch alerts
      queryClient.invalidateQueries({ queryKey: ['monitoring', 'alerts'] });
    },
  });
};

export const useBulkAcknowledgeAlerts = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: bulkAcknowledgeAlerts,
    onSuccess: () => {
      // Invalidate and refetch alerts
      queryClient.invalidateQueries({ queryKey: ['monitoring', 'alerts'] });
    },
  });
};

export const useBulkDismissAlerts = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: bulkDismissAlerts,
    onSuccess: () => {
      // Invalidate and refetch alerts
      queryClient.invalidateQueries({ queryKey: ['monitoring', 'alerts'] });
    },
  });
};

// Custom hook for alert management
export const useAlertManagement = (initialFilters: AlertFilters = {}) => {
  const [filters, setFilters] = useState<AlertFilters>(initialFilters);
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);

  const { data: alerts, isLoading, error } = useAlerts(filters);
  const { data: stats } = useAlertStats();
  
  const acknowledgeAlertMutation = useAcknowledgeAlert();
  const dismissAlertMutation = useDismissAlert();
  const resolveAlertMutation = useResolveAlert();
  const bulkAcknowledgeMutation = useBulkAcknowledgeAlerts();
  const bulkDismissMutation = useBulkDismissAlerts();

  const handleAcknowledgeAlert = useCallback((alertId: string) => {
    acknowledgeAlertMutation.mutate(alertId);
  }, [acknowledgeAlertMutation]);

  const handleDismissAlert = useCallback((alertId: string) => {
    dismissAlertMutation.mutate(alertId);
  }, [dismissAlertMutation]);

  const handleResolveAlert = useCallback((alertId: string) => {
    resolveAlertMutation.mutate(alertId);
  }, [resolveAlertMutation]);

  const handleBulkAcknowledge = useCallback(() => {
    if (selectedAlerts.length > 0) {
      bulkAcknowledgeMutation.mutate(selectedAlerts);
      setSelectedAlerts([]);
    }
  }, [selectedAlerts, bulkAcknowledgeMutation]);

  const handleBulkDismiss = useCallback(() => {
    if (selectedAlerts.length > 0) {
      bulkDismissMutation.mutate(selectedAlerts);
      setSelectedAlerts([]);
    }
  }, [selectedAlerts, bulkDismissMutation]);

  const handleSelectAlert = useCallback((alertId: string) => {
    setSelectedAlerts(prev => 
      prev.includes(alertId) 
        ? prev.filter(id => id !== alertId)
        : [...prev, alertId]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    if (alerts) {
      setSelectedAlerts(
        selectedAlerts.length === alerts.length 
          ? [] 
          : alerts.map(alert => alert.id)
      );
    }
  }, [alerts, selectedAlerts.length]);

  const handleFilterChange = useCallback((newFilters: Partial<AlertFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const getFilteredAlerts = useCallback(() => {
    if (!alerts) return [];
    
    return alerts.filter(alert => {
      if (filters.severity && alert.severity !== filters.severity) return false;
      if (filters.status && alert.status !== filters.status) return false;
      if (filters.source && !alert.source.includes(filters.source)) return false;
      if (filters.search && !alert.title.toLowerCase().includes(filters.search.toLowerCase()) && 
          !alert.description.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.acknowledged !== undefined && alert.acknowledged !== filters.acknowledged) return false;
      return true;
    });
  }, [alerts, filters]);

  return {
    // Data
    alerts: getFilteredAlerts(),
    stats,
    filters,
    selectedAlerts,
    
    // Loading states
    isLoading,
    error,
    
    // Actions
    acknowledgeAlert: handleAcknowledgeAlert,
    dismissAlert: handleDismissAlert,
    resolveAlert: handleResolveAlert,
    bulkAcknowledge: handleBulkAcknowledge,
    bulkDismiss: handleBulkDismiss,
    
    // Selection
    selectAlert: handleSelectAlert,
    selectAll: handleSelectAll,
    
    // Filtering
    setFilters: handleFilterChange,
    clearFilters: handleClearFilters,
    
    // Mutation states
    isAcknowledging: acknowledgeAlertMutation.isPending,
    isDismissing: dismissAlertMutation.isPending,
    isResolving: resolveAlertMutation.isPending,
    isBulkAcknowledging: bulkAcknowledgeMutation.isPending,
    isBulkDismissing: bulkDismissMutation.isPending,
  };
};
