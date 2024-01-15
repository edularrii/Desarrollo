document.querySelector('.register-form').addEventListener('submit', function(e) {
  e.preventDefault();

  var email = document.getElementById('email').value;
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  fetch('http://127.0.0.1:8080/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      username: username,
      password: password
    })
  })
  .then(response => {
    if (response.ok) {
      return response.json(); 
    } else {
      throw new Error('Registro fallido');
    }
  })
  .then(data => {
    alert('Registro exitoso');
    window.location.href = 'login.html'; 
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error en el registro');
  });
});