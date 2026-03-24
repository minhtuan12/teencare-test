import mongoose, { Schema, Document } from 'mongoose';

export interface IClass extends Document {
	name: string;
	subject: string;
	day_of_week: string;
	time_slot: string;
	teacher_name: string;
	max_students: number;
}

const ClassSchema: Schema = new Schema({
	name: { type: String, required: true },
	subject: { type: String, required: true },
	day_of_week: { type: String, required: true },
	time_slot: { type: String, required: true },
	teacher_name: { type: String, required: true },
	max_students: { type: Number, required: true },
});

export default mongoose.models.Class || mongoose.model<IClass>('Class', ClassSchema);
