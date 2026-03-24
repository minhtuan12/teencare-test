import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/db';
import Parent from '@/src/models/Parent';

// GET /api/parents/{id} - get parent details
export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	try {
		const parent = await Parent.findById(params.id);
		if (!parent) return NextResponse.json({ error: 'Parent not found' }, { status: 404 });
		return NextResponse.json(parent);
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 400 });
	}
}
