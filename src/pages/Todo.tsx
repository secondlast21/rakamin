import AddTodoModal from '../components/AddTodoModal'
import Navbar from '../components/Navbar'
import PageLayout from '../layout/PageLayout'
import CenterLayout from '../layout/CenterLayout'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import Button from '../components/Button'
import { getTodoService } from '../services/todo-service'
import { DragDropContext, Droppable, DroppableProvided, DroppableStateSnapshot, DropResult } from 'react-beautiful-dnd'
import TodoCard, {TodoTypes} from '../components/TodoCard'
import {createContext} from "react";
import {getItemsByIdService, updateItemsByIdService} from "../services/item-service";

const Todo = () => {
  const colors = ['green', 'yellow', 'red', 'lightGreen']
  let index = 0

  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery<any>('todos', getTodoService)
  const todoData = data ?? []
  const TodoContext = createContext<Array<TodoTypes>>([])

  const getTask = useMutation(getItemsByIdService)
  const updateTask = useMutation(updateItemsByIdService)

  const onDragEnd = (result: DropResult) => {
    const {source, destination} = result
    if (!destination) return

    const todo_id = Number(source.droppableId)
    const id = Number(result.draggableId)
    const target_id = Number(destination.droppableId)

    getTask.mutate(todo_id, {
      onSuccess: (data) => {
        const task = data?.find((task: any) => task.id === id)

        const payload = {
          todo_id: todo_id,
          item_id: id,
          target_todo_id: target_id,
          name: String(task.name),
          progress_percentage: Number(task.progress_percentage)
        }

        updateTask.mutate(payload, {
          onSuccess: () => {
            queryClient.invalidateQueries(['items', todo_id])
            queryClient.invalidateQueries(['items', target_id])
          },
        })
      }
    })
  }

  return (
    <PageLayout
      title='Todo'
      description='Todo Page'
    >
      <Navbar />
      <div className='mt-20 p-5 container'>
        {todoData?.length === 0 && (
            <CenterLayout>
              <p className='text-center'>No todos</p>
            </CenterLayout>
        )}
        {todoData.length > 0 && (
            <TodoContext.Provider value={todoData}>
              <div className='container'>
                <DragDropContext onDragEnd={onDragEnd}>
                  <div className='grid gap-4 grid-flow-col'>
                    {todoData?.map(({ id, title, description }: any, idx: number) => {
                      if (index % 4 === 0) index = 0
                      const color = colors[index]
                      index++
                      return (
                          <Droppable
                              key={id}
                              droppableId={id.toString()}
                          >
                            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                  <TodoCard
                                      todo_id={id}
                                      title={title}
                                      description={description}
                                      color={color}
                                      key={idx}
                                      isDraggingOver={snapshot.isDraggingOver}
                                      placeholder={provided.placeholder}
                                  />
                                </div>
                            )}
                          </Droppable>
                      )
                    })}
                  </div>
                </DragDropContext>
              </div>
            </TodoContext.Provider>
        )}
      </div>
    </PageLayout>
  )
}

export default Todo
