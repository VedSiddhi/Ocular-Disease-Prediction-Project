// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
}, { passive: true });

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Simple contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        this.reset();
    });
}

// Testimonial slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const totalTestimonials = testimonials.length;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
        testimonial.classList.toggle('active', i === index);
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

// Initialize testimonial display
if (testimonials.length > 0) {
    showTestimonial(0);
    // Auto-advance testimonials every 4 seconds
    setInterval(nextTestimonial, 4000);
}

// Add scroll-based animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
document.querySelectorAll('.feature-card, .benefit-card, .testimonial').forEach(element => {
    observer.observe(element);
});

// Dropbox functionality
const dropbox = document.getElementById('dropbox');
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const imagePreview = document.getElementById('imagePreview');
const results = document.getElementById('results');

if (dropbox && fileInput) {
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropbox.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight dropbox when dragging over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropbox.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropbox.addEventListener(eventName, unhighlight, false);
    });

    // Handle dropped files
    dropbox.addEventListener('drop', handleDrop, false);
    
    // Handle click to upload
    dropbox.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', handleFiles, false);
}

function preventDefaults (e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(e) {
    dropbox.classList.add('highlight');
}

function unhighlight(e) {
    dropbox.classList.remove('highlight');
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles({ target: { files: files } });
}

function handleFiles(e) {
    const files = [...e.target.files];
    const file = files[0];

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            preview.style.display = 'block';
            
            // Simulate analysis results (replace with actual API call in production)
            setTimeout(() => {
                results.innerHTML = `
                    <p><strong>Analysis Complete:</strong></p>
                    <ul>
                        <li>No signs of diabetic retinopathy detected</li>
                        <li>Normal optic disc appearance</li>
                        <li>Healthy retinal vasculature</li>
                        <li>Recommended follow-up: 12 months</li>
                    </ul>
                `;
            }, 2000);
        };
        
        reader.readAsDataURL(file);
    } else {
        alert('Please upload an image file');
    }
}

// Initialize AOS with cross-browser support
document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic',
            disable: 'mobile'
        });
    }

    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in-up');
    const scaleElements = document.querySelectorAll('.scale-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    fadeElements.forEach(element => observer.observe(element));
    scaleElements.forEach(element => observer.observe(element));
});

// Handle image loading with cross-browser support
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    const imageOptions = {
        threshold: 0,
        rootMargin: '0px 0px 50px 0px'
    };

    function preloadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) return;
        img.src = src;
        img.removeAttribute('data-src');
    }

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    preloadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, imageOptions);

        images.forEach(image => imageObserver.observe(image));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        images.forEach(image => preloadImage(image));
    }
});

// Testimonials Slideshow
function initTestimonialsSlideshow() {
  const testimonials = document.querySelectorAll('.testimonial');
  let currentIndex = 0;
  const intervalTime = 4000; // Change testimonial every 4 seconds

  function showTestimonial(index) {
    // Remove active class from all testimonials
    testimonials.forEach(testimonial => {
      testimonial.classList.remove('active');
      testimonial.style.display = 'none';
    });

    // Add active class to current testimonial
    testimonials[index].classList.add('active');
    testimonials[index].style.display = 'block';
  }

  function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  }

  // Start automatic slideshow immediately
  if (testimonials.length > 0) {
    showTestimonial(0); // Show first testimonial
    // Start the automatic slideshow
    setInterval(nextTestimonial, intervalTime);
  }
}

// Make sure the DOM is fully loaded before initializing
window.addEventListener('load', function() {
  // Initialize testimonials slideshow
  initTestimonialsSlideshow();
  
  // Initialize AOS if it exists
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic',
      disable: 'mobile'
    });
  }
});
// Logout function
    function logout() {
      sessionStorage.removeItem('isLoggedIn');
      window.location.href = '../index.html';
    } function logout() {
    const confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      // Clear sessionStorage and redirect (or do whatever logout logic you need)
      sessionStorage.removeItem('isLoggedIn');
      window.location.href = 'index.html'; // Or your actual login page
    }
  } 