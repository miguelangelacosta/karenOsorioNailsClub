document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. NAVEGACIÓN MÓVIL ---
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav");
    const navLinks = document.querySelectorAll(".nav-link");

    if (toggle && nav) {
        toggle.addEventListener("click", (e) => {
            e.stopPropagation();
            nav.classList.toggle("active");
        });

        navLinks.forEach(link => {
            link.addEventListener("click", () => nav.classList.remove("active"));
        });
    }

    // --- 2. LÓGICA DEL MODAL ---
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body");
    const closeBtn = document.querySelector(".close");

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

    // --- 3. FUNCIÓN REUTILIZABLE PARA SWIPE (DEDO) ---
    // Esta función detecta el movimiento y dispara el click de las flechas
    const habilitarSwipe = (contenedor, btnPrev, btnNext) => {
        let xInicial = null;

        contenedor.addEventListener('touchstart', e => {
            xInicial = e.touches[0].clientX;
        }, { passive: true });

        contenedor.addEventListener('touchend', e => {
            if (!xInicial) return;
            let xFinal = e.changedTouches[0].clientX;
            let diferencia = xInicial - xFinal;

            if (Math.abs(diferencia) > 50) { // Umbral de 50px
                diferencia > 0 ? btnNext.click() : btnPrev.click();
            }
            xInicial = null;
        }, { passive: true });
    };

    // --- 4. CARRUSEL DE SERVICIOS ---
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
            if (index < cards.length - visibleCards) index++;
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            if (index > 0) index--;
            updateCarousel();
        });

        // ACTIVAR SWIPE EN SERVICIOS
        habilitarSwipe(track.parentElement, prevBtn, nextBtn);
    }

    // --- 5. SLIDER DE GALERÍA ---
    const galeriaTrack = document.getElementById('galeria-track');
    const galeriaImgs = document.querySelectorAll('.galeria-track img');
    const nextGaleria = document.querySelector('.next-galeria');
    const prevGaleria = document.querySelector('.prev-galeria');
    let galeriaIndex = 0;

    const moverGaleria = () => {
        if (!galeriaTrack || galeriaImgs.length === 0) return;
        const gap = 15;
        const imgWidth = galeriaImgs[0].offsetWidth;
        galeriaTrack.style.transform = `translateX(-${galeriaIndex * (imgWidth + gap)}px)`;
    };

    if (nextGaleria && prevGaleria && galeriaImgs.length > 0) {
        nextGaleria.addEventListener('click', () => {
            const visibles = window.innerWidth > 1024 ? 4 : (window.innerWidth > 600 ? 2 : 1);
            galeriaIndex = (galeriaIndex < galeriaImgs.length - visibles) ? galeriaIndex + 1 : 0;
            moverGaleria();
        });

        prevGaleria.addEventListener('click', () => {
            if (galeriaIndex > 0) galeriaIndex--;
            moverGaleria();
        });

        // ACTIVAR SWIPE EN GALERÍA
        habilitarSwipe(galeriaTrack.parentElement, prevGaleria, nextGaleria);
    }

    // --- 6. DATOS Y ZOOM (Sin cambios) ---
    const serviciosFull = {
        manicure: { titulo: "Servicios de Manicure", lista: [{ nombre: "Manicure Tradicional", precio: "$20.000" }, { nombre: "Semi-permanente", precio: "$45.000" }] },
        pedicure: { titulo: "Servicios de Pedicure", lista: [{ nombre: "Pedicure Tradicional", precio: "$30.000" }] },
        cejas: { titulo: "Cejas y Mirada", lista: [{ nombre: "Diseño + Depilación", precio: "$15.000" }] },
        depilacion: { titulo: "Depilación con Cera", lista: [{ nombre: "Boso", precio: "$8.000" }] }
    };

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const key = card.getAttribute('data-service');
            const data = serviciosFull[key];
            if (data) {
                let html = `<ul style="list-style:none; padding:0;">`;
                data.lista.forEach(i => html += `<li style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #eee;"><span>${i.nombre}</span><strong>${i.precio}</strong></li>`);
                html += `</ul>`;
                openModal(data.titulo, html);
            }
        });
    });

    galeriaImgs.forEach(img => {
        img.addEventListener("click", () => openModal("Inspiración", `<img src="${img.src}" style="width:100%; border-radius:15px;">`));
    });

    // --- 7. FORMULARIO ---
    const form = document.querySelector(".form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const inputs = form.querySelectorAll("input");
            window.open(`https://wa.me/573044495267?text=Hola Karen! ✨ Nombre: ${inputs[0].value} - Servicio: ${inputs[2].value}`);
        });
    }
});