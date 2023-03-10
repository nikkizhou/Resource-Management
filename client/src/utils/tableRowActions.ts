import { Employee, Task, Position } from "../interfaces";
import { addOne, deleteOne, updateOne} from '../utils/requests'


export const addRow = (category:string, newData: any, state: any, setState: Function) => 
  new Promise<void>((resolve, reject) => {
    setTimeout(async () => {
      await addOne(category, newData)
      .then((result) => setState((prev: Task[] | Employee[] | Position[]) => [...prev, result]))
        .catch((err: any) => {alert(err.response.data.detail); reject(); })
      resolve();
    }, 600);
})

  
    
export const updateRow = (category:string, newData: any, oldData:any, setState: Function) =>
  new Promise<void>((resolve, reject) => {
    setTimeout(async () => {
      await updateOne(category, newData)
      .then((result) => {
          setState((prev: any) => {
            const dataUpdate = [...prev];
            const index = prev.findIndex((d: any) => d.id == oldData.id)
            dataUpdate[index] = newData;
            return dataUpdate
          });
      })
        .catch((err) => { alert(err.response.data.detail);  reject(); })
    resolve();
    }, 600);
  })


   
export const deleteRow = (category: string, oldData: any,  setState: Function) =>
  new Promise<void>((resolve, reject) => {
    setTimeout(async () => {
      await deleteOne(category, oldData.id)
        .then(() => setState((prev: any) => prev.filter((d: Employee | Position | Task) => d.id != oldData.id)))
        .catch((err) =>{ alert(err.response.data.detail) ; reject();})
      resolve();
    }, 300);
})
