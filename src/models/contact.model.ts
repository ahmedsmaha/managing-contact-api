import mongoose, { Schema, Document } from "mongoose";

interface IContact extends Document {
    name: string;
    phone: string;
    address: string;
    notes: string;
    lockedBy?: string;
}

const ContactSchema = new Schema<IContact>(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        notes: { type: String, required: true },
        lockedBy: { type: String, default: null },
    },
    { timestamps: true }
);

const Contact = mongoose.model<IContact>("Contact", ContactSchema);
export { Contact, IContact };
