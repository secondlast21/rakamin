import React, { FC } from 'react'
import Button from './Button'
import { XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import Modal from './Modal'

interface DeleteModalProps {
  isLoading: boolean
  onClose: () => void
  onDelete: () => void
}

const DeleteModal: FC<DeleteModalProps> = ({ isLoading, onClose, onDelete }) => {
  return (
    <Modal onCloseModal={onClose}>
      <div className='flex items-center justify-between p-5'>
        <div className='flex items-center gap-2'>
          <ExclamationTriangleIcon className='w-4 fill-danger-dark' />
          <h3 className='text-lg font-semibold'>Delete Task</h3>
        </div>
        <Button
          variant='text'
          className='hover:bg-neutral-30'
          onClick={onClose}
        >
          <XMarkIcon className='w-8' />
        </Button>
      </div>
      <div className='relative py-1 px-6 flex-auto'>
        <p>Continue?</p>
      </div>
      <div className='flex items-center justify-end p-6 rounded-b gap-3'>
        <Button
          variant='neutral'
          type='button'
          onClick={onClose}
        >
          Cancel
        </Button>
        {!isLoading ? (
          <Button
            type='submit'
            variant='danger'
            className='border-2 border-danger-default hover:border-danger-dark'
            onClick={onDelete}
          >
            Yes
          </Button>
        ) : (
          <Button
            type='submit'
            variant='danger'
            className='border-2 border-danger-default hover:border-danger-dark'
          >
            Please wait
          </Button>
        )}
      </div>
    </Modal>
  )
}

export default DeleteModal