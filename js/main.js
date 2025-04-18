/*
 * Branson Land Management - Main JavaScript
 * 
 * This file handles all interactive functionality:
 * 1. Mobile menu toggle
 * 2. Header scroll behavior
 * 3. Image carousel
 * 4. Form success message
 * 5. Current year in footer
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // ===== 1. Mobile Menu Toggle =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle) {
      menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
      });
      
      // Close menu when clicking on a nav link
      const navLinks = document.querySelectorAll('.nav-list a');
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          menuToggle.classList.remove('active');
          navList.classList.remove('active');
          document.body.classList.remove('no-scroll');
        });
      });
    }
    
    // ===== 2. Header Scroll Behavior =====
    const header = document.querySelector('.site-header');
    const heroSection = document.querySelector('.hero-section');
    
    if (header && heroSection) {
      // Initial check on page load
      checkHeaderScroll();
      
      // Check on scroll
      window.addEventListener('scroll', checkHeaderScroll);
      
      function checkHeaderScroll() {
        const heroBottom = heroSection.offsetTop + (heroSection.offsetHeight / 2);
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > heroBottom / 2) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    }
  
    // ===== 3. Image Carousel =====
    const galleryFiles = [
      'job1.jpg',
      'job2.jpg',
      'job3.jpg'
      // Add new files here
    ];
    
    const basePath = 'images/gallery/';
    let currentIndex = 0;
    const carouselImg = document.getElementById('carousel-image');
    const imageCounter = document.getElementById('image-counter');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (carouselImg && prevBtn && nextBtn) {
      // Show image function
      function showImage(index) {
        currentIndex = (index + galleryFiles.length) % galleryFiles.length;
        carouselImg.src = basePath + galleryFiles[currentIndex];
        
        if (imageCounter) {
          imageCounter.textContent = `${currentIndex + 1}/${galleryFiles.length}`;
        }
      }
      
      // Event listeners for buttons
      prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
      nextBtn.addEventListener('click', () => showImage(currentIndex + 1));
      
      // Keyboard navigation
      document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
          showImage(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
          showImage(currentIndex + 1);
        }
      });
      
      // Swipe support for touch devices
      let touchStartX = 0;
      let touchEndX = 0;
      
      carouselImg.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
      }, false);
      
      carouselImg.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, false);
      
      function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
          // Swipe left - show next image
          showImage(currentIndex + 1);
        } else if (touchEndX > touchStartX + swipeThreshold) {
          // Swipe right - show previous image
          showImage(currentIndex - 1);
        }
      }
      
      // Initialize
      showImage(0);
    }
    
    // ===== 4. Form Success Message =====
    // Show success message if URL has success parameter
    if (location.search.includes('success=true')) {
      const successMsg = document.getElementById('success-msg');
      if (successMsg) {
        successMsg.hidden = false;
        
        // Scroll to success message
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    
    // ===== 5. Current Year in Footer =====
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
    
    // ===== Smooth scroll for anchor links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Account for fixed header
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  });