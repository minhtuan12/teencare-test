import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/db';
import Subscription from '@/src/models/Subscription';

// POST /api/subscriptions - create subscription
export async function POST(request: NextRequest) {
  await dbConnect();
  const data = await request.json();
  try {
    const sub = await Subscription.create(data);
    return NextResponse.json(sub, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
