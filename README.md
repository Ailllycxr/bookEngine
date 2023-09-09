# bookEngine

## Technology Used

| Technology Used |                 Resource URL                 |
| --------------- | :------------------------------------------: |
| Git             | [https://git-scm.com/](https://git-scm.com/) |

## Description

The exercise focusing on changing the RESTFUL way to Graph QL. Deployed link: https://polar-headland-52733-4486b20195f8.herokuapp.com/

## Code Refactor Example

```Javascript (mutation)
import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation addNewBook($input: newBook) {
    saveBook(input: $input) {
      _id
      username
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeSavedBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
    }
  }
`;

```

```Javascript (data model)
import { Container, Card, Button, Row } from "react-bootstrap";
import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";

import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_BOOK } from "../utils/mutations";

const SavedBooks = () => {
  //const [userData, setUserData] = useState({});
  const [removebook] = useMutation(REMOVE_BOOK);
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || [];
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removebook({
        variables: { bookId },
      });

      if (!data.ok) {
        throw new Error("something went wrong!");
      }


      removeBookId(data.bookId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;

```

## Learning Points

1. Set up react queries and mutation
2. Set up components and pages

## Author Info

### Xiaoran Cai

- [LinkedIn](https://www.linkedin.com/in/xrcai/)
- [Github](https://github.com/Aillycxr)

## Credits

- W3school| [https://www.w3schools.com](https://www.w3schools.com)

## License

Copyright (c). All rights reserved.
Licensed under the [MIT](https://choosealicense.com/licenses/mit/) license.
