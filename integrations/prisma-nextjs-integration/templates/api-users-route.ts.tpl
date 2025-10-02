/**
 * Users API Route
 * 
 * Next.js API route for users CRUD operations (Prisma implementation)
 * EXTERNAL API IDENTICAL TO DRIZZLE - Features work with ANY database!
 */

import { NextRequest, NextResponse } from 'next/server';
import { usersApi } from '@/lib/api/users';
import { ApiResponse, PaginatedResponse } from '@/types/api';

// GET /api/users - Get all users
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const role = searchParams.get('role') || undefined;
    const search = searchParams.get('search') || undefined;
    const status = searchParams.get('status') || undefined;
    
    const filters = {
      role,
      search,
      status,
    };
    
    // Get users with pagination
    const result = await usersApi.getPaginated(page, limit, filters);
    
    const response: ApiResponse<PaginatedResponse> = {
      success: true,
      data: result,
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching users:', error);
    
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch users',
    };
    
    return NextResponse.json(response, { status: 500 });
  }
}

// POST /api/users - Create new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.email || !body.name) {
      const response: ApiResponse = {
        success: false,
        error: 'Missing required fields: email, name',
      };
      
      return NextResponse.json(response, { status: 400 });
    }
    
    // Create user
    const user = await usersApi.create(body);
    
    const response: ApiResponse = {
      success: true,
      data: user,
      message: 'User created successfully',
    };
    
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create user',
    };
    
    return NextResponse.json(response, { status: 500 });
  }
}
