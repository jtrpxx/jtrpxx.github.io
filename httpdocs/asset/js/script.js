// Navbar Scroll
document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar-custom");
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    const progressRing = document.getElementById("progress-ring");
    const radius = progressRing.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    progressRing.style.strokeDasharray = circumference;
    progressRing.style.strokeDashoffset = circumference;

    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollHeight > 0 ? scrollTop / scrollHeight : 1;
        const offset = circumference * (1 - scrollPercent);
        progressRing.style.strokeDashoffset = offset;
        scrollTopBtn.style.display = scrollTop > 200 ? "block" : "none";

        // Navbar scroll effect
        if (scrollTop > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateScrollProgress);
    updateScrollProgress();

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.querySelectorAll("#offcanvasNavbar .nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById("offcanvasNavbar"));
            if (offcanvas) {
                offcanvas.hide();
            }
        });
    });

    document.querySelectorAll('nav.navbar-collapse a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth",
            });
        });
    });
});

//slide experience
document.addEventListener('DOMContentLoaded', () => {
    const experienceCarousel = document.getElementById('experienceCarousel');
    if (experienceCarousel) {
        const bsCarousel = new bootstrap.Carousel(experienceCarousel, {
            interval: 3000,
            ride: 'carousel'
        });

        experienceCarousel.addEventListener('mouseenter', () => {
            bsCarousel.pause();
        });

        experienceCarousel.addEventListener('mouseleave', () => {
            bsCarousel.cycle();
        });

        experienceCarousel.querySelectorAll('.carousel-item').forEach(item => {
            item.addEventListener('click', () => {
                bsCarousel.pause();
            });
        });
    }
});

//modal
document.addEventListener('DOMContentLoaded', () => {
   
    const projectImageModal = document.getElementById('projectImageModal');
    const modalCarouselInner = document.getElementById('modalCarouselInner');

    if (projectImageModal) {
        projectImageModal.addEventListener('show.bs.modal', event => {
            const button = event.relatedTarget; 

            const imagePrefix = button.getAttribute('data-image-prefix');
            const imageCount = parseInt(button.getAttribute('data-image-count'));
            const projectTitle = button.getAttribute('data-title');

            let imageUrls = [];

            if (imagePrefix && !isNaN(imageCount) && imageCount > 0) {
                for (let i = 1; i <= imageCount; i++) {
                    imageUrls.push(imagePrefix + i + '.png');
                }
            } else {
                const dataImages = button.getAttribute('data-images');
                if (dataImages) {
                    imageUrls = dataImages.split(',');
                }
            }

            modalCarouselInner.innerHTML = '';

            imageUrls.forEach((url, index) => {
                const carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');
                if (index === 0) {
                    carouselItem.classList.add('active'); 
                }

                const img = document.createElement('img');
                img.src = url.trim(); 
                img.alt = `${projectTitle} Image ${index + 1}`;
                img.classList.add('d-block', 'w-100'); 

                carouselItem.appendChild(img);
                modalCarouselInner.appendChild(carouselItem);
            });

            const carousel = new bootstrap.Carousel(document.getElementById('projectImageCarousel'));
            carousel.to(0); 
            carousel.cycle();
        });

        projectImageModal.addEventListener('click', () => {
            const carousel = bootstrap.Carousel.getInstance(document.getElementById('projectImageCarousel'));
            if (carousel) {
                carousel.pause();
            }
        });

        projectImageModal.addEventListener('hidden.bs.modal', () => {
            const carousel = bootstrap.Carousel.getInstance(document.getElementById('projectImageCarousel'));
            if (carousel) {
                carousel.cycle(); 
            }
        });
    }
});