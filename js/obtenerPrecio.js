  // Función para obtener parámetros de la URL
  function obtenerPrecioDeURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('precio') || '0.00';
  }

  // Al cargar la página
  window.addEventListener('DOMContentLoaded', () => {
    const precio = obtenerPrecioDeURL();
    const inputCantidad = document.querySelector('input[name="amount"]');
    const boton = document.querySelector('.adyen-checkout__button__text');

    if (inputCantidad) inputCantidad.value = precio;
    if (boton) boton.textContent = `Confirmar ${parseFloat(precio).toFixed(2)} €`;
  });

