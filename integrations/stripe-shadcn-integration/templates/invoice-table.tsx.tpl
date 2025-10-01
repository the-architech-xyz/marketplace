import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface Invoice {
  id: string;
  number: string;
  date: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed' | 'refunded';
  description?: string;
  invoiceUrl?: string;
}

interface InvoiceTableProps {
  invoices: Invoice[];
  onDownload?: (invoiceId: string) => void;
  className?: string;
}

export function InvoiceTable({ invoices, onDownload, className }: InvoiceTableProps) {
  const getStatusBadge = (status: Invoice['status']) => {
    const variants = {
      paid: 'default',
      pending: 'secondary',
      failed: 'destructive',
      refunded: 'outline',
    } as const;

    return (
      <Badge variant={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={className}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice #</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.number}</TableCell>
              <TableCell>{formatDate(invoice.date)}</TableCell>
              <TableCell>{invoice.description || '—'}</TableCell>
              <TableCell>{formatAmount(invoice.amount, invoice.currency)}</TableCell>
              <TableCell>{getStatusBadge(invoice.status)}</TableCell>
              <TableCell className="text-right">
                {invoice.invoiceUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDownload?.(invoice.id)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
