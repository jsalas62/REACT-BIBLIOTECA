import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const PrestamoEditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [prestamo, setPrestamo] = useState(null);
    const [libros, setLibros] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchPrestamo = async () => {
            try {
                const response = await api.get(`prestamos/${id}/`);
                setPrestamo(response.data);
            } catch (error) {
                console.error('Error fetching prestamo:', error);
            }
        };

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

        fetchPrestamo();
        fetchLibros();
        fetchUsuarios();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await api.put(`prestamos/${id}/`, prestamo);
            navigate('/prestamos');
        } catch (error) {
            console.error('Error updating prestamo:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPrestamo({ ...prestamo, [name]: value });
    };

    if (!prestamo) return <div>Cargando...</div>;

    return (
        <Card>
            <Card.Header>Editar Préstamo</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formLibro">
                        <Form.Label>Libro</Form.Label>
                        <Form.Control
                            as="select"
                            name="libro"
                            value={prestamo.libro}
                            onChange={handleChange}
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
                            name="usuario"
                            value={prestamo.usuario}
                            onChange={handleChange}
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
                            name="fec_prestamo"
                            value={prestamo.fec_prestamo}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFechaDevolucion">
                        <Form.Label>Fecha de Devolución</Form.Label>
                        <Form.Control
                            type="date"
                            name="fec_devolucion"
                            value={prestamo.fec_devolucion}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Guardar
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default PrestamoEditForm;
