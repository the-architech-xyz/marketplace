/**
 * Emailing Frontend Implementation: Shadcn/ui
 * 
 * This implementation provides the UI components for the emailing capability
 * using Shadcn/ui. It generates components that consume the hooks defined
 * in the contract.ts file.
 */

import { Blueprint, BlueprintActionType, ModifierType, EnhanceFileFallbackStrategy } from '@thearchitech.xyz/types';

export const emailingShadcnBlueprint: Blueprint = {
  id: 'emailing-frontend-shadcn',
  name: 'Emailing Frontend (Shadcn/ui)',
  description: 'Frontend implementation for emailing capability using Shadcn/ui',
  actions: [
    // Install additional dependencies for emailing UI
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'react-hook-form@^7.48.2',
        '@hookform/resolvers@^3.3.2',
        'zod@^3.22.4',
        'date-fns@^2.30.0',
        'lucide-react@^0.294.0',
        '@tanstack/react-query@^5.0.0'
      ]
    },

    // Create email composer component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/emailing/EmailComposer.tsx',
      content: `'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSendEmail, useTemplates } from '@/lib/emailing/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Send, Mail, Users } from 'lucide-react';

const emailComposerSchema = z.object({
  to: z.string().email('Please enter a valid email address'),
  from: z.string().email('Please enter a valid sender email'),
  subject: z.string().min(1, 'Subject is required'),
  content: z.string().min(1, 'Content is required'),
  htmlContent: z.string().optional(),
  templateId: z.string().optional()
});

type EmailComposerFormData = z.infer<typeof emailComposerSchema>;

export function EmailComposer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sendEmail = useSendEmail();
  const { data: templates } = useTemplates({ isActive: true });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<EmailComposerFormData>({
    resolver: zodResolver(emailComposerSchema),
    defaultValues: {
      from: 'noreply@yourcompany.com'
    }
  });

  const selectedTemplateId = watch('templateId');

  const onSubmit = async (data: EmailComposerFormData) => {
    setIsSubmitting(true);
    try {
      await sendEmail.mutateAsync(data);
      // TODO: Show success message or redirect
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = templates?.find(t => t.id === templateId);
    if (template) {
      setValue('subject', template.subject);
      setValue('content', template.content);
      setValue('htmlContent', template.htmlContent);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Compose Email
        </CardTitle>
        <CardDescription>
          Send emails to your subscribers or contacts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Input
                id="to"
                type="email"
                placeholder="recipient@example.com"
                {...register('to')}
              />
              {errors.to && (
                <Alert>
                  <AlertDescription>{errors.to.message}</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="from">From</Label>
              <Input
                id="from"
                type="email"
                placeholder="sender@example.com"
                {...register('from')}
              />
              {errors.from && (
                <Alert>
                  <AlertDescription>{errors.from.message}</AlertDescription>
                </Alert>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="template">Template (Optional)</Label>
            <Select onValueChange={handleTemplateSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                {templates?.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="Email subject"
              {...register('subject')}
            />
            {errors.subject && (
              <Alert>
                <AlertDescription>{errors.subject.message}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Write your email content here..."
              rows={8}
              {...register('content')}
            />
            {errors.content && (
              <Alert>
                <AlertDescription>{errors.content.message}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="htmlContent">HTML Content (Optional)</Label>
            <Textarea
              id="htmlContent"
              placeholder="HTML version of your email..."
              rows={6}
              {...register('htmlContent')}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              <Send className="w-4 h-4 mr-2" />
              Send Email
            </Button>
            <Button type="button" variant="outline">
              Save Draft
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}`
    },

    // Create email list component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/emailing/EmailList.tsx',
      content: `'use client';

import { useEmails } from '@/lib/emailing/hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Mail, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

export function EmailList() {
  const { data: emails, isLoading, error } = useEmails({ limit: 50 });

  if (isLoading) {
    return <div>Loading emails...</div>;
  }

  if (error) {
    return <div>Error loading emails: {error.message}</div>;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'bounced':
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800';
      case 'delivered':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'bounced':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Email History
            </CardTitle>
            <CardDescription>
              View and manage your sent emails
            </CardDescription>
          </div>
          <Button>
            <Mail className="w-4 h-4 mr-2" />
            Compose New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {emails?.length === 0 ? (
          <div className="text-center py-8">
            <Mail className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No emails sent yet</h3>
            <p className="text-gray-600 mb-4">Start by composing your first email</p>
            <Button>Compose Email</Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Recipient</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emails?.map((email) => (
                <TableRow key={email.id}>
                  <TableCell className="font-medium">
                    {Array.isArray(email.to) ? email.to.join(', ') : email.to}
                  </TableCell>
                  <TableCell>{email.subject}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(email.status)}
                      <Badge className={getStatusColor(email.status)}>
                        {email.status.toUpperCase()}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    {email.sentAt ? format(new Date(email.sentAt), 'MMM dd, yyyy HH:mm') : '-'}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Resend
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}`
    },

    // Create template manager component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/emailing/TemplateManager.tsx',
      content: `'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTemplates, useCreateTemplate, useUpdateTemplate, useDeleteTemplate } from '@/lib/emailing/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Plus, Edit, Trash2, FileText, Copy } from 'lucide-react';
import { format } from 'date-fns';

const templateSchema = z.object({
  name: z.string().min(1, 'Template name is required'),
  subject: z.string().min(1, 'Subject is required'),
  content: z.string().min(1, 'Content is required'),
  htmlContent: z.string().optional(),
  variables: z.array(z.string()).optional()
});

type TemplateFormData = z.infer<typeof templateSchema>;

export function TemplateManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);
  const { data: templates, isLoading } = useTemplates();
  const createTemplate = useCreateTemplate();
  const updateTemplate = useUpdateTemplate();
  const deleteTemplate = useDeleteTemplate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<TemplateFormData>({
    resolver: zodResolver(templateSchema)
  });

  const onSubmit = async (data: TemplateFormData) => {
    try {
      if (editingTemplate) {
        await updateTemplate.mutateAsync({ id: editingTemplate.id, data });
      } else {
        await createTemplate.mutateAsync(data);
      }
      setIsDialogOpen(false);
      setEditingTemplate(null);
      reset();
    } catch (error) {
      console.error('Error saving template:', error);
    }
  };

  const handleEdit = (template: any) => {
    setEditingTemplate(template);
    setValue('name', template.name);
    setValue('subject', template.subject);
    setValue('content', template.content);
    setValue('htmlContent', template.htmlContent || '');
    setValue('variables', template.variables || []);
    setIsDialogOpen(true);
  };

  const handleDelete = async (templateId: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      await deleteTemplate.mutateAsync(templateId);
    }
  };

  const handleDuplicate = (template: any) => {
    setEditingTemplate(null);
    setValue('name', \`\${template.name} (Copy)\`);
    setValue('subject', template.subject);
    setValue('content', template.content);
    setValue('htmlContent', template.htmlContent || '');
    setValue('variables', template.variables || []);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Email Templates
              </CardTitle>
              <CardDescription>
                Create and manage email templates for consistent messaging
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { setEditingTemplate(null); reset(); }}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Template
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingTemplate ? 'Edit Template' : 'Create New Template'}
                  </DialogTitle>
                  <DialogDescription>
                    {editingTemplate ? 'Update your email template' : 'Create a new email template for your campaigns'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Template Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Welcome Email"
                      {...register('name')}
                    />
                    {errors.name && (
                      <Alert>
                        <AlertDescription>{errors.name.message}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject Line</Label>
                    <Input
                      id="subject"
                      placeholder="e.g., Welcome to {{companyName}}!"
                      {...register('subject')}
                    />
                    {errors.subject && (
                      <Alert>
                        <AlertDescription>{errors.subject.message}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      placeholder="Write your email content here..."
                      rows={6}
                      {...register('content')}
                    />
                    {errors.content && (
                      <Alert>
                        <AlertDescription>{errors.content.message}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="htmlContent">HTML Content (Optional)</Label>
                    <Textarea
                      id="htmlContent"
                      placeholder="HTML version of your email..."
                      rows={4}
                      {...register('htmlContent')}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" disabled={createTemplate.isPending || updateTemplate.isPending}>
                      {(createTemplate.isPending || updateTemplate.isPending) && (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      )}
                      {editingTemplate ? 'Update Template' : 'Create Template'}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading templates...</div>
          ) : templates?.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No templates yet</h3>
              <p className="text-gray-600 mb-4">Create your first email template to get started</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {templates?.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell className="font-medium">{template.name}</TableCell>
                    <TableCell>{template.subject}</TableCell>
                    <TableCell>
                      <Badge className={template.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {template.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>{format(new Date(template.createdAt), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(template)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDuplicate(template)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDelete(template.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}`
    },

    // Create emailing dashboard page
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/emailing/page.tsx',
      content: `import { EmailComposer } from '@/components/emailing/EmailComposer';
import { EmailList } from '@/components/emailing/EmailList';
import { TemplateManager } from '@/components/emailing/TemplateManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function EmailingPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Email Management</h1>
          <p className="text-gray-600">Send emails, manage templates, and track performance</p>
        </div>

        <Tabs defaultValue="compose" className="space-y-6">
          <TabsList>
            <TabsTrigger value="compose">Compose</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="compose">
            <EmailComposer />
          </TabsContent>

          <TabsContent value="templates">
            <TemplateManager />
          </TabsContent>

          <TabsContent value="history">
            <EmailList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}`
    }
  ]
};
