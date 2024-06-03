import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import api from '../services/api';

const PrestamoForm = ({ onPrestamoAdded }) => {
    const [libros, setLibros] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [libro, setLibro] = useState('');
    const [usuario, setUsuario] = useState('');
    const [fechaPrestamo, setFechaPrestamo] = useState('');
    const [fechaDevolucion, setFechaDevolucion] = useState('');

    useEffect(() => {
        const fetchLibros = async () => {
            try {
                const response = await api.get('libros/');
                setLibros(response.data);
            } catch (error) {
                console.error('Error fetching libros:', error);
            }
        };

        const fetchUsuarios = async () => {
            try {
                const response = await api.get('usuarios/');
                setUsuarios(response.data);
            } catch (error) {
                console.error('Error fetching usuarios:', error);
            }
        };

        fetchLibros();
        fetchUsuarios();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const nuevoPrestamo = {
            libro: libro,
            usuario: usuario,
            fec_prestamo: fechaPrestamo,
            fec_devolucion: fechaDevolucion,
        };

        console.log('Nuevo Prestamo:', nuevoPrestamo);

        try {
            const response = await api.post('prestamos/', nuevoPrestamo);
            console.log('Prestamo agregado:', response.data);
            onPrestamoAdded(response.data);
            setLibro('');
            setUsuario('');
            setFechaPrestamo('');
            setFechaDevolucion('');
        } catch (error) {
            console.error('Error adding prestamo:', error);
        }
    };

    return (
        <Card>
            <Card.Header>Agregar Préstamo</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formLibro">
                        <Form.Label>Libro</Form.Label>
                        <Form.Control
                            as="select"
                            value={libro}
                            onChange={(e) => setLibro(e.target.value)}
                        >
                            <option value="">Seleccione un libro</option>
                            {libros.map(lib => (
                                <option key={lib.id} value={lib.id}>{lib.titulo}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formUsuario">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control
                            as="select"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                        >
                            <option value="">Seleccione un usuario</option>
                            {usuarios.map(usu => (
                                <option key={usu.id} value={usu.id}>{usu.nombre}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFechaPrestamo">
                        <Form.Label>Fecha de Préstamo</Form.Label>
                        <Form.Control
                            type="date"
                            value={fechaPrestamo}
                            onChange={(e) => setFechaPrestamo(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFechaDevolucion">
                        <Form.Label>Fecha de Devolución</Form.Label>
                        <Form.Control
                            type="date"
                            value={fechaDevolucion}
                            onChange={(e) => setFechaDevolucion(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Agregar
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default PrestamoForm;
