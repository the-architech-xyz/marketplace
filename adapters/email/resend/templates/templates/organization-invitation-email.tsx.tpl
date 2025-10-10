import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface OrganizationInvitationEmailProps {
  organizationName: string;
  inviterName: string;
  invitationUrl: string;
  role: string;
  projectName?: string;
}

export const OrganizationInvitationEmail = ({
  organizationName,
  inviterName,
  invitationUrl,
  role,
  projectName = 'The Architech',
}: OrganizationInvitationEmailProps) => (
  <Html>
    <Head />
    <Preview>You've been invited to join {organizationName} on {projectName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Heading style={h1}>You're invited to join {organizationName}</Heading>
          
          <Text style={text}>
            Hello!
          </Text>
          
          <Text style={text}>
            <strong>{inviterName}</strong> has invited you to join the <strong>{organizationName}</strong> organization on {projectName} as a <strong>{role}</strong>.
          </Text>
          
          <Text style={text}>
            Click the button below to accept the invitation and get started:
          </Text>
          
          <Section style={buttonContainer}>
            <Link style={button} href={invitationUrl}>
              Accept Invitation
            </Link>
          </Section>
          
          <Text style={text}>
            Or copy and paste this link into your browser:
          </Text>
          <Text style={link}>
            {invitationUrl}
          </Text>
          
          <Text style={text}>
            This invitation will expire in 7 days. If you don't want to join this organization, you can safely ignore this email.
          </Text>
          
          <Text style={text}>
            Best regards,<br />
            The {projectName} Team
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default OrganizationInvitationEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const box = {
  padding: '0 48px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center' as const,
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#007ee6',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
};

const link = {
  color: '#007ee6',
  fontSize: '14px',
  textDecoration: 'underline',
  wordBreak: 'break-all' as const,
};
