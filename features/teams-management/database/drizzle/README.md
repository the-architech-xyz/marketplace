# Teams Management Database Layer (Drizzle)

## 🎯 **Overview**

This is the **database-agnostic schema** for the Teams Management feature. It defines standardized tables that work with **any database backend**.

## 📊 **Database Schema**

### **Tables**

1. **`teams`**
   - Team information (name, slug, description, avatar)
   - Owner reference
   - Settings (JSON)

2. **`team_members`**
   - Team membership records
   - Links users to teams with roles (owner, admin, member)
   - Tracks join/leave dates

3. **`team_invitations`**
   - Pending and processed invitations
   - Email-based invitations with unique tokens
   - Expiration and acceptance tracking

4. **`team_activity`** (Optional)
   - Audit trail of team actions
   - Tracks all team-related activities
   - Can be disabled if not needed

---

## 🔑 **Key Features**

### **1. Role-Based Access**
```typescript
enum TeamRole {
  owner = 'Team owner (full access)',
  admin = 'Team admin (manage members)',
  member = 'Regular member (basic access)'
}
```

### **2. Invitation System**
- Email-based invitations with unique tokens
- Expiration dates
- Status tracking (pending, accepted, rejected, expired)

### **3. Activity Tracking**
- Complete audit trail
- Track all team actions
- Compliance and debugging support

---

## 🎨 **Usage**

### **Backend Implementation**

```typescript
// Import schema
import { db } from '@/lib/db';
import { teams, teamMembers, teamInvitations } from '@/lib/db/schema/teams';
import { eq, and } from 'drizzle-orm';

// Create team
const [team] = await db.insert(teams).values({
  name: 'Engineering Team',
  slug: 'engineering',
  ownerId: userId,
  settings: {
    allowInvites: true,
    requireApproval: false,
    defaultRole: 'member',
  },
}).returning();

// Add member
await db.insert(teamMembers).values({
  teamId: team.id,
  userId: newMemberId,
  role: 'member',
});

// Create invitation
await db.insert(teamInvitations).values({
  teamId: team.id,
  email: 'user@example.com',
  role: 'member',
  invitedBy: userId,
  token: generateToken(),
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
});
```

---

## 🔄 **Relation to Other Modules**

```
features/teams-management/database/drizzle/  ← YOU ARE HERE
  ↓ provides schema
features/teams-management/backend/nextjs/     ← Uses the schema
  ↓ provides API routes
features/teams-management/tech-stack/         ← Generic hooks
  ↓ provides UI hooks
features/teams-management/frontend/shadcn/    ← UI components
```

---

## 📁 **Files**

- **`feature.json`**: Module metadata
- **`blueprint.ts`**: Blueprint for generating schema and migrations
- **`templates/schema.ts.tpl`**: Drizzle schema definition
- **`templates/migration.sql.tpl`**: SQL migration file

---

## 🚀 **Future Enhancements**

### **Potential Additions:**

1. **Team Channels**
   - Sub-groups within teams
   - Channel-specific permissions

2. **Team Resources**
   - Shared files/links
   - Team knowledge base

3. **Team Billing**
   - Team-level subscriptions
   - Seat management

4. **Team Integrations**
   - Third-party service connections
   - OAuth configurations

---

**Document Version:** 1.0  
**Created:** January 2025



