import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IClassRegistration extends Document {
	class_id: Types.ObjectId;
	student_id: Types.ObjectId;
	createdAt: Date;
}

const ClassRegistrationSchema: Schema = new Schema({
	class_id: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
	student_id: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
}, { timestamps: true });

export default mongoose.models.ClassRegistration || mongoose.model<IClassRegistration>('ClassRegistration', ClassRegistrationSchema);
