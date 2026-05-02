document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. NAVEGACIÓN MÓVIL (Con cierre automático) ---
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav");
    const navLinks = document.querySelectorAll(".nav-link");

    if (toggle && nav) {
        toggle.addEventListener("click", (e) => {
            e.stopPropagation(); // Evita que el clic se propague
            nav.classList.toggle("active");
        });

        // Cerrar menú al hacer clic en un link
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("active");
            });
        });
    }

    // --- 2. LÓGICA DEL MODAL ---
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body");
    const closeBtn = document.querySelector(".close");

    // Función global para abrir el modal
    const openModal = (title, content) => {
        if (modal && modalTitle && modalBody) {
            modalTitle.innerText = title;
            modalBody.innerHTML = content;
            modal.style.display = "flex";
            document.body.style.overflow = "hidden"; 
        }
    };

    if (closeBtn) {
        closeBtn.onclick = () => {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        };
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    };

    // --- 3. CARRUSEL DE SERVICIOS ---
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.carousel-track .card');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    let index = 0;

    const updateCarousel = () => {
        if (!track || cards.length === 0) return;
        const gap = 20;
        const cardWidth = cards[0].offsetWidth;
        track.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;
    };

    if (nextBtn && prevBtn && cards.length > 0) {
        nextBtn.addEventListener('click', () => {
            const visibleCards = window.innerWidth > 768 ? 3 : 1;
            if (index < cards.length - visibleCards) {
                index++;
                updateCarousel();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (index > 0) {
                index--;
                updateCarousel();
            }
        });
        
        // Ajustar carrusel al cambiar el tamaño de la ventana
        window.addEventListener('resize', updateCarousel);
    }

    // --- 4. DATOS DE SERVICIOS Y CLIC EN CARDS ---
    const serviciosFull = {
        manicure: {
            titulo: "Servicios de Manicure",
            lista: [
                { nombre: "Manicure Tradicional", precio: "$20.000" },
                { nombre: "Manicure Semi-permanente", precio: "$45.000" },
                { nombre: "Uñas Acrílicas (Set Nuevo)", precio: "$85.000" },
                { nombre: "Uñas en Gel", precio: "$75.000" },
                { nombre: "Retoque Acrílico", precio: "$50.000" },
                { nombre: "Nail Art (Desde)", precio: "$15.000" }
            ]
        },
        pedicure: { titulo: "Servicios de Pedicure", lista: [{ nombre: "Pedicure Tradicional", precio: "$30.000" }, { nombre: "Pedicure Spa", precio: "$45.000" }] },
        cejas: { titulo: "Cejas y Mirada", lista: [{ nombre: "Diseño + Depilación", precio: "$15.000" }, { nombre: "Henna", precio: "$25.000" }] },
        depilacion: { titulo: "Depilación con Cera", lista: [{ nombre: "Boso", precio: "$8.000" }, { nombre: "Piernas", precio: "$40.000" }] }
    };

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const key = card.getAttribute('data-service');
            const data = serviciosFull[key];
            if (data) {
                let htmlLista = `<ul style="list-style:none; padding:0; margin-bottom:20px;">`;
                data.lista.forEach(item => {
                    htmlLista += `<li style="display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid #f0f0f0;">
                                    <span>${item.nombre}</span><strong>${item.precio}</strong>
                                  </li>`;
                });
                htmlLista += `</ul><a href="https://wa.me/573044495267?text=Hola Karen! ✨ Agendar: ${data.titulo}" class="btn-primary" style="display:block; text-align:center;">WhatsApp</a>`;
                openModal(data.titulo, htmlLista);
            }
        });
    });

    // --- 5. SLIDER DE GALERÍA ---
    const galeriaTrack = document.getElementById('galeria-track');
    const galeriaImgs = document.querySelectorAll('.galeria-track img');
    const nextGaleria = document.querySelector('.next-galeria');
    const prevGaleria = document.querySelector('.prev-galeria');
    let galeriaIndex = 0;

    function moverGaleria() {
        if (!galeriaTrack || galeriaImgs.length === 0) return;
        const gap = 15;
        const imgWidth = galeriaImgs[0].offsetWidth;
        galeriaTrack.style.transform = `translateX(-${galeriaIndex * (imgWidth + gap)}px)`;
    }

    if (nextGaleria && prevGaleria && galeriaImgs.length > 0) {
        nextGaleria.addEventListener('click', () => {
            const visibles = window.innerWidth > 1024 ? 4 : (window.innerWidth > 600 ? 2 : 1);
            galeriaIndex = (galeriaIndex < galeriaImgs.length - visibles) ? galeriaIndex + 1 : 0;
            moverGaleria();
        });

        prevGaleria.addEventListener('click', () => {
            if (galeriaIndex > 0) {
                galeriaIndex--;
                moverGaleria();
            }
        });
    }

    // Zoom imágenes galería
    galeriaImgs.forEach(img => {
        img.addEventListener("click", () => {
            openModal("Inspiración", `<img src="${img.src}" style="width:100%; border-radius:15px;">`);
        });
    });

    // --- 6. FORMULARIO ---
    const form = document.querySelector(".form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const inputs = form.querySelectorAll("input");
            const textoWa = `Hola Karen! ✨%0A*Nuevo Mensaje*%0A*Nombre:* ${inputs[0].value}%0A*Servicio:* ${inputs[2].value}`;
            window.open(`https://wa.me/573044495267?text=${textoWa}`);
        });
    }
});