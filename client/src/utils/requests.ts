import axios from 'axios'
import { Ansatt } from '../interfaces'



// --------------------- ansatt api -------------------------
export const findAnsatte = async () => {
  return await axios.get('/api/ansatte')
    .then(data => data.data)
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

// export const addAnsatt = async (ansatt:Ansatt) => {
//   return await axios.post('api/ansatte', ansatt)
//     .then((orderNr) => orderNr.data)
//     .catch(err => console.log(err.message))
// }


// --------------------- stilling api -------------------------
export const findStillinger = async () => {
  return await axios.get('/api/positions')
    .then(data => data.data)
    .catch(err => console.log(err.message))
}
