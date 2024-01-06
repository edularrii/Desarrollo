const fila = document.querySelector('.contenedor-carousel');
const peliculas = document.querySelectorAll('.pelicula');

const flechaIzquierda = document.getElementById('flecha-izquierda');
const flechaDerecha = document.getElementById('flecha-derecha');

// ? ----- ----- Event Listener para la flecha derecha. ----- -----
flechaDerecha.addEventListener('click', () => {
	fila.scrollLeft += fila.offsetWidth;

	const indicadorActivo = document.querySelector('.indicadores .activo');
	if(indicadorActivo.nextSibling){
		indicadorActivo.nextSibling.classList.add('activo');
		indicadorActivo.classList.remove('activo');
	}
});

// ? ----- ----- Event Listener para la flecha izquierda. ----- -----
flechaIzquierda.addEventListener('click', () => {
	fila.scrollLeft -= fila.offsetWidth;

	const indicadorActivo = document.querySelector('.indicadores .activo');
	if(indicadorActivo.previousSibling){
		indicadorActivo.previousSibling.classList.add('activo');
		indicadorActivo.classList.remove('activo');
	}
});

// ? ----- ----- Paginacion ----- -----
const numeroPaginas = Math.ceil(peliculas.length / 5);
for(let i = 0; i < numeroPaginas; i++){
	const indicador = document.createElement('button');

	if(i === 0){
		indicador.classList.add('activo');
	}

	document.querySelector('.indicadores').appendChild(indicador);
	indicador.addEventListener('click', (e) => {
		fila.scrollLeft = i * fila.offsetWidth;

		document.querySelector('.indicadores .activo').classList.remove('activo');
		e.target.classList.add('activo');
	});
}

// ? ----- ----- Hover ----- -----
peliculas.forEach((pelicula) => {
	pelicula.addEventListener('mouseenter', (e) => {
		const elemento = e.currentTarget;
		setTimeout(() => {
			peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
			elemento.classList.add('hover');
		}, 100);
	});
});

fila.addEventListener('mouseleave', () => {
	peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
});

$(document).ready(function() {
    // Cargar películas y añadir al DOM
    $.ajax({
        url: 'http://localhost:3000/api/movies',
        type: 'GET',
        success: function(movies) {
            // Limitar el número de películas a 21
            const limitedMovies = movies.slice(0, 21);

            limitedMovies.forEach(movie => {
                const movieImage = $("<img>", {
                    src: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
                    alt: movie.title,
                    click: function() {
                        window.location.href = `pelicula.html?id=${movie.id}`;
                    }
                });
            
                const movieDiv = $("<div>").addClass("pelicula").append(movieImage);
                $(".carousel").append(movieDiv);
            });

            // Configurar paginación después de cargar películas
            setupPagination(limitedMovies.length);

			// Seleccionar una película aleatoria para la sección principal
            if (movies.length > 0) {
                const randomMovieIndex = Math.floor(Math.random() * movies.length);
                const selectedMovie = movies[randomMovieIndex];
                
                // Actualizar la sección principal
                $('.pelicula-principal').css({
                    'background': `linear-gradient(rgba(0, 0, 0, .50) 0%, rgba(0,0,0,.90) 100%), url('https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}')`,
                    'background-position': 'center center',
                    'background-size': 'cover'
                });

                $('.pelicula-principal .titulo').text(selectedMovie.title);
                $('.pelicula-principal .descripcion').text(selectedMovie.overview);
                // Actualizar el enlace del botón "Detalles"
                $('.boton-detalles').attr('href', `pelicula.html?id=${selectedMovie.id}`);

            }
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });

    // Configurar eventos de flechas
    const fila = $('.contenedor-carousel');
    $('#flecha-derecha').click(function() {
        fila.scrollLeft += fila.width();

        const indicadorActivo = $('.indicadores .activo');
        if(indicadorActivo.next().length){
            indicadorActivo.next().addClass('activo');
            indicadorActivo.removeClass('activo');
        }
    });

    $('#flecha-izquierda').click(function() {
        fila.scrollLeft -= fila.width();

        const indicadorActivo = $('.indicadores .activo');
        if(indicadorActivo.prev().length){
            indicadorActivo.prev().addClass('activo');
            indicadorActivo.removeClass('activo');
        }
    });

    // Delegar evento hover a películas
    $('.contenedor-carousel').on('mouseenter', '.pelicula', function() {
        $(this).addClass('hover').siblings().removeClass('hover');
    }).on('mouseleave', '.pelicula', function() {
        $(this).removeClass('hover');
    });

    // Función para configurar paginación
    function setupPagination(totalMovies) {
        const numeroPaginas = Math.ceil(totalMovies / 5);
        const indicadores = $('.indicadores');
        indicadores.empty();

        for(let i = 0; i < numeroPaginas; i++){
            const indicador = $('<button>');

            if(i === 0){
                indicador.addClass('activo');
            }

            indicador.click(function(e) {
                fila.scrollLeft(i * fila.width());
                $('.indicadores .activo').removeClass('activo');
                $(this).addClass('activo');
            });

            indicadores.append(indicador);
        }
    }
});

