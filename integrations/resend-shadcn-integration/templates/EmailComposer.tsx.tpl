'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Send, Save, Eye, Code } from 'lucide-react';

interface EmailComposerProps {
  onSend?: (email: { to: string; subject: string; html: string; text?: string }) => void;
  onSave?: (template: { name: string; subject: string; html: string; text?: string }) => void;
}

export function EmailComposer({ onSend, onSave }: EmailComposerProps) {
  const [activeTab, setActiveTab] = useState('compose');
  const [isSending, setIsSending] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    html: '',
    text: '',
    template: '',
  });

  const [templateData, setTemplateData] = useState({
    name: '',
    subject: '',
    html: '',
    text: '',
  });

  const handleSend = async () => {
    if (!emailData.to || !emailData.subject || !emailData.html) return;

    setIsSending(true);
    try {
      await onSend?.({
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text,
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleSave = async () => {
    if (!templateData.name || !templateData.subject || !templateData.html) return;

    setIsSaving(true);
    try {
      await onSave?.(templateData);
    } finally {
      setIsSaving(false);
    }
  };

  const handleTemplateChange = (template: string) => {
    if (template === 'welcome') {
      setEmailData({
        ...emailData,
        subject: 'Welcome to {{appName}}!',
        html: \