import React, { FC } from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

interface ProgressBarProps {
  id: number
  name: string
  todo_id: number
  progress_percentage: number
}

const ProgressBar: FC<ProgressBarProps> = ({ id, name, todo_id, progress_percentage }) => {
  let progress = 0
  if (progress_percentage < 0) {
    progress = 0
  } else if (progress_percentage >= 0 && progress_percentage <= 100) {
    progress = progress_percentage
  } else if (progress_percentage > 100) {
    progress = 100
  }

  const progressColor = progress === 100 ? 'bg-success-default' : 'bg-primary-default'

  return (
    <div className='flex items-center gap-2'>
      <div className='w-full rounded-full bg-neutral-40 h-4 dark:bg-neutral-70'>
        <div
          className={`h-4 rounded-full ${progressColor}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {progress < 100 && <p>{`${progress}%`}</p>}
      {progress >= 100 && <CheckCircleIcon className='w-6 fill-success-default' />}
    </div>
  )
}

export default ProgressBar
