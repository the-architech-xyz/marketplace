/**
 * Post API Route
 * 
 * Next.js API route for individual post operations (Prisma implementation)
 * EXTERNAL API IDENTICAL TO DRIZZLE - Features work with ANY database!
 */

import { NextRequest, NextResponse } from 'next/server';
import { postsApi } from '@/lib/api/posts';
import { ApiResponse } from '@/types/api';

// GET /api/posts/[id] - Get post by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!id) {
      const response: ApiResponse = {
        success: false,
        error: 'Post ID is required',
      };
      
      return NextResponse.json(response, { status: 400 });
    }
    
    const post = await postsApi.getById(id);
    
    const response: ApiResponse = {
      success: true,
      data: post,
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching post:', error);
    
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch post',
    };
    
    return NextResponse.json(response, { status: 404 });
  }
}

// PUT /api/posts/[id] - Update post
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
        error: 'Post ID is required',
      };
      
      return NextResponse.json(response, { status: 400 });
    }
    
    const post = await postsApi.update(id, body);
    
    const response: ApiResponse = {
      success: true,
      data: post,
      message: 'Post updated successfully',
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating post:', error);
    
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update post',
    };
    
    return NextResponse.json(response, { status: 500 });
  }
}

// DELETE /api/posts/[id] - Delete post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!id) {
      const response: ApiResponse = {
        success: false,
        error: 'Post ID is required',
      };
      
      return NextResponse.json(response, { status: 400 });
    }
    
    await postsApi.delete(id);
    
    const response: ApiResponse = {
      success: true,
      message: 'Post deleted successfully',
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error deleting post:', error);
    
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete post',
    };
    
    return NextResponse.json(response, { status: 500 });
  }
}
