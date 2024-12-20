'use client'

import { useParams } from 'next/navigation'
import EditTaskForm from '../../../components/EditTaskForm'

export default function EditTaskPage() {
  const params = useParams()
  const id = params?.id as string

  if (!id) {
    return <div>Invalid Task ID</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Task</h1>
      <EditTaskForm id={id} />
    </div>
  )
}