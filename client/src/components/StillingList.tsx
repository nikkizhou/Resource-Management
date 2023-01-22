import React,{useState, useEffect} from 'react'
import { Ansatt, Stilling } from '../interfaces'
import MaterialTable from "material-table";
import OppgaveList from './OppgaveList';
import { stillingColumns, stillingOptions } from '../utils/tabelConfigData'
import { harOverlapp, riktigPeriode } from '../utils/validator';
import { addRow } from '../utils/addRow';

interface Props{
  ansattInfo: Ansatt|null,
  visAlt: boolean
}

function StillingList({ ansattInfo, visAlt }: Props) {
  // fetch stillinger med ansattId
  const stillingerInit:Stilling[] = [
    { ansattId:'1',navn: "S1", Id: "1", start: new Date(2023, 1, 20), slutt: new Date(2023, 1, 23) },
    { ansattId: '1', navn: "S2", Id: "2", start: new Date(2023, 1, 23), slutt: new Date(2023, 1, 26) },
    { ansattId: '1', navn: "S3", Id: "3", start: new Date(2023, 1, 29), slutt: new Date(2023, 1, 30)},
  ];

  const [stillinger, setStillinger] = useState(visAlt ? stillingerInit : stillingerInit)
  const title = visAlt ? 'Stillinger' : `Stillingene til ${ansattInfo?.navn} (ID: ${ansattInfo?.Id})`

  // only pass ansattId to OppgaveList, not whole ansattIfo
  return (
    <div className='stillingList'>
    <MaterialTable
      title={title}
      data={stillinger}
      columns={stillingColumns}
      //@ts-ignore
      options={stillingOptions(visAlt)}
      editable={{
        onRowAdd: newData => {
          const otherConditions = !riktigPeriode(newData.start, newData.slutt) || harOverlapp(newData.start, newData.slutt, stillinger)
          return addRow(newData, stillinger, setStillinger, otherConditions)
        }
      }}
      detailPanel={[{
        render: rowData => {
          return (
            <OppgaveList ansattInfo={ansattInfo} stillingInfo={rowData} visAlt={false} />
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

  // utfordringer: multiple datePicker, ting er sjult, siden lader veldig treg
  // learing: priolitere, lage plan
  // spørsmål: når skal det gjøres på frontend og når på backend, validator should be frontend or backend?

export default StillingList
