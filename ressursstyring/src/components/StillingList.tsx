import React,{useState, useEffect} from 'react'
import { Ansatt, Stilling } from '../interfaces'
import MaterialTable from "material-table";
import OppgaveList from './OppgaveList';
import { stillingColumns, stillingOptions } from '../utils/tabelConfigData'
import { harOverlapp, riktigPeriode } from '../utils/validator';
import { addRow } from '../utils/addRow';

interface Props{
  ansattInfo: Ansatt,
  visAlle: boolean
}

function StillingList({ ansattInfo, visAlle }: Props) {
  // fetch stillinger med ansattId
  const stillingerInit:Stilling[] = [
    { navn: "S1", Id: "1", start: new Date(2023, 1, 20), slutt: new Date(2023, 1, 23) },
    { navn: "S2", Id: "2", start: new Date(2023, 1, 23), slutt: new Date(2023, 1, 26) },
    { navn: "S3", Id: "3", start: new Date(2023, 1, 29), slutt: new Date(2023, 1, 30)},
  ];

  const [stillinger, setStillinger] = useState(visAlle ? stillingerInit : stillingerInit)

  // only pass ansattId to OppgaveList, not whole ansattIfo
  return (
    <div className='stillingList'>
    <MaterialTable
      title={`Stillingene til ${ansattInfo.navn} (ID: ${ansattInfo.Id})`}
      data={stillinger}
      columns={stillingColumns}
      //@ts-ignore
      options={stillingOptions}
        editable={{
          onRowAdd: newData => {
            const otherConditions = !riktigPeriode(newData.start, newData.slutt) || harOverlapp(newData.start, newData.slutt, stillinger)
            return addRow(newData, stillinger, setStillinger, otherConditions)
          }
        }}
      detailPanel={[{
        render: rowData => {
          return (
            <OppgaveList ansattInfo={ansattInfo} stillingInfo={rowData} />
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
  // fjern anstatter, stillinger
  

  // utfordringer: multiple datePicker, ting er sjult, 
  // learing: priolitere, lage plan
  //spørsmål: når skal det gjøres på frontend og når på backend

export default StillingList
