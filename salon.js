document.addEventListener("DOMContentLoaded", () => {

  // ===== FORMULARIO =====
  const form = document.querySelector(".form");

  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const nombre = form.querySelector("input[placeholder='Nombre']").value.trim();
      const telefono = form.querySelector("input[placeholder='WhatsApp']").value.trim();
      const mensaje = form.querySelector("textarea").value.trim();

      // VALIDACIÓN
      if (!nombre || !telefono) {
        alert("Por favor completa nombre y WhatsApp");
        return;
      }

      const texto = `Hola, soy ${nombre}. Mi número es ${telefono}. ${mensaje}`;
      const url = `https://wa.me/573134070742?text=${encodeURIComponent(texto)}`;

      window.open(url, "_blank");
    });
  }

  // ===== MENÚ HAMBURGUESA =====
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("active");
      nav.classList.toggle("active");
    });

    // 🔥 CERRAR MENÚ AL HACER CLICK EN UN LINK
    const links = nav.querySelectorAll("a");

    links.forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        toggle.classList.remove("active");
      });
    });
  }

});