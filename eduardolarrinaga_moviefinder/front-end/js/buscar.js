let allMovies = []; 
let currentPage = 1;
const moviesPerPage = 15;

$(document).ready(function() {
    const searchButton = $('.wrap .boton');
    const searchTermField = $('.searchTerm');

    searchButton.on('click', function() {
        const searchTerm = searchTermField.val();
        currentPage = 1; 

        $.ajax({
            url: `http://localhost:8080/api/movies/search/title`,
            type: 'GET',
            data: { query: searchTerm },
            success: function(movies) {
                allMovies = movies; 
                displayMovies(1); 
                setupPagination(); 
            },
            error: function(error) {
                console.error('Error en la búsqueda:', error);
            }
        });
    });
});

function displayMovies(page) {
    const start = (page - 1) * moviesPerPage;
    const end = start + moviesPerPage;
    const paginatedMovies = allMovies.slice(start, end);

    const searchResults = $('#search-results');
    searchResults.empty();

    paginatedMovies.forEach(movie => {
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
}

function setupPagination() {
    const pageCount = Math.ceil(allMovies.length / moviesPerPage);
    const paginationContainer = $('#pagination');
    paginationContainer.empty();

    if (pageCount > 1) {
        const prevButton = $('<button>').text('Anterior');
        prevButton.on('click', function() {
            if (currentPage > 1) {
                changePage(currentPage - 1);
            }
        }).prop('disabled', currentPage === 1);
        paginationContainer.append(prevButton);

        for (let i = 1; i <= pageCount; i++) {
            const pageButton = $('<button>').text(i);
            if (i === currentPage) {
                pageButton.addClass('active-page');
            }
            pageButton.on('click', function() {
                changePage(i);
            });

            paginationContainer.append(pageButton);
        }

        const nextButton = $('<button>').text('Siguiente');
        nextButton.on('click', function() {
            if (currentPage < pageCount) {
                changePage(currentPage + 1);
            }
        }).prop('disabled', currentPage === pageCount);
        paginationContainer.append(nextButton);
    }
}

function changePage(page) {
    currentPage = page;
    displayMovies(page);
    $('.pagination-container button').removeClass('active-page');
    $('.pagination-container button').eq(page).addClass('active-page');
    updatePaginationButtons();
}

function updatePaginationButtons() {
    $('#pagination button').first().prop('disabled', currentPage === 1);
    $('#pagination button').last().prop('disabled', currentPage === Math.ceil(allMovies.length / moviesPerPage));
}

function scrollToTop() {
    $('html, body').animate({ scrollTop: 0 }, 'fast');
}

function changePage(page) {
    currentPage = page;
    displayMovies(page);
    $('.pagination-container button').removeClass('active-page');
    $('.pagination-container button').eq(page).addClass('active-page');
    updatePaginationButtons();
    scrollToTop(); 
}