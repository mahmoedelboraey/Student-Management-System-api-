import mongoose, { Document, Schema } from "mongoose";
export interface ICourse extends Document {
    title: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export const courseSchema = new Schema<ICourse>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
        },

        description: {
            type: String,
            trim: true,
            maxlength: 2000,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);
export const COURSE_MODEL = "COURSE";