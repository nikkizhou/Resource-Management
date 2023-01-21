import React,{useState} from 'react'
import MaterialTable from "material-table";
import StillingList from './StillingList';
import { ansattColumns, ansattOptions } from '../utils/tabelConfigData'
import { addRow } from '../utils/addRow';

function AnsattList() {
  const ansatteInit = [
    { navn: "John", Id: "1", },
    { navn: "Bren", Id: "2", },
    { navn: "Marry", Id: "3", },
    { navn: "Shohail", Id: "4", },
    { navn: "Aseka", Id: "5", },
    { navn: "Meuko", Id: "6", },
  ];
  
  const [ansatte, setAnsatte] = useState(ansatteInit)

  return (
    <MaterialTable
      title="Ansatte"
      data={ansatte}
      columns={ansattColumns}
      //@ts-ignore
      options={ansattOptions}
      editable={{
        onRowAdd: newData => addRow(newData, ansatte, setAnsatte,false)
      }}
      detailPanel={[{
        render: rowData => {
          return (
            <StillingList ansattInfo={rowData} visAlle={false} />
          )
        }
      }]}
    />
  );
}

export default AnsattList
