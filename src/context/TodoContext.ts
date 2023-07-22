import { createContext } from 'react'
import { TodoTypes } from '../components/card/TodoCard'

export const TodoContext = createContext<Array<TodoTypes>>([])
