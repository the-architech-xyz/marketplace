import { z } from 'zod';

// User related schemas
export const userSchemas = {
  create: z.object({
    email: z.string().email('Please enter a valid email address'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  }),
  
  update: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    email: z.string().email('Please enter a valid email address').optional(),
  }),
  
  profile: z.object({
    bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
    website: z.string().url('Please enter a valid URL').optional(),
    location: z.string().max(100, 'Location must be less than 100 characters').optional(),
  }),
};

// Product related schemas
export const productSchemas = {
  create: z.object({
    name: z.string().min(2, 'Product name must be at least 2 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    price: z.number().min(0, 'Price must be positive'),
    category: z.string().min(1, 'Please select a category'),
    stock: z.number().min(0, 'Stock must be non-negative'),
  }),
  
  update: z.object({
    name: z.string().min(2, 'Product name must be at least 2 characters').optional(),
    description: z.string().min(10, 'Description must be at least 10 characters').optional(),
    price: z.number().min(0, 'Price must be positive').optional(),
    category: z.string().min(1, 'Please select a category').optional(),
    stock: z.number().min(0, 'Stock must be non-negative').optional(),
  }),
  
  search: z.object({
    query: z.string().min(1, 'Search query cannot be empty'),
    category: z.string().optional(),
    minPrice: z.number().min(0).optional(),
    maxPrice: z.number().min(0).optional(),
  }),
};

// Team related schemas
export const teamSchemas = {
  create: z.object({
    name: z.string().min(2, 'Team name must be at least 2 characters'),
    description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  }),
  
  update: z.object({
    name: z.string().min(2, 'Team name must be at least 2 characters').optional(),
    description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  }),
  
  invite: z.object({
    email: z.string().email('Please enter a valid email address'),
    role: z.enum(['admin', 'member'], {
      errorMap: () => ({ message: 'Role must be either admin or member' }),
    }),
  }),
};

// Email related schemas
export const emailSchemas = {
  send: z.object({
    to: z.string().email('Please enter a valid email address'),
    subject: z.string().min(1, 'Subject is required'),
    message: z.string().min(1, 'Message is required'),
    template: z.string().optional(),
  }),
  
  template: z.object({
    name: z.string().min(1, 'Template name is required'),
    subject: z.string().min(1, 'Subject is required'),
    content: z.string().min(1, 'Content is required'),
  }),
};

// Web3 related schemas
export const web3Schemas = {
  connect: z.object({
    walletType: z.enum(['metamask', 'walletconnect', 'coinbase'], {
      errorMap: () => ({ message: 'Please select a valid wallet type' }),
    }),
  }),
  
  transaction: z.object({
    to: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Please enter a valid Ethereum address'),
    value: z.string().regex(/^\d+$/, 'Value must be a number'),
    data: z.string().optional(),
  }),
};
