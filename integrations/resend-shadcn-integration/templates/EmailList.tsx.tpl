'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Users, 
  Mail,
  Calendar,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const emailListSchema = z.object({
  name: z.string().min(1, 'List name is required'),
  description: z.string().optional(),
  tags: z.string().optional(),
});

type EmailListFormData = z.infer<typeof emailListSchema>;

interface EmailList {
  id: string;
  name: string;
  description?: string;
  subscriberCount: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'archived' | 'draft';
}

interface Subscriber {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  subscribedAt: string;
  status: 'subscribed' | 'unsubscribed' | 'bounced';
  tags: string[];
}

export function EmailList() {
  const [lists, setLists] = useState<EmailList[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmailListFormData>({
    resolver: zodResolver(emailListSchema),
  });

  useEffect(() => {
    loadLists();
  }, []);

  useEffect(() => {
    if (selectedList) {
      loadSubscribers(selectedList);
    }
  }, [selectedList]);

  const loadLists = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement actual API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setLists([
        {
          id: '1',
          name: 'Newsletter Subscribers',
          description: 'Main newsletter list for product updates and news',
          subscriberCount: 15432,
          tags: ['newsletter', 'product'],
          createdAt: '2024-01-01',
          updatedAt: '2024-01-26',
          status: 'active',
        },
        {
          id: '2',
          name: 'Beta Testers',
          description: 'Early adopters and beta testers',
          subscriberCount: 2341,
          tags: ['beta', 'testing'],
          createdAt: '2024-01-05',
          updatedAt: '2024-01-25',
          status: 'active',
        },
        {
          id: '3',
          name: 'VIP Customers',
          description: 'High-value customers and enterprise clients',
          subscriberCount: 567,
          tags: ['vip', 'enterprise'],
          createdAt: '2024-01-10',
          updatedAt: '2024-01-24',
          status: 'active',
        },
        {
          id: '4',
          name: 'Old Campaign List',
          description: 'Archived list from previous campaign',
          subscriberCount: 0,
          tags: ['archived'],
          createdAt: '2023-12-01',
          updatedAt: '2023-12-15',
          status: 'archived',
        },
      ]);
    } catch (err) {
      setError('Failed to load email lists');
    } finally {
      setIsLoading(false);
    }
  };

  const loadSubscribers = async (listId: string) => {
    try {
      // TODO: Implement actual API calls
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSubscribers([
        {
          id: '1',
          email: 'john.doe@example.com',
          firstName: 'John',
          lastName: 'Doe',
          subscribedAt: '2024-01-15',
          status: 'subscribed',
          tags: ['newsletter'],
        },
        {
          id: '2',
          email: 'jane.smith@example.com',
          firstName: 'Jane',
          lastName: 'Smith',
          subscribedAt: '2024-01-16',
          status: 'subscribed',
          tags: ['beta'],
        },
        {
          id: '3',
          email: 'bob.wilson@example.com',
          firstName: 'Bob',
          lastName: 'Wilson',
          subscribedAt: '2024-01-17',
          status: 'unsubscribed',
          tags: ['newsletter'],
        },
        {
          id: '4',
          email: 'invalid@example.com',
          firstName: 'Invalid',
          lastName: 'Email',
          subscribedAt: '2024-01-18',
          status: 'bounced',
          tags: ['newsletter'],
        },
      ]);
    } catch (err) {
      setError('Failed to load subscribers');
    }
  };

  const onCreateList = async (data: EmailListFormData) => {
    setIsCreating(true);
    setError(null);

    try {
      // TODO: Implement actual API call
      console.log('Creating list:', data);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add to local state
      const newList: EmailList = {
        id: Date.now().toString(),
        name: data.name,
        description: data.description,
        subscriberCount: 0,
        tags: data.tags ? data.tags.split(',').map(t => t.trim()) : [],
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        status: 'active',
      };
      
      setLists(prev => [newList, ...prev]);
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create list');
    } finally {
      setIsCreating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'archived':
        return <Badge variant="secondary">Archived</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getSubscriberStatusIcon = (status: string) => {
    switch (status) {
      case 'subscribed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'unsubscribed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'bounced':
        return <XCircle className="h-4 w-4 text-orange-500" />;
      default:
        return <XCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredLists = lists.filter(list =>
    list.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    list.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSubscribers = subscribers.filter(subscriber =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscriber.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscriber.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Users className="h-8 w-8 animate-pulse mx-auto mb-2" />
            <p>Loading email lists...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Email Lists</h1>
            <p className="text-muted-foreground mt-2">
              Manage your email subscriber lists and segments
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create List
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Email List</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onCreateList)} className="space-y-4">
                <div>
                  <Label htmlFor="name">List Name</Label>
                  <Input
                    id="name"
                    {...register('name')}
                    placeholder="Newsletter Subscribers"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    placeholder="Brief description of this list..."
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    {...register('tags')}
                    placeholder="newsletter, product, updates"
                  />
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isCreating}>
                    {isCreating ? 'Creating...' : 'Create List'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Lists Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredLists.map((list) => (
          <Card 
            key={list.id} 
            className={`cursor-pointer transition-colors hover:bg-muted/50 ${
              selectedList === list.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedList(list.id)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{list.name}</CardTitle>
                {getStatusBadge(list.status)}
              </div>
              {list.description && (
                <p className="text-sm text-muted-foreground">{list.description}</p>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {list.subscriberCount.toLocaleString()} subscribers
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(list.updatedAt).toLocaleDateString()}
                </div>
              </div>
              {list.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {list.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Subscribers Table */}
      {selectedList && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                Subscribers - {lists.find(l => l.id === selectedList)?.name}
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search subscribers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Subscribed</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscribers.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell className="font-medium">{subscriber.email}</TableCell>
                    <TableCell>
                      {subscriber.firstName && subscriber.lastName
                        ? `${subscriber.firstName} ${subscriber.lastName}`
                        : 'N/A'
                      }
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getSubscriberStatusIcon(subscriber.status)}
                        <span className="capitalize">{subscriber.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(subscriber.subscribedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {subscriber.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
