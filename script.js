// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Progress bar
window.addEventListener('scroll', () => {
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight - winHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / docHeight) * 100;
    document.querySelector('.progress-bar').style.width = progress + '%';
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Here you would normally send the data to your server
        console.log('Form data:', data);
        
        // Show success message
        alert('🔥 Aplikacja wysłana! Odpiszę w ciągu 12 godzin z propozycją współpracy premium.');
        
        // Reset form
        this.reset();
    });
}

// Animated number counter
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number');
    
    numbers.forEach(element => {
        const target = parseFloat(element.getAttribute('data-target'));
        if (!target) return;
        
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
                
                // Add glow effect
                element.style.textShadow = '0 0 20px #dc2626';
                setTimeout(() => {
                    element.style.textShadow = 'none';
                }, 1000);
            } else {
                element.textContent = current.toFixed(1);
            }
        }, 20);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate service cards
            if (entry.target.classList.contains('service-card')) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
            }
            
            // Animate process steps - SEQUENTIAL ANIMATION
            if (entry.target.classList.contains('process-grid')) {
                const steps = entry.target.querySelectorAll('.process-step');
                steps.forEach((step, index) => {
                    step.style.opacity = '0';
                    step.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        step.style.transition = 'all 0.6s ease';
                        step.style.opacity = '1';
                        step.style.transform = 'translateY(0)';
                    }, 200 * (index + 1)); // Each step appears 200ms after the previous
                });
            }
            
            // Animate stats
            if (entry.target.classList.contains('hero')) {
                setTimeout(() => {
                    animateNumbers();
                }, 500);
            }
            
            // Stop observing once animated
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Observe process grid instead of individual steps
const processGrid = document.querySelector('.process-grid');
if (processGrid) {
    observer.observe(processGrid);
}

const heroSection = document.querySelector('.hero');
if (heroSection) {
    observer.observe(heroSection);
}

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'rgba(0, 0, 0, 0.95)';
            navLinks.style.flexDirection = 'column';
            navLinks.style.padding = '20px';
            navLinks.style.borderTop = '1px solid #dc2626';
        }
    });
}

// Parallax effect for hero section - DISABLED to fix overlapping
// Uncomment if you want to enable it with smaller effect
/*
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const maxScroll = 100; // Limit parallax effect
    if (hero && scrolled < maxScroll) {
        hero.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});
*/

// Optional: Typing effect for hero title
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            if (text.charAt(i) === '<') {
                // Handle HTML tags
                let tagEnd = text.indexOf('>', i);
                element.innerHTML += text.substring(i, tagEnd + 1);
                i = tagEnd + 1;
            } else {
                element.innerHTML += text.charAt(i);
                i++;
            }
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Lazy loading for images (if you add images later)
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Add hover effect to portfolio stats
document.querySelectorAll('.portfolio-stat').forEach(stat => {
    stat.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    stat.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Console Easter Egg
console.log('%c🚀 MikolajMedia - 44+ Milionów Wyświetleń', 
    'color: #dc2626; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%cSzukasz developera? Napisz do nas!', 
    'color: #666; font-size: 14px;');

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Page load time: ${loadTime}ms`);
});