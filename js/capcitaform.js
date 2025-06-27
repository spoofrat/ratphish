document.getElementById("formCita").addEventListener("submit", async function(e) {
  e.preventDefault();

  // Obtener la IP
  let ip = 'Desconocida';
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    ip = data.ip;
  } catch (err) {
    console.warn("No se pudo obtener la IP.");
  }

  const datos = {
    fecha: document.getElementById("fecha").value,
    hora: document.getElementById("hora").value,
    duracion: document.getElementById("duracion").value,
    ip: ip
  };

  try {
    const respuesta = await fetch("https://discrete-guppy-evenly.ngrok-free.app/cita", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    });

    if (respuesta.ok) {
      alert("Cita reservada correctamente");
      window.location.href = "metodo-pago.html";
    } else {
      alert("Error al guardar la cita");
    }
  } catch (err) {
    alert("Error de conexión: " + err);
  }
});