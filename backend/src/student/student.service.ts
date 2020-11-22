import { StudentRepository } from './student.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentDto } from './dto/student.dto';
import { Student } from './student.entity';
import { StudentUpdateDto } from './dto/student.update.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentRepository) private repository: StudentRepository,
  ) {}

  convertToDtoList(list: Student[]): StudentDto[] {
    const dtoList = new Array<StudentDto>();
    list.forEach(item => {
      const dto = new StudentDto();
      dto.uuid = item.uuid;
      dto.ra = item.ra;
      dto.name = item.name;
      dto.cpf = item.cpf;

      dtoList.push(dto);
    });
    return dtoList;
  }

  convertToDto(student: Student): StudentDto {
    const dto = new StudentDto();
    dto.uuid = student.uuid;
    dto.ra = student.ra;
    dto.name = student.name;
    dto.cpf = student.cpf;
    dto.email = student.email;
    return dto;
  }

  async getStudentList(): Promise<StudentDto[]> {
    const list = await this.repository.find();
    return this.convertToDtoList(list);
  }

  async getStudentById(uuid: string): Promise<Student> {
    const found = await this.repository.findOne({ where: { uuid } });
    if (!found) {
      throw new NotFoundException(`Student with ID "${uuid}" not found`);
    }
    return found;
  }

  async getStudentDtoById(uuid: string): Promise<StudentDto> {
    const student = await this.getStudentById(uuid);
    return this.convertToDto(student);
  }

  async saveStudent(dto: StudentDto): Promise<StudentDto> {
    return await this.repository.saveStudent(dto);
  }

  async updateStudent(
    uuid: string,
    dto: StudentUpdateDto,
  ): Promise<StudentDto> {
    const student = await this.getStudentById(uuid);

    return await this.repository.updateStudent(dto, student);
  }

  async deleteStudent(uuid: string): Promise<void> {
    const found = await this.getStudentById(uuid);
    await this.repository.softRemove(found)   // found.softRemove();
  }
}
