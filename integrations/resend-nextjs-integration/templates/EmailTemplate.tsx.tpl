'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface EmailTemplateProps {
  template?: {
    id: string;
    name: string;
    subject: string;
    html: string;
    text?: string;
  };
  onSave?: (template: any) => void;
  className?: string;
}

export function EmailTemplate({ template, onSave, className }: EmailTemplateProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: template?.name || '',
    subject: template?.subject || '',
    html: template?.html || '',
    text: template?.text || '',
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = template ? `/api/email/templates/${template.id}` : '/api/email/templates';
      const method = template ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: template ? 'Template updated!' : 'Template created!',
          description: result.message,
        });
        onSave?.(result.template);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save template';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{template ? 'Edit Template' : 'Create Template'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Template Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="html">HTML Content</Label>
            <Textarea
              id="html"
              value={formData.html}
              onChange={(e) => setFormData(prev => ({ ...prev, html: e.target.value }))}
              rows={8}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="text">Text Content</Label>
            <Textarea
              id="text"
              value={formData.text}
              onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
              rows={4}
            />
          </div>
          
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Saving...' : template ? 'Update Template' : 'Create Template'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
