import { Employee, Task, Position } from "../interfaces";
import { hasDuplicate } from '../utils/validator'
import { addEmployee, addPosition, addTask } from '../utils/requests'

// export const addRow = (newData: Employee|Stilling|Task, setState:Function) => {
//   return new Promise<void>((resolve, reject) => {
//     setState((prev: Employee[] | Stilling[]) => [...prev, newData])
//     setTimeout(() => resolve(), 300)
//   });
// }


export const addRow = (newData: any, data: Task[] | Employee[] | Position[], setSatate: Function, otherConditions:boolean) => 
  new Promise<void>((resolve, reject) => {
    setTimeout( async () => {
      if (hasDuplicate(newData.id, data)||otherConditions) {
        reject();
        return;
      }
      resolve();

      let newItem:any = null;
      if (newData.start) newItem = await addPosition(newData)
      else if(newData.date) newItem = await addTask(newData)
      else  newItem = await addEmployee(newData)
      
      setSatate((prev: Task[] | Employee[] | Position[]) => [...prev, newItem])
    }, 600);
  })

// const addRowStilling = (newData: Stilling) =>
//   new Promise<void>((resolve, reject) => {
//     setTimeout(() => {
//       if (!riktigPeriode(newData.start, newData.slutt)
//         || harDuplikat(newData.Id, stillinger)
//         || harOverlapp(newData.start, newData.slutt, stillinger)) {
//         reject();
//         return;
//       }
//       resolve();
//       setStillinger((prev) => [...prev, newData])
//     }, 600);
//   })
