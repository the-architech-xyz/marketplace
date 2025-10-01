import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';

interface SubscriptionCardProps {
  subscription: {
    id: string;
    name: string;
    price: number;
    currency: string;
    interval: 'month' | 'year';
    features: string[];
    isPopular?: boolean;
    isCurrent?: boolean;
  };
  onSubscribe?: (subscriptionId: string) => void;
  onCancel?: (subscriptionId: string) => void;
  className?: string;
}

export function SubscriptionCard({ 
  subscription, 
  onSubscribe, 
  onCancel,
  className 
}: SubscriptionCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      await onSubscribe?.(subscription.id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async () => {
    setIsLoading(true);
    try {
      await onCancel?.(subscription.id);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={`relative ${subscription.isPopular ? 'border-primary shadow-lg' : ''} ${className}`}>
      {subscription.isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
        </div>
      )}
      
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{subscription.name}</CardTitle>
        <div className="text-3xl font-bold">
          ${(subscription.price / 100).toFixed(2)}
          <span className="text-sm font-normal text-muted-foreground">
            /{subscription.interval}
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {subscription.features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        <div className="pt-4">
          {subscription.isCurrent ? (
            <Button 
              variant="outline" 
              onClick={handleCancel}
              disabled={isLoading}
              className="w-full"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel Subscription
            </Button>
          ) : (
            <Button 
              onClick={handleSubscribe}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Processing...' : 'Subscribe'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
