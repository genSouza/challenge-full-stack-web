import { ip } from './ip-config'

const backend = ip.BACKEND

export const API = {
  saveStudent: `http://${backend}/student/save`,
  getStudentList: `http://${backend}/student/list`,
  deleteStudent: `http://${backend}/student/`,
  updateStudent: `http://${backend}/student/`,
  getStudent: `http://${backend}/student/`,
}
