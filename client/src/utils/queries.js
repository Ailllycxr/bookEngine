import { gql } from "@apollo/client";

export const GET_ME = gql`
  query Me () {
    Me{
      _id
      username
      email
      password
      savedBooks {
        _id
        authors
        description
        bookId
        image
        link
        title  
      }
    }
}`;
