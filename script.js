// === Countdown Timer ===
function initCountdown() {
    const weddingDate = new Date('2026-09-23T14:00:00');

    function update() {
        const now = new Date();
        const diff = weddingDate - now;

        if (diff <= 0) {
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '0';
            document.getElementById('minutes').textContent = '0';
            document.getElementById('seconds').textContent = '0';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }

    update();
    setInterval(update, 1000);
}

// === Lightbox ===
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const src = item.getAttribute('data-src');
            if (src) {
                lightboxImg.src = src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// === Map (Yandex Maps) ===
function initMap() {
    ymaps.ready(function () {
        const map = new ymaps.Map('map', {
            center: [57.9888916, 56.2094276],
            zoom: 17,
            controls: ['zoomControl', 'fullscreenControl']
        });

        const placemark = new ymaps.Placemark([57.9888916, 56.2094276], {
            balloonContent: '<strong>Лофт «BlackBerry»</strong><br>Пермь, ул. Стахановская, 52а'
        }, {
            preset: 'islands#dotIcon',
            iconColor: '#8c7b6b'
        });

        map.geoObjects.add(placemark);
    });
}

// === Scroll Reveal ===
function initScrollReveal() {
    const targets = document.querySelectorAll(
        '.section-title, .detail-card, .timeline-item, .gallery-item, .transport-card, .gift-text, .rsvp-button-wrap, .gift-text p, .gift-list li'
    );

    targets.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    targets.forEach(el => observer.observe(el));
}

// === Init ===
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initLightbox();
    initMap();
    initScrollReveal();
});
