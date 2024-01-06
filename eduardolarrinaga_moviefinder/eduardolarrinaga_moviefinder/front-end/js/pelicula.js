$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    let youtubeKey = ''; // Variable para almacenar el youtube_key

    if (movieId) {
        fetch(`http://localhost:3000/api/movies/${movieId}`)
            .then(response => response.json())
            .then(movie => {
                // Aquí actualizas el DOM con los detalles de la película
                $('.titulo').text(movie.title);
                $('.descripcion').text(movie.overview);
                $('#fecha').text(movie.release_date);
                $('#generos').text(movie.genres);
                $('.pelicula-principal').css({
                    'background': `linear-gradient(rgba(0, 0, 0, .50) 0%, rgba(0,0,0,.90) 100%), url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
                    'background-position': 'center center',
                    'background-size': 'cover'
                });
                // Cambiar la imagen en el contenedor de la imagen
                $('.imagen-contenedor img').attr('src', `https://image.tmdb.org/t/p/original${movie.poster_path}`);
                youtubeKey = movie.youtube_key;
            })
            .catch(error => console.error('Error:', error));
    }

    var botonYT = document.getElementById("botonYT");

    // Agrega un evento de clic al botón
    botonYT.addEventListener("click", function () {
        if (!youtubeKey) {
            alert('Trailer no disponible');
            return;
        }

        // Crea un nuevo elemento div para oscurecer el fondo con transición
        var overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        overlay.style.zIndex = "1000"; // Asegura que esté en la parte superior

        // Crea un contenedor para el botón de cierre y el iframe
        var container = document.createElement("div");
        container.style.position = "fixed";
        container.style.top = "50%";
        container.style.left = "50%";
        container.style.transform = "translate(-50%, -50%)";
        container.style.zIndex = "1001"; // Sobre el overlay
        container.style.width = "960px"; // Ancho para el iframe y botón
        container.style.height = "630px"; // Altura para el iframe y botón
        container.style.backgroundColor = "#000"; // Fondo negro para el contenedor

        // Crea un div para el botón de cierre
        var closeButtonContainer = document.createElement("div");
        closeButtonContainer.style.textAlign = "right";
        closeButtonContainer.style.padding = "10px";
        closeButtonContainer.style.width = "100%"; // Ancho completo del contenedor

        // Crea un botón de cierre
        var closeButton = document.createElement("button");
        closeButton.textContent = "Cerrar";
        closeButton.style.padding = "10px 20px";
        closeButton.style.cursor = "pointer";
        closeButton.style.border = "none";
        closeButton.style.background = "#fff";
        closeButton.style.color = "#000";
        closeButton.style.borderRadius = "5px";
        closeButton.style.fontSize = "16px";
        closeButton.style.marginRight = "10px"; // Margen derecho para separar del borde

        // Agrega un evento de clic al botón de cierre
        closeButton.addEventListener("click", function () {
            document.body.removeChild(overlay);
            document.body.removeChild(container);
        });

        // Agrega el botón al contenedor del botón
        closeButtonContainer.appendChild(closeButton);

        // Crea un div para el iframe
        var iframeContainer = document.createElement("div");
        iframeContainer.style.padding = "0";
        iframeContainer.style.width = "100%";

        // Crea un nuevo elemento iframe
        var iframe = document.createElement("iframe");
        iframe.width = "960px";
        iframe.height = "550px";
        iframe.src = `https://www.youtube.com/embed/${youtubeKey}`;
        iframe.frameborder = "0";
        iframe.allowfullscreen = true;
        iframe.mozallowfullscreen = true;  // Para Firefox
        iframe.webkitallowfullscreen = true;  // Para Chrome, Safari y otros navegadores basados en WebKit
        iframe.style.border = "none";

        iframeContainer.appendChild(iframe);

        container.appendChild(closeButtonContainer);
        container.appendChild(iframeContainer);

        document.body.appendChild(overlay);
        document.body.appendChild(container);
        });
});