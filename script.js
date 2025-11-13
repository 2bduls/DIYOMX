// DIYOMX Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Show success message
                showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.app-card, .achievement-item, .feature-item, .team-member, .timeline-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Counter animation for achievements
    function animateCounters() {
        const counters = document.querySelectorAll('.achievement-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
            const suffix = counter.textContent.replace(/[\d]/g, '');
            let current = 0;
            const increment = target / 50;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + suffix;
                }
            };
            
            updateCounter();
        });
    }

    // Trigger counter animation when achievements section is visible
    const achievementsSection = document.querySelector('.achievements-section');
    if (achievementsSection) {
        const achievementsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    achievementsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        achievementsObserver.observe(achievementsSection);
    }

    // Mobile menu toggle (if needed)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNavigation = document.querySelector('.main-navigation');
    
    if (mobileMenuToggle && mainNavigation) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNavigation.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h4');
        const answer = item.querySelector('p');
        
        if (question && answer) {
            // Hide answer initially
            answer.style.display = 'none';
            
            question.addEventListener('click', function() {
                const isOpen = answer.style.display === 'block';
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    const otherAnswer = otherItem.querySelector('p');
                    if (otherAnswer) {
                        otherAnswer.style.display = 'none';
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                if (!isOpen) {
                    answer.style.display = 'block';
                    item.classList.add('active');
                }
            });
        }
    });

    // Add loading animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }

    // Add active class to navigation based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks2 = document.querySelectorAll('.main-navigation a');
    
    navLinks2.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Initialize tooltips for social links
    const socialLinks = document.querySelectorAll('.social-link, .social-link-large');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Add scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #4a7c59;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.opacity = '0';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Dark Mode Functionality
    initializeDarkMode();

    // Language Toggle Functionality
    initializeLanguageToggle();

    console.log('ديومكس - الموقع جاهز للاستخدام!');
});

// Dark Mode Functions
function initializeDarkMode() {
    // Check for saved dark mode preference or default to light mode
    const darkMode = localStorage.getItem('darkMode') === 'true';
    
    // Apply dark mode if it was previously enabled
    if (darkMode) {
        document.body.classList.add('dark-mode');
        document.documentElement.classList.add('dark-mode');
        // Apply dark mode to inline styles after a short delay to ensure DOM is ready
        setTimeout(() => {
            applyDarkModeToInlineStyles();
        }, 100);
    } else {
        document.body.classList.remove('dark-mode');
        document.documentElement.classList.remove('dark-mode');
        restoreInlineStyles();
    }
    
    // Force reflow to ensure styles are applied immediately
    void document.body.offsetHeight;
    
    // Create dark mode toggle button
    createDarkModeToggle();
    
    // Listen for system preference changes (optional)
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        // Only auto-apply if user hasn't manually set a preference
        if (!localStorage.getItem('darkMode')) {
            if (mediaQuery.matches) {
                document.body.classList.add('dark-mode');
                document.documentElement.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'true');
                setTimeout(() => {
                    applyDarkModeToInlineStyles();
                }, 100);
                updateDarkModeIcon();
            }
        }
    }
    
    // Watch for dynamically added elements
    if (darkMode) {
        observeForNewElements();
    }
}

// Global observer instance
let darkModeObserver = null;

// Observe DOM for new elements and apply dark mode styles
function observeForNewElements() {
    // Disconnect existing observer if any
    if (darkModeObserver) {
        darkModeObserver.disconnect();
    }
    
    const isDarkMode = document.body.classList.contains('dark-mode');
    if (!isDarkMode) return;
    
    darkModeObserver = new MutationObserver(function(mutations) {
        const isDarkMode = document.body.classList.contains('dark-mode');
        if (isDarkMode) {
            // Check if any new elements with inline styles were added
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        // Check if the node itself has inline styles
                        if (node.hasAttribute && node.hasAttribute('style')) {
                            const style = node.getAttribute('style');
                            if (style && (style.includes('color') || style.includes('background'))) {
                                applyDarkModeToElement(node);
                            }
                        }
                        // Check children
                        const elementsWithStyles = node.querySelectorAll ? node.querySelectorAll('[style*="color"], [style*="background"]') : [];
                        elementsWithStyles.forEach(applyDarkModeToElement);
                    }
                });
            });
        } else {
            // Disconnect if dark mode is turned off
            if (darkModeObserver) {
                darkModeObserver.disconnect();
                darkModeObserver = null;
            }
        }
    });
    
    darkModeObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Apply dark mode to a single element
