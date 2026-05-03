import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import {
    COURSE_MODEL,
    courseSchema,
} from "./course.schema";
import { CoursesController } from "./courses.controller";
import { CoursesService } from "./courses.service";
import { CourseRepository } from "./courses.repository";
@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: COURSE_MODEL,
                schema: courseSchema,
            },
        ]),
    ],

    controllers: [CoursesController],

    providers: [
        CoursesService,
        CourseRepository, 
    ],
})
export class CoursesModule {}