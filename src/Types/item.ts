import api from '../services/api'

export interface CreateItemTypes {
  todo_id: number
  name: string
  progress_percentage: number
}

export interface DeleteItemTypes {
  todo_id: number
  item_id: number
}

export interface UpdateItemTypes extends DeleteItemTypes {
  target_todo_id: number
  name: string
  progress_percentage: number
}
