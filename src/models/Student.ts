import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IStudent extends Document {
	name: string;
	dob: Date;
	gender: string;
	current_grade: string;
	parent_id: Types.ObjectId;
}

const StudentSchema: Schema = new Schema({
	name: { type: String, required: true },
	dob: { type: Date, required: true },
	gender: { type: String, required: true },
	current_grade: { type: String, required: true },
	parent_id: { type: Schema.Types.ObjectId, ref: 'Parent', required: true },
});

export default mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);
