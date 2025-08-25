'use client'

import React, { useState } from 'react'

interface Todo {
  task: string
  completed: boolean
}

const Page = () => {
  const [input, setInput] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const addTodo = () => {
    if (!input.trim()) return 
    const newTodo: Todo = { task: input, completed: false }
    setTodos([...todos, newTodo])
    setInput("") 
  }

  const toggleComplete = (index: number) => {
    const updatedTodos = [...todos]
    updatedTodos[index].completed = !updatedTodos[index].completed
    setTodos(updatedTodos)
  }

  return (
    <div className='shadow-2xl p-5 py-10 w-[600px]'>
      <div>
        <h1 className='text-5xl font-medium text-center'>TODO APP</h1>

        <div className='pt-10'>
          <label htmlFor="task">Task Name</label> <br />
          <input
            id="task"
            type="text"
            value={input}
            onChange={handleChange}
            className='bg-gray-300 p-2 w-full outline-none'
          /> <br />

          <button
            onClick={addTodo}
            className='bg-gray-700 rounded-md text-white mt-5 p-2 w-full hover:bg-gray-400'
          >
            Add Todo
          </button>
        </div>
      </div>

      {/* Todo List */}
      <div>
        <h1 className='text-2xl text-center font-medium p-10'>Todo List</h1>
        <div>
          {todos.length === 0 ? (
            <p className='text-center text-sm'>No tasks added yet.</p>
          ) : (
            <ul>
           {todos.map((item, index) => (
            <div key={index} className='flex justify-between gap-10 items-center border-b-2 border-gray-300 p-5'>
              <div className='flex gap-3'>
                <input 
                  type="checkbox" 
                  checked={item.completed}
                  onChange={() => toggleComplete(index)} 
                  className='w-5'
                />
                <p className={item.completed ? 'line-through text-xl font-medium' : 'text-xl font-medium'}>
                  {item.task}
                </p>
              </div>
              <p onClick={() => setTodos(todos.filter((_, i) => i !== index))} className='text-red-500 cursor-pointer'>Delete</p>
            </div>
          ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
