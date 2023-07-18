import React, { FC, useState, createContext, useContext } from 'react'
import TaskCard from './TaskCard'
import ProgressBar from './ProgressBar'
import { setColorTodo } from '../utils/utils'
import Button from './Button'
import { useQuery } from 'react-query'
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import { getItemsByIdService } from '../services/item-service'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

export interface TodoTypes {
  id: number
  title: string
  created_by: string
  created_at: string
  updated_at: string
}

interface TodoCardProps {
  todo_id: number
  title: string
  color?: string
  description: string
  isDraggingOver: boolean
  placeholder: React.ReactNode
}

const TodoCard: FC<TodoCardProps> = ({ todo_id, title, color, description, isDraggingOver, placeholder }) => {
  const [currentId, setCurrentId] = useState(todo_id)
  const { data } = useQuery(['items', todo_id], () => getItemsByIdService(todo_id))

  const { background, header } = setColorTodo(color)

  return (
    <div className={`h-fit p-4 border rounded-md w-[320px] ${background}`}>
      <div>
        <h1 className={`border rounded-md py-1 px-3 w-fit text-sm ${header}`}>{title}</h1>
        <p className='text-neutral-90 mt-2 font-semibold text-sm'>{description}</p>
      </div>
      <div className='mt-4'>
        {data?.length === 0 && (
          <div>
            <TaskCard className={isDraggingOver ? 'hidden' : 'block'}>
              <h1 className='text-neutral-70'>No Task</h1>
            </TaskCard>
            {placeholder}
          </div>
        )}
        {data?.length > 0 && (
          <div className='flex flex-col gap-3'>
            {data?.map(({ id, name, progress_percentage }: any, idx: number) => (
              <Draggable
                key={id}
                draggableId={id.toString()}
                index={idx}
              >
                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{ ...provided.draggableProps.style, opacity: snapshot.isDragging ? '0.5' : '1' }}
                  >
                    <TaskCard>
                      <h1 className='font-bold text-neutral-90 mb-2'>{name}</h1>
                      <div className='border-b border-neutral-70 border-solid mb-4' />
                      <ProgressBar
                        todo_id={currentId}
                        id={id}
                        name={name}
                        progress_percentage={progress_percentage}
                      />
                    </TaskCard>
                  </div>
                )}
              </Draggable>
            ))}
            {placeholder}
          </div>
        )}
      </div>
      <Button
        variant='text'
        className='font-normal text-sm pl-0 mt-2'
      >
        <div className='flex items-center justify-between gap-1'>
          <PlusCircleIcon className='w-5' /> <p>New task</p>
        </div>
      </Button>
    </div>
  )
}

export default TodoCard