function applyDarkModeToElement(el) {
    if (!el || !el.hasAttribute) return;
    
    const style = el.getAttribute('style');
    if (!style) return;
    
    const tagName = el.tagName.toLowerCase();
    
    // Save original style if not already saved
    if (!originalStyles.has(el)) {
        originalStyles.set(el, style);
    }
    
    // Fix background colors
    if (style.includes('background') && (style.includes('#f8f9fa') || style.includes('white') || style.includes('#fff'))) {
        el.style.setProperty('background', 'rgba(255, 255, 255, 0.02)', 'important');
    }
    
    // Fix text colors
    if (style.includes('color')) {
        const darkColors = ['#2c5530', '#333', '#555', '#666', '#000', 'black'];
        const isDarkColor = darkColors.some(color => style.includes(color));
        
        if (isDarkColor) {
            if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
                el.style.setProperty('color', '#ffffff', 'important');
            } else if (tagName === 'a') {
                el.style.setProperty('color', '#81c784', 'important');
            } else {
                el.style.setProperty('color', '#cccccc', 'important');
            }
        }
    }
}

function createDarkModeToggle() {
    // Check if toggle already exists
    if (document.querySelector('.dark-mode-toggle')) {
        return;
    }
    
    const toggle = document.createElement('button');
    toggle.className = 'dark-mode-toggle';
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
    const currentLang = localStorage.getItem('language') || 'ar';
    toggle.title = currentLang === 'ar' ? 'تبديل الوضع الليلي' : 'Toggle Dark Mode';
    
    // Add toggle to header
    const headerContainer = document.querySelector('.header-container');
    if (headerContainer) {
        headerContainer.appendChild(toggle);
    }
    
    // Add click event listener
    toggle.addEventListener('click', toggleDarkMode);
    
    // Update icon based on current mode
    updateDarkModeIcon();
}

function toggleDarkMode() {
    const body = document.body;
    const html = document.documentElement;
    const isDarkMode = body.classList.contains('dark-mode');
    
    if (isDarkMode) {
        // Switch to light mode
        body.classList.remove('dark-mode');
        html.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
        restoreInlineStyles();
    } else {
        // Switch to dark mode
        body.classList.add('dark-mode');
        html.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
        applyDarkModeToInlineStyles();
        // Start observing for new elements
        observeForNewElements();
    }
    
    // Force reflow to ensure styles are applied
    void body.offsetHeight;
    
    // Update icon
    updateDarkModeIcon();
    
    // Add transition effect
    body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    html.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
        body.style.transition = '';
        html.style.transition = '';
    }, 300);
    
    // Trigger a custom event for any components that need to react
    const event = new CustomEvent('darkModeToggle', {
        detail: { isDarkMode: !isDarkMode }
    });
    document.dispatchEvent(event);
}

// Store original inline styles
const originalStyles = new Map();

