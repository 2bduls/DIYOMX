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
    // Comprehensive translation dictionary
    const translations = {
        ar: {
            // Navigation
            'nav-home': 'الرئيسية',
            'nav-about': 'من نحن',
            'nav-contact': 'اتصل بنا',
            'nav-privacy': 'سياسة الخصوصية',
            'site-desc': 'تطبيقات ذكية وإنجازات رقمية',
            'dark-mode-title': 'تبديل الوضع الليلي',
            'dark-mode-title-light': 'التبديل إلى الوضع النهاري',
            'lang-toggle-title': 'التبديل إلى الإنجليزية',
            
            // Page titles
            'page-title-privacy': 'سياسة الخصوصية',
            'page-subtitle-tasbiah': 'المسبحة الذكية اذكار - تسبيح - ديومكس',
            
            // Privacy intro
            'privacy-intro-1': 'نحن في ديومكس ندرك أهمية خصوصيتك وأمان بياناتك، خاصة عندما يتعلق الأمر بتطبيق روحي مثل المسبحة الذكية اذكار - تسبيح. تشرح هذه السياسة الشاملة كيفية جمع واستخدام وحماية المعلومات المتعلقة بالمسبحة الذكية اذكار - تسبيح وكيف نضمن حماية خصوصيتك والشخصية.',
            'last-updated': 'تاريخ آخر تحديث:',
            'app-name': 'المسبحة الذكية اذكار - تسبيح - ديومكس',
            
            // Sections
            'section-info-collect': 'المعلومات التي نجمعها',
            'section-how-use': 'كيفية استخدام المعلومات',
            'section-data-protection': 'حماية البيانات',
            'section-user-rights': 'حقوقك في البيانات',
            'section-data-retention': 'الاحتفاظ بالبيانات',
            'section-third-party': 'خدمات الطرف الثالث',
            'section-spiritual-privacy': 'الخصوصية',
            'section-compliance': 'الامتثال للقوانين والشرع',
            'section-children': 'خصوصية الأطفال',
            'section-updates': 'تحديثات السياسة',
            'section-contact': 'التواصل معنا',
            'section-related': 'سياسات ذات صلة',
            
            // Subsections
            'sub-basic-info': '1. المعلومات الشخصية الأساسية',
            'sub-spiritual-data': '2. البيانات العبادية (محفوظة محلياً فقط)',
            'sub-usage-info': '3. معلومات الاستخدام والتطبيق (مجهولة الهوية)',
            'sub-no-collect': '4. معلومات لا نجمعها أبداً',
            'sub-spiritual-use': 'الاستخدامات العبادية (محلية فقط)',
            'sub-technical-use': 'الاستخدامات التقنية (مجهولة الهوية)',
            'sub-security-measures': 'إجراءات الأمان المحلية',
            'sub-no-sharing': 'عدم مشاركة البيانات',
            'sub-gdpr-rights': 'حقوقك الأساسية (GDPR)',
            'sub-data-rights': 'حقوقك الخاصة بالبيانات',
            'sub-exercise-rights': 'كيفية ممارسة حقوقك',
            'sub-retention-period': 'فترة الاحتفاظ (محلياً فقط)',
            'sub-services-used': 'خدمات نستخدمها',
            'sub-google-services': 'Google Play Services و AdMob',
            'sub-protect-privacy': 'حماية خصوصيتك',
            'sub-islamic-compliance': 'الالتزام بالقوانين الإسلامية والمحلية',
            'sub-international-compliance': 'الامتثال للقوانين الدولية',
            'sub-data-commitments': 'التزاماتنا الخاصة بالبيانات',
            
            // Footer
            'footer-note': 'ملاحظة مهمة: هذه السياسة مكتوبة باللغة العربية وهي النسخة الرسمية. أي ترجمة أخرى هي للمرجع فقط.',
            'footer-app': 'التطبيق:',
            'footer-company': 'الشركة:',
            'footer-effective': 'تاريخ النفاذ:',
            'footer-commitment': 'الالتزام:',
            'company-name': 'ديومكس للتطبيقات الذكية',
            'commitment-text': 'نحن ملتزمون بحماية خصوصيتك والشخصية بأعلى معايير الأمان والسرية.',
            
            // Contact
            'email-label': 'البريد الإلكتروني:',
            'website-label': 'الموقع:',
            
            // Related policies
            'related-policies-text': 'يمكنك أيضاً مراجعة سياساتنا الأخرى:',
            'policy-website': 'سياسة خصوصية الموقع العام',
            'policy-electric': 'سياسة خصوصية DIY Electric Calculator',
            'policy-car': 'سياسة خصوصية تطبيق صيانة السيارات',
            'policy-money': 'سياسة خصوصية تطبيق إدارة المال الشخصي'
        },
        en: {
            // Navigation
            'nav-home': 'Home',
            'nav-about': 'About Us',
            'nav-contact': 'Contact Us',
            'nav-privacy': 'Privacy Policy',
            'site-desc': 'Smart Apps & Digital Achievements',
            'dark-mode-title': 'Toggle Dark Mode',
            'dark-mode-title-light': 'Switch to Light Mode',
            'lang-toggle-title': 'Switch to Arabic',
            
            // Page titles
            'page-title-privacy': 'Privacy Policy',
            'page-subtitle-tasbiah': 'Smart Tasbih App - Dhikr - DIYOMX',
            
            // Privacy intro
            'privacy-intro-1': 'At DIYOMX, we recognize the importance of your privacy and data security, especially when it comes to a spiritual application like the Smart Tasbih App - Dhikr. This comprehensive policy explains how we collect, use, and protect information related to the Smart Tasbih App - Dhikr and how we ensure the protection of your privacy and spirituality.',
            'last-updated': 'Last Updated:',
            'app-name': 'Smart Tasbih App - Dhikr - DIYOMX',
            
            // Sections
            'section-info-collect': 'Information We Collect',
            'section-how-use': 'How We Use Information',
            'section-data-protection': 'Data Protection',
            'section-user-rights': 'Your Data Rights',
            'section-data-retention': 'Data Retention',
            'section-third-party': 'Third Party Services',
            'section-spiritual-privacy': 'Spiritual Privacy',
            'section-compliance': 'Compliance with Laws and Regulations',
            'section-children': 'Children\'s Privacy',
            'section-updates': 'Policy Updates',
            'section-contact': 'Contact Us',
            'section-related': 'Related Policies',
            
            // Subsections
            'sub-basic-info': '1. Basic Personal Information',
            'sub-spiritual-data': '2. Spiritual Data (Stored Locally Only)',
            'sub-usage-info': '3. Usage and Application Information (Anonymous)',
            'sub-no-collect': '4. Information We Never Collect',
            'sub-spiritual-use': 'Spiritual Uses (Local Only)',
            'sub-technical-use': 'Technical Uses (Anonymous)',
            'sub-security-measures': 'Local Security Measures',
            'sub-no-sharing': 'No Data Sharing',
            'sub-gdpr-rights': 'Your Basic Rights (GDPR)',
            'sub-data-rights': 'Your Data-Specific Rights',
            'sub-exercise-rights': 'How to Exercise Your Rights',
            'sub-retention-period': 'Retention Period (Local Only)',
            'sub-services-used': 'Services We Use',
            'sub-google-services': 'Google Play Services and AdMob',
            'sub-protect-privacy': 'Protecting Your Privacy',
            'sub-islamic-compliance': 'Compliance with Islamic and Local Laws',
            'sub-international-compliance': 'Compliance with International Laws',
            'sub-data-commitments': 'Our Data-Specific Commitments',
            
            // Footer
            'footer-note': 'Important Note: This policy is written in Arabic and is the official version. Any other translation is for reference only.',
            'footer-app': 'Application:',
            'footer-company': 'Company:',
            'footer-effective': 'Effective Date:',
            'footer-commitment': 'Commitment:',
            'company-name': 'DIYOMX for Smart Applications',
            'commitment-text': 'We are committed to protecting your privacy and spirituality with the highest standards of security and confidentiality.',
            
            // Contact
            'email-label': 'Email:',
            'website-label': 'Website:',
            
            // Related policies
            'related-policies-text': 'You can also review our other policies:',
            'policy-website': 'General Website Privacy Policy',
            'policy-electric': 'DIY Electric Calculator Privacy Policy',
            'policy-car': 'Car Maintenance App Privacy Policy',
            'policy-money': 'Personal Money Management App Privacy Policy'
        }
    };
    
    // Helper function to translate text content
    function translateText(element, arText, enText) {
        if (element) {
            element.textContent = lang === 'en' ? enText : arText;
        }
    }
    
    // Helper function to translate HTML content (preserving structure)
    function translateHTML(element, arHTML, enHTML) {
        if (element) {
            element.innerHTML = lang === 'en' ? enHTML : arHTML;
        }
    }
    
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
        siteDesc.textContent = translations[lang]['site-desc'];
    }
    
    // Translate page title
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle && pageTitle.textContent.includes('سياسة الخصوصية')) {
        pageTitle.textContent = translations[lang]['page-title-privacy'];
    }
    
    // Translate page subtitle
    const pageSubtitle = document.querySelector('.page-subtitle');
    if (pageSubtitle) {
        pageSubtitle.textContent = translations[lang]['page-subtitle-tasbiah'];
    }
    
    // Translate all h2 headings (section titles)
    const sectionHeadings = document.querySelectorAll('.privacy-section > h2');
    sectionHeadings.forEach(h2 => {
        const text = h2.textContent.trim();
        const icon = h2.querySelector('i');
        const iconHTML = icon ? icon.outerHTML + ' ' : '';
        
        if (text.includes('المعلومات التي نجمعها')) {
            h2.innerHTML = iconHTML + translations[lang]['section-info-collect'];
        } else if (text.includes('كيفية استخدام المعلومات')) {
            h2.innerHTML = iconHTML + translations[lang]['section-how-use'];
        } else if (text.includes('حماية البيانات')) {
            h2.innerHTML = iconHTML + translations[lang]['section-data-protection'];
        } else if (text.includes('حقوقك في البيانات')) {
            h2.innerHTML = iconHTML + translations[lang]['section-user-rights'];
        } else if (text.includes('الاحتفاظ بالبيانات')) {
            h2.innerHTML = iconHTML + translations[lang]['section-data-retention'];
        } else if (text.includes('خدمات الطرف الثالث')) {
            h2.innerHTML = iconHTML + translations[lang]['section-third-party'];
        } else if (text.includes('الخصوصية')) {
            h2.innerHTML = iconHTML + translations[lang]['section-spiritual-privacy'];
        } else if (text.includes('الامتثال')) {
            h2.innerHTML = iconHTML + translations[lang]['section-compliance'];
        } else if (text.includes('خصوصية الأطفال')) {
            h2.innerHTML = iconHTML + translations[lang]['section-children'];
        } else if (text.includes('تحديثات السياسة')) {
            h2.innerHTML = iconHTML + translations[lang]['section-updates'];
        } else if (text.includes('التواصل معنا')) {
            h2.innerHTML = iconHTML + translations[lang]['section-contact'];
        } else if (text.includes('سياسات ذات صلة')) {
            h2.innerHTML = iconHTML + translations[lang]['section-related'];
        }
    });
    
    // Translate all h3 headings (subsection titles)
    const subsectionHeadings = document.querySelectorAll('.privacy-subsection > h3');
    subsectionHeadings.forEach(h3 => {
        const text = h3.textContent.trim();
        
        if (text.includes('المعلومات الشخصية الأساسية')) {
            h3.textContent = translations[lang]['sub-basic-info'];
        } else if (text.includes('البيانات العبادية')) {
            h3.textContent = translations[lang]['sub-spiritual-data'];
        } else if (text.includes('معلومات الاستخدام والتطبيق')) {
            h3.textContent = translations[lang]['sub-usage-info'];
        } else if (text.includes('معلومات لا نجمعها')) {
            h3.textContent = translations[lang]['sub-no-collect'];
        } else if (text.includes('الاستخدامات العبادية')) {
            h3.textContent = translations[lang]['sub-spiritual-use'];
        } else if (text.includes('الاستخدامات التقنية')) {
            h3.textContent = translations[lang]['sub-technical-use'];
        } else if (text.includes('إجراءات الأمان المحلية')) {
            h3.textContent = translations[lang]['sub-security-measures'];
        } else if (text.includes('عدم مشاركة البيانات')) {
            h3.textContent = translations[lang]['sub-no-sharing'];
        } else if (text.includes('حقوقك الأساسية')) {
            h3.textContent = translations[lang]['sub-gdpr-rights'];
        } else if (text.includes('حقوقك الخاصة بالبيانات')) {
            h3.textContent = translations[lang]['sub-data-rights'];
        } else if (text.includes('كيفية ممارسة حقوقك')) {
            h3.textContent = translations[lang]['sub-exercise-rights'];
        } else if (text.includes('فترة الاحتفاظ')) {
            h3.textContent = translations[lang]['sub-retention-period'];
        } else if (text.includes('خدمات نستخدمها')) {
            h3.textContent = translations[lang]['sub-services-used'];
        } else if (text.includes('Google Play Services')) {
            h3.textContent = translations[lang]['sub-google-services'];
        } else if (text.includes('حماية خصوصيتك')) {
            h3.textContent = translations[lang]['sub-protect-privacy'];
        } else if (text.includes('الالتزام بالقوانين الإسلامية')) {
            h3.textContent = translations[lang]['sub-islamic-compliance'];
        } else if (text.includes('الامتثال للقوانين الدولية')) {
            h3.textContent = translations[lang]['sub-international-compliance'];
        } else if (text.includes('التزاماتنا الخاصة')) {
            h3.textContent = translations[lang]['sub-data-commitments'];
        }
    });
    
    // Translate privacy intro paragraph
    const introParagraphs = document.querySelectorAll('.privacy-intro > p');
    if (introParagraphs.length > 0) {
        const firstPara = introParagraphs[0];
        if (firstPara.textContent.includes('نحن في ديومكس')) {
            firstPara.textContent = translations[lang]['privacy-intro-1'];
        }
        
        // Translate "Last Updated" paragraph
        if (introParagraphs.length > 1) {
            const secondPara = introParagraphs[1];
            if (secondPara.textContent.includes('تاريخ آخر تحديث')) {
                secondPara.innerHTML = '<strong>' + translations[lang]['last-updated'] + '</strong> 15 September 2025';
            }
        }
    }
    
    // Translate app badge
    const appBadge = document.querySelector('.app-badge span');
    if (appBadge) {
        appBadge.textContent = translations[lang]['app-name'];
    }
    
    // Translate footer
    const footerParagraphs = document.querySelectorAll('.privacy-footer > p');
    footerParagraphs.forEach(p => {
        const text = p.textContent.trim();
        if (text.includes('ملاحظة مهمة')) {
            p.innerHTML = '<strong>' + translations[lang]['footer-note'].split(':')[0] + ':</strong> ' + translations[lang]['footer-note'].split(':')[1];
        } else if (text.includes('التطبيق:')) {
            p.innerHTML = '<strong>' + translations[lang]['footer-app'] + '</strong> ' + translations[lang]['app-name'];
        } else if (text.includes('الشركة:')) {
            p.innerHTML = '<strong>' + translations[lang]['footer-company'] + '</strong> ' + translations[lang]['company-name'];
        } else if (text.includes('تاريخ النفاذ:')) {
            p.innerHTML = '<strong>' + translations[lang]['footer-effective'] + '</strong> 15 September 2025';
        } else if (text.includes('الالتزام:')) {
            p.innerHTML = '<strong>' + translations[lang]['footer-commitment'] + '</strong> ' + translations[lang]['commitment-text'];
        }
    });
    
    // Translate contact items
    const contactItems = document.querySelectorAll('.contact-item span');
    contactItems.forEach(span => {
        if (span.textContent.includes('البريد الإلكتروني:')) {
            span.textContent = translations[lang]['email-label'] + ' diyomx@gmail.com';
        } else if (span.textContent.includes('الموقع:')) {
            span.textContent = translations[lang]['website-label'] + ' www.diyomx.com';
        }
    });
    
    // Translate related policies section - find by section content
    const allSections = document.querySelectorAll('.privacy-section');
    allSections.forEach(section => {
        const h2 = section.querySelector('h2');
        if (h2 && h2.textContent.includes('سياسات ذات صلة')) {
            const para = section.querySelector('.privacy-subsection > p');
            if (para && para.textContent.includes('يمكنك أيضاً')) {
                para.textContent = translations[lang]['related-policies-text'];
            }
            
            // Translate related policy links
            const links = section.querySelectorAll('.privacy-subsection a');
            links.forEach(link => {
                const href = link.getAttribute('href');
                if (href) {
                    if (href.includes('privacy-website')) {
                        link.textContent = translations[lang]['policy-website'];
                    } else if (href.includes('privacy-electric')) {
                        link.textContent = translations[lang]['policy-electric'];
                    } else if (href.includes('privacy-car')) {
                        link.textContent = translations[lang]['policy-car'];
                    } else if (href.includes('privacy-money')) {
                        link.textContent = translations[lang]['policy-money'];
                    }
                }
            });
        }
    });
    
    // Store original Arabic text in data attributes for restoration
    if (lang === 'en') {
        // First pass: store original Arabic text
        document.querySelectorAll('.privacy-content p, .privacy-content li').forEach(element => {
            if (!element.hasAttribute('data-ar-original')) {
                element.setAttribute('data-ar-original', element.innerHTML);
            }
        });
        
        // Translate paragraphs and list items based on their content patterns
        document.querySelectorAll('.privacy-content p, .privacy-content li').forEach(element => {
            const originalText = element.getAttribute('data-ar-original') || element.innerHTML;
            let translatedText = originalText;
            
            // Comprehensive translation patterns for common phrases
            const translationPatterns = [
                // Basic info section
                { ar: /المسبحة الذكية اذكار - تسبيح لا يتطلب تسجيل دخول ولا نجمع أي معلومات شخصية من المستخدمين/g, en: 'The Smart Tasbih App - Dhikr does not require login and we do not collect any personal information from users.' },
                { ar: /لا نطلب الاسم:/g, en: 'We do not request name:' },
                { ar: /التطبيق يعمل بدون الحاجة لاسم المستخدم/g, en: 'The app works without requiring a username' },
                { ar: /لا نطلب البريد الإلكتروني:/g, en: 'We do not request email:' },
                { ar: /لا نجمع عناوين البريد الإلكتروني/g, en: 'We do not collect email addresses' },
                { ar: /لا نطلب تاريخ الميلاد:/g, en: 'We do not request date of birth:' },
                { ar: /لا نحتاج لمعلومات العمر/g, en: 'We do not need age information' },
                { ar: /لا نطلب الموقع:/g, en: 'We do not request location:' },
                { ar: /التطبيق يعمل بدون معرفة موقعك الجغرافي/g, en: 'The app works without knowing your geographical location' },
                
                // Spiritual data section
                { ar: /جميع البيانات التالية محفوظة محلياً على جهازك فقط ولا ترسل إلى أي خوادم:/g, en: 'All the following data is stored locally on your device only and is not sent to any servers:' },
                { ar: /إحصائيات التسبيح:/g, en: 'Tasbih statistics:' },
                { ar: /عدد المرات والتواريخ والأوقات ومواعيد التسبيح \(محفوظة محلياً\)/g, en: 'Number of times, dates, times, and tasbih schedules (stored locally)' },
                { ar: /الأذكار المفضلة:/g, en: 'Favorite dhikr:' },
                { ar: /الأذكار التي تختارها كأذكار مفضلة \(محفوظة محلياً\)/g, en: 'Dhikr that you choose as favorites (stored locally)' },
                { ar: /جدول التسبيح:/g, en: 'Tasbih schedule:' },
                { ar: /الأهداف اليومية والشهرية للتسبيح \(محفوظة محلياً\)/g, en: 'Daily and monthly tasbih goals (stored locally)' },
                { ar: /التذكيرات:/g, en: 'Reminders:' },
                { ar: /إعدادات التذكيرات والتوقيتات المفضلة \(محفوظة محلياً\)/g, en: 'Reminder settings and preferred times (stored locally)' },
                { ar: /الإنجازات:/g, en: 'Achievements:' },
                { ar: /الشهادات والإنجازات المحققة \(محفوظة محلياً\)/g, en: 'Certificates and achievements achieved (stored locally)' },
                { ar: /ملاحظات شخصية:/g, en: 'Personal notes:' },
                { ar: /أي ملاحظات أو تأملات تريد حفظها \(محفوظة محلياً\)/g, en: 'Any notes or reflections you want to save (stored locally)' },
                
                // Usage info section
                { ar: /قد نجمع المعلومات التالية لأغراض تحسين التطبيق فقط:/g, en: 'We may collect the following information for app improvement purposes only:' },
                { ar: /إحصائيات الاستخدام:/g, en: 'Usage statistics:' },
                { ar: /الميزات الأكثر استخداماً والأوقات المفضلة \(مجهولة الهوية\)/g, en: 'Most used features and preferred times (anonymous)' },
                { ar: /التفضيلات:/g, en: 'Preferences:' },
                { ar: /الإعدادات الشخصية والمظهر المفضل \(محفوظة محلياً\)/g, en: 'Personal settings and preferred appearance (stored locally)' },
                { ar: /معلومات الجهاز:/g, en: 'Device information:' },
                { ar: /نوع الجهاز ونظام التشغيل لتحسين الأداء \(مجهولة الهوية\)/g, en: 'Device type and operating system to improve performance (anonymous)' },
                { ar: /سجلات الأخطاء:/g, en: 'Error logs:' },
                { ar: /معلومات تقنية لحل المشاكل وتحسين التطبيق \(مجهولة الهوية\)/g, en: 'Technical information to solve problems and improve the app (anonymous)' },
                { ar: /معلومات الشبكة:/g, en: 'Network information:' },
                { ar: /حالة الاتصال بالإنترنت \(مجهولة الهوية\)/g, en: 'Internet connection status (anonymous)' },
                
                // No collect section
                { ar: /لا نجمع معلومات الموقع الجغرافي الدقيق/g, en: 'We do not collect precise geographical location information' },
                { ar: /لا نجمع معلومات الاتصالات أو جهات الاتصال/g, en: 'We do not collect contact or address book information' },
                { ar: /لا نجمع معلومات مالية أو مصرفية/g, en: 'We do not collect financial or banking information' },
                { ar: /لا نجمع صور أو ملفات شخصية/g, en: 'We do not collect photos or personal files' },
                { ar: /لا نجمع معلومات حساسة أخرى غير متعلقة بالعبادة/g, en: 'We do not collect other sensitive information unrelated to worship' },
                { ar: /لا نراقب نشاطك خارج التطبيق/g, en: 'We do not monitor your activity outside the app' },
                
                // Common phrases
                { ar: /جميع البيانات محفوظة محلياً على جهازك وتستخدم فقط داخلياً:/g, en: 'All data is stored locally on your device and used only internally:' },
                { ar: /المعلومات التقنية المجمعة تستخدم فقط لتحسين التطبيق:/g, en: 'The collected technical information is used only to improve the app:' },
                { ar: /جميع البيانات محفوظة محلياً على جهازك فقط:/g, en: 'All data is stored locally on your device only:' },
                { ar: /نحن لا نشارك أو نبيع أو نرسل بياناتك مع أي طرف ثالث أبداً:/g, en: 'We do not share, sell, or send your data with any third party ever:' },
            ];
            
            // Apply translation patterns
            translationPatterns.forEach(pattern => {
                translatedText = translatedText.replace(pattern.ar, pattern.en);
            });
            
            // Only update if translation was applied
            if (translatedText !== originalText) {
                element.innerHTML = translatedText;
                element.setAttribute('data-translated', 'true');
            }
        });
    } else {
        // Restore original Arabic text
        document.querySelectorAll('.privacy-content p[data-ar-original], .privacy-content li[data-ar-original]').forEach(element => {
            const original = element.getAttribute('data-ar-original');
            if (original) {
                element.innerHTML = original;
                element.removeAttribute('data-translated');
            }
        });
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
