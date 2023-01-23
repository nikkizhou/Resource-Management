import React,{useState, useEffect} from 'react'
import { Employee, Position } from '../interfaces'
import MaterialTable from "material-table";
import TaskList from './TaskList';
import { positionColumns, positionOptions } from '../utils/tabelConfigData'
import { hasOverlapp, rightPeriod } from '../utils/validator';
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
  
  const title = showAllPositions ? 'positions' : `Stillingene til ${employeeData?.name} (AnsattID: ${employeeData?.id})`
  // only pass ansattId to OppgaveList, not whole ansattIfo
  return (
    <div className='positionList'>
    <MaterialTable
      title={title}
      data={positions}
      options={positionOptions(showAllPositions)}
      columns={[
        { title: "ID", field: "id", cellStyle: { width: "15%"}},
        { title: "Navn", field: "name", cellStyle: { width: "15%" }},
        { title: "AnsattID", field: "employeeID" },
        { title: "Start", field: "start", type: 'date' as const },
        { title: "Slutt", field: "end", type: 'date' as const },
      ]}
      

      editable={{
        onRowAdd: newData => addRow('positions', newData, positions, setPositions),
        onRowDelete: oldData => deleteRow('positions', oldData, setPositions),
        onRowUpdate: (newData, oldData) => updateRow('positions', newData, oldData, setPositions),
      }}
        
      detailPanel={[{
        render: rowData => <TaskList employeeData={employeeData} positionData={rowData} showAllTasks={false} />
      }]}
      />
    </div>
  )
}

// funksjoner i fremtid:
  // responsive
  // table style, mer brukervennlig
  // nedtonet stillingene som har sluttet
  // fjern anstatter, positions

  // utfordringer: multiple datePicker, ting er sjult, siden lader veldig treg
  // learing: priolitere, lage plan
  // spørsmål: når skal det gjøres på frontend og når på backend, validator should be frontend or backend?

export default PositionList
