import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';

export default function TwoFactorSetup() {
  const [step, setStep] = useState<'qr' | 'verify' | 'success'>('qr');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  // Mock QR code data - in real app, this would come from the server
  const qrCodeData = 'otpauth://totp/AppName:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=AppName';

  const handleVerifyCode = async () => {
    setIsVerifying(true);
    setError('');

    try {
      // Mock verification - in real app, this would call the API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (verificationCode === '123456') { // Mock valid code
        setStep('success');
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleComplete = () => {
    // Handle completion - redirect or show success message
    console.log('2FA setup completed');
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center">
        <Shield className="h-12 w-12 mx-auto text-primary mb-4" />
        <h1 className="text-2xl font-bold">Set up Two-Factor Authentication</h1>
        <p className="text-muted-foreground">
          Add an extra layer of security to your account
        </p>
      </div>

      {step === 'qr' && (
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Scan QR Code</CardTitle>
            <CardDescription>
              Use your authenticator app to scan this QR code
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <div className="w-48 h-48 bg-white border rounded flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-black rounded grid grid-cols-8 gap-1 p-2">
                    {/* Mock QR code pattern */}
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className={`bg-white ${
                          Math.random() > 0.5 ? 'bg-black' : 'bg-white'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    QR Code
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Manual Entry Key</Label>
              <Input
                value="JBSWY3DPEHPK3PXP"
                readOnly
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                If you can't scan the QR code, enter this key manually
              </p>
            </div>

            <Button onClick={() => setStep('verify')} className="w-full">
              I've scanned the QR code
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 'verify' && (
        <Card>
          <CardHeader>
            <CardTitle>Step 2: Verify Setup</CardTitle>
            <CardDescription>
              Enter the 6-digit code from your authenticator app
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="verification-code">Verification Code</Label>
              <Input
                id="verification-code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="123456"
                maxLength={6}
                className="text-center text-lg tracking-widest"
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setStep('qr')}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleVerifyCode}
                disabled={verificationCode.length !== 6 || isVerifying}
                className="flex-1"
              >
                {isVerifying ? 'Verifying...' : 'Verify'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 'success' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Setup Complete!
            </CardTitle>
            <CardDescription>
              Two-factor authentication is now enabled for your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Your account is now more secure. You'll need to enter a code from your authenticator app each time you sign in.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <h4 className="font-medium">Backup Codes</h4>
              <p className="text-sm text-muted-foreground">
                Save these backup codes in a safe place. You can use them to access your account if you lose your authenticator device.
              </p>
              <div className="bg-muted p-3 rounded font-mono text-sm">
                <div>1234-5678-9012</div>
                <div>3456-7890-1234</div>
                <div>5678-9012-3456</div>
                <div>7890-1234-5678</div>
                <div>9012-3456-7890</div>
              </div>
            </div>

            <Button onClick={handleComplete} className="w-full">
              Complete Setup
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
