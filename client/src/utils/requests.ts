import axios from 'axios'
import { Employee, Position, Task } from '../interfaces'


// --------------------- felles for ansatt, stilling og oppgave-------------------------

export const findAll = async (endPoint:string) => {
  return await axios.get(`/api/${endPoint}`)
    .then(data => data.data)
    .catch(err => console.log(err.message))
}


export const findById = async (endPoint: string, id:string) => {
  return await axios.get(`/api/${endPoint}/${id}`,)
    .then(data => data.data)
    .catch(err => console.log(err.message))
}


export const addOne = async (endPoint:string, reqBday: Employee|Position|Task) => {
  return await axios.post(`/api/${endPoint}`, reqBday)
    .then((res) => res.data)
    .catch(err => console.log(err.message))
}



export const updateOne = async (endPoint: string, reqBday: Employee | Position | Task) => {
  return await axios.put(`/api/${endPoint}/${reqBday.id}`, reqBday)
    .then(data => data.data)
    .catch(err => console.log(err.message))
}

export const deleteOne = async (endPoint: string, id: String) => {
  return await axios.delete(`/api/${endPoint}/${id}`)
    .then(data => data.data)
    .catch(err => console.log(err.message))
}



// --------------------- stilling api -------------------------

export const findPosByEmpId = async (empId:string) => {
  return await axios.get(`/api/positions/employee/${empId}`)
    .then(data => data.data)
    .catch(err => console.log(err.message))
}


// --------------------- oppgave api -------------------------
export const findTaskByEmpIdAndPosPeriod = async (empId: string, start: Date, end: Date) => {
  return await axios.get(`/api/tasks/employee?empId=${empId}&start=${formatDate(start)}&end=${formatDate(end)}`)
    .then(data => data.data)
    .catch(err => console.log(err.message))
}

export const formatDate = (date: Date) => date.toISOString().split('T')[0]
