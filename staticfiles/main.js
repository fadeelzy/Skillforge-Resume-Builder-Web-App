// SkillForge Main JavaScript File
// Contains all interactive functionality for the application

// ================================
// Utility Functions
// ================================

/**
 * Debounce function to limit the rate of function execution
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if element is in viewport
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ================================
// Index Page Functionality
// ================================

/**
 * Index page redirect functionality
 */
function initIndexRedirect() {
    // Check if we're on the index page
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        // Set up redirect timer
        const redirectTimer = setTimeout(() => {
            window.location.href = 'pages/homepage.html';
        }, 2000);

        // Fallback redirect
        window.addEventListener('load', () => {
            setTimeout(() => {
                if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
                    window.location.href = 'pages/homepage.html';
                }
            }, 3000);
        });
    }
}

// ================================
// Navigation Functionality
// ================================

/**
 * Mobile menu toggle functionality
 */
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

/**
 * Initialize navigation functionality
 */
function initNavigation() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        
        if (mobileMenu && !mobileMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
}

// ================================
// Template Card Functionality
// ================================

/**
 * Initialize template cards click handlers
 */
function initTemplateCards() {
    const templateCards = document.querySelectorAll('.template-card');
    templateCards.forEach(card => {
        card.addEventListener('click', () => {
            const url = card.getAttribute('data-url');
            if (url) {
                window.location.href = url;
            }
        });
    });
}

// ================================
// Portfolio Card Functionality
// ================================

/**
 * Initialize portfolio cards click handlers
 */
function initPortfolioCards() {
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        card.addEventListener('click', () => {
            const url = card.getAttribute('data-url');
            if (url) {
                window.location.href = url;
            }
        });
    });
}

// ================================
// Filter Functionality
// ================================

/**
 * Initialize filter buttons functionality
 */
function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.add('bg-gray-100', 'text-text-secondary');
                btn.classList.remove('bg-primary', 'text-white');
            });
            
            // Add active class to clicked button
            button.classList.add('active');
            button.classList.remove('bg-gray-100', 'text-text-secondary');
            button.classList.add('bg-primary', 'text-white');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Here you would implement the actual filtering logic
            // For now, we'll just log the filter value
            console.log('Filtering by:', filterValue);
            
            // You could implement portfolio filtering here
            // filterPortfolios(filterValue);
        });
    });
}

// ================================
// Scroll Animations
// ================================

/**
 * Initialize scroll-based animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with fade-up class
    const fadeUpElements = document.querySelectorAll('.fade-up');
    fadeUpElements.forEach(el => {
        observer.observe(el);
    });
}

// ================================
// Smooth Scrolling
// ================================

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Check if it's a valid anchor
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ================================
// Performance Optimizations
// ================================

/**
 * Lazy load images
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * Preload critical resources
 */
function preloadCriticalResources() {
    // Preload critical CSS
    const criticalCSS = [
        'css/styles.css'
    ];
    
    criticalCSS.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
}

// ================================
// Error Handling
// ================================

/**
 * Global error handler
 */
function initErrorHandling() {
    window.addEventListener('error', (event) => {
        console.error('Global error:', event.error);
        
        // You could implement error reporting here
        // reportError(event.error);
    });
    
    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled promise rejection:', event.reason);
        
        // You could implement error reporting here
        // reportError(event.reason);
    });
}

// ================================
// Form Utilities
// ================================

/**
 * Basic form validation utilities
 */
const FormUtils = {
    validateEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    validateRequired: (value) => {
        return value && value.trim().length > 0;
    },
    
    showError: (input, message) => {
        const errorElement = input.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        input.classList.add('error');
    },
    
    clearError: (input) => {
        const errorElement = input.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
        input.classList.remove('error');
    }
};

// ================================
// Analytics and Tracking
// ================================

/**
 * Track user interactions (placeholder for analytics)
 */
function trackEvent(eventName, properties = {}) {
    // This would integrate with your analytics service
    console.log('Event tracked:', eventName, properties);
    
    // Example integration:
    // gtag('event', eventName, properties);
    // analytics.track(eventName, properties);
}

/**
 * Initialize click tracking for important elements
 */
function initClickTracking() {
    // Track button clicks
    document.querySelectorAll('.btn-primary, .btn-secondary, .btn-accent').forEach(btn => {
        btn.addEventListener('click', () => {
            trackEvent('button_click', {
                button_text: btn.textContent.trim(),
                button_class: btn.className,
                page: window.location.pathname
            });
        });
    });
    
    // Track template card clicks
    document.querySelectorAll('.template-card').forEach(card => {
        card.addEventListener('click', () => {
            const templateName = card.querySelector('h3')?.textContent || 'Unknown';
            trackEvent('template_card_click', {
                template_name: templateName,
                page: window.location.pathname
            });
        });
    });
}

// ================================
// Accessibility Enhancements
// ================================

/**
 * Initialize accessibility features
 */
function initAccessibility() {
    // Focus management for mobile menu
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMobileMenu();
            }
        });
    }
    
    // Skip to main content link
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const main = document.querySelector('main') || document.querySelector('[role="main"]');
            if (main) {
                main.focus();
                main.scrollIntoView();
            }
        });
    }
}

// ================================
// Page-Specific Initializations
// ================================

/**
 * Initialize page-specific functionality based on current page
 */
function initPageSpecific() {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('index.html') || currentPage === '/') {
        initIndexRedirect();
        document.body.classList.add('index-page');
    }
    
    if (currentPage.includes('homepage.html')) {
        initTemplateCards();
        initPortfolioCards();
        initFilterButtons();
        initClickTracking();
    }
    
    // Add more page-specific initializations as needed
}

// ================================
// Main Initialization
// ================================

/**
 * Main initialization function
 */
function init() {
    // Core functionality
    initErrorHandling();
    initNavigation();
    initScrollAnimations();
    initSmoothScrolling();
    initAccessibility();
    
    // Performance optimizations
    initLazyLoading();
    preloadCriticalResources();
    
    // Page-specific functionality
    initPageSpecific();
    
    console.log('SkillForge application initialized successfully');
}

// ================================
// DOM Ready and Load Events
// ================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Additional optimizations after page load
window.addEventListener('load', () => {
    // Optimize performance after initial load
    requestIdleCallback(() => {
        // Initialize non-critical functionality
        console.log('Non-critical functionality loaded');
    });
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden - pause any unnecessary operations
    } else {
        // Page is visible - resume operations
    }
});

// Export utilities for use in other scripts if needed
if (typeof window !== 'undefined') {
    window.SkillForge = {
        utils: {
            debounce,
            isElementInViewport,
            FormUtils
        },
        tracking: {
            trackEvent
        }
    };
}