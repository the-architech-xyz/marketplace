'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Eye, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Mail, 
  Send, 
  Download,
  RefreshCw,
  Code,
  Palette
} from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html: string;
  text?: string;
  variables: string[];
}

interface PreviewData {
  [key: string]: string;
}

export function EmailPreview() {
  const [template, setTemplate] = useState<EmailTemplate | null>(null);
  const [previewData, setPreviewData] = useState<PreviewData>({});
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [viewMode, setViewMode] = useState<'preview' | 'html' | 'text'>('preview');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    loadTemplate();
  }, []);

  const loadTemplate = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTemplate({
        id: '1',
        name: 'Welcome Email',
        subject: 'Welcome to {{appName}}, {{userName}}!',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>{{subject}}</title>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
                .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
                .content { padding: 30px; }
                .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
                .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
                .highlight { background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Welcome to {{appName}}!</h1>
                  <p>We're excited to have you on board</p>
                </div>
                <div class="content">
                  <h2>Hello {{userName}},</h2>
                  <p>Thank you for joining {{appName}}! We're thrilled to have you as part of our community.</p>
                  
                  <div class="highlight">
                    <strong>What's next?</strong>
                    <ul>
                      <li>Complete your profile setup</li>
                      <li>Explore our features</li>
                      <li>Join our community discussions</li>
                    </ul>
                  </div>
                  
                  <p>If you have any questions, feel free to reach out to our support team.</p>
                  
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="{{dashboardUrl}}" class="button">Get Started</a>
                  </div>
                  
                  <p>Best regards,<br>The {{appName}} Team</p>
                </div>
                <div class="footer">
                  <p>&copy; 2024 {{appName}}. All rights reserved.</p>
                  <p>
                    <a href="{{unsubscribeUrl}}" style="color: #667eea;">Unsubscribe</a> | 
                    <a href="{{privacyUrl}}" style="color: #667eea;">Privacy Policy</a>
                  </p>
                </div>
              </div>
            </body>
          </html>
        `,
        text: `Welcome to {{appName}}!

Hello {{userName}},

Thank you for joining {{appName}}! We're thrilled to have you as part of our community.

What's next?
- Complete your profile setup
- Explore our features  
- Join our community discussions

If you have any questions, feel free to reach out to our support team.

Get started: {{dashboardUrl}}

Best regards,
The {{appName}} Team

© 2024 {{appName}}. All rights reserved.
Unsubscribe: {{unsubscribeUrl}} | Privacy: {{privacyUrl}}`,
        variables: ['appName', 'userName', 'dashboardUrl', 'unsubscribeUrl', 'privacyUrl']
      });

      // Set default preview data
      setPreviewData({
        appName: 'MyApp',
        userName: 'John Doe',
        dashboardUrl: 'https://myapp.com/dashboard',
        unsubscribeUrl: 'https://myapp.com/unsubscribe',
        privacyUrl: 'https://myapp.com/privacy'
      });
    } catch (error) {
      console.error('Failed to load template:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const processTemplate = (content: string, data: PreviewData): string => {
    let processed = content;
    Object.entries(data).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      processed = processed.replace(regex, value);
    });
    return processed;
  };

  const handleSendTest = async () => {
    setIsSending(true);
    try {
      // TODO: Implement actual send test API
      console.log('Sending test email...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Test email sent successfully!');
    } catch (error) {
      console.error('Failed to send test email:', error);
      alert('Failed to send test email');
    } finally {
      setIsSending(false);
    }
  };

  const handleDownload = () => {
    if (!template) return;
    
    const processedHtml = processTemplate(template.html, previewData);
    const blob = new Blob([processedHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name.toLowerCase().replace(/\s+/g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile':
        return '375px';
      case 'tablet':
        return '768px';
      case 'desktop':
      default:
        return '100%';
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading template...</span>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center">
          <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-semibold mb-2">No Template Selected</h2>
          <p className="text-muted-foreground">Please select a template to preview</p>
        </div>
      </div>
    );
  }

  const processedSubject = processTemplate(template.subject, previewData);
  const processedHtml = processTemplate(template.html, previewData);
  const processedText = template.text ? processTemplate(template.text, previewData) : '';

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Email Preview</h1>
            <p className="text-muted-foreground mt-2">
              Preview and test your email templates
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button onClick={handleSendTest} disabled={isSending}>
              {isSending ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              {isSending ? 'Sending...' : 'Send Test'}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Preview Data */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Preview Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {template.variables.map((variable) => (
                <div key={variable}>
                  <Label htmlFor={variable}>{variable}</Label>
                  <Input
                    id={variable}
                    value={previewData[variable] || ''}
                    onChange={(e) => setPreviewData(prev => ({
                      ...prev,
                      [variable]: e.target.value
                    }))}
                    placeholder={`Enter ${variable}...`}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Preview
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Select value={previewMode} onValueChange={(value: any) => setPreviewMode(value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desktop">
                        <div className="flex items-center gap-2">
                          <Monitor className="h-4 w-4" />
                          Desktop
                        </div>
                      </SelectItem>
                      <SelectItem value="tablet">
                        <div className="flex items-center gap-2">
                          <Tablet className="h-4 w-4" />
                          Tablet
                        </div>
                      </SelectItem>
                      <SelectItem value="mobile">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          Mobile
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="html">HTML</TabsTrigger>
                  <TabsTrigger value="text">Text</TabsTrigger>
                </TabsList>
                
                <TabsContent value="preview" className="mt-4">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-muted px-4 py-2 text-sm font-medium">
                      Subject: {processedSubject}
                    </div>
                    <div 
                      className="bg-white"
                      style={{ 
                        width: getPreviewWidth(),
                        maxWidth: '100%',
                        margin: '0 auto'
                      }}
                    >
                      <iframe
                        srcDoc={processedHtml}
                        className="w-full h-96 border-0"
                        title="Email Preview"
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="html" className="mt-4">
                  <div className="border rounded-lg">
                    <div className="bg-muted px-4 py-2 text-sm font-medium">
                      HTML Source
                    </div>
                    <pre className="p-4 text-sm overflow-auto max-h-96">
                      <code>{processedHtml}</code>
                    </pre>
                  </div>
                </TabsContent>
                
                <TabsContent value="text" className="mt-4">
                  <div className="border rounded-lg">
                    <div className="bg-muted px-4 py-2 text-sm font-medium">
                      Text Version
                    </div>
                    <pre className="p-4 text-sm whitespace-pre-wrap max-h-96 overflow-auto">
                      {processedText}
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
