import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";

function BooksUpdate(props) {
    const [error, setError] = useState(null);
    const { localView, setLocalView, selectedBook } = props;
    const [updatedBook, setUpdatedBook] = useState(selectedBook);
    const sendUpdateBook = (e) => {
        e.preventDefault();
        var book = {
            id: updatedBook.id,
            title: e.target.formTitle.value,
            author: e.target.formAuthor.value,
            year: parseInt(e.target.formYear.value),
            category_id: parseInt(e.target.formCategory.value),
        };

        fetch(`${process.env.REACT_APP_DOMAIN}/api/book/${updatedBook.id}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(book),
        }).then((res) => {
            if (res.status == 500) {
                console.error("something is wrong");
            } else if (res.status == 200) {
                console.log("completed!");
                setLocalView("books");
            }
        });
    };
    const inputHandler = (e) => {
        setUpdatedBook({ ...updatedBook, [e.target.name]: e.target.value });
        // console.log(updatedBook);
    };

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {}, []);
    let content;
    content = (
        <Col>
            <Form onSubmit={(e) => sendUpdateBook(e)}>
                <p style={{ fontSize: "x-large" }}>Update Book</p>
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        placeholder="Enter book title"
                        value={updatedBook.title}
                        onChange={inputHandler}
                        required
                    />
                    <Form.Text className="text-muted">Enter the book's great title.</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formAuthor">
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        type="text"
                        name="author"
                        placeholder="Enter book author"
                        value={updatedBook.author}
                        onChange={inputHandler}
                        required
                    />
                    <Form.Text className="text-muted">Enter the great author of this book.</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formYear">
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                        type="number"
                        name="year"
                        placeholder="Enter book release year"
                        value={updatedBook.year}
                        onChange={inputHandler}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="number"
                        name="category_id"
                        placeholder="Enter book category"
                        value={updatedBook.category_id}
                        onChange={inputHandler}
                        required
                    />
                </Form.Group>
                <ButtonGroup>
                    <Button type="submit">Save</Button>
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

export default BooksUpdate;
