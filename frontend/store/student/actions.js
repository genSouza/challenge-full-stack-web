import { API } from '~/utils/api-urls'

export default {
  async loadStudents({ commit }) {
    let result = null
    console.log(API.getStudentList)
    await this.$axios
      .$get(API.getStudentList)
      .then((data) => {
        console.log(data)
        result = data
        commit('setStudentList', result)
      })
      .catch((err) => {
        throw err
      })
  },
  async saveStudent({ commit }, studentDto) {
    let result = null
    console.log(API.saveStudent)
    await this.$axios
      .$post(API.saveStudent, studentDto)
      .then((data) => {
        result = data
      })
      .catch((err) => {
        commit('setExceptionMessage', err.response.data.message)
        throw err
      })
    return result
  },
}
