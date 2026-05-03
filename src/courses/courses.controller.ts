import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Put,
} from "@nestjs/common";

import { CoursesService } from "./courses.service";

import { ZodPipe } from "../comman/pipes/zod.pipe";

import {
    createCourseSchema,
    updateCourseSchema,
    
} from "./courses.dto";
import type {CreateCourseDto,
    UpdateCourseDto,} from "./courses.dto";

@Controller("courses")
export class CoursesController {
    constructor(
        private readonly courseService: CoursesService
    ) {}

    @Get()
    getAll() {
        return this.courseService.getAll();
    }

    @Get(":id")
    getOne(@Param("id") id: string) {
        return this.courseService.getOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(
        @Body(new ZodPipe(createCourseSchema))
        courseDto: CreateCourseDto
    ) {
        return this.courseService.create(
            courseDto
        );
    }

    @Put(":id")
    update(
        @Param("id") id: string,

        @Body(new ZodPipe(updateCourseSchema))
        courseDto: UpdateCourseDto
    ) {
        return this.courseService.update(
            id,
            courseDto
        );
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id") id: string) {
        return this.courseService.delete(id);
    }

  
    @Patch(":id/activate")
    activate(@Param("id") id: string) {
        return this.courseService.activate(id);
    }


    @Patch(":id/deactivate")
    deactivate(@Param("id") id: string) {
        return this.courseService.deactivate(id);
    }
}