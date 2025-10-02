'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Save, Eye, Code, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const templateSchema = z.object({
  name: z.string().min(1, 'Template name is required'),
  subject: z.string().min(1, 'Subject is required'),
  html: z.string().min(1, 'HTML content is required'),
  text: z.string().optional(),
  variables: z.array(z.string()).optional(),
});

type TemplateFormData = z.infer<typeof templateSchema>;

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html: string;
  text?: string;
  variables?: string[];
  createdAt: string;
  updatedAt: string;
}

export function EmailTemplateEditor() {
  const [template, setTemplate] = useState<EmailTemplate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState<'html' | 'text'>('html');
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TemplateFormData>({
    resolver: zodResolver(templateSchema),
  });

  const watchedHtml = watch('html');
  const watchedSubject = watch('subject');

  const onSubmit = async (data: TemplateFormData) => {
    setIsSaving(true);
    setError(null);

    try {
      // TODO: Implement template save logic
      console.log('Saving template:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save template');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    setPreviewMode(previewMode === 'html' ? 'text' : 'html');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Email Template Editor</h1>
        <p className="text-muted-foreground mt-2">
          Create and edit email templates with live preview
        </p>
      </div>

      {error && (
        <Alert className="mb-6" variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Template Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Template Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Template Name</Label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="Welcome Email"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="subject">Subject Line</Label>
                <Input
                  id="subject"
                  {...register('subject')}
                  placeholder="Welcome to {{appName}}!"
                  className={errors.subject ? 'border-red-500' : ''}
                />
                {errors.subject && (
                  <p className="text-sm text-red-500 mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="variables">Template Variables (comma-separated)</Label>
                <Input
                  id="variables"
                  placeholder="appName, userName, resetLink"
                  onChange={(e) => {
                    const variables = e.target.value
                      .split(',')
                      .map(v => v.trim())
                      .filter(v => v.length > 0);
                    setValue('variables', variables);
                  }}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Use these variables in your template with {{variableName}}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={previewMode} onValueChange={(value) => setPreviewMode(value as 'html' | 'text')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="html">HTML</TabsTrigger>
                  <TabsTrigger value="text">Text</TabsTrigger>
                </TabsList>
                <TabsContent value="html" className="mt-4">
                  <div 
                    className="border rounded-lg p-4 min-h-[200px] bg-white"
                    dangerouslySetInnerHTML={{ 
                      __html: watchedHtml || '<p>Enter HTML content to see preview...</p>' 
                    }}
                  />
                </TabsContent>
                <TabsContent value="text" className="mt-4">
                  <div className="border rounded-lg p-4 min-h-[200px] bg-gray-50 font-mono text-sm whitespace-pre-wrap">
                    {watchedSubject || 'No subject set'}
                    {'\n\n'}
                    {watchedHtml?.replace(/<[^>]*>/g, '') || 'Enter HTML content to see text preview...'}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Content Editor */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Template Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="html" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="html">HTML</TabsTrigger>
                <TabsTrigger value="text">Text</TabsTrigger>
              </TabsList>
              <TabsContent value="html" className="mt-4">
                <Textarea
                  {...register('html')}
                  placeholder="<html><body><h1>Welcome {{userName}}!</h1><p>Thank you for joining {{appName}}.</p></body></html>"
                  className="min-h-[300px] font-mono text-sm"
                />
                {errors.html && (
                  <p className="text-sm text-red-500 mt-1">{errors.html.message}</p>
                )}
              </TabsContent>
              <TabsContent value="text" className="mt-4">
                <Textarea
                  {...register('text')}
                  placeholder="Welcome {{userName}}!\n\nThank you for joining {{appName}}.\n\nBest regards,\nThe {{appName}} Team"
                  className="min-h-[300px] font-mono text-sm"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={handlePreview}
            disabled={isSaving}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {isSaving ? 'Saving...' : 'Save Template'}
          </Button>
        </div>
      </form>
    </div>
  );
}
