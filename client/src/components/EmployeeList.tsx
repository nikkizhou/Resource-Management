import React,{useState,useEffect} from 'react'
import MaterialTable from "material-table";
import PositionList from './PositionList';
import { employeeOptions, employeeColumns } from '../utils/tabelConfigData'
import { addRow, updateRow, deleteRow } from '../utils/tableRowActions';
import { findAll } from '../utils/requests';

function EmployeeList() {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    const fetchEmployees = async () => {
      const emps = await findAll('employees')
      setEmployees(emps)
    }
    fetchEmployees()
  }, [])


  return (
    <div className='employeeList'>
    <MaterialTable
      title="Ansatte"
      data={employees}
      options={employeeOptions}
      columns={[
        { title: "ID", field: "id", editable: 'onAdd' },
        { title: "Navn", field: "name"}
      ]}
        
      editable={{
        onRowAdd: newData => addRow('employees', newData, employees, setEmployees),
        onRowDelete: oldData => deleteRow('employees', oldData,  setEmployees),
        onRowUpdate: (newData, oldData) => updateRow('employees', newData, oldData, setEmployees),
      }}
        
      detailPanel={[{
        render: rowData =>  <PositionList employeeData={rowData} showAllPositions={false} />
      }]}
      />
    </div>
  );
}

export default EmployeeList

