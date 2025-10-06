'use client';

import { useEmailComposer } from '@/hooks/email/use-email-composer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const emailComposerSchema = z.object({
  to: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  content: z.string().min(1, 'Content is required'),
  templateId: z.string().optional(),
});

type EmailComposerData = z.infer<typeof emailComposerSchema>;

export const EmailComposer = () => {
  const { mutate: sendEmail, isPending } = useEmailComposer();
  
  const form = useForm<EmailComposerData>({
    resolver: zodResolver(emailComposerSchema),
  });

  const onSubmit = (data: EmailComposerData) => {
    sendEmail(data);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Compose Email</CardTitle>
        <CardDescription>Create and send a new email</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="to">To</Label>
            <Input
              id="to"
              type="email"
              {...form.register('to')}
              placeholder="recipient@example.com"
            />
            {form.formState.errors.to && (
              <p className="text-sm text-destructive">
                {form.formState.errors.to.message}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              {...form.register('subject')}
              placeholder="Email subject"
            />
            {form.formState.errors.subject && (
              <p className="text-sm text-destructive">
                {form.formState.errors.subject.message}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              {...form.register('content')}
              placeholder="Email content"
              rows={8}
            />
            {form.formState.errors.content && (
              <p className="text-sm text-destructive">
                {form.formState.errors.content.message}
              </p>
            )}
          </div>
          
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Sending...' : 'Send Email'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
