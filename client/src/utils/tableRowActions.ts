import { Employee, Task, Position } from "../interfaces";
import { hasDuplicate, hasOverlapp, rightPeriod } from '../utils/validator'
import { addOne, deleteOne, updateOne} from '../utils/requests'


export const addRow = (category:string, newData: any, state: any, setState: Function) => 
  new Promise<void>((resolve, reject) => {
    setTimeout(async () => {
      const otherConditions = category == 'employee'
        ?!rightPeriod(newData.start, newData.end) || hasOverlapp(newData.start, newData.end, state)
        : false
      
      if (hasDuplicate(newData.id, state)||otherConditions) {
        reject();
        return;
      }
      resolve();
      const newItem = await addOne(category,newData)
      setState((prev: Task[] | Employee[] | Position[]) => [...prev, newItem])
    }, 600);
  })

    
export const updateRow = (category:string, newData: any, oldData:any, setState: Function) =>
  new Promise<void>((resolve, reject) => {
    setTimeout(async () => {
      console.log(newData,'new!! line 28'); //
      await updateOne(category, newData)
      setState((prev: any) => {
        const dataUpdate = [...prev];
        const index = prev.findIndex((d: any) => d.id == oldData.id)
        dataUpdate[index] = newData;
        return dataUpdate
      });
      resolve();
    }, 300);
  })


   
export const deleteRow = (category: string, oldData: any,  setState: Function) =>
  new Promise<void>((resolve, reject) => {
    setTimeout(async () => {
      await deleteOne(category, oldData.id)
      setState((prev: any) => prev.filter((d: Employee | Position | Task) => d.id != oldData.id))
      resolve();
    }, 300);
})
