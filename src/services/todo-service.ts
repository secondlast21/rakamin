import api from './api'
import { CreateTodoTypes } from '../Types/todo'

export const getTodoService = async (): Promise<any> => await api.get('/todos')
export const createTodoService = async (body: CreateTodoTypes): Promise<any> => await api.post('/todos', body)
