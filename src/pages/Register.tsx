import PageLayout from '../layout/PageLayout'
import CenterLayout from '../layout/CenterLayout'
import { Controller, useForm } from 'react-hook-form'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { RegisterTypes } from '../types/auth'
import { registerService } from '../services/auth-service'
import Button from '../components/Button'
import { setColor } from '../utils/utils'
import Alert from '../components/Alert'

const Register = () => {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const defaultValues = {
    email: '',
    name: '',
    password: '',
    password_confirmation: '',
  }

  const registerSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    name: Joi.string().required(),
    password: Joi.string().min(6).required(),
    password_confirmation: Joi.string().required().valid(Joi.ref('password')).label('Password Confirmation').messages({
      'any.only': '{{#label}} does not match',
    }),
  })

  const { mutate, reset, isError, isLoading } = useMutation(registerService, {
    onSuccess: () => {
      reset()
      navigate('/login', { replace: true })
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
    resolver: joiResolver(registerSchema),
  })

  const onSubmit = (data: RegisterTypes) => mutate(data)

  return (
    <PageLayout
      title='Register Page'
      description='Register Page'
    >
      <CenterLayout>
        <div>
          <h1 className='text-center text-2xl font-bold'>Register</h1>
          <p className='text-center mb-4'>Create your account</p>
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
                Name
              </label>
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type='text'
                    placeholder='Your Name'
                    className={`w-full py-2 px-4 rounded-lg bg-white border-2 ${setColor(!!errors.email?.message)}`}
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
                Email
              </label>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type='email'
                    placeholder='Your Email'
                    className={`w-full py-2 px-4 rounded-lg bg-white border-2 ${setColor(!!errors.email?.message)}`}
                  />
                )}
              />
              {!!errors.email?.message && <p className='text-danger mt-1'>{errors.email.message}</p>}
            </div>
            <div className='mb-4'>
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
            <div>
              <label
                htmlFor='name'
                className='w-full block text-neutral-90 mb-2'
              >
                Password Confirmation
              </label>
              <Controller
                name='password_confirmation'
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type='password'
                    minLength={6}
                    placeholder='Your Password Again'
                    className={`w-full py-2 px-4 rounded-lg bg-white border-2 ${setColor(!!errors.password?.message)}`}
                  />
                )}
              />
              {!!errors.password_confirmation?.message && (
                <p className='text-danger mt-1'>{errors.password_confirmation.message}</p>
              )}
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
            <p className='text-neutral-90'>Already have an account?</p>
            <Link
              to='/login'
              className='text-primary-default font-semibold'
            >
              Login
            </Link>
          </div>
        </div>
      </CenterLayout>
    </PageLayout>
  )
}

export default Register
