import React from 'react'

interface Props {
	todo: string
	setTodo: React.Dispatch<React.SetStateAction<string>>
	handleAdd: (e: React.FormEvent) => void
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
	return (
		<form className='relative flex flex-row w-3/4 gap-8 mt-4 mb-10 lg:mb-24 lg:text-2xl' onSubmit={handleAdd}>
			<input
				className='w-full p-1 lg:p-3 rounded'
				type='input'
				value={todo}
				onChange={e => {
					setTodo(e.target.value)
				}}
				placeholder='Enter a todos'
			/>

			<button className='absolute right-0 scale-90 lg:inset-y-0 py-1 px-3 rounded bg-slate-400 text-white' type='submit'>
				Add
			</button>
		</form>
	)
}

export default InputField
