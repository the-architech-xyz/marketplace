import { PrismaClient } from '@prisma/client';

// Query optimization utilities
export class QueryOptimizer {
  private prisma: PrismaClient;
  private queryLog: Array<{
    query: string;
    duration: number;
    timestamp: Date;
    params: any;
  }> = [];

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.setupQueryLogging();
  }

  private setupQueryLogging() {
    {{#if context..query-logging}}
    this.prisma.$on('query', (e) => {
      this.queryLog.push({
        query: e.query,
        duration: e.duration,
        timestamp: new Date(),
        params: e.params,
      });
    });
    {{/if}}
  }

  // Query performance monitoring
  async measureQuery<T>(queryName: string, queryFn: () => Promise<T>): Promise<{
    result: T;
    duration: number;
    performance: 'fast' | 'medium' | 'slow';
  }> {
    const start = Date.now();
    const result = await queryFn();
    const duration = Date.now() - start;

    const performance = duration < 100 ? 'fast' : duration < 500 ? 'medium' : 'slow';

    {{#if context..performance-monitoring}}
    console.log('Query Performance:', {
      name: queryName,
      duration: duration + 'ms',
      performance,
    });
    {{/if}}

    return { result, duration, performance };
  }

  // Optimized query builders
  async findManyOptimized<T>(
    model: string,
    options: {
      where?: any;
      include?: any;
      select?: any;
      orderBy?: any;
      take?: number;
      skip?: number;
    }
  ): Promise<T[]> {
    return this.measureQuery('findManyOptimized', async () => {
      const queryOptions: any = {};

      if (options.where) queryOptions.where = options.where;
      if (options.include) queryOptions.include = options.include;
      if (options.select) queryOptions.select = options.select;
      if (options.orderBy) queryOptions.orderBy = options.orderBy;
      if (options.take) queryOptions.take = options.take;
      if (options.skip) queryOptions.skip = options.skip;

      return (this.prisma as any)[model].findMany(queryOptions);
    });
  }

  async findUniqueOptimized<T>(
    model: string,
    where: any,
    include?: any
  ): Promise<T | null> {
    return this.measureQuery('findUniqueOptimized', async () => {
      const queryOptions: any = { where };
      if (include) queryOptions.include = include;

      return (this.prisma as any)[model].findUnique(queryOptions);
    });
  }

  async createOptimized<T>(
    model: string,
    data: any,
    include?: any
  ): Promise<T> {
    return this.measureQuery('createOptimized', async () => {
      const queryOptions: any = { data };
      if (include) queryOptions.include = include;

      return (this.prisma as any)[model].create(queryOptions);
    });
  }

  async updateOptimized<T>(
    model: string,
    where: any,
    data: any,
    include?: any
  ): Promise<T> {
    return this.measureQuery('updateOptimized', async () => {
      const queryOptions: any = { where, data };
      if (include) queryOptions.include = include;

      return (this.prisma as any)[model].update(queryOptions);
    });
  }

  async deleteOptimized<T>(
    model: string,
    where: any
  ): Promise<T> {
    return this.measureQuery('deleteOptimized', async () => {
      return (this.prisma as any)[model].delete({ where });
    });
  }

  // Batch operations
  async createManyOptimized(
    model: string,
    data: any[]
  ): Promise<{ count: number }> {
    return this.measureQuery('createManyOptimized', async () => {
      return (this.prisma as any)[model].createMany({ data });
    });
  }

  async updateManyOptimized(
    model: string,
    where: any,
    data: any
  ): Promise<{ count: number }> {
    return this.measureQuery('updateManyOptimized', async () => {
      return (this.prisma as any)[model].updateMany({ where, data });
    });
  }

  async deleteManyOptimized(
    model: string,
    where: any
  ): Promise<{ count: number }> {
    return this.measureQuery('deleteManyOptimized', async () => {
      return (this.prisma as any)[model].deleteMany({ where });
    });
  }

  // Transaction helpers
  async transactionOptimized<T>(
    operations: (tx: PrismaClient) => Promise<T>
  ): Promise<T> {
    return this.measureQuery('transactionOptimized', async () => {
      return this.prisma.$transaction(operations);
    });
  }

  // Query analysis
  getQueryStats(): {
    totalQueries: number;
    averageDuration: number;
    slowQueries: number;
    fastQueries: number;
    mediumQueries: number;
  } {
    const totalQueries = this.queryLog.length;
    const averageDuration = totalQueries > 0 
      ? this.queryLog.reduce((sum, log) => sum + log.duration, 0) / totalQueries 
      : 0;
    
    const slowQueries = this.queryLog.filter(log => log.duration > 500).length;
    const mediumQueries = this.queryLog.filter(log => log.duration >= 100 && log.duration <= 500).length;
    const fastQueries = this.queryLog.filter(log => log.duration < 100).length;

    return {
      totalQueries,
      averageDuration,
      slowQueries,
      fastQueries,
      mediumQueries,
    };
  }

  getSlowQueries(threshold: number = 500): Array<{
    query: string;
    duration: number;
    timestamp: Date;
  }> {
    return this.queryLog
      .filter(log => log.duration > threshold)
      .map(log => ({
        query: log.query,
        duration: log.duration,
        timestamp: log.timestamp,
      }))
      .sort((a, b) => b.duration - a.duration);
  }

  clearQueryLog(): void {
    this.queryLog = [];
  }

  // Connection management
  async connect(): Promise<void> {
    await this.prisma.$connect();
  }

  async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }

  // Health check
  async healthCheck(): Promise<{
    isConnected: boolean;
    responseTime: number;
    error?: string;
  }> {
    try {
      const start = Date.now();
      await this.prisma.$queryRaw\`SELECT 1\`;
      const responseTime = Date.now() - start;

      return {
        isConnected: true,
        responseTime,
      };
    } catch (error) {
      return {
        isConnected: false,
        responseTime: 0,
        error: (error as Error).message,
      };
    }
  }
}
    },
    {
