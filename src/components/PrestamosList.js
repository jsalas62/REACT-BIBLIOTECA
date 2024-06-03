import React, { useEffect, useState } from 'react';
import { ListGroup, Card, Button } from 'react-bootstrap';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const PrestamosList = () => {
    const [prestamos, setPrestamos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('prestamos/');
                setPrestamos(response.data);
            } catch (error) {
                console.error('Error fetching prestamos:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await api.delete(`prestamos/${id}/`);
            setPrestamos(prestamos.filter(prestamo => prestamo.id !== id));
        } catch (error) {
            console.error('Error deleting prestamo:', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/editar-prestamo/${id}`);
    };

    return (
        <Card>
            <Card.Header>Lista de Préstamos</Card.Header>
            <ListGroup variant="flush">
                {prestamos.map(prestamo => (
                    <ListGroup.Item key={prestamo.id}>
                        <strong>Libro:</strong> {prestamo.libro.titulo} - <strong>Usuario:</strong> {prestamo.usuario.nombre} <br />
                        <strong>Préstamo:</strong> {new Date(prestamo.fec_prestamo).toLocaleString()} - <strong>Devolución:</strong> {new Date(prestamo.fec_devolucion).toLocaleString()}
                        <Button variant="danger" onClick={() => handleDelete(prestamo.id)} className="ms-2">Eliminar</Button>
                        <Button variant="warning" onClick={() => handleEdit(prestamo.id)} className="ms-2">Editar</Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Card>
    );
};

export default PrestamosList;
