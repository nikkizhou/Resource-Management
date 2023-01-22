import React,{useState,useEffect} from 'react'
import MaterialTable from "material-table";
import StillingList from './StillingList';
import { ansattColumns, ansattOptions } from '../utils/tabelConfigData'
import { addRow } from '../utils/addRow';
import { findAnsatte } from '../utils/requests';

function AnsattList() {
  const [ansatte, setAnsatte] = useState([])

  useEffect(() => {
    const fetchAnsatte = async () => {
      const ansatte = await findAnsatte()
      setAnsatte(ansatte)
    }
    fetchAnsatte()
  }, [])
  

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
            <StillingList ansattInfo={rowData} visAlt={false} />
          )
        }
      }]}
    />
  );
}

export default AnsattList
