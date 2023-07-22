import React, { ButtonHTMLAttributes } from 'react'
import { setButtonVariant } from '../utils/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: JSX.Element | string | any
  className?: string
  imgClassName?: string
  variant?: 'primary' | 'neutral' | 'danger' | 'text'
}

const Button = (props: ButtonProps) => {
  const { children, className, imgClassName, variant = 'primary', ...rest } = props
  const variantClass = setButtonVariant(variant)

  return (
    <button
      {...rest}
      className={`h-fit py-1 px-4 text-center rounded-lg font-bold ${variantClass} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
