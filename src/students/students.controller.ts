import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
} from "@nestjs/common";

import { StudentsService } from "./students.service";
import type {CreateStudentDto, UpdateStudentDto}from "./students.dto";

import { ZodPipe } from "../comman/pipes/zod.pipe";

import {
    createStudentsSchema,
    updateStudentsSchema,
} from "./students.dto";

@Controller("students")
export class StudentsController {
    constructor(
        private readonly studentsService: StudentsService
    ) {}

    @Get()
    getAll() {
        return this.studentsService.getAll();
    }

    @Get(":id")
    getOne(@Param("id") id: string) {
        return this.studentsService.getOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(
        @Body(new ZodPipe(createStudentsSchema))
        studentDto: CreateStudentDto
    ) {
        return this.studentsService.create(studentDto);
    }

    @Put(":id")
    update(
        @Param("id") id: string,

        @Body(new ZodPipe(updateStudentsSchema))
        studentDto: UpdateStudentDto
    ) {
        return this.studentsService.update(
            id,
            studentDto
        );
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id") id: string) {
        return this.studentsService.delete(id);
    }
}