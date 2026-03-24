import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/db';
import ClassRegistration from '@/src/models/ClassRegistration';
import Subscription from '@/src/models/Subscription';
import Class from '@/src/models/Class';

// DELETE /api/registrations/{id} - cancel registration with session refund logic
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const reg = await ClassRegistration.findById(params.id);
    if (!reg) return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    const klass = await Class.findById(reg.class_id);
    if (!klass) return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    // Assume class time is next occurrence of class day/time
    const now = new Date();
    const classDate = new Date(); // TODO: calculate next class date/time
    // For demo, assume classDate is 2 days from now
    classDate.setDate(now.getDate() + 2);
    const diffHours = (classDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    const sub = await Subscription.findOne({ student_id: reg.student_id, end_date: { $gte: now } });
    await reg.deleteOne();
    if (sub) {
      if (diffHours > 24) {
        sub.used_sessions = Math.max(0, sub.used_sessions - 1);
        await sub.save();
        return NextResponse.json({ success: true, refund: true });
      } else {
        return NextResponse.json({ success: true, refund: false });
      }
    }
    return NextResponse.json({ success: true, refund: false });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
