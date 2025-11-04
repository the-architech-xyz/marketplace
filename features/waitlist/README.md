# Waitlist Feature

Complete waitlist management system with viral referral capabilities.

## 🎯 Overview

The Waitlist feature provides a comprehensive system for managing user waitlists, tracking positions, and implementing viral referral mechanics. Perfect for product launches, beta programs, and acquisition campaigns.

## 🏗️ Architecture

This feature follows the 4-layer architecture:

```
contract.ts                  # Single source of truth
├── database/drizzle/        # Database schema & migrations
├── backend/nextjs/         # API routes & business logic
├── tech-stack/             # Hooks, schemas, stores
└── frontend/               # UI components (in UI marketplace)
```

## 📊 Features

### Core Functionality
- ✅ **User Registration** - Simple email-based signup
- ✅ **Position Tracking** - Real-time position in queue
- ✅ **Referral System** - Unique codes for viral growth
- ✅ **Bonus System** - Position boosts from referrals
- ✅ **Leaderboard** - Top referrers ranking
- ✅ **Analytics** - Growth metrics and stats
- ✅ **Welcome Emails** - Automated email with referral link

### Business Logic
- Automatic position calculation
- Referral bonus tracking (configurable per referral)
- Max bonus caps per user
- Source tracking (direct, referral, social)
- Duplicate prevention

## 🔧 Configuration

### Available Features

```typescript
{
  viralReferral: boolean;      // Enable referral system
  positionTracking: boolean;   // Show position in waitlist
  bonusSystem: boolean;        // Award position bonuses
  welcomeEmail: boolean;       // Send welcome emails
  analytics: boolean;          // Track analytics
}
```

### Bonus System

```typescript
{
  referralBonus: 3,            // Position boost per referral
  maxBonusPerUser: 20         // Maximum total bonus per user
}
```

## 🚀 Usage

### Join Waitlist

```typescript
import { useJoinWaitlist } from '@/lib/waitlist';

const { mutate: joinWaitlist, isPending } = useJoinWaitlist();

const handleJoin = async () => {
  const result = await joinWaitlist({
    email: 'user@example.com',
    firstName: 'John',
    lastName: 'Doe',
    referredByCode: 'REF123456' // Optional
  });
  
  console.log('Position:', result.user.position);
  console.log('Referral Code:', result.user.referralCode);
};
```

### Check User Status

```typescript
import { useWaitlistUser } from '@/lib/waitlist';

const { data, isLoading } = useWaitlistUser('user@example.com');

if (data) {
  console.log('Position:', data.user.position);
  console.log('Referrals:', data.user.referralCount);
  console.log('Bonus:', data.user.referralBonus);
}
```

### Get Leaderboard

```typescript
import { useWaitlistLeaderboard } from '@/lib/waitlist';

const { data } = useWaitlistLeaderboard(10); // Top 10

data?.map(referrer => {
  console.log(`${referrer.rank}. ${referrer.user.email} - ${referrer.user.referralCount} referrals`);
});
```

### Get Stats

```typescript
import { useWaitlistStats } from '@/lib/waitlist';

const { data } = useWaitlistStats();

console.log('Total users:', data.totalUsers);
console.log('Pending users:', data.pendingUsers);
console.log('Average referrals per user:', data.avgReferralsPerUser);
```

## 🔗 API Endpoints

### POST /api/waitlist/join
Join the waitlist with optional referral code.

**Request:**
```json
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "referredByCode": "REF123456"
}
```

**Response:**
```json
{
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "position": 42,
    "referralCode": "REF789012",
    "referralCount": 0,
    "joinedAt": "2024-01-27T00:00:00Z"
  },
  "success": true,
  "message": "Successfully joined waitlist"
}
```

### GET /api/waitlist/user/[userId]
Get user's waitlist status and stats.

**Response:**
```json
{
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "status": "pending",
    "position": 42,
    "referralCount": 5,
    "referralBonus": 15
  },
  "stats": {
    "totalUsers": 1000,
    "pendingUsers": 850,
    "invitedUsers": 150
  },
  "success": true
}
```

### GET /api/waitlist/leaderboard?limit=10
Get top referrers.

**Response:**
```json
[
  {
    "rank": 1,
    "user": {
      "email": "top@referrer.com",
      "referralCount": 45,
      "bonusAwarded": 135
    }
  }
]
```

### GET /api/waitlist/stats
Get overall waitlist statistics.

## 📦 Dependencies

- `database/drizzle` - Database ORM
- `email/resend` - Email service
- `auth/better-auth` - Authentication (optional, for protected routes)

## 🎨 UI Components

UI components are located in the UI marketplaces:

- **Shadcn UI**: `marketplace-shadcn/ui/waitlist/`
- **Tamagui**: `marketplace-tamagui/ui/waitlist/`

Available components:
- `WaitlistForm` - Signup form
- `WaitlistStatus` - User status display
- `ReferralLink` - Share referral code
- `Leaderboard` - Top referrers
- `WaitlistStats` - Overall stats

## 🔄 Integration with Other Features

### Authentication (Optional)
```typescript
// When access is granted, update status
await updateWaitlistUser(userId, { status: 'joined' });
```

### Email Notifications
```typescript
// Send welcome email with referral link
await sendWelcomeEmail(user.email, {
  referralLink,
  position,
  referralCode
});
```

### Analytics
```typescript
// Track waitlist signups
trackEvent('waitlist_joined', {
  email: user.email,
  position: user.position,
  source: user.source
});
```

## 📈 Best Practices

1. **Keep it simple** - Only ask for essential info
2. **Incentivize referrals** - Offer clear benefits
3. **Communicate regularly** - Update users on progress
4. **Track everything** - Monitor growth and engagement
5. **Make it shareable** - Easy social sharing

## 🚧 Roadmap

- [ ] Admin dashboard integration
- [ ] SMS notifications
- [ ] Multi-tier referral bonuses
- [ ] Referral expiration
- [ ] Custom referral codes
- [ ] Analytics dashboard
- [ ] A/B testing support

---

**Created:** January 2025  
**Architecture:** 4-layer feature structure  
**Version:** 1.0.0


