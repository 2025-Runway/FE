// app/api/gpx-proxy/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const gpxUrl = searchParams.get('url');

    if (!gpxUrl) {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 },
      );
    }

    const response = await fetch(gpxUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch GPX: ${response.status}`);
    }

    const gpxContent = await response.text();

    return new NextResponse(gpxContent, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('GPX proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GPX file' },
      { status: 500 },
    );
  }
}
