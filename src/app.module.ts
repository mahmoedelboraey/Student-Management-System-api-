import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { QuestionsModule } from './questions/questions.module';
import { MongooseModule } from "@nestjs/mongoose";
import { StudentController } from './student/student.controller';

@Module({
  imports: [
     MongooseModule.forRoot("mongodb://localhost:27017/todo-taha"),
    StudentsModule, CoursesModule, QuestionsModule , ],
  controllers: [AppController, StudentController],
  providers: [AppService],
})
export class AppModule {}
