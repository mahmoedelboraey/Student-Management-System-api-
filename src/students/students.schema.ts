import mongoose, { Document, Schema } from "mongoose";
export interface IStudent extends Document {
    firstName: string;
    lastName: string;
    email: string;
    enrolledCourses: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}
export const studentSchema = new Schema<IStudent>(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        enrolledCourses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
            },
        ],
    },

    {
        timestamps: true,
    }
);
export const STUDENTS_MODEL = "Student";