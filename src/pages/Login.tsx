import React, { FC } from 'react'
import PageLayout from '../layout/PageLayout'
import CenterLayout from '../layout/CenterLayout'
import { Controller, useForm } from 'react-hook-form'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { loginService } from '../services/auth-service'
import { LoginTypes } from '../types/auth'
import { setTokenToCookies } from '../utils/tokenManager'
import Button from '../components/Button'
import { setColor } from '../utils/utils'
import Alert from '../components/Alert'

const Login: FC = () => {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const loginSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(6).required(),
  })

  const defaultValues = {
    email: '',
    password: '',
  }

  const { mutate, reset, isError, isLoading } = useMutation(loginService, {
    onSuccess: (data) => {
      const token = data?.auth_token
      if (token) {
        setTokenToCookies(token)
        reset()
        navigate('/todo', { replace: true })
      }
    },
    onError: (error: any) => {
      setError(error?.message)
    },
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: joiResolver(loginSchema),
  })

  const onSubmit = (data: LoginTypes) => mutate(data)

  return (
    <PageLayout
      title='Login'
      description='Login Page'
    >
      <CenterLayout>
        <div>
          <h1 className='text-center text-2xl font-bold'>Welcome!</h1>
          <p className='text-center mb-4'>Login to your account</p>
        </div>
        <div>
          {isError && (
            <Alert
              message={error}
              variant='danger'
              className='mb-4'
            />
          )}
          <form
            autoComplete='off'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='mb-4'>
              <label
                htmlFor='name'
                className='w-full block text-neutral-90 mb-2'
              >
                Email
              </label>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder='Your Email'
                    className={`w-full py-2 px-4 rounded-lg bg-white border-2 ${setColor(!!errors.email?.message)}`}
                  />
                )}
              />
              {!!errors.email?.message && <p className='text-danger mt-1'>{errors.email.message}</p>}
            </div>
            <div>
              <label
                htmlFor='name'
                className='w-full block text-neutral-90 mb-2'
              >
                Password
              </label>
              <Controller
                name='password'
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type='password'
                    minLength={6}
                    placeholder='Your Password'
                    className={`w-full py-2 px-4 rounded-lg bg-white border-2 ${setColor(!!errors.password?.message)}`}
                  />
                )}
              />
              {!!errors.password?.message && <p className='text-danger mt-1'>{errors.password.message}</p>}
            </div>
            {!isLoading ? (
              <Button
                type='submit'
                variant='primary'
                className='w-full mt-8'
              >
                Login
              </Button>
            ) : (
              <Button
                disabled
                variant='primary'
                className='w-full mt-8'
              >
                Please wait
              </Button>
            )}
          </form>
          <div className='flex justify-center gap-1 mt-2'>
            <p className='text-neutral-90'>Don't have an account?</p>
            <Link
              to='/register'
              className='text-primary-default font-semibold'
            >
              Register
            </Link>
          </div>
        </div>
      </CenterLayout>
    </PageLayout>
  )
}

export default Login
