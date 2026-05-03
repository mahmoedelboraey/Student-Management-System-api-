import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
    IStudent,
    STUDENTS_MODEL,
} from "./students.schema";
import {
    CreateStudentDto,
    UpdateStudentDto,
} from "./students.dto";
@Injectable()
export class StudentsRepository {
    constructor(
        @InjectModel(STUDENTS_MODEL)
        private readonly studentsModel: Model<IStudent>
    ) {}

    async findAll() {
        return this.studentsModel
            .find()
            .lean()
            .exec();
    }

    async findById(id: string) {
        return this.studentsModel
            .findById(id)
            .lean()
            .exec();
    }
    async findByEmail(email: string) {
        return this.studentsModel
            .findOne({ email })
            .lean()
            .exec();
    }
    async create(studentDto: CreateStudentDto) {
        const student =
            new this.studentsModel(studentDto);

        return student.save();
    }
    async update(
        id: string,
        studentDto: UpdateStudentDto
    ) {
        return this.studentsModel
            .findByIdAndUpdate(
                id,
                studentDto,
                {
                    new: true,
                }
            )
            .lean()
            .exec();
    }
    async delete(id: string) {
        return this.studentsModel
            .findByIdAndDelete(id)
            .exec();
    }
}