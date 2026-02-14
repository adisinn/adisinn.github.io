// Cyberpunk Portfolio JavaScript

// Typing Animation
const typingText = document.querySelector('.typing-text');
const texts = [
    'Initializing system...',
    'Loading neural network...',
    'Welcome to the future...',
    'Ready to code the matrix...'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentText = texts[textIndex];
    
    if (!isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeText, 2000);
            return;
        }
    } else {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeText, 500);
            return;
        }
    }
    
    setTimeout(typeText, isDeleting ? 50 : 100);
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeText, 500);
});

// Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '+';
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate counters
            if (entry.target.classList.contains('stat-value')) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-progress')) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all stat values
document.querySelectorAll('.stat-value').forEach(stat => {
    observer.observe(stat);
});

// Observe all skill bars
document.querySelectorAll('.skill-progress').forEach(bar => {
    observer.observe(bar);
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Nav height
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.style.color = '';
                link.style.textShadow = '';
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = 'var(--primary-cyan)';
                    link.style.textShadow = '0 0 10px var(--primary-cyan)';
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const action = contactForm.getAttribute('action');
        const formData = new FormData(contactForm);

        try {
            const response = await fetch(action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                alert('MESSAGE_SENT.exe ✓\nThank you for your message! I will respond within 24 hours.');
                contactForm.reset();
            } else {
                alert('TRANSMISSION_FAILED.exe ✗\nPlease try again or email me directly.');
            }
        } catch (error) {
            alert('NETWORK_ERROR.exe ✗\nPlease try again or email me directly.');
        }
    });
}

// Random Glitch Effect
function randomGlitch() {
    const glitchElements = document.querySelectorAll('.glitch');
    const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
    
    if (randomElement) {
        randomElement.style.animation = 'none';
        setTimeout(() => {
            randomElement.style.animation = '';
        }, 10);
    }
}

// Trigger random glitch every 5-10 seconds
setInterval(randomGlitch, Math.random() * 5000 + 5000);

// Mouse Trail Effect
const coords = { x: 0, y: 0 };
const circles = [];
const colors = ['#00ffff', '#ff00ff', '#ffff00'];

// Create circle elements
for (let i = 0; i < 20; i++) {
    const circle = document.createElement('div');
    circle.style.position = 'fixed';
    circle.style.width = '10px';
    circle.style.height = '10px';
    circle.style.borderRadius = '50%';
    circle.style.pointerEvents = 'none';
    circle.style.zIndex = '9997';
    circle.style.opacity = '0';
    circle.style.transition = 'opacity 0.3s';
    document.body.appendChild(circle);
    circles.push(circle);
}

// Update mouse coordinates
document.addEventListener('mousemove', (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

// Animate circles
function animateCircles() {
    let x = coords.x;
    let y = coords.y;
    
    circles.forEach((circle, index) => {
        circle.style.left = x - 5 + 'px';
        circle.style.top = y - 5 + 'px';
        circle.style.transform = `scale(${(circles.length - index) / circles.length})`;
        circle.style.opacity = (circles.length - index) / circles.length * 0.5;
        circle.style.background = colors[index % colors.length];
        circle.style.boxShadow = `0 0 10px ${colors[index % colors.length]}`;
        
        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.offsetLeft - x) * 0.3;
        y += (nextCircle.offsetTop - y) * 0.3;
    });
    
    requestAnimationFrame(animateCircles);
}

animateCircles();

// Disable mouse trail on mobile
if (window.innerWidth <= 768) {
    circles.forEach(circle => {
        circle.style.display = 'none';
    });
}

// Add glow effect to cards on hover
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.setProperty('--mouse-x', x + 'px');
        this.style.setProperty('--mouse-y', y + 'px');
    });
});

// Certificate Modal Functionality
const certModal = document.getElementById('certModal');
const certModalClose = document.querySelector('.cert-modal-close');
const certCards = document.querySelectorAll('.cert-card');
const certDirectLinks = document.querySelectorAll('.cert-direct-link');

// Open certificate modal
certCards.forEach(card => {
    card.addEventListener('click', function() {
        const title = this.getAttribute('data-cert-title');
        const issuer = this.getAttribute('data-cert-issuer');
        const date = this.getAttribute('data-cert-date');
        const link = this.getAttribute('data-cert-link');
        
        document.getElementById('certTitle').textContent = title;
        document.getElementById('certIssuer').textContent = 'Issued by: ' + issuer;
        document.getElementById('certDate').textContent = 'Completed: ' + date;
        document.getElementById('certLink').href = link;
        
        certModal.classList.remove('hidden');
    });
});

// Prevent direct link clicks from opening modal
certDirectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

// Close certificate modal
certModalClose.addEventListener('click', function() {
    certModal.classList.add('hidden');
});

certModal.addEventListener('click', function(e) {
    if (e.target === certModal) {
        certModal.classList.add('hidden');
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        certModal.classList.add('hidden');
    }
});

// Console welcome message
console.log('%c🔥 CYBER PORTFOLIO INITIALIZED 🔥', 
    'color: #00ffff; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00ffff;');
console.log('%cWelcome to the matrix, developer!', 
    'color: #ff00ff; font-size: 14px;');
console.log('%cSystem Status: ONLINE ✓', 
    'color: #0f0; font-size: 12px;');

// Easter egg: Konami Code
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateMatrixMode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateMatrixMode() {
    console.log('%c🎮 MATRIX MODE ACTIVATED! 🎮', 
        'color: #0f0; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #0f0;');
    
    // Change color scheme temporarily
    document.documentElement.style.setProperty('--primary-cyan', '#0f0');
    document.documentElement.style.setProperty('--primary-magenta', '#0f0');
    
    setTimeout(() => {
        document.documentElement.style.setProperty('--primary-cyan', '#00ffff');
        document.documentElement.style.setProperty('--primary-magenta', '#ff00ff');
    }, 5000);
}

// Preload animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loaded class for smooth entrance
setTimeout(() => {
    document.body.style.opacity = '1';
}, 100);
