import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";

function BooksCreate(props) {
  const [error, setError] = useState(null);
  const {localView, setLocalView} = props;
  const sendCreateBook = (e) => {
    e.preventDefault();
    var book = {
      title: e.target.title.value,
      author: e.target.author.value,
      year: parseInt(e.target.year.value),
      category: parseInt(e.target.category.value),
    };

    fetch(`${process.env.REACT_APP_DOMAIN}/books/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });

    setLocalView("books");
  };

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    
  }, []);
  let content;
  content = (
    <Col>
      <Form onSubmit={(e) => sendCreateBook(e)}>
        <p style={{ fontSize: "x-large" }}>Create Book</p>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter book title"
            required
          />
          <Form.Text className="text-muted">
            Enter the book's great title.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            name="author"
            placeholder="Enter book author"
            required
          />
          <Form.Text className="text-muted">
            Enter the great author of this book.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formYear">
          <Form.Label>Year</Form.Label>
          <Form.Control
            type="number"
            name="year"
            placeholder="Enter book release year"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="number"
            name="category"
            placeholder="Enter book category"
            required
          />
        </Form.Group>
        <ButtonGroup>
          <Button type="submit">Create</Button>
          <Button
            variant="light"
            onClick={() => {
              setLocalView("books");
            }}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Form>
    </Col>
  );

  return (
    <Col>
      <Row>{content}</Row>
    </Col>
  );
}

export default BooksCreate;
