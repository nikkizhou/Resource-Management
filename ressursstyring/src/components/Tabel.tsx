import React from 'react'
import MaterialTable from "material-table";
import AnsattDetail from './AnsattDetail';

function Tabel() {
  const data = [
    { Navn: "John", Id: "1", },
    { Navn: "Bren", Id: "2", },
    { Navn: "Marry", Id: "3", },
    { Navn: "Shohail", Id: "4", },
    { Navn: "Aseka", Id: "5", },
    { Navn: "Meuko", Id: "6", },
  ];

  const columns = [
    {
      title: "Id",
      field: "Id",
    },
    {
      title: "Navn",
      field: "Navn",
    }
  ];

  return (
    <MaterialTable
      title="Ansatte"
      data={data}
      columns={columns}
      options={{ search: true, paging: false, filtering: true, exportButton: true }}
      detailPanel={[{
        render: rowData => {
          return (
            <AnsattDetail ansattInfo={rowData} />
          )
        }
      }]}
    />
  );
}

export default Tabel
