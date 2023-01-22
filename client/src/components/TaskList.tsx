import React,{useState} from 'react'
import MaterialTable from "material-table";
import { taskColumns, taskOptions, actions } from '../utils/tabelConfigData'
import { Employee, Position } from '../interfaces';
import { addRow } from '../utils/addRow';


interface Props {
  employeeData: Employee |null
  positionData: Position |null
  showAllTasks:boolean
}

function TaskList({ employeeData, positionData, showAllTasks }: Props) {
  // fetch oppgaver med ansattId
  const oppgaverInit = [
    { name: "S1", id: "1", date: "2023-01-21" },
    { name: "S2", id: "2", date: "2023-01-24" },
    { name: "S3", id: "3", date: "2023-01-30" },
  ];

  const [tasks, setTasks] = useState(oppgaverInit)

  const title = showAllTasks ? 'Oppgaver' : `Oppgavene til ${employeeData?.name} (AnsattID: ${employeeData?.id}) på stillingen ${positionData?.name} (StillingID: ${positionData?.id}) `
  
  return (
    <div className='taskList'>
      <MaterialTable
        title={title}
        data={tasks}
        columns={[
          { title: "ID", field: "id" },
          { title: "Navn", field: "name" },
          { title: "AnsattID", field: "employeeID" },
          { title: "Dato", field: "date", type: 'date' as const}
        ]}
        actions={actions}
        //@ts-ignore
        options={{
          search: showAllTasks ? true : false,
          paging: showAllTasks ? true : false,
          filtering: showAllTasks ? true : false,
          addRowPosition: "first",
        }}
        editable={{
          onRowAdd: newData => addRow(newData, tasks, setTasks, false)
        }}
      />
    </div>
  )
}

export default TaskList
