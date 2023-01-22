import React,{useState,useEffect} from 'react'
import MaterialTable from "material-table";
import PositionList from './PositionList';
import { employeeOptions, employeeColumns,actions } from '../utils/tabelConfigData'
import { addRow } from '../utils/addRow';
import { findEmployees } from '../utils/requests';

function EmployeeList() {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    const fetchEmployees = async () => {
      const emps = await findEmployees()
      setEmployees(emps)
    }
    fetchEmployees()
  }, [])


  

  return (
    <div className='employeeList'>
    <MaterialTable
      title="Ansatte"
      data={employees}
      columns={[
        { title: "ID", field: "id"},
        { title: "Navn", field: "name"}
      ]}
      //@ts-ignore
      options={employeeOptions}
      actions={actions}
      editable={{
        onRowAdd: newData => addRow(newData, employees, setEmployees,false)
      }}
        
      detailPanel={[{
        render: rowData => {
          return (
            <PositionList employeeData={rowData} showAllPositions={false} />
          )
        }
      }]}
      />
    </div>
  );
}

export default EmployeeList
