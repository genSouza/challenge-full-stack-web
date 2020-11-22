export default {
  getExceptionMessage: (state) => state.exceptionMessage,
  getStudentList: (state) => state.studentList,
  getStudentRa: (state) => state.studentDto.ra,
  getStudentCpf: (state) => state.studentDto.cpf,
  getStudentName: (state) => state.studentDto.name,
  getStudentEmail: (state) => state.studentDto.email,
  getStudentId: (state) => state.getStudentId,
  getStudentDto: (state) => state.getStudentDto,
}
