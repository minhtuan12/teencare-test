import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/db';
import Class from '@/src/models/Class';

// POST /api/classes - create class
export async function POST(request: NextRequest) {
	await dbConnect();
	const data = await request.json();
	try {
		const newClass = await Class.create(data);
		return NextResponse.json(newClass, { status: 201 });
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 400 });
	}
}

// GET /api/classes?day={weekday} - list classes by day
export async function GET(request: NextRequest) {
	await dbConnect();
	const { searchParams } = new URL(request.url);
	const day = searchParams.get('day');
	try {
		const query = day ? { day_of_week: day } : {};
		const classes = await Class.find(query);
		return NextResponse.json(classes);
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 400 });
	}
}
