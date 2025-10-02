/**
 * Products API Route
 * 
 * Next.js API route for products CRUD operations
 */

import { NextRequest, NextResponse } from 'next/server';
import { productsApi } from '@/lib/api/products';
import { ApiResponse, PaginatedResponse } from '@/types/api';

// GET /api/products - Get all products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;
    const featured = searchParams.get('featured') === 'true' ? true : undefined;
    const published = searchParams.get('published') === 'true' ? true : undefined;
    
    const filters = {
      category,
      search,
      featured,
      published,
    };
    
    // Get products with pagination
    const result = await productsApi.getPaginated(page, limit, filters);
    
    const response: ApiResponse<PaginatedResponse> = {
      success: true,
      data: result,
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching products:', error);
    
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch products',
    };
    
    return NextResponse.json(response, { status: 500 });
  }
}

// POST /api/products - Create new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.description || !body.price || !body.category) {
      const response: ApiResponse = {
        success: false,
        error: 'Missing required fields: name, description, price, category',
      };
      
      return NextResponse.json(response, { status: 400 });
    }
    
    // Create product
    const product = await productsApi.create(body);
    
    const response: ApiResponse = {
      success: true,
      data: product,
      message: 'Product created successfully',
    };
    
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create product',
    };
    
    return NextResponse.json(response, { status: 500 });
  }
}
