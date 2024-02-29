export const login = (correo, password) => {
    return new Promise((resolve, reject) => {
      let endpoint = `10.2.60.117:3000/usuarios/`;
      fetch(endpoint, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          correo: correo, 
          password: password, 
        }) 
      })
        .then(e => {
          if (e.ok) {
            resolve(e);
          } else {
            reject(e);
          }
        })
        .catch(e => console.log("error::", e));
    });
  };
  