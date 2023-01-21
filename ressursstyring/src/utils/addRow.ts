import { Ansatt, Oppgave, Stilling } from "../interfaces";
import { harDuplikat } from '../utils/validator'


// export const addRow = (newData: Ansatt|Stilling|Oppgave, setState:Function) => {
//   return new Promise<void>((resolve, reject) => {
//     setState((prev: Ansatt[] | Stilling[]) => [...prev, newData])
//     setTimeout(() => resolve(), 300)
//   });
// }


export const addRow = (newData: Oppgave | Ansatt, data: Oppgave[] | Ansatt[], setSatate: Function, otherConditions:boolean) => 
  new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (harDuplikat(newData.Id, data)||otherConditions) {
        reject();
        return;
      }
      resolve();
      setSatate((prev:Oppgave[]|Ansatt[]) => [...prev, newData])
    }, 600);
  })

// const addRowStilling = (newData: Stilling) =>
//   new Promise<void>((resolve, reject) => {
//     setTimeout(() => {
//       if (!riktigPeriode(newData.start, newData.slutt)
//         || harDuplikat(newData.Id, stillinger)
//         || harOverlapp(newData.start, newData.slutt, stillinger)) {
//         reject();
//         return;
//       }
//       resolve();
//       setStillinger((prev) => [...prev, newData])
//     }, 600);
//   })
