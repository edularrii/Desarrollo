$(document).ready(function() {
    const searchButton = $('.wrap .boton');
    const searchTermField = $('.searchTerm');

    searchButton.on('click', function() {
        const searchTerm = searchTermField.val();

        $.ajax({
            url: `http://localhost:3000/api/movies/search/title`,
            type: 'GET',
            data: { query: searchTerm },
            success: function(movies) {
                const searchResults = $('#search-results');
                searchResults.empty();

                movies.forEach(movie => {
                    const movieElement = $('<div>').addClass('search-movie');
                    movieElement.html(`
                        <div class="movie-image">
                            <a href="pelicula.html?id=${movie.id}">
                                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                            </a>
                        </div>
                        <div class="movie-info">
                            <a href="pelicula.html?id=${movie.id}">
                                <h3>${movie.title}</h3>
                            </a>
                            <p class="release-date">${movie.release_date}</p>
                            <p>${movie.overview}</p>
                        </div>
                    `);
                    searchResults.append(movieElement);
                });
            },
            error: function(error) {
                console.error('Error en la búsqueda:', error);
            }
        });
    });
});
