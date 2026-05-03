import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { COURSE_MODEL, ICourse } from "./course.schema";
import { CreateCourseDto, UpdateCourseDto } from "./courses.dto";
@Injectable()
export class CourseRepository {
    constructor(
        @InjectModel(COURSE_MODEL)
        private readonly courseModel: Model<ICourse>
    ) {}

    async findAll() {
        return this.courseModel.find().lean().exec();
    }

    async findById(id: string) {
        return this.courseModel.findById(id).lean().exec();
    }

    async create(courseDto: CreateCourseDto) {
        const course = new this.courseModel(courseDto);
        return course.save();
    }
    async findByTitle(title: string) {
    return this.courseModel.findOne({ title }).lean().exec();
}

    async update(id: string, courseDto: UpdateCourseDto) {
        return this.courseModel
            .findByIdAndUpdate(id, courseDto, {
                new: true,
            })
            .lean()
            .exec();
    }

    async delete(id: string) {
        return this.courseModel.findByIdAndDelete(id).exec();
    }
}