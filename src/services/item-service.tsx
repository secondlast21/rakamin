import api from './api'
import { CreateItemTypes, UpdateItemTypes, DeleteItemTypes } from '../Types/item'
export const getItemsByIdService = async (todo_id: number): Promise<any> => await api.get(`/todos/${todo_id}/items`)
export const createItemsByIdService = async (data: CreateItemTypes): Promise<any> => {
  const { todo_id, ...body } = data
  return await api.post(`/todos/${todo_id}/items`, body)
}
export const updateItemsByIdService = async (data: UpdateItemTypes): Promise<any> => {
  const { todo_id, item_id, ...body } = data
  return await api.patch(`/todos/${todo_id}/items/${item_id}`, body)
}
export const deleteItemsByIdService = async (data: DeleteItemTypes): Promise<any> => {
  const { todo_id, item_id } = data
  return await api.delete(`/todos/${todo_id}/items/${item_id}`)
}
