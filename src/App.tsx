import InputField from './components/InputField'
import { useState } from 'react'
import { Todo } from './model'
import TodoList from './components/TodoList'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

function App() {
	const [todo, setTodo] = useState<string>('')
	const [todos, setTodos] = useState<Todo[]>([])
	const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault()

		if (todo) {
			setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }])
			setTodo('')
		}
	}

	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result

		if (!destination) return
		if (destination.droppableId === source.droppableId && destination.index === source.index) return

		let add,
		active = todos,
		complete = completedTodos

    if(source.droppableId === 'todo') {
      add = active[source.index]
      active.splice(source.index, 1)
    } else {
      add = complete[source.index]
      complete.splice(source.index, 1)
    }

    if(destination.droppableId === 'todo') {
      active.splice(destination.index, 0, add)
    } else {
      complete.splice(destination.index, 0, add)
    }

    setCompletedTodos(complete)
    setTodos(active)
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className='App flex flex-col items-center p-5 lg:px-36'>
				<h1 className='text-4xl text-white'>ToDo List</h1>
				<InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
				<TodoList
					todos={todos}
					setTodos={setTodos}
					completedTodos={completedTodos}
					setCompletedTodos={setCompletedTodos}
				/>
			</div>
		</DragDropContext>
	)
}

export default App
