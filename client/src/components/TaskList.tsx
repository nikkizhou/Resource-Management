import React,{useState,useEffect} from 'react'
import MaterialTable from "material-table";
import { taskColumns, taskOptions } from '../utils/tabelConfigData'
import { Employee, Position } from '../interfaces';
import { addRow, deleteRow, updateRow } from '../utils/tableRowActions';
import { findAll, findTaskByEmpIdAndPosPeriod } from '../utils/requests';


interface Props {
  positionData: Position |null
  showAllTasks:boolean
}

function TaskList({ positionData, showAllTasks }: Props) {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      const [empid,startDate, endDate] = [positionData?.employeeID as string, positionData?.start.toString() as string, positionData?.end.toString() as string]
      const tasksRes = showAllTasks
        ? await findAll('tasks')
        : await findTaskByEmpIdAndPosPeriod(empid, startDate, endDate)
      setTasks(tasksRes)
    }

    fetchTasks();
  }, [])

  const title = showAllTasks
    ? 'Oppgaver'
    : `Oppgavene til AnsattID (${positionData?.employeeID}) på stillingen ${positionData?.name} (ID: ${positionData?.id}) `
  
  return (
    <div className='taskList'>
      <MaterialTable
        title={title}
        data={tasks}
        options={taskOptions(showAllTasks)}
        columns={[
          { title: "ID", field: "id", editable: 'onAdd' },
          { title: "Navn", field: "name" },
          { title: "AnsattID", field: "employeeID", editable: 'onAdd' },
          { title: "Dato", field: "date", type: 'date' as const}
        ]}

        editable={{
          onRowAdd: newData => addRow('tasks', newData, tasks, setTasks),
          onRowDelete: oldData => deleteRow('tasks', oldData, setTasks),
          onRowUpdate: (newData, oldData) => updateRow('tasks', newData, oldData, setTasks),
        }}
      />
    </div>
  )
}

export default TaskList
