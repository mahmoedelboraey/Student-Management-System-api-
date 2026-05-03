import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from "@nestjs/common";

import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from "./app.controller";

import { AppService } from "./app.service";

import { StudentsModule } from "./students/students.module";

import { CoursesModule } from "./courses/courses.module";

import { QuestionsModule } from "./questions/questions.module";

import { LoggerMiddleware } from "./comman/middleware/logger.middleware";

@Module({
    imports: [
        MongooseModule.forRoot(
            "mongodb://localhost:27017/education-platform"
        ),

        StudentsModule,

        CoursesModule,

        QuestionsModule,
    ],

    controllers: [AppController],

    providers: [AppService],
})
export class AppModule
    implements NestModule
    
{
    configure(
        consumer: MiddlewareConsumer
    ) {
        consumer
            .apply(LoggerMiddleware)

            .forRoutes({
                path: "*",
                method: RequestMethod.ALL,
            });
    }
}