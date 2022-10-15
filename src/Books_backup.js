import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { BsList, BsGrid3X2Gap } from 'react-icons/bs';

function Books() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [view, setView] = useState('list');
    const [viewType, setViewType] = useState('list');
    const viewTypeClick = (me, viewType) => {
        setTimeout(() => { me.blur(); }, 200);
        setViewType(viewType);
      };
    const sendCreateBook = (e) => {
        e.preventDefault();
        var book = {
            title: e.target.title.value,
            author: e.target.author.value,
            year: parseInt(e.target.year.value),
            category: parseInt(e.target.category.value)
        };

        fetch(`${process.env.REACT_APP_DOMAIN}/books/create`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book)
        });

        getBooks();
        setView('list');
    }

    const getBooks = () => {
        let a = `${process.env.REACT_APP_DOMAIN}/books`;
        fetch(a)
            .then(res => res.json())
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
        if (view === 'list') {
            // table
            let list =
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>title</th>
                            <th>author</th>
                            <th>year</th>
                            <th>category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.author}</td>
                                <td>{item.year}</td>
                                <td>{item.category}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                ;
            let tile =
                <Row className='' style={{ marginBottom: 150 }}>
                    {items.map(item => (
                        <Col className='g-4' key={item.id}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="https://images.pexels.com/photos/4590202/pexels-photo-4590202.jpeg?auto=compress&cs=tinysrgb&w=180&h=100&dpr=1" />
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                    </Card.Text>

                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>{item.author}</ListGroup.Item>
                                    <ListGroup.Item>{item.year}</ListGroup.Item>
                                    <ListGroup.Item>{item.category}</ListGroup.Item>
                                </ListGroup>
                                <Card.Body>
                                    <Button variant="primary">Details</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}

                </Row>
                ;
            let innerContent = items.length > 0 ? viewType === 'list' ? list : tile : "There's nothing here yet!";
            content =
                <Col>
                    <Row>
                        <Col>
                            <p style={{fontSize: 'x-large'}}>Books</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={() => { setView('create') }}>Create</Button>
                        </Col>
                        <Col style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <ButtonGroup>
                                <Button variant={viewType === 'list' ? 'primary' : 'light'} onClick={e => viewTypeClick(e.target, 'list')}><BsList></BsList> List</Button>
                                <Button variant={viewType === 'tile' ? 'primary' : 'light'} onClick={e => viewTypeClick(e.target, 'tile')}><BsGrid3X2Gap></BsGrid3X2Gap> Tile</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {innerContent}
                        </Col>
                    </Row>
                </Col>;
        } else if (view === 'create') {
            content =
                <Col>
                    <Form onSubmit={e => sendCreateBook(e)}>
                        <p style={{fontSize: 'x-large'}}>Create Book</p>
                        <Form.Group className='mb-3' controlId='formTitle'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type='text' name='title' placeholder='Enter book title' required />
                            <Form.Text className='text-muted'>
                                Enter the book's great title.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formAuthor'>
                            <Form.Label>Author</Form.Label>
                            <Form.Control type='text' name='author' placeholder='Enter book author' required />
                            <Form.Text className='text-muted'>
                                Enter the great author of this book.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formYear'>
                            <Form.Label>Year</Form.Label>
                            <Form.Control type='number' name='year' placeholder='Enter book release year' required />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formCategory'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control type='number' name='category' placeholder='Enter book category' required />
                        </Form.Group>
                        <ButtonGroup>
                            <Button type='submit'>Create</Button>
                            <Button variant='light' onClick={() => { setView('list') }}>Cancel</Button>
                        </ButtonGroup>
                    </Form>
                </Col>
        }
        return (
            <Col>
                <Row>
                    {content}
                </Row>
            </Col>
        );
    }


}

export default Books; 