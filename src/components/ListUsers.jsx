import React, { useState, useEffect } from 'react';
import {
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Modal,
    Box,
    Stack
} from '@mui/material';

function ListUsers() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '', username: '' });
    const [successMessage, setSuccessMessage] = useState('');
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users/')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.log(error));
    }, []);

    const handleChange = event => {
        const { name, value } = event.target;
        setNewUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();
        setUsers(prevUsers => [...prevUsers, newUser]);
        setNewUser({ name: '', email: '', username: '' });
        setSuccessMessage('Usuario creado con éxito');
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
        setShowForm(false);
    };

    const handleDelete = id => {
        const isConfirmed = window.confirm('¿Estás seguro de eliminar este usuario?');
        if (isConfirmed) {
            const updatedUsers = users.filter(user => user.id !== id);
            setUsers(updatedUsers);
        }
    };

    const showFormPopup = () => setShowForm(true);
    const hideFormPopup = () => setShowForm(false);

    return (
        <div style={{ margin: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
                <Typography variant="h4" style={{textAlign: 'center'}}>Lista de usuarios</Typography>
                <Button variant="contained" onClick={showFormPopup} style={{ marginLeft: '10px' }}>Agregar Usuario</Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleDelete(user.id)} variant="outlined" color="secondary">Borrar</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal open={showForm} onClose={hideFormPopup} aria-labelledby="form-dialog-title">
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Crear Usuario
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <TextField label="Nombre" id="name" name="name" value={newUser.name} onChange={handleChange} fullWidth required />
                            <TextField label="Email" type="email" id="email" name="email" value={newUser.email} onChange={handleChange} fullWidth required />
                            <TextField label="Username" id="username" name="username" value={newUser.username} onChange={handleChange} fullWidth required />
                            <Button type="submit" variant="contained" color="primary">Crear Usuario</Button>
                            <Button onClick={hideFormPopup} variant="contained" color="default">Cerrar</Button>
                        </Stack>
                    </form>
                    {successMessage && <Typography variant="body1">{successMessage}</Typography>}
                </Box>
            </Modal>
        </div>
    );
}

export default ListUsers;
