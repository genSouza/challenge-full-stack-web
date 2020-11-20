import { StudentDto } from './dto/student.dto';
import { Student } from './student.entity';
import { EntityRepository, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { StudentUpdateDto } from './dto/student.update.dto';

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
      if (err.code === '23505') {
        //duplicate unique key error code for postgreSQL
        throw new ConflictException('RA or CPF already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateStudent(dtoUpdate: StudentUpdateDto, student: Student): Promise<StudentDto> {
    try {
      const { name, email } = dtoUpdate;
      student.name = name;
      student.email = email;
      await student.save();
      
      const dto = new StudentDto();
      dto.name = student.name;
      dto.email = student.email;
      dto.uuid = student.uuid;
      dto.ra = student.ra;
      dto.cpf = student.cpf;
      
      return dto;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
