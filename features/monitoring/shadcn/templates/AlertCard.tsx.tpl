import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Info, 
  Clock, 
  Settings, 
  Eye,
  Check
} from 'lucide-react';

interface AlertCardProps {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'resolved' | 'dismissed';
  source: string;
  timestamp: string;
  acknowledged: boolean;
  onAcknowledge?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  onDismiss?: (id: string) => void;
  className?: string;
}

export default function AlertCard({
  id,
  title,
  description,
  severity,
  status,
  source,
  timestamp,
  acknowledged,
  onAcknowledge,
  onViewDetails,
  onDismiss,
  className = ''
}: AlertCardProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return <Info className="h-4 w-4" />;
      case 'medium': return <AlertTriangle className="h-4 w-4" />;
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'critical': return <XCircle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'dismissed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityAlertVariant = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'default';
      default: return 'default';
    }
  };

  return (
    <Card className={`hover:shadow-lg transition-shadow ${className}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              {getSeverityIcon(severity)}
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription className="mt-1">{description}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getSeverityColor(severity)}>
              {severity}
            </Badge>
            <Badge className={getStatusColor(status)}>
              {status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              <span>Source: {source}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{timestamp}</span>
            </div>
            {acknowledged && (
              <div className="flex items-center gap-1 text-green-600">
                <Check className="h-4 w-4" />
                <span>Acknowledged</span>
              </div>
            )}
          </div>
          
          {severity === 'critical' && status === 'active' && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                This is a critical alert that requires immediate attention.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex items-center gap-2">
            {status === 'active' && !acknowledged && onAcknowledge && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onAcknowledge(id)}
              >
                <Check className="h-4 w-4 mr-2" />
                Acknowledge
              </Button>
            )}
            {onViewDetails && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onViewDetails(id)}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            )}
            {status === 'active' && onDismiss && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onDismiss(id)}
              >
                Dismiss
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
