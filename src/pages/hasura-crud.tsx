import { NextPage } from 'next';
import { FormEvent, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_USER } from '../queries/queries';
import {
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER
} from '../queries/mutations';
import {
  GetUsersQuery,
  CreateUserMutation,
  DeleteUserMutation,
  UpdateUserMutation
} from '../types/generated/graphql';
import { Layout } from '../components/Layout/Layout';

const HasuraCrud: NextPage = () => {
  const [editorUser, setEditorUser] = useState({ id: '', name: '', email: '', password: ''  });
  const router = useRouter();
  const { data, error } = useQuery<GetUsersQuery>(GET_USER, {
    fetchPolicy: 'cache-and-network'
  });
  const [update_user_by_pk] = useMutation<UpdateUserMutation>(UPDATE_USER)
  const [create_user_by_pk] = useMutation<CreateUserMutation>(CREATE_USER, {
    update(cache, { data: { insert_users_one } }) {
      const cacheId = cache.identify(insert_users_one)
      cache.modify({
        fields: {
          users(existingUsers, { toReference }) {
            return [toReference(cacheId), ...existingUsers]
          },
        },
      })
    },
  });

  const [delete_users_by_pk] = useMutation<DeleteUserMutation>(DELETE_USER, {
    update(cache, { data: { delete_users_by_pk } }) {
      cache.modify({
        fields: {
          users(existingUsers, { readField }) {
            return existingUsers.filter(
              (user) => delete_users_by_pk.id !== readField('id', user)
            )
          },
        },
      })
    },
  });
  const handleSubmit = async(e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if(editorUser.id) {
      try {
        await update_user_by_pk({
          variables: {
            id: editorUser.id,
            name: editorUser.name,
            email: editorUser.email,
            password: editorUser.password 
          }
        })
      } catch (err) {
        console.error('error:', err);
        router.push('/');
      }
      setEditorUser({
        id: '',
        name: '',
        email: '',
        password: ''
      })
    } else {
      try {
        await create_user_by_pk({
          variables: {
            name: editorUser.name,
            email: editorUser.email,
            password: editorUser.password
          }
        })
      } catch (err) {
        console.error('error:', err);
        router.push('/');
      }
      setEditorUser({
        id: '',
        name: '',
        email: '',
        password: ''
      });
    }
  }
  return (
    <Layout title='Hasura CRUD'>
      <p className='mb-3 font-bold'>Hasura CRUD</p>
      <form
        className='flex flex-col justify-center items-center'
        onSubmit={handleSubmit}
      >
        <input 
          className='px-3 py-2 border border-gray-300'
          placeholder='New user ?'
          type='text'
          value={editorUser.name}
          onChange={(e: any) => {
            setEditorUser({ ...editorUser, name: editorUser.name })
          }}
        />
        <input 
          className='px-3 py-2 border border-gray-300'
          placeholder='New email ?'
          type='email'
          value={editorUser.email}
          onChange={(e: any) => {
            setEditorUser({ ...editorUser, name: editorUser.email })
          }}
        />
        <input 
          className='px-3 py-2 border border-gray-300'
          placeholder='New password ?'
          type='email'
          value={editorUser.password}
          onChange={(e: any) => {
            setEditorUser({ ...editorUser, name: editorUser.password })
          }}
        />
        <button
          disabled={!editorUser.name && !editorUser.email && !!editorUser.password}
          className='disabled:opacity-40 my-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none'
          data-testid="new"
          type="submit"
        >
          {editorUser.id ? 'Update' : 'Create'}
        </button>
      </form>
    </Layout>
  )
};


export default HasuraCrud;