/**
 * Draft Preview Route
 * 
 * Enables preview of draft content before publishing.
 * Use this route to enable Next.js draft mode.
 */

import { draftMode } from 'next/headers';

export async function GET(request: Request) {
  try {
    const { enableDraftMode } = await draftMode();
    enableDraftMode();

    // Get the preview URL from query params
    const url = new URL(request.url);
    const previewUrl = url.searchParams.get('url') || '/';

    // Redirect to the preview URL with draft mode enabled
    return Response.redirect(new URL(previewUrl, request.url));
  } catch (error: any) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

