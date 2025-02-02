import React, { useState, useEffect } from 'react';
import { Typography, Grid, Button, Pagination } from '@mui/material';

function PhotoList() {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage] = useState(12); // Cambiado a 12 fotos por página

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response => response.json())
      .then(data => setPhotos(data))
      .catch(error => console.error('Error fetching photos:', error));
  }, []);

  // Obtener índices de fotos para la paginación
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(photos.length / photosPerPage);

  // Cambiar página
  const handlePageChange = (event, value) => setCurrentPage(value);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Lista de Fotos
      </Typography>
      <Grid container spacing={4}>
        {currentPhotos.map(photo => (
          <Grid key={photo.id} item xs={12} sm={6} md={4}>
            <div style={{ background: '#f0f0f0', borderRadius: '8px', padding: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <img src={photo.thumbnailUrl} alt={photo.title} style={{ maxWidth: '100%', marginBottom: '8px' }} />
                <Typography variant="subtitle1" gutterBottom>
                  {photo.title}
                </Typography>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          size="large"
          color="primary"
        />
      </div>
    </div>
  );
}

export default PhotoList;
