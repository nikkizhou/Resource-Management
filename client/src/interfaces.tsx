export interface Ansatt{
  Id: string
  navn:string
}


export interface Stilling{
  Id: string
  navn: string
  ansattId?: string
  start: Date
  slutt:Date
}


export interface Oppgave{
  Id: string
  navn: string
  ansattId?: string
  dato: Date
}