function applyDarkModeToInlineStyles() {
    // Fix sections with background colors
    document.querySelectorAll('section[style*="background"]').forEach(el => {
        const style = el.getAttribute('style');
        if (style && !originalStyles.has(el)) {
            originalStyles.set(el, style);
        }
        if (style && (style.includes('#f8f9fa') || style.includes('white') || style.includes('#fff'))) {
            el.style.setProperty('background', 'rgba(255, 255, 255, 0.02)', 'important');
        }
    });
    
    // Fix headings with color styles
    document.querySelectorAll('h1[style*="color"], h2[style*="color"], h3[style*="color"], h4[style*="color"], h5[style*="color"], h6[style*="color"]').forEach(el => {
        const style = el.getAttribute('style');
        if (style && !originalStyles.has(el)) {
            originalStyles.set(el, style);
        }
        if (style && (style.includes('#2c5530') || style.includes('#333') || style.includes('#555') || style.includes('#000'))) {
            el.style.setProperty('color', '#ffffff', 'important');
        }
    });
    
    // Fix paragraphs with color styles
    document.querySelectorAll('p[style*="color"]').forEach(el => {
        const style = el.getAttribute('style');
        if (style && !originalStyles.has(el)) {
            originalStyles.set(el, style);
        }
        if (style && (style.includes('#555') || style.includes('#333') || style.includes('#666') || style.includes('#000'))) {
            el.style.setProperty('color', '#cccccc', 'important');
        }
    });
    
    // Fix links with color styles
    document.querySelectorAll('a[style*="color"]').forEach(el => {
        const style = el.getAttribute('style');
        if (style && !originalStyles.has(el)) {
            originalStyles.set(el, style);
        }
        if (style && (style.includes('#2c5530') || style.includes('#333') || style.includes('#555'))) {
            el.style.setProperty('color', '#81c784', 'important');
        }
    });
    
    // Fix divs with background colors
    document.querySelectorAll('div[style*="background"]').forEach(el => {
        const style = el.getAttribute('style');
        if (style && !originalStyles.has(el)) {
            originalStyles.set(el, style);
        }
        if (style && (style.includes('#f8f9fa') || style.includes('white') || style.includes('#fff'))) {
            el.style.setProperty('background', 'rgba(255, 255, 255, 0.02)', 'important');
        }
    });
    
    // Fix spans with color styles
    document.querySelectorAll('span[style*="color"]').forEach(el => {
        const style = el.getAttribute('style');
        if (style && !originalStyles.has(el)) {
            originalStyles.set(el, style);
        }
        if (style && (style.includes('#2c5530') || style.includes('#333') || style.includes('#555'))) {
            el.style.setProperty('color', '#e0e0e0', 'important');
        }
    });
    
    // Fix any element with dark text colors
    document.querySelectorAll('[style*="color: #"], [style*="color:#"]').forEach(el => {
        const style = el.getAttribute('style');
        if (!style) return;
        
        // Check if it's a dark color that needs to be lightened
        const darkColors = ['#2c5530', '#333', '#555', '#666', '#000', 'black'];
        const isDarkColor = darkColors.some(color => style.includes(color));
        
        if (isDarkColor && !originalStyles.has(el)) {
            originalStyles.set(el, style);
            
            // Determine appropriate light color based on element type
            const tagName = el.tagName.toLowerCase();
            if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
                el.style.setProperty('color', '#ffffff', 'important');
            } else if (tagName === 'a') {
                el.style.setProperty('color', '#81c784', 'important');
            } else {
                el.style.setProperty('color', '#cccccc', 'important');
            }
        }
    });
    
    // Force re-apply dark mode classes to ensure all styles are applied
    setTimeout(() => {
        const body = document.body;
        const html = document.documentElement;
        if (body.classList.contains('dark-mode')) {
            // Force a reflow to ensure all CSS is applied
            void body.offsetHeight;
            void html.offsetHeight;
            
            // Re-apply dark mode to ensure all elements are styled
            body.classList.remove('dark-mode');
            html.classList.remove('dark-mode');
            setTimeout(() => {
                body.classList.add('dark-mode');
                html.classList.add('dark-mode');
            }, 10);
        }
    }, 50);
}

function restoreInlineStyles() {
    // Disconnect observer
    if (darkModeObserver) {
        darkModeObserver.disconnect();
        darkModeObserver = null;
    }
    
    // Restore original styles
    originalStyles.forEach((originalStyle, el) => {
        if (el && el.setAttribute) {
            el.setAttribute('style', originalStyle);
        }
    });
    originalStyles.clear();
}

function updateDarkModeIcon() {
    const toggle = document.querySelector('.dark-mode-toggle');
    if (!toggle) return;
    
    const isDarkMode = document.body.classList.contains('dark-mode');
    const icon = toggle.querySelector('i');
    const currentLang = localStorage.getItem('language') || 'ar';
    
    if (isDarkMode) {
        icon.className = 'fas fa-sun';
        toggle.title = currentLang === 'ar' ? 'التبديل إلى الوضع النهاري' : 'Switch to Light Mode';
    } else {
        icon.className = 'fas fa-moon';
        toggle.title = currentLang === 'ar' ? 'تبديل الوضع الليلي' : 'Toggle Dark Mode';
    }
}

// Language Toggle Functions
function initializeLanguageToggle() {
    // Check for saved language preference or default to Arabic
    const savedLang = localStorage.getItem('language') || 'ar';
    
    // Apply language if it was previously set (but don't translate yet, wait for DOM)
    if (savedLang === 'en') {
        // Update HTML attributes immediately
        document.documentElement.lang = 'en';
        document.documentElement.dir = 'ltr';
        document.body.classList.remove('rtl');
        document.body.classList.add('ltr');
    } else {
        // Ensure Arabic is set
        document.documentElement.lang = 'ar';
        document.documentElement.dir = 'rtl';
        document.body.classList.remove('ltr');
        document.body.classList.add('rtl');
    }
    
    // Create language toggle button (must be after dark mode toggle is created)
    setTimeout(() => {
        createLanguageToggle();
        // Translate after a short delay to ensure DOM is ready
        if (savedLang === 'en') {
            translatePage('en');
        } else {
            translatePage('ar');
        }
    }, 100);
}

