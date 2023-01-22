import { Stilling } from "../interfaces";
import DatePickerC from "../components/DatePicker";

// ---------------------- ansatt --------------------
export const ansattColumns = [
  {
    title: "ID",
    field: "id",
  },
  {
    title: "Navn",
    field: "name",
  }
];

export const ansattOptions = {
  search: true,
  paging: false,
  filtering: true,
  exportButton: true,
  addRowPosition: "first",
  rowStyle: {
    backgroundColor: "rgb(250, 250, 250)"
  },
  headerStyle: {
    backgroundColor: "rgb(250, 250, 250)",
    fontSize: 'large',
    fontWeight: 600,
  }
}



// ---------------------- stilling --------------------
export const stillingColumns = 
 [
    ...ansattColumns,
  {
    title: "AnsattID",
    field: "ansattId",
  },
  {
    title: "Start",
    field: "start",
    type: 'date' as const,
  },
  {
    title: "Slutt",
    field: "slutt",
    type: 'date' as const,
    dateSetting: { locale: "en-GB" }
  },
];

export const stillingOptions = (visAlt: boolean) => {
  return {
  search: visAlt ? true : false,
  paging: visAlt ? true : false,
  filtering: visAlt ? true : false,
  addRowPosition: "first",
  rowStyle: {
    backgroundColor: "rgb(253, 250, 246)"
  },
  headerStyle: {
    backgroundColor: 'rgb(253, 250, 246)',
    fontSize: 'large',
    fontWeight: 600,
  }
}}

// ---------------------- oppgave --------------------
export const oppgaveColumns = [
  ...ansattColumns,
  {
    title: "AnsattID",
    field: "ansattId",
  },
  {
    title: "Dato",
    field: "dato",
    type: 'date' as const,
  }
];

export const oppgaveOptions = (visAlt: boolean) => {
  return{
    search: visAlt ? true : false,
    paging: visAlt ? true : false,
    filtering: visAlt ? true : false,
    addRowPosition: "first",
    rowStyle: {
      backgroundColor: "rgb(246, 235, 233)"
    },
    headerStyle: {
      backgroundColor: 'rgb(246, 235, 233)',
      fontSize: 'large',
      fontWeight: 600,
    }
  }
}
