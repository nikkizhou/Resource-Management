import React,{useState} from 'react'
import MaterialTable from "material-table";
import { oppgaveColumns, oppgaveOptions } from '../utils/tabelConfigData'
import { Ansatt, Stilling } from '../interfaces';
import { addRow } from '../utils/addRow';


interface Props {
  ansattInfo: Ansatt|null
  stillingInfo: Stilling|null
  visAlt:boolean
}

function OppgaveList({ ansattInfo, stillingInfo, visAlt }: Props) {
  // fetch oppgaver med ansattId
  const oppgaverInit = [
    { navn: "S1", Id: "1", dato: "2023-01-21" },
    { navn: "S2", Id: "2", dato: "2023-01-24" },
    { navn: "S3", Id: "3", dato: "2023-01-30" },
  ];

  const [oppgaver, setOppgaver] = useState(oppgaverInit)

  const title = visAlt ? 'Oppgaver' : `Oppgavene til ${ansattInfo?.navn} (ID: ${ansattInfo?.Id}) på stillingen ${stillingInfo?.navn} (ID: ${stillingInfo?.Id}) `
  
  return (
    <div className='oppgaveList'>
      <MaterialTable
        title={title}
        data={oppgaver}
        columns={oppgaveColumns}
        //@ts-ignore
        options={oppgaveOptions(visAlt)}
        editable={{
          onRowAdd: newData => addRow(newData, oppgaver, setOppgaver, false)
        }}
      />
    </div>
  )
}

export default OppgaveList
