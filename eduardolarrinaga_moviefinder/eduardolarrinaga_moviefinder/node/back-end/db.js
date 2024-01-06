const axios = require('axios');
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/movieFinder'
const api_key = '8de82647ceaeb36a2371602fbf05f920'

// Definir el esquema para las películas
const movieSchema = new mongoose.Schema({
  id: Number,
  title: String,
  overview: String,
  release_date: String,
  backdrop_path: String,
  poster_path: String,
  youtube_key: String,
  popularity: Number,
  vote_average: Number,
  release_date: String,
  genres: [String], // Almacenar solo los nombres de los géneros
});

// Crear modelo para la colección de películas
const Movie = mongoose.model('Movie', movieSchema);

  async function storeMovie(movieData) {
    try {
      const existingMovie = await Movie.findOne({ id: movieData.id });
  
      if (existingMovie) {
        //console.log(`La película con ID ${movieData.id} ya existe en la base de datos. Saltando...`);
        return;
      }

      // Obtener detalles adicionales de la película desde TMDB
      const detailsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieData.id}`, {
        params: {
          api_key: api_key,
          language: 'es'
        }
      });

      // Extraer solo los nombres de los géneros
      const genresNames = detailsResponse.data.genres.map(genre => genre.name);
  
      const movie = new Movie({
        id: movieData.id,
        title: movieData.title,
        overview: movieData.overview,
        release_date: movieData.release_date,
        backdrop_path: movieData.backdrop_path,
        poster_path: movieData.poster_path,
        popularity: movieData.popularity,
        vote_average: movieData.vote_average,
        release_date: movieData.release_date,
        genres: genresNames, // Almacenar solo los nombres de los géneros
      });
  
      await movie.save();
      //console.log(`Película almacenada: ${movie.title}`);
  
      const youtubeKey = await getYoutubeKey(movie.id);
      movie.youtube_key = youtubeKey;
  
      await movie.save();
      //console.log(`Clave de YouTube almacenada para ${movie.title}: ${youtubeKey}`);
    } catch (error) {
      console.error('Error al almacenar la película:', error.message);
    }
  }
  
  async function getMoviesFromTMDB() {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
        params: {
          api_key: api_key,
          language: 'es',
        },
      });
  
      return response.data.results;
    } catch (error) {
      console.error('Error al obtener películas de TMDB:', error.message);
      return [];
    }
  }
  
  async function getAndStoreMovies() {
    try {
      const movies = await getMoviesFromTMDB();
  
      for (const movieData of movies) {
        await storeMovie(movieData);
      }
  
      console.log('Proceso completado.');
    } catch (error) {
      console.error('Error al obtener o almacenar películas:', error.message);
    }
  }  

  async function getYoutubeKey(movieId) {
    try {
        const params = {
            api_key: api_key,
            language: 'es-ES' // Especifica el idioma español
        };

        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, { params });

        const videos = response.data.results;
        const spanishVideos = videos.filter(video => video.iso_639_1 === 'es' && video.type === 'Trailer');

        if (spanishVideos.length > 0) {
            return spanishVideos[0].key; // Retorna la clave del primer trailer en español
        } else if (videos.length > 0) {
            return videos[0].key; // Retorna la clave del primer trailer disponible si no hay en español
        } else {
            console.error(`No se encontró ninguna clave de YouTube para la película con ID ${movieId}`);
            return null;
        }
    } catch (error) {
        console.error(`Error al obtener la clave de YouTube para la película con ID ${movieId}:`, error.message);
        return null;
    }
}

// Configurar conexión a MongoDB
const connectToDatabase = async (url) => {
  try {
    await mongoose.connect(url);
    console.log('Conexión a la base de datos establecida');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    throw error;
  }
};

module.exports = {
  connectToDatabase,
  Movie,
  url,
};

// Llamar a la función para obtener y almacenar películas
getAndStoreMovies();