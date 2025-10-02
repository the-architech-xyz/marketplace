/**
 * Product API Route
 * 
 * Next.js API route for individual product operations
 */

import { NextRequest, NextResponse } from 'next/server';
import { productsApi } from '@/lib/api/products';
import { ApiResponse } from '@/types/api';

// GET /api/products/[id] - Get product by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!id) {
      const response: ApiResponse = {
        success: false,
        error: 'Product ID is required',
      };
      
      return NextResponse.json(response, { status: 400 });
    }
    
    const product = await productsApi.getById(id);
    
    const response: ApiResponse = {
      success: true,
      data: product,
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching product:', error);
    
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch product',
    };
    
    return NextResponse.json(response, { status: 404 });
  }
}

// PUT /api/products/[id] - Update product
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
        error: 'Product ID is required',
      };
      
      return NextResponse.json(response, { status: 400 });
    }
    
    const product = await productsApi.update(id, body);
    
    const response: ApiResponse = {
      success: true,
      data: product,
      message: 'Product updated successfully',
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating product:', error);
    
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update product',
    };
    
    return NextResponse.json(response, { status: 500 });
  }
}

// DELETE /api/products/[id] - Delete product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!id) {
      const response: ApiResponse = {
        success: false,
        error: 'Product ID is required',
      };
      
      return NextResponse.json(response, { status: 400 });
    }
    
    await productsApi.delete(id);
    
    const response: ApiResponse = {
      success: true,
      message: 'Product deleted successfully',
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error deleting product:', error);
    
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete product',
    };
    
    return NextResponse.json(response, { status: 500 });
  }
}
