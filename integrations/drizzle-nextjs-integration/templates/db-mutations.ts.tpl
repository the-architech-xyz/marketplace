import { db } from './index';
import { users, posts, products } from './schema';

/**
 * Database mutation functions
 * Provides standardized CRUD operations for all entities
 */

// User mutations
export async function createUser(data: {
  email: string;
  name: string;
  password?: string;
}) {
  return await db.insert(users).values(data).returning();
}

export async function updateUser(id: string, data: {
  email?: string;
  name?: string;
}) {
  return await db.update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning();
}

export async function deleteUser(id: string) {
  return await db.delete(users)
    .where(eq(users.id, id))
    .returning();
}

// Post mutations
export async function createPost(data: {
  title: string;
  content: string;
  excerpt?: string;
  slug?: string;
  published?: boolean;
  authorId: string;
  tags?: string[];
  category?: string;
  featuredImage?: string;
}) {
  return await db.insert(posts).values(data).returning();
}

export async function updatePost(id: string, data: {
  title?: string;
  content?: string;
  excerpt?: string;
  slug?: string;
  published?: boolean;
  tags?: string[];
  category?: string;
  featuredImage?: string;
}) {
  return await db.update(posts)
    .set(data)
    .where(eq(posts.id, id))
    .returning();
}

export async function deletePost(id: string) {
  return await db.delete(posts)
    .where(eq(posts.id, id))
    .returning();
}

// Product mutations
export async function createProduct(data: {
  name: string;
  description: string;
  price: number;
  sku?: string;
  category?: string;
  tags?: string[];
  images?: string[];
  inStock?: boolean;
}) {
  return await db.insert(products).values(data).returning();
}

export async function updateProduct(id: string, data: {
  name?: string;
  description?: string;
  price?: number;
  sku?: string;
  category?: string;
  tags?: string[];
  images?: string[];
  inStock?: boolean;
}) {
  return await db.update(products)
    .set(data)
    .where(eq(products.id, id))
    .returning();
}

export async function deleteProduct(id: string) {
  return await db.delete(products)
    .where(eq(products.id, id))
    .returning();
}

// Generic mutations
export async function createRecord(table: any, data: any) {
  return await db.insert(table).values(data).returning();
}

export async function updateRecord(table: any, id: string, data: any) {
  return await db.update(table)
    .set(data)
    .where(eq(table.id, id))
    .returning();
}

export async function deleteRecord(table: any, id: string) {
  return await db.delete(table)
    .where(eq(table.id, id))
    .returning();
}
