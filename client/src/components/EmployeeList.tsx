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
      columns={[
        { title: "ID", field: "id"},
        { title: "Navn", field: "name"}
      ]}
      options={employeeOptions}
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


//onRowDelete: oldData =>
// new Promise<void>((resolve, reject) => {
//   setTimeout(() => {
//     const dataDelete = [...employees];
//     const index = oldData.tableData.id;
//     console.log(index, 'index line 39');

//     dataDelete.splice(index, 1);
//     setEmployees([...dataDelete]);
//     resolve();
//   }, 300);
// })
