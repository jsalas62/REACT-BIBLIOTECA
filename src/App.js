import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import PrestamosList from './components/PrestamosList';
import PrestamoForm from './components/PrestamoForm';
import PrestamoEditForm from './components/PrestamoEditForm';

const App = () => {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Biblioteca</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/prestamos">Listar Préstamos</Nav.Link>
              <Nav.Link as={Link} to="/agregar-prestamo">Agregar Préstamo</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<h2>Bienvenido a la Biblioteca</h2>} />
          <Route path="/prestamos" element={<PrestamosList />} />
          <Route path="/agregar-prestamo" element={<PrestamoForm />} />
          <Route path="/editar-prestamo/:id" element={<PrestamoEditForm />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
