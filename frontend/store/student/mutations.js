export default {
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
}
