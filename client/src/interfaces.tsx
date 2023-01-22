export interface Employee{
  id: string
  name:string
}


export interface Position{
  id: string
  name: string
  employeeID?: string
  start: Date
  end:Date
}


export interface Task{
  id: string
  name: string
  employeeID?: string
  date: Date
}
