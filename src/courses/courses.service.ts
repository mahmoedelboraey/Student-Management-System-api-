import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";

import { CourseRepository } from "./courses.repository";

import mongoose from "mongoose";

import {
    CreateCourseDto,
    UpdateCourseDto,
} from "./courses.dto";

@Injectable()
export class CoursesService {
    constructor(
        private readonly courseRepository: CourseRepository
    ) {}

    private validateObjectId(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequestException(
                "Invalid course id"
            );
        }
    }

    async getAll() {
        return this.courseRepository.findAll();
    }

    async getOne(id: string) {
        this.validateObjectId(id);

        const course =
            await this.courseRepository.findById(
                id
            );

        if (!course) {
            throw new NotFoundException(
                `Course with id ${id} not found`
            );
        }

        return course;
    }

    async create(courseDto: CreateCourseDto) {
        const existing =
            await this.courseRepository.findByTitle(
                courseDto.title
            );

        if (existing) {
            throw new ConflictException(
                "Course already exists"
            );
        }

        return this.courseRepository.create(
            courseDto
        );
    }

    async update(
        id: string,
        courseDto: UpdateCourseDto
    ) {
        this.validateObjectId(id);

        const updated =
            await this.courseRepository.update(
                id,
                courseDto
            );

        if (!updated) {
            throw new NotFoundException(
                `Course with id ${id} not found`
            );
        }

        return updated;
    }

    async delete(id: string) {
        this.validateObjectId(id);

        const deleted =
            await this.courseRepository.delete(
                id
            );

        if (!deleted) {
            throw new NotFoundException(
                `Course with id ${id} not found`
            );
        }

        return { deleted: true };
    }
    async activate(id: string) {
        this.validateObjectId(id);

        const course =
            await this.courseRepository.findById(
                id
            );

        if (!course) {
            throw new NotFoundException(
                "Course not found"
            );
        }

        if (course.isActive) {
            return course; 
        }

        return this.courseRepository.update(
            id,
            { isActive: true }
        );
    }

    async deactivate(id: string) {
        this.validateObjectId(id);

        const course =
            await this.courseRepository.findById(
                id
            );

        if (!course) {
            throw new NotFoundException(
                "Course not found"
            );
        }

        if (!course.isActive) {
            return course; // silent success
        }

        return this.courseRepository.update(
            id,
            { isActive: false }
        );
    }
}