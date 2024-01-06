const express = require('express');
const router = express.Router();
const path = require('path');
const Movie = require('../db').Movie;

// Ruta para obtener todas las películas
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.error('Error al obtener películas:', error.message);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Ruta para obtener una película por su ID
router.get('/:id', async (req, res) => {
    const movieId = req.params.id;
  
    try {
      const movie = await Movie.findOne({ id: movieId });
  
      if (!movie) {
        return res.status(404).json({ message: 'Película no encontrada' });
      }
  
      res.json(movie);
    } catch (error) {
      console.error(`Error al obtener la película con ID ${movieId}:`, error.message);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });

// Ruta para buscar una película por título
router.get('/movies/:title', async (req, res) => {
  const movieTitle = req.params.title;

  try {
    // Utiliza la función para buscar por título
    const movie = await Movie.findOne({ title: movieTitle });

    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }

    res.json(movie);
  } catch (error) {
    console.error(`Error al buscar la película por título ${movieTitle}:`, error.message);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Ruta para buscar películas por título
router.get('/search/title', async (req, res) => {
  const searchTerm = req.query.query; // El término de búsqueda proporcionado por el cliente

  try {
      // Realiza la búsqueda en la base de datos
      const movies = await Movie.find({
          title: { $regex: new RegExp(searchTerm, 'i') } // La 'i' hace que la búsqueda sea insensible a mayúsculas y minúsculas
      });

      res.json(movies);
  } catch (error) {
      console.error('Error al buscar películas por la(s) palabra(s):', error.message);
      res.status(500).json({ message: 'Error interno del servidor' });
  }
});


module.exports = router;
