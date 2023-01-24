import React,{useState, useEffect} from 'react'
import { Employee, Position } from '../interfaces'
import MaterialTable from "material-table";
import TaskList from './TaskList';
import { positionColumns, positionOptions } from '../utils/tabelConfigData'
import { addRow, deleteRow, updateRow } from '../utils/tableRowActions';
import { findAll, findPosByEmpId } from '../utils/requests';

interface Props{
  employeeData: Employee|null,
  showAllPositions: boolean
}

function PositionList({ employeeData, showAllPositions }: Props) {
  const [positions, setPositions] = useState([])
  
  useEffect(() => {
    const fetchPositions = async () => {
      const emps = showAllPositions
        ? await findAll('positions')
        : await findPosByEmpId(employeeData!.id)
      setPositions(emps)
    }
    fetchPositions();
  }, [])
  
  const title = showAllPositions
    ? 'positions'
    : `Stillingene til ${employeeData?.name} (AnsattID: ${employeeData?.id})`
  
  return (
    <div className='positionList'>
    <MaterialTable
      title={title}
      data={positions}
      options={positionOptions(showAllPositions)}
      columns={[
        { title: "ID", field: "id", cellStyle: { width: "15%" }, editable: 'onAdd' },
        { title: "Navn", field: "name", cellStyle: { width: "15%" }},
        { title: "AnsattID", field: "employeeID", editable: 'onAdd' },
        { title: "Start", field: "start", type: 'date' as const },
        { title: "Slutt", field: "end", type: 'date' as const },
      ]}
      
      editable={{
        onRowAdd: newData => addRow('positions', newData, positions, setPositions),
        onRowDelete: oldData => deleteRow('positions', oldData, setPositions),
        onRowUpdate: (newData, oldData) => updateRow('positions', newData, oldData, setPositions),
      }}
        
      detailPanel={[{
        render: rowData => <TaskList positionData={rowData} showAllTasks={false} />
      }]}
      />
    </div>
  )
}

export default PositionList
