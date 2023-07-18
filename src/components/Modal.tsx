import React, { FC } from 'react'
interface ModalProps {
  onCloseModal: () => void
  children: React.ReactNode
}

const Modal: FC<ModalProps> = ({ onCloseModal, children }) => {
  return (
    <>
      <div
        className='container flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 outline-none z-[100] focus:outline-none'
        onClick={onCloseModal}
      >
        <div
          className='relative w-full max-w-[420px]'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='flex flex-col bg-white w-full border-0 rounded-lg shadow-lg relative outline-none focus:outline-none'>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
