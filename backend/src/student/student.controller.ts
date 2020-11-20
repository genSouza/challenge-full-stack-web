import { StudentService } from './student.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { StudentDto } from './dto/student.dto';
import { StudentUpdateDto } from './dto/student.update.dto';

@Controller('student')
export class StudentController {
  constructor(private service: StudentService) {}

  @Post('/save')
  saveStudent(@Body(ValidationPipe) dto: StudentDto): Promise<StudentDto> {
    console.log('get');
    console.log(dto);
    return this.service.saveStudent(dto);
  }

  @Get('/list')
  getStudentList(): Promise<StudentDto[]> {
    return this.service.getStudentList();
  }

  @Get('/:id')
  getStudentById(@Param('id') id: string): Promise<StudentDto> {
    return this.service.getStudentDtoById(id);
  }

  @Patch('/:id')
  updateStudent(
    @Param('id') id: string,
    @Body(ValidationPipe) dto: StudentUpdateDto,
  ): Promise<StudentDto> {
    return this.service.updateStudent(id, dto);
  }

  @Delete('/:id')
  deleteStation(@Param('id') id: string):Promise<void> {
    return this.service.deleteStudent(id);
  }
}
