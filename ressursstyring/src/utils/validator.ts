import { Ansatt, Stilling } from "../interfaces";
import { getDatesBetweenDates } from '../utils/getDatesBetweenDates';

const datoOverlapp = (datoArr: Date[], dato: Date) =>
  datoArr.find(d => d.toDateString() === dato.toDateString());

export const harOverlapp = (start: Date, slutt: Date, stillinger:Stilling[]) => {
  const datoene = stillinger.reduce(
    (alleDatoer: any[], stilling) =>
      alleDatoer.concat(getDatesBetweenDates(stilling.start, stilling.slutt)), []
  )
  const overlapp = datoOverlapp(datoene, start) || datoOverlapp(datoene, slutt)
  if (!overlapp) return false
  alert('Ansatten er ikke ledig på den valget perioden')
  return true
}


export const riktigPeriode = (start: Date, slutt: Date) => {
  if (start <= slutt) return true
  alert('Slutt dato må være etter start dato')
  return false
}


export const harDuplikat = (inputId: string, data:Stilling[]|Ansatt[]) => {
  const duplikat = data.find(d => d.Id === inputId)
  if (!duplikat) return false
  alert(`Id ${inputId} finnes i systemet allerede!`);
  return true
}
