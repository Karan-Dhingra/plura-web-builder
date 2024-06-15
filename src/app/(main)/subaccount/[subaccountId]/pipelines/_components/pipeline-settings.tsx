import { Pipeline } from '@prisma/client'
import React from 'react'

type Props = {
  pipelineId: string
  subaccountId: string
  pipelines: Pipeline[]
}

const PipelineSettings = ({pipelineId, subaccountId, pipelines}: Props) => {
  return (
    <div>PipelineSettings</div>
  )
}

export default PipelineSettings