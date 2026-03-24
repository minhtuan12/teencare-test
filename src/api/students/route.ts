import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/db';
import Student from '@/src/models/Student';

// POST /api/students - create student
export async function POST(request: NextRequest) {
	await dbConnect();
	const data = await request.json();
	try {
		const student = await Student.create(data);
		return NextResponse.json(student, { status: 201 });
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 400 });
	}
}
