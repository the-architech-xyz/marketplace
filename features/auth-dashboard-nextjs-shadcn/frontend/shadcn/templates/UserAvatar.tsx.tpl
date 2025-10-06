'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { AuthUser } from '@/types/auth';

interface UserAvatarProps {
  user: AuthUser;
  size?: 'sm' | 'md' | 'lg';
}

export const UserAvatar = ({ user, size = 'md' }: UserAvatarProps) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Avatar className={sizeClasses[size]}>
      <AvatarImage src={user.image} alt={user.name} />
      <AvatarFallback>
        {getInitials(user.name)}
      </AvatarFallback>
    </Avatar>
  );
};
