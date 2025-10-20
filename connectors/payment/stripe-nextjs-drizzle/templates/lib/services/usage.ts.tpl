/**
 * Usage Service
 * 
 * Handles usage tracking and metering for organizations
 */

import { db } from '@/lib/db';
import { organizationUsage } from '@/lib/db/schema/organization-billing';
import { eq, and, desc } from 'drizzle-orm';

export interface UsageRecord {
  id: string;
  organizationId: string;
  metric: string;
  value: number;
  timestamp: Date;
}

export interface UsageService {
  recordUsage(orgId: string, metric: string, value: number): Promise<UsageRecord>;
  getUsage(orgId: string, metric?: string): Promise<UsageRecord[]>;
  getCurrentPeriodUsage(orgId: string): Promise<Record<string, number>>;
}

export function getUsageService(): UsageService {
  return {
    async recordUsage(orgId: string, metric: string, value: number) {
      const [record] = await db.insert(organizationUsage).values({
        organizationId: orgId,
        metric,
        value,
        timestamp: new Date(),
      }).returning();
      
      return record;
    },

    async getUsage(orgId: string, metric?: string) {
      const conditions = [eq(organizationUsage.organizationId, orgId)];
      
      if (metric) {
        conditions.push(eq(organizationUsage.metric, metric));
      }
      
      return await db
        .select()
        .from(organizationUsage)
        .where(and(...conditions))
        .orderBy(desc(organizationUsage.timestamp));
    },

    async getCurrentPeriodUsage(orgId: string) {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);
      
      const usage = await db
        .select()
        .from(organizationUsage)
        .where(
          and(
            eq(organizationUsage.organizationId, orgId),
            gte(organizationUsage.timestamp, startOfMonth)
          )
        );
      
      const usageByMetric: Record<string, number> = {};
      
      for (const record of usage) {
        usageByMetric[record.metric] = (usageByMetric[record.metric] || 0) + record.value;
      }
      
      return usageByMetric;
    }
  };
}
