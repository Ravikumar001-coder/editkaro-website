// Editkaro.in - Main JavaScript File

// ====================================
// CONFIGURATION
// ====================================

// Replace this with your Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxAE6KJuD6MM_0DWpx1uz4KiOkkf5vELkFV7DW3mAXpjcUYvu20mQ7fc3sn7I7S8cTwwg/exec';

// ====================================
// MOBILE MENU TOGGLE
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
});

// ====================================
// NEWSLETTER FORM SUBMISSION
// ====================================

const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('newsletterEmail').value;
        const messageEl = document.getElementById('newsletterMessage');
        
        if (!messageEl) return;
        
        try {
            messageEl.textContent = 'Subscribing...';
            messageEl.className = 'mt-4 text-sm text-white';
            messageEl.classList.remove('hidden');
            
            // Check if Google Script URL is configured
            if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
                // Demo mode - simulate success
                setTimeout(() => {
                    messageEl.textContent = '✓ Thanks for subscribing! (Demo mode - configure Google Sheets)';
                    messageEl.className = 'mt-4 text-sm text-green-300';
                    newsletterForm.reset();
                }, 1000);
            } else {
                // Send data to Google Sheets
                const formData = {
                    email: email,
                    type: 'newsletter',
                    timestamp: new Date().toISOString()
                };

                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                messageEl.textContent = '✓ Thanks for subscribing! Check your inbox for confirmation.';
                messageEl.className = 'mt-4 text-sm text-green-300 message-success';
                newsletterForm.reset();
            }
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            messageEl.textContent = '✗ Something went wrong. Please try again.';
            messageEl.className = 'mt-4 text-sm text-red-300 message-error';
        }
    });
}

// ====================================
// CONTACT FORM SUBMISSION
// ====================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        const messageEl = document.getElementById('contactMessage');
        
        if (!messageEl) return;
        
        try {
            messageEl.textContent = 'Sending your message...';
            messageEl.className = 'text-center text-sm text-white';
            messageEl.classList.remove('hidden');
            
            // Disable submit button to prevent multiple submissions
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
            
            // Check if Google Script URL is configured
            if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
                // Demo mode - simulate success
                setTimeout(() => {
                    messageEl.textContent = '✓ Message sent successfully! We\'ll contact you within 24 hours. (Demo mode - configure Google Sheets)';
                    messageEl.className = 'text-center text-sm text-green-300 message-success';
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i><span>Send Message</span>';
                }, 1500);
            } else {
                // Send data to Google Sheets
                const formData = {
                    name: name,
                    email: email,
                    phone: phone,
                    service: service || 'Not specified',
                    message: message,
                    type: 'contact',
                    timestamp: new Date().toISOString()
                };

                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                messageEl.textContent = '✓ Message sent successfully! We\'ll get back to you within 24 hours.';
                messageEl.className = 'text-center text-sm text-green-300 message-success';
                contactForm.reset();
                
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i><span>Send Message</span>';
            }
        } catch (error) {
            console.error('Contact form submission error:', error);
            messageEl.textContent = '✗ Something went wrong. Please try again or email us directly at hello@editkaro.in';
            messageEl.className = 'text-center text-sm text-red-300 message-error';
            
            // Re-enable submit button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i><span>Send Message</span>';
        }
    });
}

// ====================================
// PORTFOLIO FILTER FUNCTIONALITY
// ====================================

const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-indigo-600', 'text-white');
                btn.classList.add('bg-gray-800', 'text-gray-300');
            });
            button.classList.add('active', 'bg-indigo-600', 'text-white');
            button.classList.remove('bg-gray-800', 'text-gray-300');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ====================================
// FAQ ACCORDION FUNCTIONALITY
// ====================================

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isActive = question.classList.contains('active');
        
        // Close all FAQs
        faqQuestions.forEach(q => {
            q.classList.remove('active');
            q.nextElementSibling.classList.remove('active');
            q.nextElementSibling.style.maxHeight = '0';
        });
        
        // Open clicked FAQ if it wasn't active
        if (!isActive) {
            question.classList.add('active');
            answer.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// ====================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ====================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ====================================
// SCROLL TO TOP BUTTON
// ====================================

// Create scroll to top button
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollButton.className = 'fixed bottom-8 right-8 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition opacity-0 pointer-events-none z-50';
scrollButton.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollButton);

// Show/hide scroll button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollButton.style.opacity = '1';
        scrollButton.style.pointerEvents = 'auto';
    } else {
        scrollButton.style.opacity = '0';
        scrollButton.style.pointerEvents = 'none';
    }
});

// Scroll to top when button is clicked
scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ====================================
// LAZY LOADING FOR IMAGES
// ====================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ====================================
// ANIMATION ON SCROLL
// ====================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ====================================
// FORM VALIDATION
// ====================================

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Add real-time validation to forms
document.querySelectorAll('input[type="email"]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !isValidEmail(this.value)) {
            this.classList.add('border-red-500');
            this.classList.remove('border-gray-700');
        } else {
            this.classList.remove('border-red-500');
            this.classList.add('border-gray-700');
        }
    });
});

document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !isValidPhone(this.value)) {
            this.classList.add('border-red-500');
            this.classList.remove('border-gray-700');
        } else {
            this.classList.remove('border-red-500');
            this.classList.add('border-gray-700');
        }
    });
});

// ====================================
// PAGE LOAD ANIMATION
// ====================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ====================================
// CONSOLE MESSAGE
// ====================================

console.log('%c🎬 Editkaro.in', 'font-size: 24px; font-weight: bold; color: #667eea;');
console.log('%cProfessional Video Editing & Social Media Marketing', 'font-size: 14px; color: #888;');
console.log('%cWebsite developed with ❤️', 'font-size: 12px; color: #888;');
