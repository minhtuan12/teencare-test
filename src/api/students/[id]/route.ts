import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/db';
import Student from '@/src/models/Student';
import Parent from '@/src/models/Parent';

// GET /api/students/{id} - get student details (with parent info)
export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	try {
		const student = await Student.findById(params.id).populate('parent_id');
		if (!student) return NextResponse.json({ error: 'Student not found' }, { status: 404 });
		return NextResponse.json(student);
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 400 });
	}
}
