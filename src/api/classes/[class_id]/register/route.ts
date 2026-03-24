import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/db';
import Class from '@/src/models/Class';
import ClassRegistration from '@/src/models/ClassRegistration';
import Student from '@/src/models/Student';
import Subscription from '@/src/models/Subscription';

// POST /api/classes/{class_id}/register - register student to class
export async function POST(request: NextRequest, { params }: { params: { class_id: string } }) {
	await dbConnect();
	const { student_id } = await request.json();
	try {
		// Check class exists
		const klass = await Class.findById(params.class_id);
		if (!klass) return NextResponse.json({ error: 'Class not found' }, { status: 404 });
		// Check class size
		const regCount = await ClassRegistration.countDocuments({ class_id: params.class_id });
		if (regCount >= klass.max_students) {
			return NextResponse.json({ error: 'Class is full' }, { status: 400 });
		}
		// Check student exists
		const student = await Student.findById(student_id);
		if (!student) return NextResponse.json({ error: 'Student not found' }, { status: 404 });
		// Check for schedule conflict
		const studentRegs = await ClassRegistration.find({ student_id });
		const classList = await Class.find({ _id: { $in: studentRegs.map(r => r.class_id) } });
		const conflict = classList.some(c => c.day_of_week === klass.day_of_week && c.time_slot === klass.time_slot);
		if (conflict) {
			return NextResponse.json({ error: 'Schedule conflict' }, { status: 400 });
		}
		// Check subscription
		const sub = await Subscription.findOne({ student_id, end_date: { $gte: new Date() }, used_sessions: { $lt: '$total_sessions' } });
		if (!sub) {
			return NextResponse.json({ error: 'No valid subscription' }, { status: 400 });
		}
		// Register
		await ClassRegistration.create({ class_id: params.class_id, student_id });
		sub.used_sessions += 1;
		await sub.save();
		return NextResponse.json({ success: true });
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 400 });
	}
}
