import InputField from './components/InputField'
import { useState } from 'react'
import { Todo } from './model'
import TodoList from './components/TodoList'

function App() {
	const [todo, setTodo] = useState<string>('')
	const [todos, setTodos] = useState<Todo[]>([])

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault()

		if (todo) {
			setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }])
      setTodo('')
		}
	}

  console.log(todos)

	return (
		<div className='App flex flex-col items-center p-3'>
			<h1 className='text-2xl text-white'>ToDo List</h1>
			<InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
		</div>
	)
}

export default App
