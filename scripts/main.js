document.addEventListener('DOMContentLoaded', function() {
// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    });
});

// Hero Text Animation
const heroContent = document.querySelector('.hero-content');

// Immediately animate hero content when page loads
setTimeout(() => {
    heroContent.classList.add('animate');
}, 500);

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements that need animation
const aboutText = document.querySelector('.about-text');
const aboutImage = document.querySelector('.about-image');
const serviceCards = document.querySelectorAll('.service-card');
const galleryContainer = document.querySelector('.gallery-container');
const testimonialContainer = document.querySelector('.testimonial-container');

observer.observe(aboutText);
observer.observe(aboutImage);
serviceCards.forEach(card => observer.observe(card));
observer.observe(galleryContainer);
observer.observe(testimonialContainer);

// Gallery Slider
const galleryTrack = document.querySelector('.gallery-track');
const galleryItems = document.querySelectorAll('.gallery-item');
const prevBtn = document.querySelector('.gallery-prev');
const nextBtn = document.querySelector('.gallery-next');

let currentIndex = 0;
let autoScrollInterval;

// Initialize gallery
function initGallery() {
    // Center the first item
    updateGallery();
    
    // Start auto-scroll
    startAutoScroll();
}

function updateGallery() {
    // Calculate the position to center the current item
    const galleryWidth = document.querySelector('.gallery-container').offsetWidth;
    const itemWidth = galleryItems[0].offsetWidth + 20; // Including gap
    const centerPosition = (galleryWidth / 2) - (itemWidth / 2) - (currentIndex * itemWidth);
    
    galleryTrack.style.transform = `translateX(${centerPosition}px)`;
    
    // Update active class
    galleryItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateGallery();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateGallery();
}

function startAutoScroll() {
    clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(() => {
        nextSlide();
    }, 5000); // Change slide every 5 seconds (3s movement + 2s pause)
}

// Event listeners
nextBtn.addEventListener('click', () => {
    nextSlide();
    startAutoScroll(); // Reset timer on manual navigation
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    startAutoScroll(); // Reset timer on manual navigation
});

// Touch/swipe support
let touchStartX = 0;
let touchEndX = 0;

galleryTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, {passive: true});

galleryTrack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoScroll(); // Reset timer on swipe
}, {passive: true});

function handleSwipe() {
    const difference = touchStartX - touchEndX;
    if (difference > 50) { // Left swipe
        nextSlide();
    } else if (difference < -50) { // Right swipe
        prevSlide();
    }
}

// Initialize on load
window.addEventListener('load', initGallery);

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    // Hero section parallax
    const hero = document.querySelector('.hero');
    hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    
    // About section parallax
    const about = document.querySelector('.about');
    if (about) {
        const aboutOffset = about.offsetTop;
        const aboutHeight = about.offsetHeight;
        const aboutScroll = scrollPosition - aboutOffset;
        
        if (scrollPosition > aboutOffset - window.innerHeight && scrollPosition < aboutOffset + aboutHeight) {
            const aboutImage = document.querySelector('.about-image img');
            aboutImage.style.transform = `translateY(${aboutScroll * 0.1}px)`;
        }
    }
    
    // Services section parallax
    const services = document.querySelector('.services');
    if (services) {
        const servicesOffset = services.offsetTop;
        const servicesHeight = services.offsetHeight;
        const servicesScroll = scrollPosition - servicesOffset;
        
        if (scrollPosition > servicesOffset - window.innerHeight && scrollPosition < servicesOffset + servicesHeight) {
            const serviceCards = document.querySelectorAll('.service-card');
            serviceCards.forEach((card, index) => {
                const factor = (index % 2 === 0) ? 0.05 : -0.05;
                card.style.transform = `translateY(${servicesScroll * factor}px)`;
            });
        }
    }
    
    // Gallery section parallax
    const gallery = document.querySelector('.gallery');
    if (gallery) {
        const galleryOffset = gallery.offsetTop;
        const galleryHeight = gallery.offsetHeight;
        const galleryScroll = scrollPosition - galleryOffset;
        
        if (scrollPosition > galleryOffset - window.innerHeight && scrollPosition < galleryOffset + galleryHeight) {
            gallery.style.backgroundPositionY = galleryScroll * 0.3 + 'px';
        }
    }
});

});