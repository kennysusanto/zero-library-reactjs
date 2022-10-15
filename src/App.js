import React, { useState } from 'react';
import './App.css';
import Books from './Books.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {BsPerson, BsNewspaper, BsCollection} from 'react-icons/bs';

function App() {
  const [view, setView] = useState('books');
  let content;
  if (view === 'books') {
    content = <Books />
  }
  let nav =
    <Container id='nav'>
      <ButtonGroup size='lg' className='mb-2 w-100'>
        <Button variant={view === 'books' ? 'primary' : 'light'} onClick={e => navClick(e.target, 'books')}><BsCollection></BsCollection> Books</Button>
        <Button variant={view === 'news' ? 'primary' : 'light'} onClick={e => navClick(e.target, 'news')}><BsNewspaper></BsNewspaper> News</Button>
        <Button variant={view === 'profile' ? 'primary' : 'light'} onClick={e => navClick(e.target, 'profile')}><BsPerson></BsPerson> Profile</Button>
      </ButtonGroup>
    </Container>
    ;
  const navClick = (me, view) => {
    setTimeout(() => { me.blur(); }, 200);
    setView(view);
  };
  return (
    <Container>
      <div id='background'></div>
      <Row>
        <Col>
          <p>Current view is {view}</p>
        </Col>
      </Row>
      <Row>
        {content}
      </Row>
      {nav}
    </Container>
  );
}

export default App;
