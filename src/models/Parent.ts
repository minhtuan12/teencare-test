import mongoose, { Schema, Document } from 'mongoose';

export interface IParent extends Document {
	name: string;
	phone: string;
	email: string;
}

const ParentSchema: Schema = new Schema({
	name: { type: String, required: true },
	phone: { type: String, required: true },
	email: { type: String, required: true, unique: true },
});

export default mongoose.models.Parent || mongoose.model<IParent>('Parent', ParentSchema);
