import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseModule } from './course/course.module';
import { CommonModule } from './common/common.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: process.env.NODE_ENV !== 'production',
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    CourseModule,
    CommonModule,
    StudentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
