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

interface TwoFactorSetupEmailProps {
  userName?: string;
  projectName?: string;
  setupUrl?: string;
}

export const TwoFactorSetupEmail = ({
  userName = 'User',
  projectName = 'The Architech',
  setupUrl,
}: TwoFactorSetupEmailProps) => (
  <Html>
    <Head />
    <Preview>Two-factor authentication has been enabled for your {projectName} account</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Heading style={h1}>🔐 Two-Factor Authentication Enabled</Heading>
          
          <Text style={text}>
            Hello {userName},
          </Text>
          
          <Text style={text}>
            Two-factor authentication (2FA) has been successfully enabled for your {projectName} account. This adds an extra layer of security to protect your account.
          </Text>
          
          <Section style={infoBox}>
            <Text style={infoText}>
              <strong>What this means:</strong>
            </Text>
            <Text style={infoText}>
              • You'll need to enter a verification code from your authenticator app when signing in
            </Text>
            <Text style={infoText}>
              • Your account is now more secure against unauthorized access
            </Text>
            <Text style={infoText}>
              • Make sure to keep your recovery codes in a safe place
            </Text>
          </Section>
          
          {setupUrl && (
            <>
              <Text style={text}>
                If you need to manage your 2FA settings, you can do so here:
              </Text>
              
              <Section style={buttonContainer}>
                <Link style={button} href={setupUrl}>
                  Manage 2FA Settings
                </Link>
              </Section>
            </>
          )}
          
          <Text style={text}>
            <strong>Important:</strong> If you didn't enable 2FA on your account, please contact our support team immediately as your account may have been compromised.
          </Text>
          
          <Text style={text}>
            Best regards,<br />
            The {projectName} Security Team
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default TwoFactorSetupEmail;

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

const infoBox = {
  backgroundColor: '#f8f9fa',
  border: '1px solid #e9ecef',
  borderRadius: '4px',
  padding: '16px',
  margin: '24px 0',
};

const infoText = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '8px 0',
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
