import React, { FC } from 'react'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { createItemsByIdService, updateItemsByIdService } from '../services/item-service'
import Joi from 'joi'
import { Controller, useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { CreateEditItemTypes } from '../types/item'
import Modal from './Modal'
import { XMarkIcon } from '@heroicons/react/20/solid'
import Button from './Button'
import { setColor } from '../utils/utils'

interface AddTaskModalProps {
  isEdit?: boolean
  todo_id: number
  id?: number
  name?: string
  progress_percentage?: number
  onCloseAddTask: () => void
  onCloseDropdown?: () => void
}

const deleteChar = (input: string, char: string) => {
  if (isNaN(parseInt(input)) || input.length === 0) {
    return 'NaN'
  }
  if (input.length > 0 && input.includes(char)) {
    return parseInt(input.replace(char, ''))
  }

  return parseInt(input)
}

const AddTaskModal: FC<AddTaskModalProps> = ({
  isEdit = false,
  todo_id,
  id = 0,
  name,
  progress_percentage,
  onCloseAddTask,
  onCloseDropdown,
}) => {
  const [currentName] = useState(name ? name : '')
  const [currentProgress] = useState(progress_percentage ? progress_percentage : 0)

  const queryClient = useQueryClient()
  const createItem = useMutation(createItemsByIdService)
  const updateItem = useMutation(updateItemsByIdService)

  const addTaskSchema = Joi.object({
    name: Joi.string().required(),
    progress_percentage: Joi.string().required(),
  })

  const defaultValues = {
    name: name ? name : '',
    progress_percentage: progress_percentage ? progress_percentage.toString() : '',
  }

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: joiResolver(addTaskSchema),
  })

  const onSubmit = ({ name, progress_percentage }: CreateEditItemTypes) => {
    const progress = deleteChar(progress_percentage, '%')
    if (progress === 'NaN') {
      setError('progress_percentage', {
        type: 'manual',
        message: 'Your progress is not a number',
      })
      return
    }

    if (progress < 0 || progress > 100) {
      setError('progress_percentage', {
        type: 'manual',
        message: 'Your progress is not between 0 and 100',
      })
      return
    }

    if (isEdit) {
      // don't make an api call if there is no input change
      if (currentName === name && currentProgress === progress) {
        onCloseAddTask()
        onCloseDropdown?.()
        return
      }
      const updateItemPayload = {
        todo_id: todo_id,
        item_id: id,
        name: name,
        target_todo_id: todo_id,
        progress_percentage: progress,
      }
      updateItem.mutate(updateItemPayload, {
        onSuccess: () => {
          queryClient.invalidateQueries(['items', todo_id])
          onCloseAddTask()
          onCloseDropdown?.()
        },
      })
    } else {
      const createItemPayload = {
        todo_id: todo_id,
        name: name,
        progress_percentage: progress,
      }
      createItem.mutate(createItemPayload, {
        onSuccess: () => {
          queryClient.invalidateQueries(['items', todo_id])
          onCloseAddTask()
          onCloseDropdown?.()
        },
      })
    }
  }

  return (
    <Modal onCloseModal={onCloseAddTask}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete='off'
      >
        <div className='flex items-center justify-between p-5'>
          <h3 className='text-lg font-semibold'>{isEdit ? 'Edit Task' : 'Create Task'}</h3>
          <Button
            variant='text'
            className='hover:bg-neutral-30'
            onClick={onCloseAddTask}
          >
            <XMarkIcon className='w-8' />
          </Button>
        </div>
        <div className='px-5 py-1 flex-auto relative'>
          <div className='mb-4'>
            <label
              htmlFor='name'
              className='w-full block text-neutral-90 mb-2'
            >
              Name
            </label>
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type='text'
                  placeholder='Your name'
                  className={`w-full py-2 px-4 rounded-lg bg-white border-2 ${setColor(!!errors.name?.message)}`}
                />
              )}
            />
            {!!errors.name?.message && <p className='text-danger mt-1'>{errors.name.message}</p>}
          </div>
          <div className='mb-4'>
            <label
              htmlFor='name'
              className='w-full block text-neutral-90 mb-2'
            >
              Progress
            </label>
            <Controller
              name='progress_percentage'
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type='text'
                  placeholder='Your progress'
                  className={`w-full py-2 px-4 rounded-lg bg-white border-2 ${setColor(
                    !!errors.progress_percentage?.message
                  )}`}
                />
              )}
            />
            {!!errors.progress_percentage?.message && (
              <p className='text-danger mt-1'>{errors.progress_percentage.message}</p>
            )}
          </div>
        </div>
        <div className='flex items-center justify-end p-6 rounded-b gap-3'>
          <Button
            variant='neutral'
            type='button'
            onClick={onCloseAddTask}
          >
            Cancel
          </Button>
          {isEdit ? (
              // Conditionally render the Save button for editing
              !updateItem.isLoading ? (
                  <Button
                      type='submit'
                      variant='primary'
                      className='border-2 border-primary-default hover:border-primary-dark'
                  >
                    Submit
                  </Button>
              ) : (
                  <Button
                      disabled
                      variant='primary'
                      className='border-2 border-primary-default hover:border-primary-dark'
                  >
                    Please wait
                  </Button>
              )
          ) : !createItem.isLoading ? (
              // Render the Save button for adding
              <Button
                  type='submit'
                  variant='primary'
                  className='border-2 border-primary-default hover:border-primary-dark'
              >
                Submit
              </Button>
          ) : (
              <Button
                  disabled
                  variant='primary'
                  className='border-2 border-primary-default hover:border-primary-dark'
              >
                Please wait
              </Button>
          )}
        </div>
      </form>
    </Modal>
  )
}

export default AddTaskModal
