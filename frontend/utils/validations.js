const required = (propertyType, customErrorMessage) => {
  return (v) =>
    (v && v.length > 0) ||
    customErrorMessage ||
    `Você deve inserir o(a) ${propertyType}`
}
const minLength = (propertyType, minLength) => {
  return (v) => {
    if (!v) {
      return true
    }

    return (
      v.length >= minLength ||
      `${propertyType} deve conter no mínimo ${minLength} caracteres`
    )
  }
}
const maxLength = (propertyType, maxLength) => {
  return (v) =>
    (v && v.length <= maxLength) ||
    `${propertyType} deve conter no máximo ${maxLength} caracteres`
}

const emailFormat = () => {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/
  return (v) => (v && regex.test(v)) || 'Deve ser um email válido'
}

export default {
  required,
  minLength,
  maxLength,
  emailFormat,
}
