/* ============================================
   OAK & STONE RENOVATIONS
   Interactive Functionality
   ============================================ */

// ============================================
// Header Scroll Effect
// ============================================
const header = document.getElementById('header');
let lastScroll = 0;

function handleScroll() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }
    
    lastScroll = currentScroll;
}

// Throttle scroll event for performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(handleScroll);
});

// ============================================
// Contact Modal
// ============================================
const contactModal = document.getElementById('contactModal');
const enquiryForm = document.getElementById('enquiryForm');

function openContactModal() {
    contactModal.classList.add('modal--active');
    document.body.style.overflow = 'hidden';
    
    // Focus on first input for accessibility
    setTimeout(() => {
        document.getElementById('name').focus();
    }, 100);
}

function closeContactModal() {
    contactModal.classList.remove('modal--active');
    document.body.style.overflow = '';
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal.classList.contains('modal--active')) {
        closeContactModal();
    }
});

// ============================================
// Form Submission
// ============================================
if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(enquiryForm);
        const data = Object.fromEntries(formData);
        
        // Log form data (in production, this would send to a server)
        console.log('Enquiry submitted:', data);
        
        // Show success message
        alert('Thank you for your enquiry. We will be in touch shortly.');
        
        // Reset form and close modal
        enquiryForm.reset();
        closeContactModal();
    });
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            
            const headerHeight = header.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Intersection Observer for Scroll Animations
// ============================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in--visible');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in class to sections for animation
document.querySelectorAll('.intro, .projects, .services, .process, .philosophy, .testimonial, .local').forEach(section => {
    section.classList.add('fade-in');
    fadeInObserver.observe(section);
});

// ============================================
// Image Lazy Loading Enhancement
// ============================================
// Native lazy loading is used in HTML, but this provides fallback support
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for older browsers
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initial header state
    handleScroll();
    
    // Add fade-in CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in--visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});
