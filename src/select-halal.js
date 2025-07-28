
   // Meat images data
    const meatImages = [
      './src/assets/images/raw-chicken.png',
      './src/assets/images/raw-chicken.png',
      './src/assets/images/juicy-fresh.png',
      './src/assets/images/set-meat-beef.png',
      './src/assets/images/fresh-beef.png',
      './src/assets/images/raw-chicken.png',
      './src/assets/images/raw-chicken.png'
    ];

    let currentIndex = 3; // Start from center (index 3)

    // Initialize mobile carousel
    function initMobileCarousel() {
      const mobileItem = document.getElementById('mobileMeatItem');
      const indicators = document.getElementById('mobileIndicators');

      // Set initial image
      mobileItem.style.backgroundImage = `url(${meatImages[currentIndex]})`;

      // Create indicators
      indicators.innerHTML = '';
      meatImages.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === currentIndex ? 'active' : ''}`;
        indicator.addEventListener('click', () => goToSlide(index));
        indicators.appendChild(indicator);
      });
    }

    // Mobile navigation
    function goToSlide(index) {
      currentIndex = index;
      updateMobileView();
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % meatImages.length;
      updateMobileView();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + meatImages.length) % meatImages.length;
      updateMobileView();
    }

    // Update mobile view
    function updateMobileView() {
      const mobileItem = document.getElementById('mobileMeatItem');
      const indicators = document.querySelectorAll('.indicator');

      mobileItem.style.backgroundImage = `url(${meatImages[currentIndex]})`;

      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
      });
    }

    // Event listeners
    document.addEventListener('DOMContentLoaded', function () {
      initMobileCarousel();

      // Mobile controls
      document.getElementById('mobilePrevBtn')?.addEventListener('click', prevSlide);
      document.getElementById('mobileNextBtn')?.addEventListener('click', nextSlide);

      // Touch/swipe support for mobile
      let startX = 0;
      let startY = 0;
      const mobileItem = document.getElementById('mobileMeatItem');

      mobileItem?.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      });

      mobileItem?.addEventListener('touchend', function (e) {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = startX - endX;
        const diffY = startY - endY;

        // Check if horizontal swipe is longer than vertical
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
          if (diffX > 0) {
            nextSlide(); // Swipe left - next
          } else {
            prevSlide(); // Swipe right - previous
          }
        }
      });
    });