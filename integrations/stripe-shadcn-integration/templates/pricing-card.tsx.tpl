import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

interface PricingCardProps {
  plan: {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    interval: 'month' | 'year';
    features: string[];
    isPopular?: boolean;
    isCurrent?: boolean;
    stripePriceId?: string;
  };
  onSelect?: (planId: string) => void;
  className?: string;
}

export function PricingCard({ plan, onSelect, className }: PricingCardProps) {
  const handleSelect = () => {
    onSelect?.(plan.id);
  };

  return (
    <Card className={`relative ${plan.isPopular ? 'border-primary shadow-lg scale-105' : ''} ${className}`}>
      {plan.isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
        </div>
      )}
      
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{plan.name}</CardTitle>
        <p className="text-muted-foreground">{plan.description}</p>
        <div className="text-4xl font-bold">
          ${(plan.price / 100).toFixed(2)}
          <span className="text-lg font-normal text-muted-foreground">
            /{plan.interval}
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        <div className="pt-4">
          <Button 
            onClick={handleSelect}
            className={`w-full ${plan.isPopular ? 'bg-primary hover:bg-primary/90' : ''}`}
            variant={plan.isPopular ? 'default' : 'outline'}
          >
            {plan.isCurrent ? 'Current Plan' : 'Select Plan'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
