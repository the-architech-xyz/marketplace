/**
 * Posts API Route
 * 
 * Next.js API route for posts CRUD operations (Prisma implementation)
 * EXTERNAL API IDENTICAL TO DRIZZLE - Features work with ANY database!
 */

import { NextRequest, NextResponse } from 'next/server';
import { postsApi } from '@/lib/api/posts';
import { ApiResponse, PaginatedResponse } from '@/types/api';

// GET /api/posts - Get all posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const author = searchParams.get('author') || undefined;
    const category = searchParams.get('category') || undefined;
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;
    const published = searchParams.get('published') === 'true' ? true : undefined;
    const featured = searchParams.get('featured') === 'true' ? true : undefined;
    
    const filters = {
      author,
      category,
      status,
      search,
      published,
      featured,
    };
    
    // Get posts with pagination
    const result = await postsApi.getPaginated(page, limit, filters);
    
    const response: ApiResponse<PaginatedResponse> = {
      success: true,
      data: result,
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching posts:', error);
    
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch posts',
    };
    
    return NextResponse.json(response, { status: 500 });
  }
}

// POST /api/posts - Create new post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.content || !body.authorId) {
      const response: ApiResponse = {
        success: false,
        error: 'Missing required fields: title, content, authorId',
      };
      
      return NextResponse.json(response, { status: 400 });
    }
    
    // Create post
    const post = await postsApi.create(body);
    
    const response: ApiResponse = {
      success: true,
      data: post,
      message: 'Post created successfully',
    };
    
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create post',
    };
    
    return NextResponse.json(response, { status: 500 });
  }
}
