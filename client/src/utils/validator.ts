import { Employee, Position } from "../interfaces";
import { getDatesBetweenDates } from '../utils/getDatesBetweenDates';

const dateOverlapp = (dateArr: Date[], date: Date) =>
  dateArr.find(d => d.toDateString() === date.toDateString());

export const hasOverlapp = (start: Date, end: Date, positions:Position[]) => {
  const dates = positions.reduce(
    (allDates: any[], position) =>
      allDates.concat(getDatesBetweenDates(position.start, position.end)), []
  )
  const overlapp = dateOverlapp(dates, start) || dateOverlapp(dates, end)
  if (!overlapp) return false
  alert('Ansatten er ikke ledig på den valget perioden')
  return true
}


export const rightPeriod = (start: Date, end: Date) => {
  if (start <= end) return true
  alert('Slutt dato må være etter start dato')
  return false
}


export const hasDuplicate = (inputId: string, data:Position[]|Employee[]) => {
  const duplicate = data.find(d => d.id === inputId)
  if (!duplicate) return false
  alert(`ID ${inputId} finnes i systemet allerede!`);
  return true
}
