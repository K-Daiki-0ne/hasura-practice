import { FC } from 'react';
import { toolVar } from '../../utils/cashe';
import { useReactiveVar } from '@apollo/client';
import Link from 'next/link';

export const LocalStateView: FC = (): JSX.Element => {
  const todos = useReactiveVar(toolVar);
  return (
    <>
      {
        todos.map((task, index) => {
          return (
            <p className='mb-3' key={index}>{ task.title }</p>
          )
        })
      }
    <Link href='/local-state-a'>
      <a>back</a>
    </Link>
    </>
  )
}