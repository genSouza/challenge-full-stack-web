export default {
  // ERROR
  setDisplayErrorDialog(state, displayErrorDialog) {
    state.displayErrorDialog = displayErrorDialog
  },
  setErrorMessage(state, errorMessage) {
    state.errorMessage = errorMessage
  },
  // SUCCESS
  setDisplaySuccessDialog(state, displaySuccessDialog) {
    state.displaySuccessDialog = displaySuccessDialog
  },
  setSuccessMessage(state, successMessage) {
    state.successMessage = successMessage
  },
  // LOADING
  setDisplayLoadingDialog(state, displayLoadingDialog) {
    state.displayLoadingDialog = displayLoadingDialog
  },
  setLoadingMessage(state, loadingMessage) {
    state.loadingMessage = loadingMessage
  },
  // MENU DATA
  setMenu(state, menu) {
    state.menu = menu
  },
}
