import React,{useState,useEffect} from 'react'
import MaterialTable from "material-table";
import { taskColumns, taskOptions } from '../utils/tabelConfigData'
import { Employee, Position } from '../interfaces';
import { addRow, deleteRow, updateRow } from '../utils/tableRowActions';
import { findAll, findTaskByEmpIdAndPosPeriod } from '../utils/requests';


interface Props {
  employeeData: Employee |null
  positionData: Position |null
  showAllTasks:boolean
}

function TaskList({ employeeData, positionData, showAllTasks }: Props) {
  // fetch oppgaver med ansattId
  // const oppgaverInit = [
  //   { name: "S1", id: "1", date: "2023-01-21" },
  //   { name: "S2", id: "2", date: "2023-01-24" },
  //   { name: "S3", id: "3", date: "2023-01-30" },
  // ];

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      const emps = showAllTasks
        ? await findAll('tasks')
        : await findTaskByEmpIdAndPosPeriod((employeeData as Employee).id, new Date("2023-01-21"), new Date("2023-01-29"))
      setTasks(emps)
    }
    fetchTasks();
  }, [])



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
        options={taskOptions(showAllTasks)}

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
