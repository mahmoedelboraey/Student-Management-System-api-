import {BadRequestException,ConflictException,Injectable,NotFoundException,} from "@nestjs/common";
import mongoose from "mongoose";
import { StudentsRepository } from "./students.repository";
import {CreateStudentDto,UpdateStudentDto,} from "./students.dto";
@Injectable()
export class StudentsService {
    constructor(
        private readonly studentRepository: StudentsRepository
    ) {}

    private validateObjectId(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequestException(
                "Invalid student id"
            );
        }
    }
    async getAll() {
        return this.studentRepository.findAll();
    }
    async getOne(id: string) {
        this.validateObjectId(id);
        const student =
            await this.studentRepository.findById(id);
        if (!student) {
            throw new NotFoundException(
                `Student with id ${id} not found`
            );
        }

        return student;
    }
    async create(studentDto: CreateStudentDto) {
        const existingStudent =
            await this.studentRepository.findByEmail(
                studentDto.email
            );
        if (existingStudent) {
            throw new ConflictException(
                "Email already exists"
            );
        }
        return this.studentRepository.create(
            studentDto
        );
    }
    async update(
        id: string,
        studentDto: UpdateStudentDto
    ) {
        this.validateObjectId(id);
        if (studentDto.email) {
            const existingStudent =
                await this.studentRepository.findByEmail(
                    studentDto.email
                );

            if (
                existingStudent &&
                existingStudent._id.toString() !== id
            ) {
                throw new ConflictException(
                    "Email already exists"
                );
            }
        }

        const updatedStudent =
            await this.studentRepository.update(
                id,
                studentDto
            );

        if (!updatedStudent) {
            throw new NotFoundException(
                `Student with id ${id} not found`
            );
        }
        return updatedStudent;
    }
    async delete(id: string) {
        this.validateObjectId(id);

        const deletedStudent =
            await this.studentRepository.delete(id);
        if (!deletedStudent) {
            throw new NotFoundException(
                `Student with id ${id} not found`
            );
        }
    }
}
