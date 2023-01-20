import React from 'react'
import { Ansatt } from '../interfaces'

function AnsattDetail({ ansattInfo }: { ansattInfo: Ansatt }) {
  // find stillinger med ansattId
  // find oppgaver med ansattId
  return (
    <div>{ansattInfo.Navn}</div>
  )
}

export default AnsattDetail
