/**
 * KAREN NAILS STUDIO - JS COMPLETO 2026
 * Manejo de UI, Efectos 3D y Carruseles Automáticos
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. NAVEGACIÓN MÓVIL ---
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav");
    const navLinks = document.querySelectorAll(".nav-link");

    if (toggle && nav) {
        toggle.addEventListener("click", (e) => {
            e.stopPropagation();
            nav.classList.toggle("active");
            
            // Animación del icono de hamburguesa
            const spans = toggle.querySelectorAll('span');
            if (nav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        navLinks.forEach(link => {
            link.onclick = () => {
                nav.classList.remove("active");
                const spans = toggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            };
        });
    }

    // --- 2. LÓGICA DE CARRUSELES CON AUTO-PLAY ---
    const initCarousel = (trackSelector, prevBtnSelector, nextBtnSelector, gap, autoPlayDelay = 5000) => {
        const track = document.querySelector(trackSelector);
        const prevBtn = document.querySelector(prevBtnSelector);
        const nextBtn = document.querySelector(nextBtnSelector);

        if (!track || !prevBtn || !nextBtn || !track.firstElementChild) return;

        let currentIndex = 0;
        let autoPlayTimer;

        const moveCarousel = () => {
            const itemWidth = track.firstElementChild.getBoundingClientRect().width;
            const displacement = currentIndex * (itemWidth + gap);
            track.style.transform = `translateX(-${displacement}px)`;
        };

        const nextSlide = () => {
            const totalItems = track.children.length;
            const visibleItems = Math.round(track.parentElement.offsetWidth / track.firstElementChild.offsetWidth);
            
            if (currentIndex < totalItems - visibleItems) {
                currentIndex++;
            } else {
                currentIndex = 0; // Regresa al inicio (Loop)
            }
            moveCarousel();
        };

        const prevSlide = () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                const totalItems = track.children.length;
                const visibleItems = Math.round(track.parentElement.offsetWidth / track.firstElementChild.offsetWidth);
                currentIndex = totalItems - visibleItems; // Ir al final
            }
            moveCarousel();
        };

        // Click en botones y reinicio de timer
        nextBtn.onclick = () => { nextSlide(); resetAutoPlay(); };
        prevBtn.onclick = () => { prevSlide(); resetAutoPlay(); };

        // Funciones de Auto-Play
        const startAutoPlay = () => {
            autoPlayTimer = setInterval(nextSlide, autoPlayDelay);
        };

        const resetAutoPlay = () => {
            clearInterval(autoPlayTimer);
            startAutoPlay();
        };

        // Pausar si el mouse está encima
        track.parentElement.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
        track.parentElement.addEventListener('mouseleave', startAutoPlay);

        startAutoPlay(); // Iniciar automático al cargar

        // Swipe para móviles
        let xDown = null;
        track.addEventListener('touchstart', (e) => xDown = e.touches[0].clientX, {passive: true});
        track.addEventListener('touchend', (e) => {
            if (!xDown) return;
            let xDiff = xDown - e.changedTouches[0].clientX;
            if (Math.abs(xDiff) > 50) {
                xDiff > 0 ? nextSlide() : prevSlide();
                resetAutoPlay();
            }
            xDown = null;
        }, {passive: true});

        window.addEventListener('resize', moveCarousel);
    };

    // Inicialización (Servicios cada 5s, Galería cada 4s)
    initCarousel('.carousel-track', '.prev', '.next', 20, 5000);
    initCarousel('.galeria-track', '.prev-galeria', '.next-galeria', 20, 4000);

    // --- 3. EFECTO PARALLAX 3D (Hero) ---
    const hand = document.querySelector('.layer-main');
    if (hand) {
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 45;
            const y = (window.innerHeight / 2 - e.pageY) / 45;
            hand.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) translateZ(20px)`;
        });

        window.addEventListener('mouseleave', () => {
            hand.style.transform = `rotateY(0deg) rotateX(0deg) translateZ(0px)`;
        });
    }

    // --- 4. MODAL Y DATOS DE SERVICIOS ---
    const modal = document.getElementById("modal");
    const closeBtn = document.querySelector(".close");
    
    const openModal = (title, content) => {
        if (!modal) return;
        document.getElementById("modal-title").innerText = title;
        document.getElementById("modal-body").innerHTML = content;
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    };

    if (closeBtn) {
        closeBtn.onclick = () => {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        };
    }

    const serviciosFull = {
        manicure: { titulo: "Manicure", lista: [{ n: "Tradicional", p: "$20.000" }, { n: "Semi-permanente", p: "$45.000" }] },
        pedicure: { titulo: "Pedicure", lista: [{ n: "Tradicional", p: "$30.000" }, { n: "Spa Limpieza", p: "$40.000" }] },
        cejas: { titulo: "Cejas", lista: [{ n: "Diseño + Cera", p: "$15.000" }] },
        depilacion: { titulo: "Depilación", lista: [{ n: "Boso", p: "$8.000" }, { n: "Axilas", p: "$15.000" }] }
    };

    document.querySelectorAll('.card').forEach(card => {
        card.onclick = () => {
            const key = card.dataset.service;
            const data = serviciosFull[key];
            if (data) {
                let html = `<ul style="list-style:none; padding:0;">`;
                data.lista.forEach(i => {
                    html += `<li style="display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid #eee;">
                                <span>${i.n}</span><strong>${i.p}</strong>
                             </li>`;
                });
                openModal(data.titulo, html + `</ul>`);
            }
        };
    });

    // Zoom Galería
    document.querySelectorAll('.galeria-track img').forEach(img => {
        img.onclick = () => openModal("Inspiración Karen Nails", `<img src="${img.src}" style="width:100%; border-radius:15px;">`);
    });

    // --- 5. WHATSAPP FORM ---
    const form = document.querySelector(".form");
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            const inputs = form.querySelectorAll("input");
            const text = encodeURIComponent(`¡Hola Karen! ✨ Mi nombre es ${inputs[0].value}, me interesa el servicio de ${inputs[2].value}.`);
            window.open(`https://wa.me/573044495267?text=${text}`, "_blank");
        };
    }
});