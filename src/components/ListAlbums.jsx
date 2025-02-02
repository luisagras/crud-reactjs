import React, { useState, useEffect } from 'react';
import { Typography, Grid, TextField } from '@mui/material';

function Albums() {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/albums')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Error al cargar los datos');
            })
            .then(data => {
                setAlbums(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const filteredAlbums = albums.filter(album =>
        album.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    if (loading) {
        return <Typography variant="body1" align="center" marginTop="8px">Cargando...</Typography>;
    }

    if (error) {
        return <Typography variant="body1" align="center" marginTop="8px">Error: {error.message}</Typography>;
    }

    return (
        <div style={{ margin: 'auto', padding: '16px', maxWidth: '1200px' }}>
            <Typography variant="h3" gutterBottom>Albums</Typography>
            <TextField
                variant="outlined"
                label="Buscar álbumes..."
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={handleSearch}
            />
            <Grid container spacing={4}>
                {filteredAlbums.map(album => (
                    <Grid key={album.id} item xs={12} sm={6} md={3}>
                        <div style={{ background: '#f0f0f0', padding: '16px', borderRadius: '4px' }}>
                            <Typography variant="h5">{album.title}</Typography>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Albums;
