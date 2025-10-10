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

interface MagicLinkEmailProps {
  magicLinkUrl: string;
  userName?: string;
  projectName?: string;
  expiresIn?: string;
}

export const MagicLinkEmail = ({
  magicLinkUrl,
  userName = 'User',
  projectName = 'The Architech',
  expiresIn = '10 minutes',
}: MagicLinkEmailProps) => (
  <Html>
    <Head />
    <Preview>Your magic link to sign in to {projectName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Heading style={h1}>Your magic link is ready!</Heading>
          
          <Text style={text}>
            Hello {userName},
          </Text>
          
          <Text style={text}>
            You requested a magic link to sign in to {projectName}. Click the button below to sign in instantly:
          </Text>
          
          <Section style={buttonContainer}>
            <Link style={button} href={magicLinkUrl}>
              Sign In to {projectName}
            </Link>
          </Section>
          
          <Text style={text}>
            Or copy and paste this link into your browser:
          </Text>
          <Text style={link}>
            {magicLinkUrl}
          </Text>
          
          <Text style={text}>
            <strong>Important:</strong> This magic link will expire in {expiresIn} for security reasons.
          </Text>
          
          <Text style={text}>
            If you didn't request this magic link, you can safely ignore this email. Your account remains secure.
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

export default MagicLinkEmail;

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
