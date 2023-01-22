import React,{useState, useEffect} from 'react'
import { Employee, Position } from '../interfaces'
import MaterialTable from "material-table";
import TaskList from './TaskList';
import { actions, positionColumns, positionOptions } from '../utils/tabelConfigData'
import { hasOverlapp, rightPeriod } from '../utils/validator';
import { addRow } from '../utils/addRow';
import { findPositions, findPosByEmpId } from '../utils/requests';

interface Props{
  employeeData: Employee|null,
  showAllPositions: boolean
}

function PositionList({ employeeData, showAllPositions }: Props) {
  const [positions, setpositions] = useState([])
  
  useEffect(() => {
    const fetchPositions = async () => {
      const emps = showAllPositions
        ? await findPositions()
        : await findPosByEmpId(employeeData!.id)
      setpositions(emps)
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
        columns={[
        { title: "ID", field: "id", cellStyle: { width: "15%"}},
        { title: "Navn", field: "name", cellStyle: { width: "15%" }},
        { title: "AnsattID", field: "employeeID" },
        { title: "Start", field: "start", type: 'date' as const },
        { title: "Slutt", field: "end", type: 'date' as const },
      ]}
        
      actions={actions}

      //@ts-ignore
      options={{
        search: showAllPositions ? true : false,
        paging: showAllPositions ? true : false,
        filtering: showAllPositions ? true : false,
        addRowPosition: "first",
      }}
        
      editable={{
        onRowAdd: (newData:Position) => {
          const otherConditions = !rightPeriod(newData.start, newData.end)
                                  || hasOverlapp(newData.start, newData.end, positions)
          return addRow(newData, positions, setpositions, otherConditions)
        }
      }}
        
      detailPanel={[{
        render: rowData => {
          return (
            <TaskList employeeData={employeeData} positionData={rowData} showAllTasks={false} />
          )
        }
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
