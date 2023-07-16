import { LoginTypes, RegisterTypes } from '../Types/auth'
import Api from './api'
import api from './api'

export const loginService = async (body: LoginTypes): Promise<any> => await api.post('/auth/login', body)
export const registerService = async (body: RegisterTypes): Promise<any> => await api.post('/signup', body)
