import axios from 'axios'
import { Employee, Position, Task } from '../interfaces'


// --------------------- felles for ansatt, stilling og oppgave-------------------------
const API_URL = "http://localhost:8080"

export const findAll = async (endPoint:string) => {
  return await axios.get(`${API_URL}/api/${endPoint}`)
    .then(data => data.data)
    .catch(err => console.log(err.message))
}


export const findById = async (endPoint: string, id:string) => {
  return await axios.get(`${API_URL}/api/${endPoint}/${id}`,)
    .then(data => data.data)
    .catch(err => console.log(err.message))
}


export const addOne = async (endPoint:string, reqBday: Employee|Position|Task) => {
  return await axios.post(`${API_URL}/api/${endPoint}`, reqBday)
    .then((res) => res.data)
    .catch(err => {throw err})
}


export const updateOne = async (endPoint: string, reqBday: Employee | Position | Task) => {
  return await axios.put(`${API_URL}/api/${endPoint}/${reqBday.id}`, reqBday)
    .then(data => data.data)
    .catch(err => {throw err})
}

export const deleteOne = async (endPoint: string, id: String) => {
  return await axios.delete(`${API_URL}/api/${endPoint}/${id}`)
    .then(data => data.data)
    .catch(err => {throw err})
}



// --------------------- stilling api -------------------------
export const findPosByEmpId = async (empId:string) => {
  return await axios.get(`${API_URL}/api/positions/employee/${empId}`)
    .then(data => data.data)
    .catch(err => console.log(err.message))
}


// --------------------- oppgave api -------------------------
export const findTaskByEmpIdAndPosPeriod = async (empId: string, start: string, end: string) => {
  const url = `${API_URL}/api/tasks/employee?empId=${empId}&start=${start}&end=${end}`
  return await axios.get(encodeURI(url))
    .then(data => data.data)
    .catch(err => console.log(err.message))
}
