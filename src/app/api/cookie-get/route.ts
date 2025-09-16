import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const response = NextResponse.json({ success: true });
  console.log('request: ', request);
  console.log('request.cookies: ', request.headers);
  console.log('response: ', response);
  const clientToken = request.headers.get('cookie');
  console.log('clientToken: ', clientToken);
  const cookieStore = await cookies();
  console.log('cookieStore: ', cookieStore);
  const token = cookieStore.get('accessToken')?.value;
  console.log(token);

  return Response.json({ token });
}
