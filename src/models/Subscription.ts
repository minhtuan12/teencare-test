import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ISubscription extends Document {
	student_id: Types.ObjectId;
	package_name: string;
	start_date: Date;
	end_date: Date;
	total_sessions: number;
	used_sessions: number;
}

const SubscriptionSchema: Schema = new Schema({
	student_id: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
	package_name: { type: String, required: true },
	start_date: { type: Date, required: true },
	end_date: { type: Date, required: true },
	total_sessions: { type: Number, required: true },
	used_sessions: { type: Number, required: true, default: 0 },
});

export default mongoose.models.Subscription || mongoose.model<ISubscription>('Subscription', SubscriptionSchema);
