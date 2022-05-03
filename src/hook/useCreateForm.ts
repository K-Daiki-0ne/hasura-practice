import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../queries/mutations';
import { CreateUserMutation } from '../types/generated/graphql';

export const useCreateForm = () => {
  const [text, setText]         = useState<string>('')
  const [userName, setUserName] = useState<string>('');
  const [insert_users_one] = useMutation<CreateUserMutation>(CREATE_USER, {
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

  const handleTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }, [])
  const usernameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }, [])
  const printMsg = useCallback(() => {
    console.log('Hello')
  }, [])
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
        await insert_users_one({
          variables: {
            name: userName,
          },
        })
      } catch (err) {
        alert(err.message)
      }
      setUserName('')
    },
    [userName]
  )
  return {
    text,
    handleSubmit,
    userName,
    usernameChange,
    printMsg,
    handleTextChange,
  }

}