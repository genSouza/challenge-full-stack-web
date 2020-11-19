import { StudentDto } from './student.dto';
import { Student } from './student.entity';
import { EntityRepository, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
  // CRUD actions
  async saveStudent(dto: StudentDto): Promise<StudentDto> {
    try {
      const { ra, cpf, name, email } = dto;
      const student = new Student();
      student.uuid = uuidv4(); // generate random uuid;
      student.ra = ra;
      student.cpf = cpf;
      student.name = name;
      student.email = email;
      dto.uuid = student.uuid;
      await student.save();
      return dto;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async updateStudent(dto: StudentDto, student: Student): Promise<StudentDto> {
    try {
      const { ra, cpf, name, email } = dto;
      student.ra = ra;
      student.cpf = cpf;
      student.name = name;
      student.email = email;
      dto.uuid = student.uuid;
      await student.save();
      return dto;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
