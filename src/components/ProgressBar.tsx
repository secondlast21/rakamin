import React, { createContext, FC, useContext, useState } from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { TodoTypes } from './TodoCard'
import Button from './Button'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import Dropmenu from "./Dropmenu";
import WrapperLayout from "../layout/WrapperLayout";

interface ProgressBarProps {
  id: number
  name: string
  todo_id: number
  progress_percentage: number
}

export const TodoContext = createContext<Array<TodoTypes>>([])

const ProgressBar: FC<ProgressBarProps> = ({ id, name, todo_id, progress_percentage }) => {
  let progress = 0
  if (progress_percentage < 0) {
    progress = 0
  } else if (progress_percentage >= 0 && progress_percentage <= 100) {
    progress = progress_percentage
  } else if (progress_percentage > 100) {
    progress = 100
  }

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isShown, setIsShown] = useState(false)
  const todoData = useContext(TodoContext)

  const onShown = () => {
    setIsShown(true)
    const index = todoData?.findIndex((todo: any) => todo.id === todo_id)
    setCurrentIndex(index ? index : 0)
  }
  const onClose = () => {
    setIsShown(false)
  }

  const progressColor = progress === 100 ? 'bg-success-default' : 'bg-primary-default'

  return (
    <div className='flex items-center gap-2'>
      <div className='w-full rounded-full bg-neutral-40 h-4 dark:bg-neutral-70'>
        <div
          className={`h-4 rounded-full ${progressColor}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      {progress < 100 && <p>{`${progress}%`}</p>}
      {progress >= 100 && <CheckCircleIcon className='w-6 fill-success-default' />}
      <div className='relative'>
        <Button
          variant='text'
          className='hover:bg-neutral-70 px-1'
          onClick={onShown}
        >
          <EllipsisHorizontalIcon className='w-6' />
        </Button>
        {
          isShown && (
              <WrapperLayout callback={onClose}>
                <Dropmenu
                    currentIndex={currentIndex}
                    todo_id={todo_id}
                    id={id}
                    name={name}
                    progress_percentage={progress}
                    onClose={onClose}
                />
              </WrapperLayout>
            )
        }
      </div>
    </div>
  )
}

export default ProgressBar
