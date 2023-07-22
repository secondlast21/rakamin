import React, { FC, useContext, useState } from 'react'
import { ArrowLongRightIcon, ArrowLongLeftIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import Button from './Button'
import { useMutation, useQueryClient } from 'react-query'
import { updateItemsByIdService, deleteItemsByIdService } from '../services/item-service'
import AddTaskModal from './AddTaskModal'
import { TodoContext } from './ProgressBar'
import {getProperty} from "../utils/utils";
import DeleteModal from "./DeleteModal";

interface DropmenuProps {
  todo_id: number
  id: number
  currentIndex: number
  name?: string
  progress_percentage?: number
  onClose: () => void
}

const Dropmenu: FC<DropmenuProps> = ({ todo_id, id, currentIndex, name, progress_percentage, onClose }) => {
  const queryClient = useQueryClient()
  const todoData = useContext(TodoContext)
  const [isShownEditModal, setIsShownEditModal] = useState(false)
  const [isShownDeleteModal, setIsShownDeleteModal] = useState(false)
  const deleteTask = useMutation(deleteItemsByIdService)
  const updateTask = useMutation(updateItemsByIdService)

  const onOpenEdit = () => {
      setIsShownEditModal(true)
  }

  const onCloseEdit = () => {
      setIsShownEditModal(false)
  }

  const onOpenDelete = () => {
      setIsShownDeleteModal(true)
  }

  const onCloseDelete = () => {
      setIsShownDeleteModal(false)
  }

  const onDelete = () => {
      setIsShownDeleteModal(true)
      const payload = {
          todo_id,
          item_id: id
      }
      deleteTask.mutate(payload, {
          onSuccess: () => {
              queryClient.invalidateQueries(['items', todo_id])
              setIsShownDeleteModal(false)
              onClose()
          },
      })
  }

  const onMove = (key: 'prev' | 'next') => {
      const target_id = getProperty(todoData, 'id', currentIndex, key)
      const payload = {
          todo_id,
          item_id: id,
          target_todo_id: target_id,
          name: name || '',
          progress_percentage: progress_percentage || 0,
      }
      updateTask.mutate(payload, {
          onSuccess: () => {
              queryClient.invalidateQueries(['items', todo_id])
              queryClient.invalidateQueries(['items', target_id])
              onClose()
          },
      })
  }

  return (
      <div>
          <div
              className={`${
                  currentIndex === todoData?.length - 1 ? 'right-0' : 'left-0'
              } absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='menu-button'
              tabIndex={-1}
          >
              <div className='py-2' role='none'>
                  {
                      currentIndex !== todoData?.length - 1 && (
                          <Button
                              variant='text'
                              className='font-semibold w-full py-3 hover:text-primary flex items-center gap-2'
                              imgClassName='mr-3'
                              onClick={() => onMove('next')}
                          >
                              <ArrowLongRightIcon className='w-6'/>
                              Move Right
                          </Button>
                      )
                  }
                  {
                      currentIndex !== 0 && (
                          <Button
                              variant='text'
                              className='font-semibold w-full py-3 hover:text-primary flex items-center gap-2'
                              imgClassName='mr-3'
                              onClick={() => onMove('prev')}
                          >
                              <ArrowLongLeftIcon className='w-6' />
                              <p>Move Left</p>
                          </Button>
                      )
                  }
                  <Button
                      variant='text'
                      className='font-semibold w-full py-3 hover:text-primary flex items-center gap-2'
                      imgClassName='mr-3'
                      onClick={onOpenEdit}
                  >
                      <PencilSquareIcon className='w-6' />
                      <p>Edit</p>
                  </Button>
                  <Button
                      variant='text'
                      className='font-semibold w-full py-3 hover:text-danger flex items-center gap-2'
                      imgClassName='mr-3'
                      onClick={onOpenDelete}
                  >
                      <TrashIcon className='w-6' />
                      <p>Delete</p>
                  </Button>
              </div>
          </div>

          {
              isShownEditModal && (
                  <AddTaskModal
                      isEdit={true}
                      todo_id={todo_id}
                      onCloseAddTask={onCloseEdit}
                      id={id}
                      name={name}
                      progress_percentage={progress_percentage}
                      onCloseDropdown={onClose}
                  />
              )
          }

          {
              isShownDeleteModal && (
                  <DeleteModal isLoading={deleteTask.isLoading} onClose={onCloseDelete} onDelete={onDelete} />
              )
          }
      </div>
  )
}

export default Dropmenu
