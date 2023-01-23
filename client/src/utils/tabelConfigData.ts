
import { Employee, Position, Task } from "../interfaces";
import { deleteOne } from "./requests";
import Swal from 'sweetalert2'


//---------------- fellesn actions ----------------
// ------------------------------------------------

// export const actions =  (category:string, setState:Function)=> [
//   {
//     icon: "delete",
//     tooltip: "Delete Employee",
//     onClick: async (event: any, rowData: any) => {
//       //@ts-ignore
//       await Swal.fire( alertTemplate(rowData, 'fjerne') )
//         .then(async (result) => {
//           if (result.isConfirmed) {
//             await deleteOne(category, rowData.id)
//             setState((prev: any) => prev.filter((d: Employee | Position | Task) => d.id != rowData.id))
//           }
//       })
      
//     }
//   },
//   {
//     icon: "edit",
//     tooltip: "Edit Employee",
//     onClick: (event: any, rowData: any) => {
//       alert("You saved ")
//     }
//   }
// ]

// const alertTemplate = (rowData:any, action:string)=>({
//   title: `Vil du fjerne ${rowData.name}?`,
//   icon: 'warning',
//   showDenyButton: true,
//   confirmButtonText: 'Ja!',
//   denyButtonText: 'Nei'
// })





// ---------------------- ansatt --------------------
// ---------------------------------------------------
export const employeeColumns:any = [
  {
    title: "ID",
    field: "id",
    cellStyle: { width: "40%", margin:"20px" }
  },
  {
    title: "Navn",
    field: "name",
  }
];

export const employeeOptions:any = {
  search: true,
  paging: true,
  filtering: true,
  exportButton: true,
  addRowPosition: "first",
}



// ---------------------- stilling --------------------
// ----------------------------------------------------
export const positionColumns = [
    ...employeeColumns,
  {
    title: "AnsattID",
    field: "employeeID",
  },
  {
    title: "Start",
    field: "start",
    type: 'date' as const,
  },
  {
    title: "Slutt",
    field: "end",
    type: 'date' as const,
  },
];

export const positionOptions:any = (showAll: boolean) => {
  return {
    search: showAll ? true : false,
    paging: showAll ? true : false,
    filtering: showAll ? true : false,
    addRowPosition: "first"
}}

// ---------------------- oppgave --------------------
// ---------------------------------------------------
export const taskColumns = [
  ...employeeColumns,
  {
    title: "AnsattID",
    field: "employeeID",
  },
  {
    title: "Dato",
    field: "date",
    type: 'date' as const,
  }
];

export const taskOptions: any = (showAll: boolean) => {
  return{
    search: showAll ? true : false,
    paging: showAll ? true : false,
    filtering: showAll ? true : false,
    addRowPosition: "first",
    rowStyle: {
      backgroundColor: "rgb(246, 235, 233)"
    }
  }
}
