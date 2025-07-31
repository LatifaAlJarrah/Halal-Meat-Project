// Enhanced interactivity for Halal Meat website
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Functionality
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');

    if (hamburgerMenu && mobileMenu && closeMenu) {
        // Open menu
        hamburgerMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        // Close menu
        function closeMobileMenu() {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = ''; // Restore scrolling
        }

        closeMenu.addEventListener('click', closeMobileMenu);

        // Close menu when clicking outside
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                closeMobileMenu();
            }
        });
    }

    // Section hover effects
    document.querySelectorAll(".section").forEach((section) => {
        section.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-4px) scale(1.01)";
            this.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.5)";
        });

        section.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0) scale(1)";
            this.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
        });

        section.addEventListener("click", function () {
            this.style.transform = "scale(0.98)";
            setTimeout(() => {
                this.style.transform = "translateY(-4px) scale(1.01)";
            }, 150);
        });
    });

    // Add subtle animations on load
    document.querySelectorAll(".section").forEach((section, index) => {
        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";

        setTimeout(() => {
            section.style.transition = "all 0.6s ease";
            section.style.opacity = "1";
            section.style.transform = "translateY(0)";
        }, index * 100);
    });

    // Meat carousel functionality
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (nextBtn && prevBtn) {
        const meatImages = [
            './src/assets/images/raw-chicken-pieces.png',
            './src/assets/images/raw-chicken-pieces.png',
            './src/assets/images/juicy-fresh.png',
            './src/assets/images/set-meat-beef.png',
            './src/assets/images/juicy-fresh.png',
            './src/assets/images/raw-chicken-pieces.png',
            './src/assets/images/raw-chicken-pieces.png',
        ];
        let currentIndices = [0, 1, 2, 3, 4, 5, 6];
        const positions = [
            { id: 'img-0', classes: 'w-20 h-20 lg:w-[150px] lg:h-[150px]' },
            { id: 'img-1', classes: 'w-24 h-24 lg:w-[200px] lg:h-[200px]' },
            { id: 'img-2', classes: 'w-28 h-28 lg:w-[250px] lg:h-[250px]' },
            { id: 'img-3', classes: 'w-32 h-32 lg:w-[300px] lg:h-[300px] center-highlight' },
            { id: 'img-4', classes: 'w-28 h-28 lg:w-[250px] lg:h-[250px]' },
            { id: 'img-5', classes: 'w-24 h-24 lg:w-[200px] lg:h-[200px]' },
            { id: 'img-6', classes: 'w-20 h-20 lg:w-[150px] lg:h-[150px]' }
        ];

        function updateImages() {
            positions.forEach((position, index) => {
                const element = document.getElementById(position.id);
                if (element) {
                    element.className = `meat-image slide-transition rounded-full ${position.classes} ${index === 3 ? 'center-highlight' : ''}`;
                    element.style.backgroundImage = `url(${meatImages[currentIndices[index]]})`;
                }
            });
        }

        function nextSlide() {
            const newIndices = [...currentIndices];
            const lastIndex = newIndices.pop();
            newIndices.unshift(lastIndex);
            currentIndices = newIndices;
            updateImages();
        }

        function prevSlide() {
            const newIndices = [...currentIndices];
            const firstIndex = newIndices.shift();
            newIndices.push(firstIndex);
            currentIndices = newIndices;
            updateImages();
        }

        // Auto-slider functionality
        let autoSlideInterval = setInterval(nextSlide, 3000);

        // Event listeners for manual control
        nextBtn.addEventListener('click', () => {
            clearInterval(autoSlideInterval);
            nextSlide();
            autoSlideInterval = setInterval(nextSlide, 3000);
        });

        prevBtn.addEventListener('click', () => {
            clearInterval(autoSlideInterval);
            prevSlide();
            autoSlideInterval = setInterval(nextSlide, 3000);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                clearInterval(autoSlideInterval);
                nextSlide();
                autoSlideInterval = setInterval(nextSlide, 3000);
            }
            if (e.key === 'ArrowLeft') {
                clearInterval(autoSlideInterval);
                prevSlide();
                autoSlideInterval = setInterval(nextSlide, 3000);
            }
        });

        // Initialize
        updateImages();
    }

    // Read more button functionality
    const readMoreBtn = document.querySelector('.read-more-btn');
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', function () {
            console.log('Read more clicked');
            alert('Read more functionality - customize as needed!');
        });
    }

    // Map zoom functionality
    let zoomLevel = 1;

    function zoomIn() {
        zoomLevel = Math.min(zoomLevel + 0.1, 2);
        updateMapZoom();
    }

    function zoomOut() {
        zoomLevel = Math.max(zoomLevel - 0.1, 0.5);
        updateMapZoom();
    }

    function updateMapZoom() {
        const mapContainer = document.querySelector('.full-page-map');
        if (mapContainer) {
            mapContainer.style.backgroundSize = `${100 * zoomLevel}%`;
            mapContainer.style.transition = 'background-size 0.3s ease';
        }
    }

    // Make zoom functions globally available
    window.zoomIn = zoomIn;
    window.zoomOut = zoomOut;

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.content-section, .location-pin').forEach(el => {
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        }
    });

    // Add loading effect
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Responsive text adjustments
    function adjustTextSize() {
        const title = document.querySelector('h2');
        if (title) {
            if (window.innerWidth < 640) {
                title.classList.remove('text-4xl', 'lg:text-5xl');
                title.classList.add('text-3xl');
            } else {
                title.classList.remove('text-3xl');
                title.classList.add('text-4xl', 'lg:text-5xl');
            }
        }
    }

    window.addEventListener('resize', adjustTextSize);
    adjustTextSize();

    // Parallax effect for map background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.full-page-map');
        if (parallax) {
            const speed = scrolled * 0.2;
            parallax.style.backgroundPosition = `center ${speed}px`;
        }
    });

    // Review section functionality
    function generateStars(containerId, rating) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = '';

            for (let i = 1; i <= 5; i++) {
                const star = document.createElement('span');
                star.innerHTML = '★';
                star.className = i <= rating ? 'text-[#fbbf24] text-lg' : 'text-[#d1d5db] text-lg';
                container.appendChild(star);
            }
        }
    }

    // Initialize review stars
    generateStars('stars-1', 5);
    generateStars('stars-2', 4);
});


