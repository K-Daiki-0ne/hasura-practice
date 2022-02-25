import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $password: String!, $email: String!) {
    insert_users_one(object: {name: $name, password: $password, email: $email}) {
      createdAt
      email
      id
      name
    }
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser($id: uuid!) {
    delete_users_by_pk(id: $id) {
      createdAt
      id
      name
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($id: uuid! $name: String, $email: String, $password: String) {
    update_users_by_pk(pk_columns: {id: $id}, _set: {name: $name, email: $email, password: $password}) {
      createdAt
      name
      password
    }
  }
`