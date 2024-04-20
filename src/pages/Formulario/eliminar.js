document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registro-form');

    const token = getCookie("token");
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      console.log()
  
      fetch('http://localhost:3000/usuarios/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({
            correo:getCookie("correo"),

        })
        
      }).then(response => {
        return response.json();
      })
        .then(data => {
          if (data.mensaje.includes('fail')) {
            alert('No se pudo eliminar el usuario');
          } else {
            alert(data.mensaje);
            cerrarSesion();
          }
        })
        .catch(error => {
          console.log(error);
          alert('Error al eliminar usuario.');
        });
    });
  });

  function cerrarSesion() {
    // Eliminar las cookies del token y la imagenPerfil
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'correo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Redirigir a la página de inicio de sesión u otra página después de cerrar sesión
    window.location.href = 'login.html';
}
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}