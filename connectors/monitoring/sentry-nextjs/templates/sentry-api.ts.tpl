/**
 * Sentry API Service
 * 
 * Standardized API service for Sentry integration
 * Provides consistent interface for all Sentry operations
 */

import type { 
  ErrorEvent, 
  ErrorStats, 
  ErrorFilter,
  PerformanceEvent,
  PerformanceStats,
  PerformanceFilter,
  UserFeedback,
  FeedbackStats,
  FeedbackFilter,
  SentryConfig,
  SentryStats,
  SentryHealth
} from './types';

const SENTRY_API_BASE = process.env.NEXT_PUBLIC_SENTRY_API_BASE || 'https://sentry.io/api/0';

class SentryApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${SENTRY_API_BASE}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SENTRY_AUTH_TOKEN}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Sentry API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Error Tracking API
  async getErrorEvents(filters?: ErrorFilter): Promise<ErrorEvent[]> {
    const params = new URLSearchParams();
    if (filters?.project) params.append('project', filters.project);
    if (filters?.environment) params.append('environment', filters.environment);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.timeRange) params.append('timeRange', filters.timeRange);
    
    return this.request<ErrorEvent[]>(`/projects/${filters?.project || 'default'}/events/?${params}`);
  }

  async getErrorEvent(errorId: string): Promise<ErrorEvent> {
    return this.request<ErrorEvent>(`/events/${errorId}/`);
  }

  async getErrorStats(timeRange?: string): Promise<ErrorStats> {
    const params = new URLSearchParams();
    if (timeRange) params.append('timeRange', timeRange);
    
    return this.request<ErrorStats>(`/stats/?${params}`);
  }

  async reportError(error: ErrorEvent): Promise<ErrorEvent> {
    return this.request<ErrorEvent>('/events/', {
      method: 'POST',
      body: JSON.stringify(error),
    });
  }

  async resolveError(errorId: string): Promise<void> {
    await this.request<void>(`/events/${errorId}/resolve/`, {
      method: 'PUT',
    });
  }

  async ignoreError(errorId: string): Promise<void> {
    await this.request<void>(`/events/${errorId}/ignore/`, {
      method: 'PUT',
    });
  }

  async getErrorTrends(timeRange?: string): Promise<any> {
    const params = new URLSearchParams();
    if (timeRange) params.append('timeRange', timeRange);
    
    return this.request<any>(`/trends/errors/?${params}`);
  }

  async getErrorDistribution(timeRange?: string): Promise<any> {
    const params = new URLSearchParams();
    if (timeRange) params.append('timeRange', timeRange);
    
    return this.request<any>(`/distribution/errors/?${params}`);
  }

  async getErrorAlerts(): Promise<any[]> {
    return this.request<any[]>('/alerts/errors/');
  }

  async createErrorAlert(alert: any): Promise<any> {
    return this.request<any>('/alerts/errors/', {
      method: 'POST',
      body: JSON.stringify(alert),
    });
  }

  // Performance Monitoring API
  async getPerformanceEvents(filters?: PerformanceFilter): Promise<PerformanceEvent[]> {
    const params = new URLSearchParams();
    if (filters?.project) params.append('project', filters.project);
    if (filters?.environment) params.append('environment', filters.environment);
    if (filters?.timeRange) params.append('timeRange', filters.timeRange);
    
    return this.request<PerformanceEvent[]>(`/performance/events/?${params}`);
  }

  async getPerformanceEvent(eventId: string): Promise<PerformanceEvent> {
    return this.request<PerformanceEvent>(`/performance/events/${eventId}/`);
  }

  async getPerformanceStats(timeRange?: string): Promise<PerformanceStats> {
    const params = new URLSearchParams();
    if (timeRange) params.append('timeRange', timeRange);
    
    return this.request<PerformanceStats>(`/performance/stats/?${params}`);
  }

  async reportPerformance(event: PerformanceEvent): Promise<PerformanceEvent> {
    return this.request<PerformanceEvent>('/performance/events/', {
      method: 'POST',
      body: JSON.stringify(event),
    });
  }

  async getPerformanceTrends(timeRange?: string): Promise<any> {
    const params = new URLSearchParams();
    if (timeRange) params.append('timeRange', timeRange);
    
    return this.request<any>(`/performance/trends/?${params}`);
  }

  async getPerformanceDistribution(timeRange?: string): Promise<any> {
    const params = new URLSearchParams();
    if (timeRange) params.append('timeRange', timeRange);
    
    return this.request<any>(`/performance/distribution/?${params}`);
  }

  async getCoreWebVitals(timeRange?: string): Promise<any> {
    const params = new URLSearchParams();
    if (timeRange) params.append('timeRange', timeRange);
    
    return this.request<any>(`/performance/core-web-vitals/?${params}`);
  }

  async getPerformanceAlerts(): Promise<any[]> {
    return this.request<any[]>('/alerts/performance/');
  }

  async createPerformanceAlert(alert: any): Promise<any> {
    return this.request<any>('/alerts/performance/', {
      method: 'POST',
      body: JSON.stringify(alert),
    });
  }

  async getPerformanceInsights(timeRange?: string): Promise<any> {
    const params = new URLSearchParams();
    if (timeRange) params.append('timeRange', timeRange);
    
    return this.request<any>(`/performance/insights/?${params}`);
  }

  async getPerformanceRecommendations(): Promise<any[]> {
    return this.request<any[]>('/performance/recommendations/');
  }

  // User Feedback API
  async getUserFeedback(filters?: FeedbackFilter): Promise<UserFeedback[]> {
    const params = new URLSearchParams();
    if (filters?.project) params.append('project', filters.project);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.timeRange) params.append('timeRange', filters.timeRange);
    
    return this.request<UserFeedback[]>(`/feedback/?${params}`);
  }

  async getFeedbackItem(feedbackId: string): Promise<UserFeedback> {
    return this.request<UserFeedback>(`/feedback/${feedbackId}/`);
  }

  async getFeedbackStats(timeRange?: string): Promise<FeedbackStats> {
    const params = new URLSearchParams();
    if (timeRange) params.append('timeRange', timeRange);
    
    return this.request<FeedbackStats>(`/feedback/stats/?${params}`);
  }

  async submitFeedback(feedback: UserFeedback): Promise<UserFeedback> {
    return this.request<UserFeedback>('/feedback/', {
      method: 'POST',
      body: JSON.stringify(feedback),
    });
  }

  async updateFeedbackStatus(feedbackId: string, status: string): Promise<void> {
    await this.request<void>(`/feedback/${feedbackId}/status/`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async getFeedbackTrends(timeRange?: string): Promise<any> {
    const params = new URLSearchParams();
    if (timeRange) params.append('timeRange', timeRange);
    
    return this.request<any>(`/feedback/trends/?${params}`);
  }

  async getFeedbackDistribution(timeRange?: string): Promise<any> {
    const params = new URLSearchParams();
    if (timeRange) params.append('timeRange', timeRange);
    
    return this.request<any>(`/feedback/distribution/?${params}`);
  }

  async getFeedbackSentiment(timeRange?: string): Promise<any> {
    const params = new URLSearchParams();
    if (timeRange) params.append('timeRange', timeRange);
    
    return this.request<any>(`/feedback/sentiment/?${params}`);
  }

  async getFeedbackAlerts(): Promise<any[]> {
    return this.request<any[]>('/alerts/feedback/');
  }

  async createFeedbackAlert(alert: any): Promise<any> {
    return this.request<any>('/alerts/feedback/', {
      method: 'POST',
      body: JSON.stringify(alert),
    });
  }

  async getFeedbackInsights(timeRange?: string): Promise<any> {
    const params = new URLSearchParams();
    if (timeRange) params.append('timeRange', timeRange);
    
    return this.request<any>(`/feedback/insights/?${params}`);
  }

  // Main Sentry API
  async getConfig(): Promise<SentryConfig> {
    return this.request<SentryConfig>('/config/');
  }

  async getHealth(): Promise<SentryHealth> {
    return this.request<SentryHealth>('/health/');
  }

  async getStats(timeRange?: string): Promise<SentryStats> {
    const params = new URLSearchParams();
    if (timeRange) params.append('timeRange', timeRange);
    
    return this.request<SentryStats>(`/stats/?${params}`);
  }

  async getProjects(): Promise<any[]> {
    return this.request<any[]>('/projects/');
  }

  async getReleases(projectId?: string): Promise<any[]> {
    const params = new URLSearchParams();
    if (projectId) params.append('project', projectId);
    
    return this.request<any[]>(`/releases/?${params}`);
  }

  async createRelease(release: any): Promise<any> {
    return this.request<any>('/releases/', {
      method: 'POST',
      body: JSON.stringify(release),
    });
  }

  async getIntegrations(): Promise<any[]> {
    return this.request<any[]>('/integrations/');
  }

  async configureIntegration(integrationId: string, config: any): Promise<any> {
    return this.request<any>(`/integrations/${integrationId}/`, {
      method: 'PUT',
      body: JSON.stringify(config),
    });
  }
}

export const sentryApi = new SentryApiService();
