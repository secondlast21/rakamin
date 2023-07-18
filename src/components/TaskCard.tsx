import React, { FC } from 'react'

interface TaskCardProps {
  className?: string
  children: React.ReactNode
}

const TaskCard: FC<TaskCardProps> = ({ className, children }) => {
  return <div className={`border border-neutral-200 bg-neutral-40 rounded-md p-4 ${className}`}>{children}</div>
}

export default TaskCard
