export default {
  setStudentDto(state, studentDto) {
    state.studentDto = studentDto
  },
  setExceptionMessage(state, exceptionMessage) {
    state.exceptionMessage = exceptionMessage
  },
  setStudentList(state, studentList) {
    state.studentList = studentList
  },
  setStudentRa(state, ra) {
    state.studentDto.ra = ra
  },
  setStudentCpf(state, cpf) {
    state.studentDto.cpf = cpf
  },
  setStudentName(state, name) {
    state.studentDto.name = name
  },
  setStudentEmail(state, email) {
    state.studentDto.email = email
  },
  setStudentId(state, id) {
    state.studentId = id
  },
}