function createLanguageToggle() {
    // Check if toggle already exists
    if (document.querySelector('.language-toggle')) {
        return;
    }
    
    const toggle = document.createElement('button');
    toggle.className = 'language-toggle';
    const currentLang = localStorage.getItem('language') || 'ar';
    
    if (currentLang === 'ar') {
        toggle.innerHTML = '<i class="fas fa-globe"></i><span>EN</span>';
        toggle.title = 'Switch to English';
    } else {
        toggle.innerHTML = '<i class="fas fa-globe"></i><span>AR</span>';
        toggle.title = 'التبديل إلى العربية';
    }
    
    // Add toggle to header next to dark mode toggle
    const headerContainer = document.querySelector('.header-container');
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    if (headerContainer) {
        if (darkModeToggle) {
            // Insert before dark mode toggle (in RTL, this puts it to the left)
            // In LTR, we'll adjust the order via CSS
            headerContainer.insertBefore(toggle, darkModeToggle);
        } else {
            // If dark mode toggle doesn't exist, append to header
            headerContainer.appendChild(toggle);
        }
    }
    
    // Add click event listener
    toggle.addEventListener('click', toggleLanguage);
}

function toggleLanguage() {
    const currentLang = localStorage.getItem('language') || 'ar';
    
    if (currentLang === 'ar') {
        switchToEnglish();
    } else {
        switchToArabic();
    }
    
    // Update language toggle button
    updateLanguageToggleIcon();
    // Update dark mode toggle title
    updateDarkModeIcon();
}

function switchToEnglish() {
    // Set language preference
    localStorage.setItem('language', 'en');
    
    // Update HTML attributes
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
    document.body.classList.remove('rtl');
    document.body.classList.add('ltr');
    
    // Translate all elements with data-i18n attribute
    translatePage('en');
}

function switchToArabic() {
    // Set language preference
    localStorage.setItem('language', 'ar');
    
    // Update HTML attributes
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
    document.body.classList.remove('ltr');
    document.body.classList.add('rtl');
    
    // Translate all elements with data-i18n attribute
    translatePage('ar');
}

function translatePage(lang) {
    // Translation dictionary
    const translations = {
        ar: {
            'nav-home': 'الرئيسية',
            'nav-about': 'من نحن',
            'nav-contact': 'اتصل بنا',
            'nav-privacy': 'سياسة الخصوصية',
            'site-desc': 'تطبيقات ذكية وإنجازات رقمية',
            'dark-mode-title': 'تبديل الوضع الليلي',
            'dark-mode-title-light': 'التبديل إلى الوضع النهاري',
            'lang-toggle-title': 'التبديل إلى الإنجليزية',
            'lang-toggle-title-en': 'Switch to English'
        },
        en: {
            'nav-home': 'Home',
            'nav-about': 'About Us',
            'nav-contact': 'Contact Us',
            'nav-privacy': 'Privacy Policy',
            'site-desc': 'Smart Apps & Digital Achievements',
            'dark-mode-title': 'Toggle Dark Mode',
            'dark-mode-title-light': 'Switch to Light Mode',
            'lang-toggle-title': 'Switch to Arabic',
            'lang-toggle-title-en': 'Switch to Arabic'
        }
    };
    
    // Translate elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Translate navigation links
    const navLinks = document.querySelectorAll('.main-navigation a');
    if (navLinks.length >= 4) {
        if (lang === 'en') {
            navLinks[0].textContent = 'Home';
            navLinks[1].textContent = 'About Us';
            navLinks[2].textContent = 'Contact Us';
            navLinks[3].textContent = 'Privacy Policy';
        } else {
            navLinks[0].textContent = 'الرئيسية';
            navLinks[1].textContent = 'من نحن';
            navLinks[2].textContent = 'اتصل بنا';
            navLinks[3].textContent = 'سياسة الخصوصية';
        }
    }
    
    // Translate site description
    const siteDesc = document.querySelector('.site-description');
    if (siteDesc) {
        siteDesc.textContent = lang === 'en' ? 'Smart Apps & Digital Achievements' : 'تطبيقات ذكية وإنجازات رقمية';
    }
}

function updateLanguageToggleIcon() {
    const toggle = document.querySelector('.language-toggle');
    if (!toggle) return;
    
    const currentLang = localStorage.getItem('language') || 'ar';
    
    if (currentLang === 'ar') {
        toggle.innerHTML = '<i class="fas fa-globe"></i><span>EN</span>';
        toggle.title = 'Switch to English';
    } else {
        toggle.innerHTML = '<i class="fas fa-globe"></i><span>AR</span>';
        toggle.title = 'التبديل إلى العربية';
    }
}
