import React, { FC } from 'react'
import { useState } from 'react'
import Button from './Button'
import { PlusIcon } from '@heroicons/react/20/solid'
import AddTodoModal from './AddTodoModal'
import { removeTokenFromCookies } from '../utils/tokenManager'
import { useNavigate } from 'react-router-dom'

const Navbar: FC = () => {
  const [isShow, setIsShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    setIsLoading(true)
    setTimeout(() => {
      removeTokenFromCookies()
      navigate('/login', { replace: true })
    }, 500) // .5 seconds
  }

  const isOpenModal = () => {
    setIsShow(true)
  }

  const isCloseModal = () => {
    setIsShow(false)
  }

  return (
    <nav className='fixed w-full top-0 z-50 px-5 shadow'>
      <div className='flex justify-between items-center py-4'>
        <Button
          variant='primary'
          className='border-2 border-primary-default hover:border-primary-dark'
          onClick={isOpenModal}
        >
          <div className='flex items-center justify-around'>
            <PlusIcon className='w-6' />
            <p>{`Add todo`}</p>
          </div>
        </Button>
        <Button
          variant='danger'
          className='border-2 border-danger-default hover:border-danger-dark'
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      {isShow && <AddTodoModal onCloseModal={isCloseModal} />}
    </nav>
  )
}

export default Navbar
