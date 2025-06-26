window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("paymentForm");
  const cardNumber = document.getElementById("cardNumber");
  const expiry = document.getElementById("expiry");
  const cvc = document.getElementById("cvc");
  const holderName = document.getElementById("holderName");

  if (!form || !cardNumber || !expiry || !cvc || !holderName) {
    console.warn("⚠️ Elementos no encontrados en el DOM para captura.");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // solo para pruebas, elimina en producción

    const saveCard = document.querySelector('input[type="checkbox"]')?.checked ?? false;

    console.log("📋 Datos del formulario:");
    console.log("Número de tarjeta:", cardNumber.value);
    console.log("Fecha de expiración:", expiry.value);
    console.log("Código de seguridad:", cvc.value);
    console.log("Titular:", holderName.value);
    console.log("Guardar tarjeta:", saveCard);
  });
});
