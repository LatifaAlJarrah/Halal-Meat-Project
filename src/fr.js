 // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });

    // Handle form submission
    function handleSubmit(event) {
      event.preventDefault();
      const email = event.target.querySelector('input[type="email"]').value;

      // Add loading state
      const button = event.target.querySelector('button');
      const originalText = button.textContent;
      button.textContent = 'Submitting...';
      button.disabled = true;

      // Simulate API call
      setTimeout(() => {
        alert(`Thank you! We'll contact you at: ${email}`);
        event.target.reset();
        button.textContent = originalText;
        button.disabled = false;
      }, 2000);
    }

    // Add parallax effect to franchise section
    window.addEventListener('scroll', () => {
      // const scrolled = window.pageYOffset;
      const franchiseSection = document.querySelector('.franchise-section');

      if (franchiseSection) {
        const rate = scrolled * -0.5;
        // franchiseSection.style.backgroundPositionY = `${rate}px`;
      }
    });

    // Intersection Observer for counter animations
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -50px 0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add any counter animations here if needed
          entry.target.classList.add('animate-pulse');
          setTimeout(() => {
            entry.target.classList.remove('animate-pulse');
          }, 1000);
        }
      });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
      counterObserver.observe(card);
    });

    // Add hover effects to feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
      card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
      });

      card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Responsive adjustments
    function handleResize() {
      const isMobile = window.innerWidth < 768;
      const floatingImage = document.querySelector('.floating-animation');

      if (isMobile) {
        floatingImage.style.animation = 'none';
      } else {
        floatingImage.style.animation = 'float 6s ease-in-out infinite';
      }
    }
