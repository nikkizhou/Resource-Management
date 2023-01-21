import { Stilling } from "../interfaces";
import DatePickerC from "../components/DatePicker";

// ---------------------- ansatt --------------------
export const ansattColumns = [
  {
    title: "ID",
    field: "Id",
  },
  {
    title: "Navn",
    field: "navn",
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
  {
    title: "Id",
    field: "Id",
    
  },
  {
    title: "Navn",
    field: "navn",
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

export const stillingOptions = {
  search: false,
  paging: false,
  filtering: false,
  addRowPosition: "first",
  rowStyle: {
    backgroundColor: "rgb(253, 250, 246)"
  },
  headerStyle: {
    backgroundColor: 'rgb(253, 250, 246)',
    fontSize: 'large',
    fontWeight: 600,
  }
}

// ---------------------- oppgave --------------------
export const oppgaveColumns = [
  {
    title: "Id",
    field: "Id",
  },
  {
    title: "Navn",
    field: "navn",
  },
  {
    title: "Dato",
    field: "dato",
    type: 'date' as const,
  }
];

export const oppgaveOptions = {
  search: false,
  paging: false,
  filtering: false,
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
