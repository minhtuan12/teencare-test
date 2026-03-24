import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/db';
import Subscription from '@/src/models/Subscription';

// GET /api/subscriptions/{id} - get subscription status
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const sub = await Subscription.findById(params.id);
    if (!sub) return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
    return NextResponse.json(sub);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// PATCH /api/subscriptions/{id}/use - mark session used
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const sub = await Subscription.findById(params.id);
    if (!sub) return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
    if (sub.used_sessions >= sub.total_sessions) {
      return NextResponse.json({ error: 'No sessions left' }, { status: 400 });
    }
    sub.used_sessions += 1;
    await sub.save();
    return NextResponse.json(sub);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
