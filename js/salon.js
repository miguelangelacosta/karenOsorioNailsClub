document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. EFECTO 3D POP-OUT (HERO SECTION) ---
    // Este bloque gestiona la inclinación de la imagen según el movimiento del mouse
    const heroScene = document.querySelector('.hero');
    const heroImg = document.getElementById('parallax-image');

    if (heroScene && heroImg) {
        heroScene.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 30;
            const y = (window.innerHeight / 2 - e.pageY) / 30;
            
            // translateZ(150px) crea el efecto de "salirse de la pantalla"
            heroImg.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) translateZ(150px)`;
        });

        heroScene.addEventListener('mouseleave', () => {
            heroImg.style.transform = `rotateY(0deg) rotateX(0deg) translateZ(100px)`;
        });
    }

    // --- 2. NAVEGACIÓN MÓVIL ---
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav");
    const navLinks = document.querySelectorAll(".nav-link");

    if(toggle) {
        toggle.addEventListener("click", () => {
            nav.classList.toggle("active");
        });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
        });
    });

    // --- 3. SISTEMA DE MODALES ---
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body");
    const closeBtn = document.querySelector(".close");

    const openModal = (title, content) => {
        if(!modal) return;
        modalTitle.innerText = title;
        modalBody.innerHTML = content;
        modal.style.display = "flex";
        document.body.style.overflow = "hidden"; 
    };

    if(closeBtn) {
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

    // --- 4. CARRUSEL DE SERVICIOS (AUTOPLAY) ---
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.carousel-track .card');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    let index = 0;

    const updateCarousel = () => {
        if(!track || cards.length === 0) return;
        const gap = 20;
        const cardWidth = cards[0].offsetWidth;
        track.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;
    };

    const nextSlide = () => {
        const visible = window.innerWidth > 768 ? 3 : 1;
        if (index < cards.length - visible) {
            index++;
        } else {
            index = 0; // Reinicia
        }
        updateCarousel();
    };

    const prevSlide = () => {
        if (index > 0) {
            index--;
        } else {
            const visible = window.innerWidth > 768 ? 3 : 1;
            index = cards.length - visible;
        }
        updateCarousel();
    };

    // Autoplay Servicios
    let serviceInterval = setInterval(nextSlide, 3500);

    if(nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => { 
            nextSlide(); 
            clearInterval(serviceInterval); 
            serviceInterval = setInterval(nextSlide, 3500);
        });
        prevBtn.addEventListener('click', () => { 
            prevSlide(); 
            clearInterval(serviceInterval); 
            serviceInterval = setInterval(nextSlide, 3500);
        });
    }

    // --- 5. CARRUSEL DE GALERÍA (AUTOPLAY CORREGIDO) ---
    const galeriaTrack = document.getElementById('galeria-track');
    const galeriaImgs = document.querySelectorAll('.galeria-track img');
    const nextGaleria = document.querySelector('.next-galeria');
    const prevGaleria = document.querySelector('.prev-galeria');
    let galeriaIndex = 0;

    const moverGaleria = () => {
        if(!galeriaTrack || galeriaImgs.length === 0) return;
        const gap = 15;
        const imgWidth = galeriaImgs[0].offsetWidth;
        galeriaTrack.style.transform = `translateX(-${galeriaIndex * (imgWidth + gap)}px)`;
    };

    const siguienteGaleria = () => {
        const visibles = window.innerWidth > 1024 ? 4 : (window.innerWidth > 600 ? 2 : 1);
        if (galeriaIndex < galeriaImgs.length - visibles) {
            galeriaIndex++;
        } else {
            galeriaIndex = 0;
        }
        moverGaleria();
    };

    // Autoplay Galería
    let galeriaInterval = setInterval(siguienteGaleria, 4000);

    if(nextGaleria && prevGaleria) {
        nextGaleria.addEventListener('click', () => {
            siguienteGaleria();
            clearInterval(galeriaInterval);
            galeriaInterval = setInterval(siguienteGaleria, 4000);
        });
        
        prevGaleria.addEventListener('click', () => {
            if (galeriaIndex > 0) galeriaIndex--;
            moverGaleria();
            clearInterval(galeriaInterval);
            galeriaInterval = setInterval(siguienteGaleria, 4000);
        });
    }

    // --- 6. DATOS DE SERVICIOS Y WHATSAPP ---
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
        pedicure: {
            titulo: "Servicios de Pedicure",
            lista: [
                { nombre: "Pedicure Tradicional", precio: "$30.000" },
                { nombre: "Pedicure Spa + Hidratación", precio: "$45.000" },
                { nombre: "Limpieza Profunda", precio: "$25.000" },
                { nombre: "Esmaltado Semi-pedi", precio: "$40.000" }
            ]
        },
        cejas: {
            titulo: "Cejas y Mirada",
            lista: [
                { nombre: "Diseño + Depilación", precio: "$15.000" },
                { nombre: "Sombreado con Henna", precio: "$25.000" },
                { nombre: "Lifting de Pestañas", precio: "$60.000" },
                { nombre: "Pestañas Punto a Punto", precio: "$50.000" }
            ]
        },
        depilacion: {
            titulo: "Depilación con Cera",
            lista: [
                { nombre: "Boso / Mentón", precio: "$8.000" },
                { nombre: "Axilas", precio: "$15.000" },
                { nombre: "Piernas Completas", precio: "$40.000" },
                { nombre: "Media Pierna", precio: "$25.000" }
            ]
        }
    };

    // Clic en tarjetas para abrir modal
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const key = card.getAttribute('data-service');
            const data = serviciosFull[key];
            if(data) {
                let html = `<ul style="list-style:none; padding:0; margin-bottom:20px;">`;
                data.lista.forEach(item => {
                    html += `
                        <li style="display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid #f0f0f0;">
                            <span>${item.nombre}</span>
                            <strong style="color:#e5989b;">${item.precio}</strong>
                        </li>`;
                });
                html += `</ul>
                <a href="https://wa.me/573044495267?text=Hola Karen! ✨ Me interesa: ${data.titulo}" class="btn-primary" style="display:block; text-align:center;">Agendar ahora</a>`;
                openModal(data.titulo, html);
            }
        });
    });

    // Zoom de imágenes en galería
    galeriaImgs.forEach(img => {
        img.addEventListener("click", () => {
            openModal("Inspiración", `<img src="${img.src}" style="width:100%; border-radius:15px;">`);
        });
    });

    // --- 7. FORMULARIO ---
    const form = document.querySelector(".form");
    if(form){
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const inputs = form.querySelectorAll("input");
            const nombre = inputs[0].value;
            const servicio = inputs[2].value;
            const textoWa = `Hola Karen! ✨%0A*Nuevo Mensaje*%0A*Nombre:* ${nombre}%0A*Servicio:* ${servicio}`;
            window.open(`https://wa.me/573044495267?text=${textoWa}`);
        });
    }

    // Ajustar carruseles al cambiar tamaño de pantalla
    window.addEventListener('resize', () => {
        updateCarousel();
        moverGaleria();
    });
});