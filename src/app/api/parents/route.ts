import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/db';
import Parent from '@/src/models/Parent';

export async function GET(request: NextRequest) {
	await dbConnect();
	try {
		const parents = await Parent.find();
		return NextResponse.json(parents, { status: 200 });
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 400 });
	}
}

export async function POST(request: NextRequest) {
	await dbConnect();
	const data = await request.json();
	try {
		const parent = await Parent.create(data);
		return NextResponse.json(parent, { status: 201 });
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 400 });
	}
}
