import { EmailPreview } from '@/components/email/EmailPreview';
import { EmailAnalytics } from '@/components/email/EmailAnalytics';
import { sendEmail } from '@/lib/email/client';

// Mock data - replace with real data fetching
const mockStats = {
  totalSent: 1250,
  delivered: 1180,
  opened: 890,
  clicked: 234,
  bounced: 45,
  complained: 2,
};

export default function EmailsPage() {
  const handleSendEmail = async (data: { to: string; subject: string; html: string; text?: string }) => {
    try {
      const result = await sendEmail(data);
      if (result.success) {
        alert('Email sent successfully!');
      } else {
        alert(\