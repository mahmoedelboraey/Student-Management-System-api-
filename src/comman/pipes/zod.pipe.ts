import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import * as z from "zod";
export class ZodPipe implements PipeTransform {
    constructor(private readonly schema: z.ZodType) {}

    transform(value: unknown, _metadata: ArgumentMetadata) {
        const result = this.schema.safeParse(value);

        if (!result.success) {
            throw new BadRequestException({
                message: "Validation error",
                errors: result.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                })),
            });
        }

        return result.data;
    }
}