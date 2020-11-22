import { StudentRepository } from './student.repository';
import { StudentService } from './student.service';
import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

const mockStudentRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  saveStudent: jest.fn(),
  softRemove: jest.fn(),
  updateStudent: jest.fn(),
});
describe('StudentService', () => {
  let studentService;
  let studentRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        StudentService,
        { provide: StudentRepository, useFactory: mockStudentRepository },
      ],
    }).compile();

    studentService = await module.get<StudentService>(StudentService);
    studentRepository = await module.get<StudentRepository>(StudentRepository);
  });

  describe('getStudentList', () => {
    it('Get all students from repository', async () => {
      const studentList = [
        {
          id: 33,
          uuid: 'b2dbd74b-f882-44e0-a298-b8ef46c7c447',
          ra: 136888,
          cpf: '132.219.402-54',
          name: 'Maria Rosa da Silva',
          email: 'maria@gmail.com',
          createDateTime: '2020-11-22T03:56:42.739148-04:00',
          lastChangedDateTime: '2020-11-22T03:57:08.563125-04:00',
          deletedAt: null,
        },

        {
          id: 5,
          uuid: '2a458f92-854e-4aad-a326-e143d12e6878',
          ra: 101234,
          cpf: '122.999.999-99',
          name: 'Paula Silva de Souza',
          email: 'paulaSouza@gmail.com',
          createDateTime: '2020-11-19T23:23:04.318946-04:00',
          lastChangedDateTime: '2020-11-20T00:18:44.482346-04:00',
          deletedAt: null,
        },
      ];
      const resultList = [
        {
          uuid: 'b2dbd74b-f882-44e0-a298-b8ef46c7c447',
          ra: 136888,
          cpf: '132.219.402-54',
          name: 'Maria Rosa da Silva',
          email: 'maria@gmail.com',
        },

        {
          uuid: '2a458f92-854e-4aad-a326-e143d12e6878',
          ra: 101234,
          cpf: '122.999.999-99',
          name: 'Paula Silva de Souza',
          email: 'paulaSouza@gmail.com',
        },
      ];
      studentRepository.find.mockResolvedValue(studentList);
      expect(studentRepository.find).not.toHaveBeenCalled();

      const result = await studentService.getStudentList();
      expect(studentRepository.find).toHaveBeenCalled();
      expect(result.length).toEqual(resultList.length);
    });
  });

  describe('getStudentById', () => {
    it('calls studentRepository.findOne() and succesffuly retrieve and return the student', async () => {
      const mockStudent = {
        uuid: '2a458f92-854e-4aad-a326-e143d12e6878',
        ra: 101234,
        cpf: '122.999.999-99',
        name: 'Paula Silva de Souza',
        email: 'paulaSouza@gmail.com',
      };
      const uuid = '2a458f92-854e-4aad-a326-e143d12e6878';
      studentRepository.findOne.mockResolvedValue(mockStudent);

      const result = await studentService.getStudentById(uuid);
      expect(result).toEqual(mockStudent);

      expect(studentRepository.findOne).toHaveBeenCalledWith({
        where: {
          uuid: uuid,
        },
      });
    });

    it('throws an error as student is not found', () => {
      studentRepository.findOne.mockResolvedValue(null);
      expect(studentService.getStudentById('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createStudent', () => {
    it('calls StudentRepository.create() and returns the result', async () => {
      studentRepository.saveStudent.mockResolvedValue('someStudent');

      expect(studentRepository.saveStudent).not.toHaveBeenCalled();
      const createStudentDto = {
        ra: 101234,
        cpf: '122.999.999-99',
        name: 'Paula Silva de Souza',
        email: 'paulaSouza@gmail.com',
      };

      const result = await studentService.saveStudent(createStudentDto);
      expect(studentRepository.saveStudent).toHaveBeenCalledWith(
        createStudentDto,
      );
      expect(result).toEqual('someStudent');
    });
  });

  describe('deleteStudent', () => {
    it('calls studentRepository.softRemove() to delete a student', async () => {
      const mockStudent = {
        ra: 101234,
        cpf: '122.999.999-99',
        name: 'Paula Silva de Souza',
        email: 'paulaSouza@gmail.com',
      };

      const uuid = '2a458f92-854e-4aad-a326-e143d12e6878';
      studentRepository.findOne.mockResolvedValue(mockStudent);
      studentRepository.softRemove.mockResolvedValue({ affected: 1 });
      expect(studentRepository.softRemove).not.toHaveBeenCalled();
      await studentService.deleteStudent(uuid);
      expect(studentRepository.softRemove).toHaveBeenCalledWith(mockStudent);
    });

    it('throws an error as student could not be found', () => {
      studentRepository.softRemove.mockResolvedValue({ affected: 0 });
      expect(studentService.deleteStudent(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateStudent', () => {
    it('updates student', async () => {
      const uuid = '2a458f92-854e-4aad-a326-e143d12e6878';
      const student = {
        id: 33,
        ra: 101234,
        cpf: '122.999.999-99',
        name: 'Paula Silva de Souza',
        email: 'paulaSouza@gmail.com',
        createDateTime: '2020-11-22T03:56:42.739148-04:00',
        lastChangedDateTime: '2020-11-22T03:57:08.563125-04:00',
        deletedAt: null,
      };
      const updateStudentDto = {
        name: 'Paula Souza da Silva',
        email: 'paulaSilva@gmail.com',
      };
      studentRepository.findOne.mockResolvedValue(student);
      await studentService.updateStudent(uuid, updateStudentDto);
      expect(studentRepository.updateStudent).toHaveBeenCalledWith(
        updateStudentDto,
        student,
      );
    });
  });
});
