import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUsers {
    users(order_by: {createdAt: desc}) {
      createdAt
      email
      id
      name
    }
  }
`

// Apollo Serverに保管されているユーザー情報を取得する(状態管理に似たもの)
export const GET_USER_LOVAL = gql`
  query GetUsers {
    users(order_by: {createdAt: desc}) @client {
      createdAt
      email
      id
      name
    }
  }
`

export const GET_USER_IDS = gql`
  query GetUSerIds {
    users(order_by: { createdAt: desc }) {
      id
    }
  }
`


export const GET_USERBY_ID = gql`
  query GetUSerById($id: uuid!) {
    users_by_pk(id: $id) {
      id
      name
      createdAt
    }
  }
`