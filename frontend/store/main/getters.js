export default {
  // ERROR
  getDisplayErrorDialog: (state) => state.displayErrorDialog,
  getErrorMessage: (state) => state.errorMessage,

  // SUCCESS
  getDisplaySuccessDialog: (state) => state.displaySuccessDialog,
  getSuccessMessage: (state) => state.successMessage,

  // LOADING
  getDisplayLoadingDialog: (state) => state.displayLoadingDialog,
  getLoadingMessage: (state) => state.loadingMessage,

  // MENU DATA
  getMenu: (state) => state.menu,
}
