import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  unit?: string;
  description?: string;
  trend?: 'up' | 'down' | 'stable';
  change?: number;
  status?: 'good' | 'warning' | 'critical';
  icon?: React.ReactNode;
  className?: string;
}

export default function MetricsCard({
  title,
  value,
  unit,
  description,
  trend,
  change,
  status = 'good',
  icon,
  className = ''
}: MetricsCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4" />;
      case 'down': return <TrendingDown className="h-4 w-4" />;
      case 'stable': return <Minus className="h-4 w-4" />;
      default: return null;
    }
  };

  const getTrendColor = (trend?: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className={`hover:shadow-lg transition-shadow ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {status !== 'good' && (
            <Badge className={getStatusBadgeColor(status)}>
              {status}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-2">
          {icon && <div className="text-muted-foreground">{icon}</div>}
          <div className="text-2xl font-bold">
            {value}
            {unit && <span className="text-sm text-muted-foreground ml-1">{unit}</span>}
          </div>
        </div>
        
        {description && (
          <p className="text-xs text-muted-foreground mb-2">{description}</p>
        )}
        
        {trend && change !== undefined && (
          <div className="flex items-center text-xs">
            <div className={`flex items-center gap-1 ${getTrendColor(trend)}`}>
              {getTrendIcon(trend)}
              <span>{Math.abs(change)}%</span>
            </div>
            <span className="text-muted-foreground ml-1">from last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
