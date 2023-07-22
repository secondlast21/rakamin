import React, { FC } from 'react'
interface ModalProps {
  onCloseModal: () => void
  children: React.ReactNode
}

const Modal: FC<ModalProps> = ({ onCloseModal, children }) => {
  return (
    <>
      <div
        className='fixed inset-0 flex items-center justify-center overflow-x-hidden overflow-y-auto z-[100] outline-none focus:outline-none'
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
