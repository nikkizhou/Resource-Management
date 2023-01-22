
// ---------------------- ansatt --------------------
// ---------------------------------------------------
export const employeeColumns = [
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

export const employeeOptions = {
  search: true,
  paging: false,
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

export const positionOptions = (showAll: boolean) => {
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

export const taskOptions = (showAll: boolean) => {
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

//---------------- common actions ----------------

export const actions = [
  {
    icon: "delete",
    tooltip: "Delete Employee",
    onClick: (event: any, rowData: any) => alert("You saved ")
  },
  {
    icon: "edit",
    tooltip: "Edit Employee",
    onClick: (event: any, rowData: any) => alert("You saved ")
  }
]
