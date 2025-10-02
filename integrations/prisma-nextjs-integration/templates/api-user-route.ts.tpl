/**
 * User API Route
 * 
 * Next.js API route for individual user operations (Prisma implementation)
 * EXTERNAL API IDENTICAL TO DRIZZLE - Features work with ANY database!
 */

import { NextRequest, NextResponse } from 'next/server';
import { usersApi } from '@/lib/api/users';
import { ApiResponse } from '@/types/api';

// GET /api/users/[id] - Get user by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!id) {
      const response: ApiResponse = {
        success: false,
        error: 'User ID is required',
      };
      
      return NextResponse.json(response, { status: 400 });
    }
    
    const user = await usersApi.getById(id);
    
    const response: ApiResponse = {
      success: true,
      data: user,
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching user:', error);
    
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch user',
    };
    
    return NextResponse.json(response, { status: 404 });
  }
}

// PUT /api/users/[id] - Update user
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    
    if (!id) {
      const response: ApiResponse = {
        success: false,
        error: 'User ID is required',
      };
      
      return NextResponse.json(response, { status: 400 });
    }
    
    const user = await usersApi.update(id, body);
    
    const response: ApiResponse = {
      success: true,
      data: user,
      message: 'User updated successfully',
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating user:', error);
    
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update user',
    };
    
    return NextResponse.json(response, { status: 500 });
  }
}

// DELETE /api/users/[id] - Delete user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!id) {
      const response: ApiResponse = {
        success: false,
        error: 'User ID is required',
      };
      
      return NextResponse.json(response, { status: 400 });
    }
    
    await usersApi.delete(id);
    
    const response: ApiResponse = {
      success: true,
      message: 'User deleted successfully',
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error deleting user:', error);
    
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete user',
    };
    
    return NextResponse.json(response, { status: 500 });
  }
}
