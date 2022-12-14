import React, { useState, useRef, useEffect } from 'react'
import { FiEdit } from 'react-icons/fi'
import { MdDone, MdDelete } from 'react-icons/md'
import { Todo } from '../model'
import TodoList from './TodoList'
import { Draggable } from 'react-beautiful-dnd'

interface Props {
	index: number
	todo: Todo
	todos: Todo[]
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo: React.FC<Props> = ({ index, todo, todos, setTodos }) => {
	const [edit, setEdit] = useState<boolean>(false)
	const [editTodo, setEditTodo] = useState<string>(todo.todo)

	const handleDone = (id: number) => {
		setTodos(todos.map(todo => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)))
	}

	const handleDelete = (id: number) => {
		setTodos(todos.filter(todo => todo.id !== id))
	}

	const handleEdit = (e: React.FormEvent, id: number) => {
		e.preventDefault()

		setTodos(todos.map(todo => (todo.id === id ? { ...todo, todo: editTodo } : todo)))
		setEdit(false)
	}

	useEffect(() => {
		inputRef.current?.focus()
	}, [edit])

	const inputRef = useRef<HTMLInputElement>(null)

	return (
		<Draggable draggableId={todo.id.toString()} index={index}>
			{(provided, snapshot) => (
				<form
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					className={`flex flex-row justify-between items-center px-4 py-2 w-full rounded-xl text-white bg-blue-900 hover:scale-105 ${
						snapshot.isDragging ? 'drop-shadow-md' : ''
					}`}
					onSubmit={e => handleEdit(e, todo.id)}>
					{edit ? (
						<input ref={inputRef} className='text-black' value={editTodo} onChange={e => setEditTodo(e.target.value)} />
					) : todo.isDone ? (
						<p className='line-through'>{todo.todo}</p>
					) : (
						<p className=''>{todo.todo}</p>
					)}

					<div className='flex flex-row gap-3 ml-4 text-3xl'>
						<FiEdit
							className='cursor-pointer p-1'
							onClick={() => {
								if (!edit && !todo.isDone) {
									setEdit(!edit)
								}
							}}
						/>
						<MdDelete className='cursor-pointer p-1' onClick={() => handleDelete(todo.id)} />
						<MdDone className='cursor-pointer p-1' onClick={() => handleDone(todo.id)} />
					</div>
				</form>
			)}
		</Draggable>
	)
}

export default SingleTodo
