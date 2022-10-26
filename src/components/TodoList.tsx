import React from 'react'
import { Todo } from '../model'
import SingleTodo from './SingleTodo'
import { Droppable } from 'react-beautiful-dnd'

interface Props {
	todos: Todo[]
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
	completedTodos: Todo[]
	setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }) => {
	return (
		<div className='flex flex-col lg:flex-row lg:justify-center gap-5 w-full'>
			<Droppable droppableId='todo'>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className={`flex flex-col gap-3 mb-6 p-2 lg:pb-10 items-center rounded-xl lg:w-1/2  ${
							snapshot.isDraggingOver ? 'bg-yellow-500' : 'bg-yellow-300'
						}`}>
						<h2 className='text-black text-xl mb-4'>To Do Now!</h2>
						{todos.map((todo, index) => (
							<SingleTodo index={index} todo={todo} key={todo.id} todos={todos} setTodos={setTodos} />
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
			<Droppable droppableId='todolater'>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className={`flex flex-col gap-3 mb-6 p-2 lg:pb-10 items-center rounded-xl lg:w-1/2 ${
							snapshot.isDraggingOver ? 'bg-green-600' : 'bg-green-400'
						}`}>
						<h2 className='text-black text-xl mb-4'>To Do Later...</h2>
						{completedTodos.map((todo, index) => (
							<SingleTodo todo={todo} index={index} key={todo.id} todos={completedTodos} setTodos={setCompletedTodos} />
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	)
}

export default TodoList
