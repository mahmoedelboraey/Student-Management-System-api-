import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
    STUDENTS_MODEL,
    studentSchema,
} from "./students.schema";
import { StudentsController } from "./students.controller";
import { StudentsService } from "./students.service";
import { StudentsRepository } from "./students.repository";
@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: STUDENTS_MODEL,
                schema: studentSchema,
            },
        ]),
    ],

    controllers: [StudentsController],

    providers: [
        StudentsService,
        StudentsRepository,
    ],

    exports: [StudentsRepository],
})
export class StudentsModule {}