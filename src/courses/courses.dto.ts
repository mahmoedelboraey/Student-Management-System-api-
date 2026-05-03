import * as z from "zod";

export const createCourseSchema = z.object({
    title: z
        .string({
            message: "title must be a string",
        })
        .trim()
        .min(1, {
            message: "title is required",
        })
        .max(200),

    description: z
        .string({
            message: "description must be a string",
        })
        .trim()
        .max(2000)
        .optional(),
});
export const updateCourseSchema = z.object({
    title: z.string().trim().min(1).max(200).optional(),
    description: z.string().trim().max(2000).optional(),
      isActive: z.boolean().optional(),
});

export type CreateCourseDto = z.infer<typeof createCourseSchema>;
export type UpdateCourseDto = z.infer<typeof updateCourseSchema>;