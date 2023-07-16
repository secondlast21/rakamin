import React, { ButtonHTMLAttributes } from 'react'
import { setButtonVariant } from '../utils/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: JSX.Element | string
  iconWidth?: number
  className?: string
  imgClassName?: string
  startIcon?: string
  variant?: 'primary' | 'neutral' | 'danger' | 'text'
}

const Button = (props: ButtonProps) => {
  const { children, className, imgClassName, startIcon, variant = 'primary', iconWidth, ...rest } = props
  const variantClass = setButtonVariant(variant)

  return (
    <button
      {...rest}
      className={`h-fit py-1 px-4 text-center rounded-lg font-bold ${variantClass} ${className}`}
    >
      <div className={startIcon ? 'flex items-center gap-2' : ''}>
        {!!startIcon && (
          <img
            src={startIcon}
            alt='icon'
            className={`inline-block ${imgClassName}`}
            width={iconWidth}
          />
        )}
        {children}
      </div>
    </button>
  )
}

export default Button
