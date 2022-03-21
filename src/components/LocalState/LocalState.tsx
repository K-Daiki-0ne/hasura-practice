import { FC, useState, ChangeEvent, FormEvent } from 'react';
import { toolVar } from '../../utils/cashe';
import { useReactiveVar } from '@apollo/client';
import Link from 'next/link';

export const LocalState: FC = (): JSX.Element => {
  const [input, setInput] = useState<string>('');
  const todos = useReactiveVar(toolVar);
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    toolVar([...toolVar(), { title: input }]);
    setInput('');
  }
  return (
    <>
      <p className='mb-3 font-bold'>makeVar</p>
      {
        todos.map((task, index) => {
          return (
            <p className='mb-3 y-1' key={index}>{ task.title }</p>
          )
        })
      }
      <form
        className='flex flex-col justify-center items-center'
        onSubmit={handleSubmit}
      >
        <input
          className='mb-3 px-3 py-2 border border-gray-300'
          placeholder='New task ?'
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInput(e.target.value);
          }}
        />
        <button
          disabled={!input}
          className='disabled:opacity-40 mb-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none'
          type='submit'
        >
          Add new task.
        </button>
      </form>
      <Link href='/local-state-b'>
        <a>View</a>
      </Link>
    </>
  )
}