import { API } from '~/utils/api-urls'

export default {
  async list({ commit }) {
    let result = null
    console.log(API.getStudentList)
    await this.$axios
      .$get(API.getStudentList)
      .then((data) => {
        result = data
        commit('setStudentList', result)
      })
      .catch((err) => {
        throw err
      })
  },
  async save({ commit }, studentDto) {
    let result = null
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
  async delete({ commit }, uuid) {
    await this.$axios.delete(API.deleteStudent + uuid).catch((err) => {
      commit('setExceptionMessage', err.response.data.message)
      throw err
    })
  },
  async findById({ commit }, uuid) {
    let result = null
    await this.$axios
      .$get(API.getStudent + uuid)
      .then((data) => {
        result = data
        commit('setStudentDto', result)
        commit('setStudentId', uuid)
      })
      .catch((err) => {
        commit('setExceptionMessage', err.response.data.message)
        throw err
      })
  },
  async update({ commit, state }, dto) {
    let result = null
    await this.$axios
      .$patch(API.updateStudent + state.studentId, dto)
      .then((data) => {
        result = data
      })
      .catch((err) => {
        commit('setExceptionMessage', err.response.data.message)
      })
    return result
  },
  clearStudentDto({ commit }) {
    commit('setStudentId', null)
    commit('setStudentDto', null)
  },
}
