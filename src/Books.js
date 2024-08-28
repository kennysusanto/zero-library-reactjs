import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { BsList, BsGrid3X2Gap } from "react-icons/bs";

function Books(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const { localView, setLocalView, setSelectedBook, viewType, setViewType } = props;
    const viewTypeClick = (me, viewType) => {
        setTimeout(() => {
            me.blur();
        }, 200);
        setViewType(viewType);
    };

    const getBooks = () => {
        let a = `${process.env.REACT_APP_DOMAIN}/api/book`;
        fetch(a)
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    };
    const rowClick = (e, item) => {
        //console.log(item);
        setSelectedBook(item);
        setLocalView("booksUpdate");
    };

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        getBooks();
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        let content;

        // table
        let list = (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Year</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id} onClick={(e) => rowClick(e, item)}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.author}</td>
                            <td>{item.year}</td>
                            <td>{item.category_id}</td>
                            <td>
                                <Button
                                    onClick={() => {
                                        setLocalView("booksUpdate");
                                    }}
                                >
                                    Details
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
        let tile = (
            <Row className="" style={{ marginBottom: 150 }}>
                {items.map((item) => (
                    <Col className="g-4" key={item.id}>
                        <Card style={{ width: "18rem" }}>
                            <Card.Img
                                variant="top"
                                src="https://images.pexels.com/photos/4590202/pexels-photo-4590202.jpeg?auto=compress&cs=tinysrgb&w=180&h=100&dpr=1"
                            />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>{item.author}</ListGroup.Item>
                                <ListGroup.Item>{item.year}</ListGroup.Item>
                                <ListGroup.Item>{item.category_id}</ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        setSelectedBook(item);
                                        setLocalView("booksUpdate");
                                    }}
                                >
                                    Details
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        );
        let innerContent = items.length > 0 ? (viewType === "list" ? list : tile) : "There's nothing here yet!";
        content = (
            <Col>
                <Row>
                    <Col>
                        <p style={{ fontSize: "x-large" }}>Books</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            onClick={() => {
                                setLocalView("booksCreate");
                            }}
                        >
                            Create
                        </Button>
                    </Col>
                    <Col style={{ display: "flex", justifyContent: "flex-end" }}>
                        <ButtonGroup>
                            <Button variant={viewType === "list" ? "primary" : "light"} onClick={(e) => viewTypeClick(e.target, "list")}>
                                <BsList></BsList> List
                            </Button>
                            <Button variant={viewType === "tile" ? "primary" : "light"} onClick={(e) => viewTypeClick(e.target, "tile")}>
                                <BsGrid3X2Gap></BsGrid3X2Gap> Tile
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>{innerContent}</Col>
                </Row>
            </Col>
        );

        return (
            <Col>
                <Row>{content}</Row>
            </Col>
        );
    }
}

export default Books;
