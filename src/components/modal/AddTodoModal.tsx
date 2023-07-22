import React, { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import { useMutation, useQueryClient } from 'react-query'
import { CreateTodoTypes } from '../../types/todo'
import { createTodoService } from '../../services/todo-service'
import Button from '../../components/Button'
import { setColor } from '../../utils/utils'
import Modal from './Modal'
import { XMarkIcon } from '@heroicons/react/20/solid'

interface AddTodoProps {
  onCloseModal: () => void
}

const AddTodoModal: FC<AddTodoProps> = ({ onCloseModal }) => {
  const queryClient = useQueryClient()

  const defaultValues = {
    title: '',
    description: '',
  }

  const addTodoSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
  })

  const { mutate, reset, isLoading } = useMutation(createTodoService, {
    onSuccess: () => {
      reset()
      queryClient.invalidateQueries('todos')
      onCloseModal()
    },
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: joiResolver(addTodoSchema),
  })

  const onSubmit = (data: CreateTodoTypes) => mutate(data)

  return (
    <Modal onCloseModal={onCloseModal}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete='off'
      >
        <div className='flex items-center justify-between p-5'>
          <h3 className='text-lg font-semibold'>Add New Group</h3>
          <Button
            variant='text'
            className='hover:bg-neutral-30'
            onClick={onCloseModal}
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
              Title
            </label>
            <Controller
              name='title'
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type='text'
                  placeholder='Your title'
                  className={`w-full py-2 px-4 rounded-lg bg-white border-2 ${setColor(!!errors.title?.message)}`}
                />
              )}
            />
            {!!errors.title?.message && <p className='text-danger mt-1'>{errors.title.message}</p>}
          </div>
          <div className='mb-4'>
            <label
              htmlFor='name'
              className='w-full block text-neutral-90 mb-2'
            >
              Description
            </label>
            <Controller
              name='description'
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  placeholder='Your description'
                  className={`w-full py-2 px-4 rounded-lg bg-white border-2 ${setColor(!!errors.title?.message)}`}
                />
              )}
            />
            {!!errors.title?.message && <p className='text-danger mt-1'>{errors.title.message}</p>}
          </div>
        </div>
        <div className='flex items-center justify-end p-6 rounded-b gap-3'>
          <Button
            variant='neutral'
            type='button'
            onClick={onCloseModal}
          >
            Cancel
          </Button>
          {!isLoading ? (
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

export default AddTodoModal
