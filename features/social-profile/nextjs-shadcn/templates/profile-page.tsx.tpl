/**
 * Profile Page - SHADCN UI VERSION
 * 
 * Main user profile page
 * CONSUMES: better-auth-nextjs hooks
 */

import React from 'react';
import { ProfileDashboard } from '@/components/profile/ProfileDashboard';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit } from 'lucide-react';

// Import headless auth logic
import { useAuth } from '@/hooks/use-auth';

export default function ProfilePage() {
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isSecurityDialogOpen, setIsSecurityDialogOpen] = React.useState(false);
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] = React.useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = React.useState(false);
  
  // Use headless auth logic
  const { user, isAuthenticated, isLoading } = useAuth();

  const handleEditProfile = () => {
    setIsEditDialogOpen(true);
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditDialogOpen(false);
  };

  const handleSecuritySettings = () => {
    setIsSecurityDialogOpen(true);
  };

  const handleNotificationSettings = () => {
    setIsNotificationDialogOpen(true);
  };

  const handleDataExport = () => {
    setIsExportDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600">Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and account settings
          </p>
        </div>
        
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <ProfileForm
              onSuccess={handleEditSuccess}
              onCancel={handleEditCancel}
            />
          </DialogContent>
        </Dialog>
      </div>

      <ProfileDashboard
        onEditProfile={handleEditProfile}
        onSecuritySettings={handleSecuritySettings}
        onNotificationSettings={handleNotificationSettings}
        onDataExport={handleDataExport}
      />

      {/* Security Settings Dialog */}
      <Dialog open={isSecurityDialogOpen} onOpenChange={setIsSecurityDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Security Settings</DialogTitle>
          </DialogHeader>
          <div className="p-4 text-center text-gray-500">
            Security settings component would go here
          </div>
        </DialogContent>
      </Dialog>

      {/* Notification Settings Dialog */}
      <Dialog open={isNotificationDialogOpen} onOpenChange={setIsNotificationDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Notification Settings</DialogTitle>
          </DialogHeader>
          <div className="p-4 text-center text-gray-500">
            Notification settings component would go here
          </div>
        </DialogContent>
      </Dialog>

      {/* Data Export Dialog */}
      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Export Data</DialogTitle>
          </DialogHeader>
          <div className="p-4 text-center text-gray-500">
            Data export component would go here
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
