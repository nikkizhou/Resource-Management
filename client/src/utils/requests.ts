import axios from 'axios'
import { Employee, Position } from '../interfaces'



// --------------------- ansatt api -------------------------
export const findEmployees = async () => {
  return await axios.get('/api/employees')
    .then(data => data.data)
    .catch(err => console.log(err.message))
  }
  
  export const addEmployee = async (emp:Employee) => {
    return await axios.post('api/employees', emp)
      .then((res) => res.data)
      .catch(err => console.log(err.message))
  }
  
// export const findOneAnsatt = async (id:String) => {
//   return await axios.get(`/api/ansatte/${id}`,)
//     .then(data => data.data)
//     .catch(err => console.log(err.message))
// }

// export const updateAnsatt = async (ansatt: Ansatt) => {
//   return await axios.put(`/api/ansatte/${ansatt.Id}`, ansatt)
//     .then(data => data.data)
//     .catch(err => console.log(err.message))
// }



// --------------------- stilling api -------------------------
export const findPositions = async () => {
  return await axios.get('/api/positions')
    .then(data => data.data)
    .catch(err => console.log(err.message))
}


export const findPosByEmpId = async (empId:string) => {
  return await axios.get(`/api/positions/employee/${empId}`)
    .then(data => data.data)
    .catch(err => console.log(err.message))
}

export const addPosition = async (pos: Position) => {
  return await axios.post('api/positions', pos)
    .then((res) => res.data)
    .catch(err => console.log(err.message))
}


export const addTask = async (pos: Position) => {
  // return await axios.post('api/tasks', pos)
  //   .then((res) => res.data)
  //   .catch(err => console.log(err.message))
}
