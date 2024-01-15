$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    let youtubeKey = ''; 

    if (movieId) {
        fetch(`http://localhost:8080/api/movies/${movieId}`)
            .then(response => response.json())
            .then(movie => {
                $('.titulo').text(movie.title);
                $('.descripcion').text(movie.overview);
                $('#fecha').text(movie.release_date);
                $('#generos').text(movie.genres);
                let voteAverage = movie.vote_average.toFixed(1);
                let color = '';

                if (voteAverage >= 0 && voteAverage < 5) {
                    color = 'red'; 
                } else if (voteAverage >= 5 && voteAverage < 7) {
                    color = 'orange'; 
                } else if (voteAverage >= 7 && voteAverage <= 10) {
                    color = 'green'; 
                }

                $('#valoracion').html(`<strong style="color: ${color};">${voteAverage}</strong>`);
                $('.pelicula-principal').css({
                    'background': `linear-gradient(rgba(0, 0, 0, .50) 0%, rgba(0,0,0,.90) 100%), url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
                    'background-position': 'center center',
                    'background-size': 'cover'
                });
                $('.imagen-contenedor img').attr('src', `https://image.tmdb.org/t/p/original${movie.poster_path}`);
                youtubeKey = movie.youtube_key;
            })
            .catch(error => console.error('Error:', error));
    }

    var botonYT = document.getElementById("botonYT");

    botonYT.addEventListener("click", function () {
        if (!youtubeKey) {
            alert('Trailer no disponible');
            return;
        }

        if (window.innerWidth <= 800) {
            window.open(`https://www.youtube.com/watch?v=${youtubeKey}`, '_blank');
        } else {
            var overlay = document.createElement("div");
            overlay.style.position = "fixed";
            overlay.style.top = "0";
            overlay.style.left = "0";
            overlay.style.width = "100%";
            overlay.style.height = "100%";
            overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            overlay.style.zIndex = "1000"; 

            var container = document.createElement("div");
            container.style.position = "fixed";
            container.style.top = "50%";
            container.style.left = "50%";
            container.style.transform = "translate(-50%, -50%)";
            container.style.zIndex = "1001"; 
            container.style.width = "960px"; 
            container.style.height = "630px"; 
            container.style.backgroundColor = "#000"; 

            var closeButtonContainer = document.createElement("div");
            closeButtonContainer.style.textAlign = "right";
            closeButtonContainer.style.padding = "10px";
            closeButtonContainer.style.width = "100%"; 

            var closeButton = document.createElement("button");
            closeButton.textContent = "Cerrar";
            closeButton.style.padding = "10px 20px";
            closeButton.style.cursor = "pointer";
            closeButton.style.border = "none";
            closeButton.style.background = "#fff";
            closeButton.style.color = "#000";
            closeButton.style.borderRadius = "5px";
            closeButton.style.fontSize = "16px";
            closeButton.style.marginRight = "10px"; 

            closeButton.addEventListener("click", function () {
                document.body.removeChild(overlay);
                document.body.removeChild(container);
            });

            closeButtonContainer.appendChild(closeButton);

            var iframeContainer = document.createElement("div");
            iframeContainer.style.padding = "0";
            iframeContainer.style.width = "100%";

            var iframe = document.createElement("iframe");
            iframe.width = "960px";
            iframe.height = "550px";
            iframe.src = `https://www.youtube.com/embed/${youtubeKey}`;
            iframe.frameborder = "0";
            iframe.allowfullscreen = true;
            iframe.mozallowfullscreen = true;  
            iframe.webkitallowfullscreen = true;  
            iframe.style.border = "none";

            iframeContainer.appendChild(iframe);

            container.appendChild(closeButtonContainer);
            container.appendChild(iframeContainer);

            document.body.appendChild(overlay);
            document.body.appendChild(container);
        }
     });
});