/**
 * Alert messages
 */
export default {
  DisplayError({ commit }, error) {
    commit('setDisplayErrorDialog', true)
    commit('setErrorMessage', error)
  },

  DisplaySuccess({ commit }, message) {
    commit('setDisplaySuccessDialog', true)
    commit('setSuccessMessage', message)
  },

  DisplayLoading({ commit }, message) {
    commit('setDisplayLoadingDialog', true)
    commit('setLoadingMessage', message)
  },

  CloseLoading({ commit }) {
    commit('setDisplayLoadingDialog', false)
    commit('setLoadingMessage', null)
  },
  /**
   * load left menu data
   * @param commit
   * @param items
   */
  loadMenu({ commit }, items) {
    commit('setMenu', items)
  },
}
