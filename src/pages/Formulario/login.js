document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registro-form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nombreUsuario = document.getElementById('correo').value;
    const contrasena = document.getElementById('pwd').value;

    console.log()

    fetch('http://localhost:3000/usuarios/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        correo:nombreUsuario,
        password: contrasena,
      })
      
    }).then(response => {
      return response.json();
    })
      .then(data => {
        if (data.mensaje.includes('fail')) {
          alert('No se encontró usuario con esas credenciales');
        } else {
            
          document.cookie = `token=${data.body.token}; path=/`;
          document.cookie = `correo=${data.body.correo}; path=/`;

          window.location.href = 'test.html';
        }
      })
      .catch(error => {
        console.log(error);
        alert('Error al iniciar sesión. Verifica tus credenciales.');
      });
  });
});