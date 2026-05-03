import * as z from "zod";

export const createStudentsSchema = z.object({
    firstName: z
        .string({
            error: "First name must be a string",
        })
        .trim()
        .min(1, {
            error: "First name is required",
        })
        .max(100, {
            error: "First name must not exceed 100 characters",
        }),

    lastName: z
        .string({
            error: "Last name must be a string",
        })
        .trim()
        .min(1, {
            error: "Last name is required",
        })
        .max(100, {
            error: "Last name must not exceed 100 characters",
        }),
    email: z
        .string()
        .trim()
        .email({
            error: "Invalid email format",
        }),
});
export const updateStudentsSchema = z.object({
    firstName: z
        .string({
            error: "First name must be a string",
        })
        .trim()
        .min(1, {
            error: "First name cannot be empty",
        })
        .max(100, {
            error: "First name must not exceed 100 characters",
        })
        .optional(),

    lastName: z
        .string({
            error: "Last name must be a string",
        })
        .trim()
        .min(1, {
            error: "Last name cannot be empty",
        })
        .max(100, {
            error: "Last name must not exceed 100 characters",
        })
        .optional(),

    email: z
        .string()
        .trim()
        .email({
            error: "Invalid email format",
        })
        .optional(),
});

export type CreateStudentDto = z.infer<typeof createStudentsSchema>;
export type UpdateStudentDto = z.infer<typeof updateStudentsSchema>;