/**
 * Create Team Form Component - SHADCN UI VERSION
 * 
 * Form for creating new teams with validation
 * CONSUMES: teams-data-integration hooks
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Loader2, Plus } from 'lucide-react';

// Import headless teams logic
import { useCreateTeam } from '@/features/teams/use-teams';

// Form validation schema
const createTeamSchema = z.object({
  name: z.string().min(1, 'Team name is required').max(100, 'Team name must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  isActive: z.boolean().default(true),
  visibility: z.enum(['public', 'private', 'invite-only']).default('private'),
  category: z.string().optional(),
});

type CreateTeamFormData = z.infer<typeof createTeamSchema>;

interface CreateTeamFormProps {
  onSuccess?: (teamId: string) => void;
  onCancel?: () => void;
  className?: string;
}

export function CreateTeamForm({ onSuccess, onCancel, className = '' }: CreateTeamFormProps) {
  // Use headless teams logic
  const createTeam = useCreateTeam();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset
  } = useForm<CreateTeamFormData>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      name: '',
      description: '',
      isActive: true,
      visibility: 'private',
      category: ''
    }
  });

  const watchedValues = watch();

  const onSubmit = async (data: CreateTeamFormData) => {
    try {
      const result = await createTeam.mutateAsync(data);
      onSuccess?.(result.id);
      reset();
    } catch (error) {
      console.error('Failed to create team:', error);
    }
  };

  const handleCancel = () => {
    reset();
    onCancel?.();
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Plus className="mr-2 h-5 w-5" />
          Create New Team
        </CardTitle>
        <CardDescription>
          Set up a new team to collaborate and manage projects together.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Team Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Team Name *</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Enter team name"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Describe your team's purpose and goals"
              rows={3}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Visibility */}
          <div className="space-y-2">
            <Label htmlFor="visibility">Visibility</Label>
            <Select
              value={watchedValues.visibility}
              onValueChange={(value) => setValue('visibility', value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public - Anyone can join</SelectItem>
                <SelectItem value="private">Private - Invite only</SelectItem>
                <SelectItem value="invite-only">Invite Only - Admin approval required</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category (Optional)</Label>
            <Input
              id="category"
              {...register('category')}
              placeholder="e.g., Engineering, Marketing, Design"
            />
          </div>

          {/* Active Status */}
          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={watchedValues.isActive}
              onCheckedChange={(checked) => setValue('isActive', checked)}
            />
            <Label htmlFor="isActive">Team is active</Label>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || createTeam.isPending}
            >
              {isSubmitting || createTeam.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Team
                </>
              )}
            </Button>
          </div>

          {/* Error Display */}
          {createTeam.error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">
                Failed to create team: {createTeam.error.message}
              </p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
