document.querySelector('.register-form').addEventListener('submit', function(e) {
    e.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    fetch('http://127.0.0.1:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        console.log(data.access_token)
        alert('Inicio de sesión exitoso');
        window.location.href = 'index.html';
      } else {
        alert('Inicio de sesión fallido');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error en el inicio de sesión');
    });
  });