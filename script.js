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

    // Load achievements data automatically
    loadAchievementsData();

    // Counter animation for achievements
    function animateCounters() {
        const counters = document.querySelectorAll('.achievement-number');
        
        counters.forEach(counter => {
            const targetValue = counter.getAttribute('data-value');
            if (!targetValue) return;
            
            const isPercentage = counter.textContent.includes('%');
            const isDecimal = counter.textContent.includes('.');
            const suffix = counter.textContent.replace(/[\d.]/g, '');
            
            let target = parseFloat(targetValue);
            let current = 0;
            const increment = target / 50;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    if (isDecimal) {
                        counter.textContent = current.toFixed(1) + suffix;
                    } else if (isPercentage) {
                        counter.textContent = Math.floor(current) + '%';
                    } else {
                        counter.textContent = Math.floor(current) + suffix;
                    }
                    requestAnimationFrame(updateCounter);
                } else {
                    if (isDecimal) {
                        counter.textContent = target.toFixed(1) + suffix;
                    } else if (isPercentage) {
                        counter.textContent = target + '%';
                    } else {
                        counter.textContent = target + suffix;
                    }
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
    // Use setTimeout to ensure DOM is fully ready
    setTimeout(() => {
        initializeDarkMode();
    }, 50);

    // Language Toggle Functionality
    // Use setTimeout to ensure DOM is fully ready and dark mode toggle is created first
    setTimeout(() => {
        initializeLanguageToggle();
    }, 150);

    console.log('ديومكس - الموقع جاهز للاستخدام!');
});

// Load achievements data automatically
async function loadAchievementsData() {
    try {
        // Try to load from local JSON file first
        const response = await fetch('achievements-data.json');
        if (response.ok) {
            const data = await response.json();
            updateAchievementsFromData(data);
        } else {
            // If file doesn't exist, try to fetch from Google Play Store API
            await fetchFromGooglePlay();
        }
    } catch (error) {
        console.log('Loading from local data file...', error);
        // Fallback: try Google Play Store scraping or use default values
        await fetchFromGooglePlay();
    }
}

// Update achievements from JSON data
function updateAchievementsFromData(data) {
    const mapping = {
        'apps-published': () => data.apps.published,
        'apps-development': () => data.apps.inDevelopment,
        'users-active': () => data.users.active,
        'downloads': () => data.users.downloads,
        'rating-average': () => data.ratings.average,
        'ratings-count': () => data.ratings.count,
        'countries': () => data.global.countries,
        'languages': () => data.global.languages,
        'updates': () => data.updates.total,
        'privacy': () => data.privacy.localData,
        'features': () => data.features.perApp,
        'satisfaction': () => data.satisfaction.rate
    };

    Object.keys(mapping).forEach(key => {
        const item = document.querySelector(`[data-key="${key}"]`);
        if (item) {
            const numberElement = item.querySelector('.achievement-number');
            if (numberElement) {
                const value = mapping[key]();
                const currentText = numberElement.textContent;
                const suffix = currentText.replace(/[\d.]/g, '');
                const isPercentage = currentText.includes('%');
                const isDecimal = currentText.includes('.');
                
                numberElement.setAttribute('data-value', value);
                
                if (isPercentage) {
                    numberElement.textContent = value + '%';
                } else if (isDecimal) {
                    numberElement.textContent = value.toFixed(1) + suffix;
                } else {
                    numberElement.textContent = value + suffix;
                }
            }
        }
    });
}

// Fetch data from Google Play Store (using scraping or API)
async function fetchFromGooglePlay() {
    try {
        // Google Play Store App ID
        const appId = 'com.diyom.tasbiah';
        
        // Try to fetch from Google Play Store page
        // Note: This requires a CORS proxy or backend service
        const playStoreUrl = `https://play.google.com/store/apps/details?id=${appId}`;
        
        // Alternative: Use a backend API endpoint if available
        // const apiUrl = `https://your-backend.com/api/play-store-stats?appId=${appId}`;
        // const response = await fetch(apiUrl);
        
        // For now, we'll use the local JSON file as fallback
        // In production, you can set up a backend service to fetch from Google Play Store API
        
        console.log('Using local achievements data. To fetch from Google Play Store, set up a backend API.');
    } catch (error) {
        console.error('Error fetching from Google Play Store:', error);
        // Keep default values from HTML
    }
}

// Auto-refresh achievements data every hour
setInterval(() => {
    loadAchievementsData();
}, 3600000); // 1 hour in milliseconds

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
    toggle.setAttribute('type', 'button');
    toggle.setAttribute('aria-label', 'Toggle Dark Mode');
    const currentLang = localStorage.getItem('language') || 'ar';
    toggle.title = currentLang === 'ar' ? 'تبديل الوضع الليلي' : 'Toggle Dark Mode';
    
    // Add toggle to header
    const headerContainer = document.querySelector('.header-container');
    if (headerContainer) {
        headerContainer.appendChild(toggle);
        // Ensure it's visible
        toggle.style.display = 'flex';
        toggle.style.visibility = 'visible';
    } else {
        // Retry after a short delay if header is not ready
        setTimeout(() => {
            const retryContainer = document.querySelector('.header-container');
            if (retryContainer) {
                retryContainer.appendChild(toggle);
                toggle.style.display = 'flex';
                toggle.style.visibility = 'visible';
            }
        }, 200);
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
    toggle.setAttribute('type', 'button');
    toggle.setAttribute('aria-label', 'Toggle Language');
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
        // Ensure it's visible
        toggle.style.display = 'flex';
        toggle.style.visibility = 'visible';
    } else {
        // Retry after a short delay if header is not ready
        setTimeout(() => {
            const retryContainer = document.querySelector('.header-container');
            const retryDarkModeToggle = document.querySelector('.dark-mode-toggle');
            if (retryContainer) {
                if (retryDarkModeToggle) {
                    retryContainer.insertBefore(toggle, retryDarkModeToggle);
                } else {
                    retryContainer.appendChild(toggle);
                }
                toggle.style.display = 'flex';
                toggle.style.visibility = 'visible';
            }
        }, 200);
    }
    
    // Add click event listener
    toggle.addEventListener('click', toggleLanguage);
    
    // Also add mousedown to ensure it works
    toggle.addEventListener('mousedown', function(e) {
        e.preventDefault();
    });
}

function toggleLanguage(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
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
            'policy-money': 'سياسة خصوصية تطبيق إدارة المال الشخصي',
            
            // Main page content
            'hero-title': 'مرحباً بك في ديومكس',
            'hero-subtitle': 'نحن فريق متخصص في تطوير التطبيقات الذكية والحلول الرقمية المبتكرة',
            'btn-explore-apps': 'استكشف تطبيقاتنا',
            'btn-contact': 'تواصل معنا',
            'section-apps': 'تطبيقاتنا للأندرويد',
            'section-websites': 'مواقعنا الإلكترونية',
            'section-youtube': 'شروحاتنا على يوتيوب',
            'section-achievements': 'إنجازاتنا',
            'section-features': 'لماذا ديومكس؟',
            'app-tasbiah-title': 'تطبيق التسبيح',
            'app-tasbiah-desc': 'تطبيق ذكي للتسبيح والذكر مع ميزات متقدمة للعد والتتبع',
            'app-tasbiah-feature1': 'عداد ذكي للتسبيح',
            'app-tasbiah-feature2': 'أذكار متنوعة',
            'app-tasbiah-feature3': 'إعلانات غير مزعجة',
            'app-electric-title': 'DIY Electric Calculator',
            'app-electric-desc': 'تطبيق لحساب الطاقة وحجم الأسلاك والطاقة الشمسية والبطاريات',
            'app-electric-feature1': 'حساب الطاقة',
            'app-electric-feature2': 'حساب حجم الأسلاك',
            'app-electric-feature3': 'حساب الطاقة الشمسية',
            'app-electric-feature4': 'حساب البطاريات',
            'app-car-title': 'صيانة السيارات',
            'app-car-desc': 'تطبيق شامل لإدارة صيانة السيارات وتتبع الخدمات',
            'app-car-feature1': 'جدولة الصيانة الدورية',
            'app-car-feature2': 'تتبع تاريخ الخدمات',
            'app-car-feature3': 'تنبيهات الصيانة',
            'app-car-feature4': 'تنبيهات الضمان',
            'app-money-title': 'إدارة المال الشخصي',
            'app-money-desc': 'تطبيق لإدارة الميزانية الشخصية وتتبع المصروفات',
            'app-money-feature1': 'تتبع الدخل والمصروفات',
            'app-money-feature2': 'إنشاء ميزانية شهرية',
            'app-money-feature3': 'تقارير مالية مفصلة',
            'app-money-feature4': 'تنبيهات الميزانية',
            'website-tasbiah-title': 'موقع التسبيح الإلكتروني',
            'website-tasbiah-desc': 'موقع ويب شامل للتسبيح والذكر مع ميزات متقدمة',
            'website-tasbiah-feature1': 'عداد ذكي للتسبيح',
            'website-tasbiah-feature2': 'أذكار متنوعة',
            'website-tasbiah-feature3': 'يعمل على جميع الأجهزة',
            'website-tasbiah-feature4': 'واجهة سهلة الاستخدام',
            'btn-download': 'تحميل من Google Play',
            'btn-visit': 'زيارة الموقع',
            'status-available': 'متاح الآن',
            'status-development': 'قيد التطوير',
            'status-coming': 'قريباً',
            'youtube-intro': 'نقدم شروحات تقنية متخصصة على قناتنا في يوتيوب لتطوير التطبيقات والبرمجة',
            'youtube-card1-title': 'شروحات تطوير التطبيقات',
            'youtube-card1-desc': 'شروحات مفصلة لتطوير تطبيقات الأندرويد والبرمجة',
            'youtube-card2-title': 'دروس البرمجة',
            'youtube-card2-desc': 'دروس تعليمية في البرمجة والتطوير للمبتدئين والمحترفين',
            'youtube-card3-title': 'نصائح وتقنيات',
            'youtube-card3-desc': 'نصائح وتقنيات متقدمة في تطوير التطبيقات والبرمجة',
            'btn-watch': 'مشاهدة الشروحات',
            'achievement-apps': 'تطبيقات مطورة',
            'achievement-apps-desc': 'تطبيق متاح على Google Play',
            'achievement-dev': 'تطبيقات قيد التطوير',
            'achievement-dev-desc': 'قريباً على المتاجر',
            'achievement-users': 'مستخدم نشط',
            'achievement-users-desc': 'يستخدمون تطبيقاتنا يومياً',
            'achievement-downloads': 'تحميل',
            'achievement-downloads-desc': 'من Google Play Store',
            'achievement-rating': 'تقييم متوسط',
            'achievement-rating-desc': 'من المستخدمين',
            'achievement-reviews': 'تقييم',
            'achievement-reviews-desc': 'تقييمات إيجابية',
            'achievement-countries': 'دولة',
            'achievement-countries-desc': 'يستخدمون تطبيقاتنا',
            'achievement-languages': 'لغة',
            'achievement-languages-desc': 'العربية والإنجليزية',
            'achievement-updates': 'تحديث',
            'achievement-updates-desc': 'تحسينات وميزات جديدة',
            'achievement-privacy': 'خصوصية',
            'achievement-privacy-desc': 'بيانات محلية فقط',
            'achievement-features': 'ميزة',
            'achievement-features-desc': 'في كل تطبيق',
            'achievement-satisfaction': 'رضا',
            'achievement-satisfaction-desc': 'معدل رضا المستخدمين',
            'feature-fast-title': 'تطوير سريع',
            'feature-fast-desc': 'نطور تطبيقاتنا ومواقعنا بأحدث التقنيات وأسرع الطرق',
            'feature-security-title': 'أمان عالي',
            'feature-security-desc': 'نضمن حماية بيانات المستخدمين بأعلى معايير الأمان',
            'feature-support-title': 'دعم فني',
            'feature-support-desc': 'فريق دعم فني متاح لخدمة جميع مستخدمينا',
            'footer-title': 'ديومكس',
            'footer-desc': 'تطبيقات ذكية وإنجازات رقمية',
            'footer-privacy-title': 'سياسات الخصوصية',
            'footer-copyright': 'جميع الحقوق محفوظة.',
            'websites-note': 'نعمل على تطوير مواقع وتطبيقات جديدة قريباً',
            'content-title': 'ديومكس - تطبيقات ذكية للمستخدمين حول العالم',
            'content-para1': 'ديومكس هي شركة متخصصة في تطوير التطبيقات الذكية والحلول الرقمية المبتكرة للمستخدمين حول العالم. نحن نؤمن بأن التكنولوجيا يجب أن تكون في خدمة الإنسان، ولهذا نركز على تطوير تطبيقات مفيدة وسهلة الاستخدام تعمل على تحسين حياة المستخدمين وتسهيل مهامهم اليومية.',
            'content-para2': 'بدأت رحلتنا بإطلاق تطبيق التسبيح الذي حقق نجاحاً كبيراً وحصل على تقييمات إيجابية من المستخدمين. التطبيق متوفر الآن على Google Play Store ويمكن تحميله مجاناً. كما طورنا موقع التسبيح الإلكتروني (tasbiah.diyomx.com) الذي يوفر تجربة مماثلة على الويب. نحن نعمل حالياً على تطوير تطبيقات ومواقع جديدة مثل حاسبة الكهرباء وتطبيق صيانة السيارات، بالإضافة إلى مشاريع أخرى مفيدة للمستخدمين حول العالم.',
            'content-para3': 'جميع تطبيقاتنا مجانية تماماً وتراعي خصوصية المستخدمين. نحن نؤمن بأهمية حماية بيانات المستخدمين وعدم جمع أي معلومات شخصية غير ضرورية. تطبيقاتنا تعمل بشكل كامل بدون الحاجة لاتصال بالإنترنت في معظم الحالات.',
            
            // About page
            'about-subtitle': 'تعرف على فريق ديومكس وقصة نجاحنا',
            'about-story-title': 'قصتنا',
            'about-story-para1': 'ديومكس هي شركة متخصصة في تطوير التطبيقات الذكية والمواقع الإلكترونية وإنتاج الشروحات التقنية على يوتيوب. تأسست الشركة في 26 أغسطس 2025 من مجموعة من المطورين المتميزين الذين يجمعون بين الخبرة التقنية العميقة والشغف بالإبداع والابتكار.',
            'about-story-para2': 'نؤمن في ديومكس أن التكنولوجيا يجب أن تكون في خدمة الإنسان، ولهذا نركز على تطوير تطبيقات مفيدة وسهلة الاستخدام تعمل على تحسين حياة المستخدمين وتسهيل مهامهم اليومية. كما نقدم شروحات تقنية متخصصة على قناتنا في يوتيوب لمساعدة المطورين والمبرمجين في تعلم أحدث التقنيات.',
            'about-story-para3': 'بدأت رحلتنا بإطلاق تطبيق التسبيح الذي حقق نجاحاً كبيراً، كما طورنا موقع التسبيح الإلكتروني (tasbiah.diyomx.com). نحن نعمل حالياً على تطوير تطبيقات ومواقع جديدة مثل حاسبة الكهرباء وتطبيق صيانة السيارات، بالإضافة إلى مشاريع أخرى مفيدة للمستخدمين حول العالم.',
            'about-vision-title': 'رؤيتنا',
            'about-vision-desc': 'أن نكون الرائدين في مجال تطوير التطبيقات الذكية والشروحات التقنية على مستوى العالم، وأن نساهم في بناء مجتمع رقمي متقدم ومتطور.',
            'about-mission-title': 'رسالتنا',
            'about-mission-desc': 'تطوير تطبيقات مبتكرة وذكية تلبي احتياجات المستخدمين حول العالم، وإنتاج محتوى تعليمي تقني عالي الجودة على يوتيوب لمساعدة المطورين والمبرمجين.',
            'about-services-title': 'خدماتنا',
            'service-apps-title': 'تطوير التطبيقات',
            'service-apps-desc': 'نطور تطبيقات ذكية ومبتكرة للهواتف الذكية والأجهزة اللوحية',
            'service-websites-title': 'تطوير المواقع الإلكترونية',
            'service-websites-desc': 'نطور مواقع ويب حديثة ومتجاوبة مع ميزات متقدمة وسهلة الاستخدام',
            'service-tutorials-title': 'الشروحات التقنية',
            'service-tutorials-desc': 'نقدم شروحات تقنية متخصصة على يوتيوب لتطوير التطبيقات والبرمجة',
            'service-design-title': 'تصميم الواجهات',
            'service-design-desc': 'نصمم واجهات مستخدم جذابة وسهلة الاستخدام',
            'service-support-title': 'الدعم الفني',
            'service-support-desc': 'نقدم دعم فني متخصص لجميع تطبيقاتنا ومواقعنا ومستخدمينا',
            'about-values-title': 'قيمنا',
            'value-innovation-title': 'الابتكار',
            'value-innovation-desc': 'نبحث دائماً عن طرق جديدة ومبتكرة لحل المشاكل وتطوير الحلول',
            'value-quality-title': 'الجودة',
            'value-quality-desc': 'نلتزم بأعلى معايير الجودة في كل ما ننتجه ونطوره',
            'value-transparency-title': 'الشفافية',
            'value-transparency-desc': 'نؤمن بالشفافية والوضوح في جميع تعاملاتنا مع العملاء',
            'value-teamwork-title': 'العمل الجماعي',
            'value-teamwork-desc': 'نعمل كفريق واحد لتحقيق أفضل النتائج',
            'about-team-title': 'فريقنا',
            'member-role-manager': 'مدير المشروع',
            'member-role-developer': 'مطور تطبيقات',
            'member-role-tester': 'المختبر الأول',
            'member-role-expert': 'خبير أول',
            'about-timeline-title': 'رحلة نجاحنا',
            'timeline-foundation-title': 'تأسيس الفريق',
            'timeline-foundation-desc': 'تأسس الفريق بتاريخ 26/08/2025',
            'timeline-first-app-title': 'أول تطبيق',
            'timeline-first-app-desc': 'تم البدء بالعمل على أول تطبيق بتاريخ 28/08/2025',
            'timeline-release-title': 'إصدار أول تطبيق',
            'timeline-release-desc': 'تم إصدار أول تطبيق المسبحة الذكية اذكار وتسبيح بتاريخ 7/10/2025',
            'timeline-future-title': 'المستقبل',
            'timeline-future-desc': 'إطلاق مشاريع جديدة ومبتكرة',
            
            // Contact page
            'contact-subtitle': 'نحن هنا لمساعدتك في أي وقت',
            'contact-form-title': 'أرسل لنا رسالة',
            'form-label-name': 'الاسم الكامل',
            'form-label-email': 'البريد الإلكتروني',
            'form-label-phone': 'رقم الهاتف',
            'form-label-subject': 'الموضوع',
            'form-label-message': 'الرسالة',
            'form-placeholder-subject': 'اختر الموضوع',
            'form-option-support': 'دعم فني للتطبيقات',
            'form-option-bug': 'تقرير خطأ في التطبيق',
            'form-option-feature': 'اقتراح ميزة جديدة',
            'form-option-youtube': 'استفسار حول شروحات يوتيوب',
            'form-option-business': 'أعمال تجارية',
            'form-option-partnership': 'شراكة أو تعاون',
            'form-option-other': 'أخرى',
            'form-placeholder-message': 'اكتب رسالتك هنا...',
            'form-btn-send': 'إرسال الرسالة',
            'contact-info-title': 'معلومات التواصل',
            'contact-email-title': 'البريد الإلكتروني',
            'contact-address-title': 'العنوان',
            'contact-address': 'مسقط , سلطنة عمان',
            'contact-hours-title': 'ساعات العمل',
            'contact-hours-weekdays': 'الأحد - الاربعاء: 10:00 ص - 4:00 م',
            'contact-hours-weekend': 'الخميس - السبت: مغلق',
            'contact-faq-title': 'الأسئلة الشائعة',
            'faq-download-q': 'كيف يمكنني تحميل تطبيقاتكم؟',
            'faq-download-a': 'يمكنك تحميل تطبيقاتنا من متجر Google Play، ونحاول بأسرع وقت إدراجها على App Store. تطبيق التسبيح متاح الآن، والتطبيقات الأخرى قيد التطوير.',
            'faq-free-q': 'هل تطبيقاتكم مجانية؟',
            'faq-free-a': 'نعم، جميع تطبيقاتنا الأساسية مجانية مع إمكانية الترقية للميزات المتقدمة.',
            'faq-coming-q': 'متى ستكون تطبيقات حساب الكهرباء وصيانة السيارات متاحة؟',
            'faq-coming-a': 'نعمل حالياً على تطوير هذه التطبيقات وستكون متاحة قريباً. يمكنك متابعة آخر التحديثات على موقعنا.',
            'faq-youtube-q': 'هل تقدمون شروحات على يوتيوب؟',
            'faq-youtube-a': 'حالياً لا، ولكن نأمل في إنشاء قناة يوتيوب قريباً لتقديم شروحات تقنية متخصصة.',
            'faq-bug-q': 'كيف يمكنني الإبلاغ عن خطأ في التطبيق؟',
            'faq-bug-a': 'يمكنك استخدام نموذج الاتصال أعلاه واختيار "تقرير خطأ في التطبيق" كموضوع الرسالة.',
            'faq-support-q': 'هل تقدمون دعم فني؟',
            'faq-support-a': 'نعم، نقدم دعم فني مجاني لجميع المستخدمين عبر البريد الإلكتروني.',
            'contact-social-title': 'تابعنا على وسائل التواصل',
            'social-twitter': 'تويتر',
            'social-instagram': 'إنستغرام',
            'social-youtube': 'يوتيوب',
            
            // Privacy options page
            'privacy-options-subtitle': 'اختر السياسة المناسبة لك',
            'privacy-options-intro': 'نحن في ديومكس نؤمن بأهمية الشفافية والخصوصية. لكل تطبيق وخدمة نقدمها سياسة خصوصية مفصلة ومخصصة. اختر السياسة التي تهمك من القائمة أدناه.',
            'privacy-badge-text': 'حماية خصوصيتك هي أولويتنا',
            'privacy-website-title': 'سياسة الخصوصية العامة',
            'privacy-website-desc': 'للموقع والخدمات العامة',
            'privacy-tasbiah-title': 'تطبيق التسبيح',
            'privacy-tasbiah-desc': 'حماية البيانات الروحية والعبادية',
            'privacy-tasbiah-badge': 'الأكثر شمولية',
            'privacy-electric-title': 'DIY Electric Calculator',
            'privacy-electric-desc': 'حماية حسابات الكهرباء والمشاريع',
            'privacy-car-title': 'صيانة السيارات',
            'privacy-car-desc': 'حماية بيانات السيارة والصيانة',
            'privacy-money-title': 'إدارة المال الشخصي',
            'privacy-money-desc': 'حماية البيانات المالية الحساسة',
            'privacy-money-badge': 'أعلى مستوى أمان',
            'privacy-feature-website-1': 'حماية بيانات الموقع',
            'privacy-feature-website-2': 'ملفات تعريف الارتباط',
            'privacy-feature-website-3': 'خدمات الطرف الثالث',
            'privacy-feature-website-4': 'حقوق المستخدم',
            'privacy-feature-tasbiah-1': 'حماية البيانات الروحية',
            'privacy-feature-tasbiah-2': 'السرية المطلقة',
            'privacy-feature-tasbiah-3': 'التشفير المتقدم',
            'privacy-feature-tasbiah-4': 'الامتثال للشريعة',
            'privacy-feature-electric-1': 'حماية الحسابات',
            'privacy-feature-electric-2': 'المشاريع المحفوظة',
            'privacy-feature-electric-3': 'التشفير المحلي',
            'privacy-feature-electric-4': 'عدم المشاركة',
            'privacy-feature-car-1': 'بيانات السيارة',
            'privacy-feature-car-2': 'تاريخ الصيانة',
            'privacy-feature-car-3': 'التكاليف والأجزاء',
            'privacy-feature-car-4': 'الأمان المتقدم',
            'privacy-feature-money-1': 'التشفير المزدوج',
            'privacy-feature-money-2': 'حماية مالية',
            'privacy-feature-money-3': 'عدم المشاركة',
            'privacy-feature-money-4': 'الامتثال للقوانين',
            'btn-view-policy': 'عرض السياسة',
            'privacy-summary-title': 'ملخص سياسات الخصوصية',
            'summary-protection-title': 'حماية شاملة',
            'summary-protection-desc': 'جميع بياناتك محمية بأعلى معايير الأمان والتشفير',
            'summary-privacy-title': 'خصوصية مضمونة',
            'summary-privacy-desc': 'لا نشارك بياناتك مع أي طرف ثالث دون موافقتك',
            'summary-encryption-title': 'تشفير متقدم',
            'summary-encryption-desc': 'جميع البيانات مشفرة محلياً وفي النقل',
            'summary-compliance-title': 'امتثال للقوانين',
            
            // Tasbiah page
            'tasbiah-hero-title': 'المسبحة الذكية اذكار - تسبيح',
            'tasbiah-hero-subtitle': 'تطبيق ذكي للتسبيح والذكر مع ميزات متقدمة للعد والتتبع',
            'tasbiah-download-google': 'تحميل من Google Play',
            'tasbiah-download-apple': 'تحميل من App Store',
            'tasbiah-features-title': 'ميزات التطبيق',
            'tasbiah-feature-smart-counter': 'عداد ذكي',
            'tasbiah-feature-smart-counter-desc': 'عداد ذكي ودقيق للتسبيح مع إمكانية إعادة التعيين والاحتفاظ بالسجلات',
            'tasbiah-feature-dhikr': 'أذكار متنوعة',
            'tasbiah-feature-dhikr-desc': 'مجموعة شاملة من الأذكار والتسبيحات مع نصوصها الكاملة',
            'tasbiah-feature-favorites': 'الأذكار المفضلة',
            'tasbiah-feature-favorites-desc': 'احفظ أذكارك المفضلة للوصول السريع إليها في أي وقت',
            'tasbiah-feature-goals': 'جدول التسبيح والأهداف',
            'tasbiah-feature-goals-desc': 'حدد أهدافك اليومية والشهرية للتسبيح وتتبع تقدمك',
            'tasbiah-feature-achievements': 'الإنجازات',
            'tasbiah-feature-achievements-desc': 'احصل على شهادات وإنجازات روحية عند تحقيق أهدافك',
            'tasbiah-feature-privacy': 'خصوصية كاملة',
            'tasbiah-feature-privacy-desc': 'جميع بياناتك محفوظة محلياً على جهازك فقط - لا تسجيل دخول ولا بيانات شخصية',
            'tasbiah-feature-night': 'وضع ليلي',
            'tasbiah-feature-night-desc': 'وضع ليلي مريح للعينين مع تصميم جميل ومتناسق',
            'tasbiah-feature-reminders': 'تذكيرات',
            'tasbiah-feature-reminders-desc': 'تذكيرات يومية للتسبيح والذكر في أوقات محددة',
            'tasbiah-feature-stats': 'إحصائيات',
            'tasbiah-feature-stats-desc': 'تتبع إحصائيات التسبيح اليومية والأسبوعية والشهرية',
            'tasbiah-feature-design': 'تصميم جميل',
            'tasbiah-feature-design-desc': 'تصميم عصري وجذاب مع ألوان هادئة ومريحة للعين',
            'tasbiah-feature-free': 'مجاني تماماً',
            'tasbiah-feature-free-desc': 'تطبيق مجاني بالكامل بدون اشتراكات أو رسوم مخفية',
            'tasbiah-feature-export': 'تصدير البيانات',
            'tasbiah-feature-export-desc': 'قم بتصدير جميع بياناتك بصيغة قابلة للقراءة',
            'tasbiah-feature-delete': 'حذف البيانات',
            'tasbiah-feature-delete-desc': 'احذف جميع بياناتك من التطبيق في أي وقت تريده',
            'tasbiah-feature-ads': 'إدارة الإعلانات',
            'tasbiah-feature-ads-desc': 'يمكنك تعطيل الإعلانات من إعدادات التطبيق',
            'tasbiah-privacy-title': 'خصوصيتك مهمة جداً',
            'tasbiah-privacy-intro': 'نحن نؤمن بأهمية خصوصية بياناتك الشخصية. لذلك:',
            'tasbiah-privacy-no-login': 'لا تسجيل دخول',
            'tasbiah-privacy-no-data': 'لا بيانات شخصية',
            'tasbiah-privacy-local': 'بيانات محلية فقط',
            'tasbiah-privacy-no-servers': 'لا خوادم خارجية',
            'tasbiah-privacy-link': 'اقرأ سياسة الخصوصية الكاملة',
            'tasbiah-content-title': 'المسبحة الذكية اذكار - تسبيح - أفضل تطبيق للتسبيح والذكر',
            'tasbiah-content-para1': 'المسبحة الذكية اذكار - تسبيح من ديومكس هو تطبيق إسلامي شامل ومجاني مصمم خصيصاً لمساعدة المسلمين على تتبع تسبيحاتهم وأذكارهم اليومية. التطبيق يوفر تجربة مستخدم ممتازة مع واجهة جميلة وسهلة الاستخدام.',
            'tasbiah-content-para2': 'يتميز المسبحة الذكية اذكار - تسبيح بعدة ميزات مهمة تجعله الخيار الأمثل للمستخدمين. أولاً، التطبيق مجاني تماماً ولا يحتوي على أي اشتراكات أو رسوم مخفية. ثانياً، التطبيق يراعي خصوصية المستخدمين بشكل كامل - جميع البيانات محفوظة محلياً على الجهاز ولا يتم إرسال أي معلومات إلى خوادم خارجية.',
            'tasbiah-content-para3': 'التطبيق يحتوي على عداد ذكي ودقيق للتسبيح يمكنك من تتبع عدد التسبيحات بسهولة. كما يتضمن مجموعة شاملة من الأذكار والتسبيحات مع نصوصها الكاملة. يمكنك حفظ أذكارك المفضلة للوصول السريع إليها، وتحديد أهدافك اليومية والشهرية للتسبيح وتتبع تقدمك. يمكنك أيضاً الاستفادة من ميزة التذكيرات اليومية التي تساعدك على المواظبة على التسبيح والذكر، والحصول على إنجازات روحية عند تحقيق أهدافك.',
            'tasbiah-content-para4': 'التطبيق يوفر لك تحكم كامل في بياناتك - يمكنك تصدير جميع بياناتك بصيغة قابلة للقراءة، أو حذف جميع بياناتك من التطبيق في أي وقت تريده. كما يمكنك إدارة الإعلانات وتعطيلها من إعدادات التطبيق.',
            'tasbiah-content-para5': 'المسبحة الذكية اذكار - تسبيح يعمل بشكل كامل بدون الحاجة لاتصال بالإنترنت، مما يعني أنه يمكنك استخدامه في أي وقت وأي مكان. التطبيق متوفر الآن على Google Play Store ويمكن تحميله مجاناً.',
            'tasbiah-content-why-title': 'لماذا المسبحة الذكية اذكار - تسبيح من ديومكس؟',
            'tasbiah-content-why-para1': 'نحن في ديومكس نؤمن بأهمية تطوير تطبيقات مفيدة للمستخدمين حول العالم. المسبحة الذكية اذكار - تسبيح تم تطويره بعناية فائقة ليكون أداة مساعدة حقيقية للمسلمين في تتبع تسبيحاتهم وأذكارهم. التطبيق يتميز بسهولة الاستخدام والتصميم الجميل والخصوصية الكاملة.',
            'tasbiah-content-why-para2': 'إذا كنت تبحث عن تطبيق موثوق وآمن للتسبيح والذكر، فإن المسبحة الذكية اذكار - تسبيح من ديومكس هو الخيار الأمثل لك. حمّل التطبيق الآن من Google Play Store وابدأ رحلتك في تتبع تسبيحاتك اليومية.',
            'tasbiah-faq-title': 'الأسئلة الشائعة',
            'tasbiah-faq-q1': 'ما هو المسبحة الذكية اذكار - تسبيح؟',
            'tasbiah-faq-a1': 'المسبحة الذكية اذكار - تسبيح هو تطبيق ذكي شامل للتسبيح والذكر مع ميزات متقدمة للعد والتتبع. يتيح للمستخدمين تتبع عدد التسبيحات والأذكار اليومية مع واجهة مستخدم جميلة وسهلة الاستخدام.',
            'tasbiah-faq-q2': 'هل المسبحة الذكية اذكار - تسبيح مجاني؟',
            'tasbiah-faq-a2': 'نعم، المسبحة الذكية اذكار - تسبيح مجاني تماماً بدون أي اشتراكات أو رسوم مخفية. يمكنك تحميله واستخدامه بدون أي تكلفة.',
            'tasbiah-faq-q3': 'هل المسبحة الذكية اذكار - تسبيح آمن وخصوصي؟',
            'tasbiah-faq-a3': 'نعم، المسبحة الذكية اذكار - تسبيح آمن تماماً ويراعي خصوصيتك. جميع بياناتك محفوظة محلياً على جهازك فقط، ولا يوجد تسجيل دخول ولا يتم جمع أي بيانات شخصية. لا نستخدم خوادم خارجية لتخزين بياناتك.',
            'tasbiah-faq-q4': 'ما هي ميزات المسبحة الذكية اذكار - تسبيح؟',
            'tasbiah-faq-a4': 'المسبحة الذكية اذكار - تسبيح يحتوي على العديد من الميزات: عداد ذكي للتسبيح، أذكار متنوعة مع إمكانية حفظ الأذكار المفضلة، جدول التسبيح والأهداف اليومية والشهرية، الإنجازات، وضع ليلي، تذكيرات يومية، إحصائيات مفصلة، تصدير البيانات، حذف البيانات، إدارة الإعلانات، تصميم جميل ومريح للعين، وكل ذلك بدون إعلانات مزعجة.',
            'tasbiah-faq-q5': 'كيف يمكنني تحميل المسبحة الذكية اذكار - تسبيح؟',
            'tasbiah-faq-a5': 'يمكنك تحميل المسبحة الذكية اذكار - تسبيح مباشرة من Google Play Store عبر الرابط المتوفر على الموقع. التطبيق متوفر لأجهزة Android.',
            'tasbiah-faq-q6': 'هل يتطلب المسبحة الذكية اذكار - تسبيح اتصال بالإنترنت؟',
            'tasbiah-faq-a6': 'لا، المسبحة الذكية اذكار - تسبيح يعمل بشكل كامل بدون الحاجة لاتصال بالإنترنت. جميع الميزات متاحة في وضع عدم الاتصال.',
            'tasbiah-screenshots-title': 'لقطات من التطبيق',
            'tasbiah-screenshot-main': 'الشاشة الرئيسية',
            'tasbiah-screenshot-counter': 'عداد التسبيح',
            'tasbiah-screenshot-dhikr': 'الأذكار',
            'tasbiah-screenshot-stats': 'الإحصائيات',
            'tasbiah-footer-title': 'المسبحة الذكية اذكار - تسبيح',
            'tasbiah-footer-desc': 'تطبيق ذكي للتسبيح والذكر',
            'summary-compliance-desc': 'نلتزم بجميع القوانين المحلية والدولية',
            'privacy-contact-title': 'لديك أسئلة حول الخصوصية؟',
            'privacy-contact-desc': 'إذا كان لديك أي أسئلة حول سياسات الخصوصية أو تريد ممارسة حقوقك، نحن هنا لمساعدتك.',
            
            // Delete account page
            'delete-subtitle': 'حذف حسابك وبياناتك الشخصية',
            'delete-warning-title': 'تحذير مهم',
            'delete-warning-text': 'حذف حسابك سيؤدي إلى حذف جميع بياناتك الشخصية نهائياً ولا يمكن استردادها. تأكد من أنك تريد المتابعة قبل إرسال الطلب.',
            'delete-what-title': 'ما سيتم حذفه',
            'delete-what-deleted': 'البيانات التي سيتم حذفها نهائياً:',
            'delete-account-info': 'معلومات الحساب:',
            'delete-account-info-desc': 'اسم المستخدم، البريد الإلكتروني، كلمة المرور',
            'delete-personal-data': 'البيانات الشخصية:',
            'delete-personal-data-desc': 'جميع المعلومات الشخصية المرتبطة بحسابك',
            'delete-app-data': 'بيانات التطبيقات:',
            'delete-app-data-desc': 'جميع البيانات المحفوظة في تطبيقاتنا',
            'delete-settings': 'الإعدادات والتفضيلات:',
            'delete-settings-desc': 'جميع الإعدادات الشخصية',
            'delete-activity': 'سجل النشاط:',
            'delete-activity-desc': 'جميع سجلات استخدام التطبيقات',
            'delete-backups': 'النسخ الاحتياطية:',
            'delete-backups-desc': 'جميع النسخ الاحتياطية المرتبطة بحسابك',
            'delete-what-not-deleted': 'البيانات التي لن يتم حذفها:',
            'delete-anonymous': 'البيانات المجهولة الهوية:',
            'delete-anonymous-desc': 'الإحصائيات العامة (بدون هوية شخصية)',
            'delete-security-logs': 'سجلات الأمان:',
            'delete-security-logs-desc': 'السجلات المطلوبة قانونياً',
            'delete-local-data': 'البيانات المحفوظة محلياً:',
            'delete-local-data-desc': 'البيانات المحفوظة على جهازك فقط',
            'delete-before-title': 'قبل الحذف',
            'delete-before-advice': 'ننصحك بالقيام بما يلي قبل حذف حسابك:',
            'delete-export': 'تصدير بياناتك:',
            'delete-export-desc': 'قم بتصدير أي بيانات تريد الاحتفاظ بها',
            'delete-save-backups': 'حفظ النسخ الاحتياطية:',
            'delete-save-backups-desc': 'احفظ نسخ احتياطية من بياناتك المهمة',
            'delete-cancel-subs': 'إلغاء الاشتراكات:',
            'delete-cancel-subs-desc': 'ألغِ أي اشتراكات مرتبطة بحسابك',
            'delete-save-info': 'حفظ المعلومات المهمة:',
            'delete-save-info-desc': 'احفظ أي معلومات تحتاجها مستقبلاً',
            'delete-contact-first': 'التواصل معنا:',
            'delete-contact-first-desc': 'إذا كان لديك أي استفسارات، تواصل معنا أولاً',
            'delete-form-title': 'طلب حذف الحساب',
            'delete-form-email': 'البريد الإلكتروني المرتبط بالحساب *',
            'delete-form-email-placeholder': 'أدخل بريدك الإلكتروني',
            'delete-form-app': 'التطبيق المراد حذف البيانات منه *',
            'delete-form-app-placeholder': 'اختر التطبيق',
            'delete-form-reason': 'سبب طلب الحذف (اختياري)',
            'delete-form-reason-placeholder': 'اختر السبب',
            'delete-reason-privacy': 'مخاوف الخصوصية',
            'delete-reason-not-using': 'لا أستخدم التطبيق',
            'delete-reason-alternative': 'وجدت بديلاً أفضل',
            'delete-reason-technical': 'مشاكل تقنية',
            'delete-reason-other': 'أسباب أخرى',
            'delete-form-details': 'تفاصيل إضافية (اختياري)',
            'delete-form-details-placeholder': 'اكتب أي تفاصيل إضافية تريد مشاركتها معنا',
            'delete-form-confirm': 'تأكيد الطلب *',
            'delete-confirm1': 'أؤكد أنني أريد حذف حسابي وبياناتي نهائياً',
            'delete-confirm2': 'أفهم أن عملية الحذف لا يمكن التراجع عنها',
            'delete-confirm3': 'أؤكد أنني قمت بحفظ جميع البيانات المهمة',
            'delete-btn-submit': 'إرسال طلب الحذف',
            'delete-btn-contact': 'تواصل معنا أولاً',
            'delete-process-title': 'عملية الحذف',
            'delete-process-what': 'ما يحدث بعد إرسال الطلب:',
            'delete-process-1': 'استلام الطلب:',
            'delete-process-1-desc': 'سنستلم طلبك خلال دقائق',
            'delete-process-2': 'التحقق من الهوية:',
            'delete-process-2-desc': 'سنتحقق من هويتك عبر البريد الإلكتروني',
            'delete-process-3': 'معالجة الطلب:',
            'delete-process-3-desc': 'سنبدأ عملية حذف البيانات خلال 24 ساعة',
            'delete-process-4': 'إشعار التأكيد:',
            'delete-process-4-desc': 'سنرسل لك إشعاراً بتأكيد الحذف',
            'delete-process-5': 'اكتمال الحذف:',
            'delete-process-5-desc': 'ستتم عملية الحذف خلال 30 يوماً كحد أقصى',
            'delete-process-duration': 'مدة المعالجة:',
            'delete-duration-verify': 'التحقق من الهوية:',
            'delete-duration-verify-desc': 'خلال 24 ساعة',
            'delete-duration-delete': 'حذف البيانات:',
            'delete-duration-delete-desc': 'خلال 30 يوماً كحد أقصى',
            'delete-duration-confirm': 'التأكيد النهائي:',
            'delete-duration-confirm-desc': 'خلال 48 ساعة من اكتمال الحذف',
            'delete-alternatives-title': 'خيارات بديلة',
            'delete-alternatives-before': 'قبل حذف حسابك، يمكنك:',
            'delete-alt-edit': 'تعديل البيانات:',
            'delete-alt-edit-desc': 'تواصل معنا لتعديل أي بيانات غير صحيحة',
            'delete-alt-settings': 'تحديث الإعدادات:',
            'delete-alt-settings-desc': 'غيّر إعدادات الخصوصية في التطبيقات',
            'delete-alt-cancel': 'إلغاء الاشتراكات:',
            'delete-alt-cancel-desc': 'ألغِ الاشتراكات غير المرغوب فيها',
            'delete-alt-specific': 'حذف البيانات المحددة:',
            'delete-alt-specific-desc': 'اطلب حذف بيانات معينة بدلاً من الحساب كاملاً',
            'delete-alt-freeze': 'تجميد الحساب:',
            'delete-alt-freeze-desc': 'اطلب تجميد الحساب مؤقتاً بدلاً من حذفه',
            'delete-contact-title': 'التواصل معنا',
            'delete-contact-desc': 'إذا كان لديك أي أسئلة حول عملية حذف الحساب أو تريد مساعدة، يمكنك التواصل معنا:',
            'delete-rights-title': 'حقوقك القانونية',
            'delete-rights-gdpr': 'حقك في حذف البيانات (GDPR):',
            'delete-right-delete': 'حق الحذف:',
            'delete-right-delete-desc': 'لديك الحق في طلب حذف بياناتك الشخصية',
            'delete-right-response': 'الاستجابة السريعة:',
            'delete-right-response-desc': 'سنرد على طلبك خلال 30 يوماً',
            'delete-right-confirm': 'التأكيد:',
            'delete-right-confirm-desc': 'سنؤكد لك اكتمال عملية الحذف',
            'delete-right-discrimination': 'عدم التمييز:',
            'delete-right-discrimination-desc': 'لن نعاملك بشكل مختلف بعد طلب الحذف',
            'footer-privacy-rights': 'الخصوصية والحقوق',
            'footer-delete-account': 'حذف الحساب',
            'footer-exercise-rights': 'ممارسة الحقوق'
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
            'policy-money': 'Personal Money Management App Privacy Policy',
            
            // Main page content
            'hero-title': 'Welcome to DIYOMX',
            'hero-subtitle': 'We are a team specialized in developing smart applications and innovative digital solutions',
            'btn-explore-apps': 'Explore Our Apps',
            'btn-contact': 'Contact Us',
            'section-apps': 'Our Android Apps',
            'section-websites': 'Our Websites',
            'section-youtube': 'Our YouTube Tutorials',
            'section-achievements': 'Our Achievements',
            'section-features': 'Why DIYOMX?',
            'app-tasbiah-title': 'Tasbih App',
            'app-tasbiah-desc': 'Smart app for tasbih and dhikr with advanced counting and tracking features',
            'app-tasbiah-feature1': 'Smart tasbih counter',
            'app-tasbiah-feature2': 'Various dhikr',
            'app-tasbiah-feature3': 'Non-intrusive ads',
            'app-electric-title': 'DIY Electric Calculator',
            'app-electric-desc': 'App for calculating power, wire size, solar energy, and batteries',
            'app-electric-feature1': 'Power calculation',
            'app-electric-feature2': 'Wire size calculation',
            'app-electric-feature3': 'Solar energy calculation',
            'app-electric-feature4': 'Battery calculation',
            'app-car-title': 'Car Maintenance',
            'app-car-desc': 'Comprehensive app for managing car maintenance and tracking services',
            'app-car-feature1': 'Schedule periodic maintenance',
            'app-car-feature2': 'Track service history',
            'app-car-feature3': 'Maintenance alerts',
            'app-car-feature4': 'Warranty alerts',
            'app-money-title': 'Personal Money Management',
            'app-money-desc': 'App for managing personal budget and tracking expenses',
            'app-money-feature1': 'Track income and expenses',
            'app-money-feature2': 'Create monthly budget',
            'app-money-feature3': 'Detailed financial reports',
            'app-money-feature4': 'Budget alerts',
            'website-tasbiah-title': 'Tasbih Website',
            'website-tasbiah-desc': 'Comprehensive website for tasbih and dhikr with advanced features',
            'website-tasbiah-feature1': 'Smart tasbih counter',
            'website-tasbiah-feature2': 'Various dhikr',
            'website-tasbiah-feature3': 'Works on all devices',
            'website-tasbiah-feature4': 'Easy-to-use interface',
            'btn-download': 'Download from Google Play',
            'btn-visit': 'Visit Website',
            'status-available': 'Available Now',
            'status-development': 'In Development',
            'status-coming': 'Coming Soon',
            'youtube-intro': 'We provide specialized technical tutorials on our YouTube channel for app development and programming',
            'youtube-card1-title': 'App Development Tutorials',
            'youtube-card1-desc': 'Detailed tutorials for Android app development and programming',
            'youtube-card2-title': 'Programming Lessons',
            'youtube-card2-desc': 'Educational lessons in programming and development for beginners and professionals',
            'youtube-card3-title': 'Tips and Techniques',
            'youtube-card3-desc': 'Advanced tips and techniques in app development and programming',
            'btn-watch': 'Watch Tutorials',
            'achievement-apps': 'Developed Apps',
            'achievement-apps-desc': 'App available on Google Play',
            'achievement-dev': 'Apps in Development',
            'achievement-dev-desc': 'Coming soon to stores',
            'achievement-users': 'Active Users',
            'achievement-users-desc': 'Using our apps daily',
            'achievement-downloads': 'Downloads',
            'achievement-downloads-desc': 'From Google Play Store',
            'achievement-rating': 'Average Rating',
            'achievement-rating-desc': 'From users',
            'achievement-reviews': 'Reviews',
            'achievement-reviews-desc': 'Positive reviews',
            'achievement-countries': 'Countries',
            'achievement-countries-desc': 'Using our apps',
            'achievement-languages': 'Languages',
            'achievement-languages-desc': 'Arabic and English',
            'achievement-updates': 'Updates',
            'achievement-updates-desc': 'Improvements and new features',
            'achievement-privacy': 'Privacy',
            'achievement-privacy-desc': 'Local data only',
            'achievement-features': 'Features',
            'achievement-features-desc': 'Per app',
            'achievement-satisfaction': 'Satisfaction',
            'achievement-satisfaction-desc': 'User satisfaction rate',
            'feature-fast-title': 'Fast Development',
            'feature-fast-desc': 'We develop our apps and websites with the latest technologies and fastest methods',
            'feature-security-title': 'High Security',
            'feature-security-desc': 'We ensure user data protection with the highest security standards',
            'feature-support-title': 'Technical Support',
            'feature-support-desc': 'Technical support team available to serve all our users',
            'footer-title': 'DIYOMX',
            'footer-desc': 'Smart Apps & Digital Achievements',
            'footer-privacy-title': 'Privacy Policies',
            'footer-copyright': 'All rights reserved.',
            'websites-note': 'We are working on developing new websites and apps soon',
            'content-title': 'DIYOMX - Smart Apps for Users Around the World',
            'content-para1': 'DIYOMX is a company specialized in developing smart applications and innovative digital solutions for users around the world. We believe that technology should serve humanity, which is why we focus on developing useful and easy-to-use apps that improve users\' lives and facilitate their daily tasks.',
            'content-para2': 'Our journey began with the launch of the Tasbih app, which achieved great success and received positive reviews from users. The app is now available on Google Play Store and can be downloaded for free. We also developed the Tasbih website (tasbiah.diyomx.com) which provides a similar experience on the web. We are currently working on developing new apps and websites such as the Electric Calculator and Car Maintenance app, in addition to other useful projects for users around the world.',
            'content-para3': 'All our apps are completely free and respect user privacy. We believe in the importance of protecting user data and not collecting any unnecessary personal information. Our apps work fully without the need for an internet connection in most cases.',
            
            // About page
            'about-subtitle': 'Learn about DIYOMX team and our success story',
            'about-story-title': 'Our Story',
            'about-story-para1': 'DIYOMX is a company specialized in developing smart applications, websites, and producing technical tutorials on YouTube. The company was founded on August 26, 2025 by a group of distinguished developers who combine deep technical expertise with passion for creativity and innovation.',
            'about-story-para2': 'At DIYOMX, we believe that technology should serve humanity, which is why we focus on developing useful and easy-to-use apps that improve users\' lives and facilitate their daily tasks. We also provide specialized technical tutorials on our YouTube channel to help developers and programmers learn the latest technologies.',
            'about-story-para3': 'Our journey began with the launch of the Tasbih app, which achieved great success. We also developed the Tasbih website (tasbiah.diyomx.com). We are currently working on developing new apps and websites such as the Electric Calculator and Car Maintenance app, in addition to other useful projects for users around the world.',
            'about-vision-title': 'Our Vision',
            'about-vision-desc': 'To be the leaders in smart application development and technical tutorials worldwide, and to contribute to building an advanced and developed digital community.',
            'about-mission-title': 'Our Mission',
            'about-mission-desc': 'To develop innovative and smart applications that meet the needs of users around the world, and to produce high-quality technical educational content on YouTube to help developers and programmers.',
            'about-services-title': 'Our Services',
            'service-apps-title': 'App Development',
            'service-apps-desc': 'We develop smart and innovative applications for smartphones and tablets',
            'service-websites-title': 'Website Development',
            'service-websites-desc': 'We develop modern and responsive websites with advanced and easy-to-use features',
            'service-tutorials-title': 'Technical Tutorials',
            'service-tutorials-desc': 'We provide specialized technical tutorials on YouTube for app development and programming',
            'service-design-title': 'Interface Design',
            'service-design-desc': 'We design attractive and easy-to-use user interfaces',
            'service-support-title': 'Technical Support',
            'service-support-desc': 'We provide specialized technical support for all our apps, websites, and users',
            'about-values-title': 'Our Values',
            'value-innovation-title': 'Innovation',
            'value-innovation-desc': 'We always seek new and innovative ways to solve problems and develop solutions',
            'value-quality-title': 'Quality',
            'value-quality-desc': 'We commit to the highest quality standards in everything we produce and develop',
            'value-transparency-title': 'Transparency',
            'value-transparency-desc': 'We believe in transparency and clarity in all our dealings with clients',
            'value-teamwork-title': 'Teamwork',
            'value-teamwork-desc': 'We work as one team to achieve the best results',
            'about-team-title': 'Our Team',
            'member-role-manager': 'Project Manager',
            'member-role-developer': 'App Developer',
            'member-role-tester': 'Lead Tester',
            'member-role-expert': 'Senior Expert',
            'about-timeline-title': 'Our Success Journey',
            'timeline-foundation-title': 'Team Foundation',
            'timeline-foundation-desc': 'The team was founded on 26/08/2025',
            'timeline-first-app-title': 'First App',
            'timeline-first-app-desc': 'Work began on the first app on 28/08/2025',
            'timeline-release-title': 'First App Release',
            'timeline-release-desc': 'The first Smart Tasbih App - Dhikr was released on 7/10/2025',
            'timeline-future-title': 'The Future',
            'timeline-future-desc': 'Launching new and innovative projects',
            
            // Contact page
            'contact-subtitle': 'We are here to help you anytime',
            'contact-form-title': 'Send us a message',
            'form-label-name': 'Full Name',
            'form-label-email': 'Email',
            'form-label-phone': 'Phone Number',
            'form-label-subject': 'Subject',
            'form-label-message': 'Message',
            'form-placeholder-subject': 'Select Subject',
            'form-option-support': 'App Technical Support',
            'form-option-bug': 'Report App Bug',
            'form-option-feature': 'Suggest New Feature',
            'form-option-youtube': 'Inquiry about YouTube Tutorials',
            'form-option-business': 'Business',
            'form-option-partnership': 'Partnership or Collaboration',
            'form-option-other': 'Other',
            'form-placeholder-message': 'Write your message here...',
            'form-btn-send': 'Send Message',
            'contact-info-title': 'Contact Information',
            'contact-email-title': 'Email',
            'contact-address-title': 'Address',
            'contact-address': 'Muscat, Sultanate of Oman',
            'contact-hours-title': 'Working Hours',
            'contact-hours-weekdays': 'Sunday - Wednesday: 10:00 AM - 4:00 PM',
            'contact-hours-weekend': 'Thursday - Saturday: Closed',
            'contact-faq-title': 'Frequently Asked Questions',
            'faq-download-q': 'How can I download your apps?',
            'faq-download-a': 'You can download our apps from Google Play Store, and we are trying as soon as possible to list them on App Store. The Tasbih app is available now, and other apps are in development.',
            'faq-free-q': 'Are your apps free?',
            'faq-free-a': 'Yes, all our basic apps are free with the option to upgrade to advanced features.',
            'faq-coming-q': 'When will the Electric Calculator and Car Maintenance apps be available?',
            'faq-coming-a': 'We are currently developing these apps and they will be available soon. You can follow the latest updates on our website.',
            'faq-youtube-q': 'Do you provide YouTube tutorials?',
            'faq-youtube-a': 'Currently no, but we hope to create a YouTube channel soon to provide specialized technical tutorials.',
            'faq-bug-q': 'How can I report a bug in the app?',
            'faq-bug-a': 'You can use the contact form above and select "Report App Bug" as the message subject.',
            'faq-support-q': 'Do you provide technical support?',
            'faq-support-a': 'Yes, we provide free technical support for all users via email.',
            'contact-social-title': 'Follow us on social media',
            'social-twitter': 'Twitter',
            'social-instagram': 'Instagram',
            'social-youtube': 'YouTube',
            
            // Privacy options page
            'privacy-options-subtitle': 'Choose the policy that suits you',
            'privacy-options-intro': 'At DIYOMX, we believe in the importance of transparency and privacy. For each app and service we provide, we have a detailed and customized privacy policy. Choose the policy that interests you from the list below.',
            'privacy-badge-text': 'Protecting your privacy is our priority',
            'privacy-website-title': 'General Privacy Policy',
            'privacy-website-desc': 'For website and general services',
            'privacy-tasbiah-title': 'Tasbih App',
            'privacy-tasbiah-desc': 'Protection of spiritual and devotional data',
            'privacy-tasbiah-badge': 'Most Comprehensive',
            'privacy-electric-title': 'DIY Electric Calculator',
            'privacy-electric-desc': 'Protection of electrical calculations and projects',
            'privacy-car-title': 'Car Maintenance',
            'privacy-car-desc': 'Protection of car and maintenance data',
            'privacy-money-title': 'Personal Money Management',
            'privacy-money-desc': 'Protection of sensitive financial data',
            'privacy-money-badge': 'Highest Security Level',
            'privacy-feature-website-1': 'Website data protection',
            'privacy-feature-website-2': 'Cookies',
            'privacy-feature-website-3': 'Third-party services',
            'privacy-feature-website-4': 'User rights',
            'privacy-feature-tasbiah-1': 'Spiritual data protection',
            'privacy-feature-tasbiah-2': 'Absolute confidentiality',
            'privacy-feature-tasbiah-3': 'Advanced encryption',
            'privacy-feature-tasbiah-4': 'Sharia compliance',
            'privacy-feature-electric-1': 'Calculation protection',
            'privacy-feature-electric-2': 'Saved projects',
            'privacy-feature-electric-3': 'Local encryption',
            'privacy-feature-electric-4': 'No sharing',
            'privacy-feature-car-1': 'Car data',
            'privacy-feature-car-2': 'Maintenance history',
            'privacy-feature-car-3': 'Costs and parts',
            'privacy-feature-car-4': 'Advanced security',
            'privacy-feature-money-1': 'Double encryption',
            'privacy-feature-money-2': 'Financial protection',
            'privacy-feature-money-3': 'No sharing',
            'privacy-feature-money-4': 'Legal compliance',
            'btn-view-policy': 'View Policy',
            'privacy-summary-title': 'Privacy Policies Summary',
            'summary-protection-title': 'Comprehensive Protection',
            'summary-protection-desc': 'All your data is protected with the highest security and encryption standards',
            'summary-privacy-title': 'Guaranteed Privacy',
            'summary-privacy-desc': 'We do not share your data with any third party without your consent',
            'summary-encryption-title': 'Advanced Encryption',
            'summary-encryption-desc': 'All data is encrypted locally and in transit',
            'summary-compliance-title': 'Legal Compliance',
            'summary-compliance-desc': 'We comply with all local and international laws',
            'privacy-contact-title': 'Have questions about privacy?',
            'privacy-contact-desc': 'If you have any questions about privacy policies or want to exercise your rights, we are here to help you.',
            
            // Tasbiah page
            'tasbiah-hero-title': 'Smart Tasbih App - Dhikr - Tasbih',
            'tasbiah-hero-subtitle': 'Smart app for tasbih and dhikr with advanced counting and tracking features',
            'tasbiah-download-google': 'Download from Google Play',
            'tasbiah-download-apple': 'Download from App Store',
            'tasbiah-features-title': 'App Features',
            'tasbiah-feature-smart-counter': 'Smart Counter',
            'tasbiah-feature-smart-counter-desc': 'Smart and accurate tasbih counter with reset capability and record keeping',
            'tasbiah-feature-dhikr': 'Various Dhikr',
            'tasbiah-feature-dhikr-desc': 'Comprehensive collection of dhikr and tasbih with full texts',
            'tasbiah-feature-favorites': 'Favorite Dhikr',
            'tasbiah-feature-favorites-desc': 'Save your favorite dhikr for quick access anytime',
            'tasbiah-feature-goals': 'Tasbih Schedule and Goals',
            'tasbiah-feature-goals-desc': 'Set your daily and monthly tasbih goals and track your progress',
            'tasbiah-feature-achievements': 'Achievements',
            'tasbiah-feature-achievements-desc': 'Get certificates and spiritual achievements when you reach your goals',
            'tasbiah-feature-privacy': 'Complete Privacy',
            'tasbiah-feature-privacy-desc': 'All your data is stored locally on your device only - no login, no personal data',
            'tasbiah-feature-night': 'Night Mode',
            'tasbiah-feature-night-desc': 'Comfortable night mode for the eyes with beautiful and harmonious design',
            'tasbiah-feature-reminders': 'Reminders',
            'tasbiah-feature-reminders-desc': 'Daily reminders for tasbih and dhikr at specific times',
            'tasbiah-feature-stats': 'Statistics',
            'tasbiah-feature-stats-desc': 'Track daily, weekly, and monthly tasbih statistics',
            'tasbiah-feature-design': 'Beautiful Design',
            'tasbiah-feature-design-desc': 'Modern and attractive design with calm and eye-friendly colors',
            'tasbiah-feature-free': 'Completely Free',
            'tasbiah-feature-free-desc': 'Fully free app with no subscriptions or hidden fees',
            'tasbiah-feature-export': 'Export Data',
            'tasbiah-feature-export-desc': 'Export all your data in a readable format',
            'tasbiah-feature-delete': 'Delete Data',
            'tasbiah-feature-delete-desc': 'Delete all your data from the app at any time',
            'tasbiah-feature-ads': 'Ad Management',
            'tasbiah-feature-ads-desc': 'You can disable ads from app settings',
            'tasbiah-privacy-title': 'Your Privacy is Very Important',
            'tasbiah-privacy-intro': 'We believe in the importance of your personal data privacy. Therefore:',
            'tasbiah-privacy-no-login': 'No Login',
            'tasbiah-privacy-no-data': 'No Personal Data',
            'tasbiah-privacy-local': 'Local Data Only',
            'tasbiah-privacy-no-servers': 'No External Servers',
            'tasbiah-privacy-link': 'Read Full Privacy Policy',
            'tasbiah-content-title': 'Smart Tasbih App - Dhikr - Tasbih - Best App for Tasbih and Dhikr',
            'tasbiah-content-para1': 'Smart Tasbih App - Dhikr - Tasbih from DIYOMX is a comprehensive and free Islamic app specifically designed to help Muslims track their daily tasbih and dhikr. The app provides an excellent user experience with a beautiful and easy-to-use interface.',
            'tasbiah-content-para2': 'Smart Tasbih App - Dhikr - Tasbih features several important characteristics that make it the ideal choice for users. First, the app is completely free with no subscriptions or hidden fees. Second, the app fully respects user privacy - all data is stored locally on the device and no information is sent to external servers.',
            'tasbiah-content-para3': 'The app includes a smart and accurate tasbih counter that allows you to easily track the number of tasbih. It also includes a comprehensive collection of dhikr and tasbih with their full texts. You can save your favorite dhikr for quick access, set your daily and monthly tasbih goals and track your progress. You can also benefit from the daily reminders feature that helps you maintain tasbih and dhikr, and get spiritual achievements when you reach your goals.',
            'tasbiah-content-para4': 'The app gives you full control over your data - you can export all your data in a readable format, or delete all your data from the app at any time. You can also manage and disable ads from app settings.',
            'tasbiah-content-para5': 'Smart Tasbih App - Dhikr - Tasbih works completely without an internet connection, meaning you can use it anytime, anywhere. The app is now available on Google Play Store and can be downloaded for free.',
            'tasbiah-content-why-title': 'Why Smart Tasbih App - Dhikr - Tasbih from DIYOMX?',
            'tasbiah-content-why-para1': 'At DIYOMX, we believe in the importance of developing useful apps for users around the world. Smart Tasbih App - Dhikr - Tasbih was carefully developed to be a real tool to help Muslims track their tasbih and dhikr. The app features ease of use, beautiful design, and complete privacy.',
            'tasbiah-content-why-para2': 'If you are looking for a reliable and secure app for tasbih and dhikr, then Smart Tasbih App - Dhikr - Tasbih from DIYOMX is the ideal choice for you. Download the app now from Google Play Store and start your journey in tracking your daily tasbih.',
            'tasbiah-faq-title': 'Frequently Asked Questions',
            'tasbiah-faq-q1': 'What is Smart Tasbih App - Dhikr - Tasbih?',
            'tasbiah-faq-a1': 'Smart Tasbih App - Dhikr - Tasbih is a comprehensive smart app for tasbih and dhikr with advanced counting and tracking features. It allows users to track the number of daily tasbih and dhikr with a beautiful and easy-to-use interface.',
            'tasbiah-faq-q2': 'Is Smart Tasbih App - Dhikr - Tasbih free?',
            'tasbiah-faq-a2': 'Yes, Smart Tasbih App - Dhikr - Tasbih is completely free with no subscriptions or hidden fees. You can download and use it at no cost.',
            'tasbiah-faq-q3': 'Is Smart Tasbih App - Dhikr - Tasbih safe and private?',
            'tasbiah-faq-a3': 'Yes, Smart Tasbih App - Dhikr - Tasbih is completely safe and respects your privacy. All your data is stored locally on your device only, there is no login, and no personal data is collected. We do not use external servers to store your data.',
            'tasbiah-faq-q4': 'What are the features of Smart Tasbih App - Dhikr - Tasbih?',
            'tasbiah-faq-a4': 'Smart Tasbih App - Dhikr - Tasbih includes many features: smart tasbih counter, various dhikr with the ability to save favorite dhikr, tasbih schedule and daily and monthly goals, achievements, night mode, daily reminders, detailed statistics, data export, data deletion, ad management, beautiful and eye-friendly design, and all without annoying ads.',
            'tasbiah-faq-q5': 'How can I download Smart Tasbih App - Dhikr - Tasbih?',
            'tasbiah-faq-a5': 'You can download Smart Tasbih App - Dhikr - Tasbih directly from Google Play Store via the link available on the website. The app is available for Android devices.',
            'tasbiah-faq-q6': 'Does Smart Tasbih App - Dhikr - Tasbih require an internet connection?',
            'tasbiah-faq-a6': 'No, Smart Tasbih App - Dhikr - Tasbih works completely without an internet connection. All features are available offline.',
            'tasbiah-screenshots-title': 'App Screenshots',
            'tasbiah-screenshot-main': 'Main Screen',
            'tasbiah-screenshot-counter': 'Tasbih Counter',
            'tasbiah-screenshot-dhikr': 'Dhikr',
            'tasbiah-screenshot-stats': 'Statistics',
            'tasbiah-footer-title': 'Smart Tasbih App - Dhikr - Tasbih',
            'tasbiah-footer-desc': 'Smart app for tasbih and dhikr',
            
            // Delete account page
            'delete-subtitle': 'Delete your account and personal data',
            'delete-warning-title': 'Important Warning',
            'delete-warning-text': 'Deleting your account will permanently delete all your personal data and cannot be recovered. Make sure you want to proceed before submitting the request.',
            'delete-what-title': 'What Will Be Deleted',
            'delete-what-deleted': 'Data that will be permanently deleted:',
            'delete-account-info': 'Account Information:',
            'delete-account-info-desc': 'Username, email, password',
            'delete-personal-data': 'Personal Data:',
            'delete-personal-data-desc': 'All personal information associated with your account',
            'delete-app-data': 'App Data:',
            'delete-app-data-desc': 'All data saved in our apps',
            'delete-settings': 'Settings and Preferences:',
            'delete-settings-desc': 'All personal settings',
            'delete-activity': 'Activity Log:',
            'delete-activity-desc': 'All app usage logs',
            'delete-backups': 'Backups:',
            'delete-backups-desc': 'All backups associated with your account',
            'delete-what-not-deleted': 'Data that will not be deleted:',
            'delete-anonymous': 'Anonymous Data:',
            'delete-anonymous-desc': 'General statistics (without personal identity)',
            'delete-security-logs': 'Security Logs:',
            'delete-security-logs-desc': 'Logs required by law',
            'delete-local-data': 'Locally Stored Data:',
            'delete-local-data-desc': 'Data stored on your device only',
            'delete-before-title': 'Before You Delete',
            'delete-before-advice': 'We recommend doing the following before deleting your account:',
            'delete-export': 'Export Your Data:',
            'delete-export-desc': 'Export any data you want to keep',
            'delete-save-backups': 'Save Backups:',
            'delete-save-backups-desc': 'Save backups of your important data',
            'delete-cancel-subs': 'Cancel Subscriptions:',
            'delete-cancel-subs-desc': 'Cancel any subscriptions associated with your account',
            'delete-save-info': 'Save Important Information:',
            'delete-save-info-desc': 'Save any information you may need in the future',
            'delete-contact-first': 'Contact Us:',
            'delete-contact-first-desc': 'If you have any questions, contact us first',
            'delete-form-title': 'Request Account Deletion',
            'delete-form-email': 'Email Associated with Account *',
            'delete-form-email-placeholder': 'Enter your email',
            'delete-form-app': 'App to Delete Data From *',
            'delete-form-app-placeholder': 'Select App',
            'delete-form-reason': 'Reason for Deletion Request (Optional)',
            'delete-form-reason-placeholder': 'Select Reason',
            'delete-reason-privacy': 'Privacy Concerns',
            'delete-reason-not-using': 'Not Using the App',
            'delete-reason-alternative': 'Found a Better Alternative',
            'delete-reason-technical': 'Technical Issues',
            'delete-reason-other': 'Other Reasons',
            'delete-form-details': 'Additional Details (Optional)',
            'delete-form-details-placeholder': 'Write any additional details you want to share with us',
            'delete-form-confirm': 'Request Confirmation *',
            'delete-confirm1': 'I confirm that I want to permanently delete my account and data',
            'delete-confirm2': 'I understand that the deletion process cannot be undone',
            'delete-confirm3': 'I confirm that I have saved all important data',
            'delete-btn-submit': 'Submit Deletion Request',
            'delete-btn-contact': 'Contact Us First',
            'delete-process-title': 'Deletion Process',
            'delete-process-what': 'What happens after submitting the request:',
            'delete-process-1': 'Request Received:',
            'delete-process-1-desc': 'We will receive your request within minutes',
            'delete-process-2': 'Identity Verification:',
            'delete-process-2-desc': 'We will verify your identity via email',
            'delete-process-3': 'Request Processing:',
            'delete-process-3-desc': 'We will begin the data deletion process within 24 hours',
            'delete-process-4': 'Confirmation Notification:',
            'delete-process-4-desc': 'We will send you a confirmation notification of deletion',
            'delete-process-5': 'Deletion Completion:',
            'delete-process-5-desc': 'The deletion process will be completed within 30 days maximum',
            'delete-process-duration': 'Processing Duration:',
            'delete-duration-verify': 'Identity Verification:',
            'delete-duration-verify-desc': 'Within 24 hours',
            'delete-duration-delete': 'Data Deletion:',
            'delete-duration-delete-desc': 'Within 30 days maximum',
            'delete-duration-confirm': 'Final Confirmation:',
            'delete-duration-confirm-desc': 'Within 48 hours of deletion completion',
            'delete-alternatives-title': 'Alternative Options',
            'delete-alternatives-before': 'Before deleting your account, you can:',
            'delete-alt-edit': 'Edit Data:',
            'delete-alt-edit-desc': 'Contact us to edit any incorrect data',
            'delete-alt-settings': 'Update Settings:',
            'delete-alt-settings-desc': 'Change privacy settings in apps',
            'delete-alt-cancel': 'Cancel Subscriptions:',
            'delete-alt-cancel-desc': 'Cancel unwanted subscriptions',
            'delete-alt-specific': 'Delete Specific Data:',
            'delete-alt-specific-desc': 'Request deletion of specific data instead of the entire account',
            'delete-alt-freeze': 'Freeze Account:',
            'delete-alt-freeze-desc': 'Request to temporarily freeze the account instead of deleting it',
            'delete-contact-title': 'Contact Us',
            'delete-contact-desc': 'If you have any questions about the account deletion process or need help, you can contact us:',
            'delete-rights-title': 'Your Legal Rights',
            'delete-rights-gdpr': 'Your Right to Delete Data (GDPR):',
            'delete-right-delete': 'Right to Deletion:',
            'delete-right-delete-desc': 'You have the right to request deletion of your personal data',
            'delete-right-response': 'Quick Response:',
            'delete-right-response-desc': 'We will respond to your request within 30 days',
            'delete-right-confirm': 'Confirmation:',
            'delete-right-confirm-desc': 'We will confirm the completion of the deletion process',
            'delete-right-discrimination': 'No Discrimination:',
            'delete-right-discrimination-desc': 'We will not treat you differently after requesting deletion',
            'footer-privacy-rights': 'Privacy and Rights',
            'footer-delete-account': 'Delete Account',
            'footer-exercise-rights': 'Exercise Rights'
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
    
    // Helper function to translate element with restoration support
    function translateElement(element, translationKey) {
        if (!element) return;
        
        if (lang === 'en') {
            // Store original if not already stored
            if (!element.hasAttribute('data-ar-original')) {
                element.setAttribute('data-ar-original', element.textContent);
            }
            // Translate to English
            element.textContent = translations[lang][translationKey];
        } else {
            // Restore original Arabic text
            const original = element.getAttribute('data-ar-original');
            if (original) {
                element.textContent = original;
            }
        }
    }
    
    // Translate navigation links
    const navLinks = document.querySelectorAll('.main-navigation a');
    if (navLinks.length >= 4) {
        if (lang === 'en') {
            // Save original Arabic text if not already saved
            if (!navLinks[0].hasAttribute('data-ar-original')) {
                navLinks[0].setAttribute('data-ar-original', navLinks[0].textContent);
            }
            if (!navLinks[1].hasAttribute('data-ar-original')) {
                navLinks[1].setAttribute('data-ar-original', navLinks[1].textContent);
            }
            if (!navLinks[2].hasAttribute('data-ar-original')) {
                navLinks[2].setAttribute('data-ar-original', navLinks[2].textContent);
            }
            if (!navLinks[3].hasAttribute('data-ar-original')) {
                navLinks[3].setAttribute('data-ar-original', navLinks[3].textContent);
            }
            navLinks[0].textContent = 'Home';
            navLinks[1].textContent = 'About Us';
            navLinks[2].textContent = 'Contact Us';
            navLinks[3].textContent = 'Privacy Policy';
        } else {
            // Restore original Arabic text
            const original0 = navLinks[0].getAttribute('data-ar-original');
            const original1 = navLinks[1].getAttribute('data-ar-original');
            const original2 = navLinks[2].getAttribute('data-ar-original');
            const original3 = navLinks[3].getAttribute('data-ar-original');
            if (original0) navLinks[0].textContent = original0;
            if (original1) navLinks[1].textContent = original1;
            if (original2) navLinks[2].textContent = original2;
            if (original3) navLinks[3].textContent = original3;
        }
    }
    
    // Translate site description
    const siteDesc = document.querySelector('.site-description');
    if (siteDesc) {
        if (lang === 'en') {
            if (!siteDesc.hasAttribute('data-ar-original')) {
                siteDesc.setAttribute('data-ar-original', siteDesc.textContent);
            }
            siteDesc.textContent = translations[lang]['site-desc'];
        } else {
            const original = siteDesc.getAttribute('data-ar-original');
            if (original) {
                siteDesc.textContent = original;
            }
        }
    }
    
    // Translate page title
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle) {
        if (lang === 'en') {
            if (!pageTitle.hasAttribute('data-ar-original')) {
                pageTitle.setAttribute('data-ar-original', pageTitle.textContent);
            }
            const titleText = pageTitle.getAttribute('data-ar-original') || pageTitle.textContent;
            if (titleText.includes('سياسة الخصوصية') && !titleText.includes('سياسات')) {
                pageTitle.textContent = translations[lang]['page-title-privacy'];
            } else if (titleText.includes('سياسات الخصوصية')) {
                pageTitle.textContent = 'Privacy Policies';
            } else if (titleText.includes('من نحن')) {
                pageTitle.textContent = translations[lang]['nav-about'];
            } else if (titleText.includes('اتصل بنا')) {
                pageTitle.textContent = translations[lang]['nav-contact'];
            } else if (titleText.includes('طلب حذف الحساب')) {
                pageTitle.textContent = 'Request Account Deletion';
            }
        } else {
            const original = pageTitle.getAttribute('data-ar-original');
            if (original) {
                pageTitle.textContent = original;
            }
        }
    }
    
    // Translate page subtitle
    const pageSubtitle = document.querySelector('.page-subtitle');
    if (pageSubtitle) {
        if (lang === 'en') {
            if (!pageSubtitle.hasAttribute('data-ar-original')) {
                pageSubtitle.setAttribute('data-ar-original', pageSubtitle.textContent);
            }
            const subtitleText = pageSubtitle.getAttribute('data-ar-original') || pageSubtitle.textContent;
            if (subtitleText.includes('المسبحة الذكية')) {
                pageSubtitle.textContent = translations[lang]['page-subtitle-tasbiah'];
            } else if (subtitleText.includes('تعرف على فريق')) {
                pageSubtitle.textContent = translations[lang]['about-subtitle'];
            } else if (subtitleText.includes('نحن هنا لمساعدتك')) {
                pageSubtitle.textContent = translations[lang]['contact-subtitle'];
            } else if (subtitleText.includes('اختر السياسة المناسبة')) {
                pageSubtitle.textContent = translations[lang]['privacy-options-subtitle'];
            } else if (subtitleText.includes('حذف حسابك وبياناتك')) {
                pageSubtitle.textContent = translations[lang]['delete-subtitle'];
            }
        } else {
            const original = pageSubtitle.getAttribute('data-ar-original');
            if (original) {
                pageSubtitle.textContent = original;
            }
        }
    }
    
    // Translate hero section
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        if (lang === 'en') {
            if (!heroTitle.hasAttribute('data-ar-original')) {
                heroTitle.setAttribute('data-ar-original', heroTitle.textContent);
            }
            heroTitle.textContent = translations[lang]['hero-title'];
        } else {
            const original = heroTitle.getAttribute('data-ar-original');
            if (original) {
                heroTitle.textContent = original;
            }
        }
    }
    
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        if (lang === 'en') {
            if (!heroSubtitle.hasAttribute('data-ar-original')) {
                heroSubtitle.setAttribute('data-ar-original', heroSubtitle.textContent);
            }
            heroSubtitle.textContent = translations[lang]['hero-subtitle'];
        } else {
            const original = heroSubtitle.getAttribute('data-ar-original');
            if (original) {
                heroSubtitle.textContent = original;
            }
        }
    }
    
    // Translate hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach((btn, index) => {
        if (lang === 'en') {
            if (!btn.hasAttribute('data-ar-original')) {
                btn.setAttribute('data-ar-original', btn.textContent.trim());
            }
            if (index === 0) {
                btn.textContent = translations[lang]['btn-explore-apps'];
            } else if (index === 1) {
                btn.textContent = translations[lang]['btn-contact'];
            }
        } else {
            const original = btn.getAttribute('data-ar-original');
            if (original) {
                btn.textContent = original;
            }
        }
    });
    
    // Translate section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        if (lang === 'en') {
            if (!title.hasAttribute('data-ar-original')) {
                title.setAttribute('data-ar-original', title.textContent);
            }
            const text = title.getAttribute('data-ar-original') || title.textContent;
            if (text.includes('تطبيقاتنا للأندرويد')) {
                title.textContent = translations[lang]['section-apps'];
            } else if (text.includes('مواقعنا الإلكترونية')) {
                title.textContent = translations[lang]['section-websites'];
            } else if (text.includes('شروحاتنا على يوتيوب')) {
                title.textContent = translations[lang]['section-youtube'];
            } else if (text.includes('إنجازاتنا')) {
                title.textContent = translations[lang]['section-achievements'];
            } else if (text.includes('لماذا ديومكس')) {
                title.textContent = translations[lang]['section-features'];
            }
        } else {
            const original = title.getAttribute('data-ar-original');
            if (original) {
                title.textContent = original;
            }
        }
    });
    
    // Translate app cards
    const appCards = document.querySelectorAll('.app-card');
    appCards.forEach(card => {
        const appTitle = card.querySelector('.app-title');
        const appDesc = card.querySelector('.app-description');
        const appFeatures = card.querySelectorAll('.app-features li');
        const downloadBtn = card.querySelector('.btn');
        const status = card.querySelector('.app-status');
        
        if (appTitle) {
            if (lang === 'en') {
                if (!appTitle.hasAttribute('data-ar-original')) {
                    appTitle.setAttribute('data-ar-original', appTitle.textContent);
                }
                const titleText = appTitle.getAttribute('data-ar-original') || appTitle.textContent;
                if (titleText.includes('تطبيق التسبيح')) {
                    appTitle.textContent = translations[lang]['app-tasbiah-title'];
                } else if (titleText.includes('DIY Electric Calculator')) {
                    appTitle.textContent = translations[lang]['app-electric-title'];
                } else if (titleText.includes('صيانة السيارات')) {
                    appTitle.textContent = translations[lang]['app-car-title'];
                } else if (titleText.includes('إدارة المال الشخصي')) {
                    appTitle.textContent = translations[lang]['app-money-title'];
                } else if (titleText.includes('موقع التسبيح')) {
                    appTitle.textContent = translations[lang]['website-tasbiah-title'];
                }
            } else {
                const original = appTitle.getAttribute('data-ar-original');
                if (original) {
                    appTitle.textContent = original;
                }
            }
        }
        
        if (appDesc) {
            if (lang === 'en') {
                if (!appDesc.hasAttribute('data-ar-original')) {
                    appDesc.setAttribute('data-ar-original', appDesc.textContent);
                }
                const descText = appDesc.getAttribute('data-ar-original') || appDesc.textContent;
                if (descText.includes('تطبيق ذكي للتسبيح')) {
                    appDesc.textContent = translations[lang]['app-tasbiah-desc'];
                } else if (descText.includes('حساب الطاقة وحجم الأسلاك')) {
                    appDesc.textContent = translations[lang]['app-electric-desc'];
                } else if (descText.includes('إدارة صيانة السيارات')) {
                    appDesc.textContent = translations[lang]['app-car-desc'];
                } else if (descText.includes('الميزانية الشخصية')) {
                    appDesc.textContent = translations[lang]['app-money-desc'];
                } else if (descText.includes('موقع ويب شامل للتسبيح')) {
                    appDesc.textContent = translations[lang]['website-tasbiah-desc'];
                }
            } else {
                const original = appDesc.getAttribute('data-ar-original');
                if (original) {
                    appDesc.textContent = original;
                }
            }
        }
        
        // Translate app features
        appFeatures.forEach((feature, index) => {
            if (lang === 'en') {
                if (!feature.hasAttribute('data-ar-original')) {
                    feature.setAttribute('data-ar-original', feature.textContent);
                }
                const appTitleText = appTitle ? (appTitle.getAttribute('data-ar-original') || appTitle.textContent) : '';
                
                if (appTitleText.includes('تطبيق التسبيح') || appTitleText.includes('Tasbih App')) {
                    if (index === 0) feature.textContent = translations[lang]['app-tasbiah-feature1'];
                    else if (index === 1) feature.textContent = translations[lang]['app-tasbiah-feature2'];
                    else if (index === 2) feature.textContent = translations[lang]['app-tasbiah-feature3'];
                } else if (appTitleText.includes('Electric Calculator')) {
                    if (index === 0) feature.textContent = translations[lang]['app-electric-feature1'];
                    else if (index === 1) feature.textContent = translations[lang]['app-electric-feature2'];
                    else if (index === 2) feature.textContent = translations[lang]['app-electric-feature3'];
                    else if (index === 3) feature.textContent = translations[lang]['app-electric-feature4'];
                } else if (appTitleText.includes('صيانة السيارات') || appTitleText.includes('Car Maintenance')) {
                    if (index === 0) feature.textContent = translations[lang]['app-car-feature1'];
                    else if (index === 1) feature.textContent = translations[lang]['app-car-feature2'];
                    else if (index === 2) feature.textContent = translations[lang]['app-car-feature3'];
                    else if (index === 3) feature.textContent = translations[lang]['app-car-feature4'];
                } else if (appTitleText.includes('إدارة المال') || appTitleText.includes('Money Management')) {
                    if (index === 0) feature.textContent = translations[lang]['app-money-feature1'];
                    else if (index === 1) feature.textContent = translations[lang]['app-money-feature2'];
                    else if (index === 2) feature.textContent = translations[lang]['app-money-feature3'];
                    else if (index === 3) feature.textContent = translations[lang]['app-money-feature4'];
                } else if (appTitleText.includes('موقع التسبيح') || appTitleText.includes('Tasbih Website')) {
                    if (index === 0) feature.textContent = translations[lang]['website-tasbiah-feature1'];
                    else if (index === 1) feature.textContent = translations[lang]['website-tasbiah-feature2'];
                    else if (index === 2) feature.textContent = translations[lang]['website-tasbiah-feature3'];
                    else if (index === 3) feature.textContent = translations[lang]['website-tasbiah-feature4'];
                }
            } else {
                const original = feature.getAttribute('data-ar-original');
                if (original) {
                    feature.textContent = original;
                }
            }
        });
        
        // Translate download/visit buttons
        if (downloadBtn) {
            const btnSpan = downloadBtn.querySelector('span');
            if (btnSpan) {
                if (lang === 'en') {
                    if (!btnSpan.hasAttribute('data-ar-original')) {
                        btnSpan.setAttribute('data-ar-original', btnSpan.textContent);
                    }
                    const btnText = btnSpan.getAttribute('data-ar-original') || btnSpan.textContent;
                    if (btnText.includes('تحميل')) {
                        btnSpan.textContent = translations[lang]['btn-download'];
                    } else if (btnText.includes('زيارة')) {
                        btnSpan.textContent = translations[lang]['btn-visit'];
                    }
                } else {
                    const original = btnSpan.getAttribute('data-ar-original');
                    if (original) {
                        btnSpan.textContent = original;
                    }
                }
            }
        }
        
        // Translate status
        if (status) {
            if (lang === 'en') {
                if (!status.hasAttribute('data-ar-original')) {
                    status.setAttribute('data-ar-original', status.textContent);
                }
                const statusText = status.getAttribute('data-ar-original') || status.textContent;
                if (statusText.includes('متاح الآن')) {
                    status.textContent = translations[lang]['status-available'];
                } else if (statusText.includes('قيد التطوير')) {
                    status.textContent = translations[lang]['status-development'];
                } else if (statusText.includes('قريباً')) {
                    status.textContent = translations[lang]['status-coming'];
                }
            } else {
                const original = status.getAttribute('data-ar-original');
                if (original) {
                    status.textContent = original;
                }
            }
        }
    });
    
    // Translate YouTube section
    const youtubeIntro = document.querySelector('.youtube-intro p');
    if (youtubeIntro) {
        if (lang === 'en') {
            if (!youtubeIntro.hasAttribute('data-ar-original')) {
                youtubeIntro.setAttribute('data-ar-original', youtubeIntro.textContent);
            }
            youtubeIntro.textContent = translations[lang]['youtube-intro'];
        } else {
            const original = youtubeIntro.getAttribute('data-ar-original');
            if (original) {
                youtubeIntro.textContent = original;
            }
        }
    }
    
    const youtubeCards = document.querySelectorAll('.youtube-card');
    youtubeCards.forEach((card, index) => {
        const cardTitle = card.querySelector('h3');
        const cardDesc = card.querySelector('p');
        const cardBtn = card.querySelector('.btn');
        
        if (cardTitle) {
            if (lang === 'en') {
                if (!cardTitle.hasAttribute('data-ar-original')) {
                    cardTitle.setAttribute('data-ar-original', cardTitle.textContent);
                }
                if (index === 0) cardTitle.textContent = translations[lang]['youtube-card1-title'];
                else if (index === 1) cardTitle.textContent = translations[lang]['youtube-card2-title'];
                else if (index === 2) cardTitle.textContent = translations[lang]['youtube-card3-title'];
            } else {
                const original = cardTitle.getAttribute('data-ar-original');
                if (original) {
                    cardTitle.textContent = original;
                }
            }
        }
        
        if (cardDesc) {
            if (lang === 'en') {
                if (!cardDesc.hasAttribute('data-ar-original')) {
                    cardDesc.setAttribute('data-ar-original', cardDesc.textContent);
                }
                if (index === 0) cardDesc.textContent = translations[lang]['youtube-card1-desc'];
                else if (index === 1) cardDesc.textContent = translations[lang]['youtube-card2-desc'];
                else if (index === 2) cardDesc.textContent = translations[lang]['youtube-card3-desc'];
            } else {
                const original = cardDesc.getAttribute('data-ar-original');
                if (original) {
                    cardDesc.textContent = original;
                }
            }
        }
        
        if (cardBtn) {
            if (lang === 'en') {
                if (!cardBtn.hasAttribute('data-ar-original')) {
                    cardBtn.setAttribute('data-ar-original', cardBtn.textContent);
                }
                cardBtn.textContent = translations[lang]['btn-watch'];
            } else {
                const original = cardBtn.getAttribute('data-ar-original');
                if (original) {
                    cardBtn.textContent = original;
                }
            }
        }
    });
    
    // Translate achievements
    const achievementItems = document.querySelectorAll('.achievement-item');
    achievementItems.forEach(item => {
        const label = item.querySelector('.achievement-label');
        const desc = item.querySelector('.achievement-description');
        
        if (label) {
            if (lang === 'en') {
                if (!label.hasAttribute('data-ar-original')) {
                    label.setAttribute('data-ar-original', label.textContent);
                }
                const labelText = label.getAttribute('data-ar-original') || label.textContent;
                if (labelText.includes('تطبيقات مطورة')) {
                    label.textContent = translations[lang]['achievement-apps'];
                } else if (labelText.includes('تطبيقات قيد التطوير')) {
                    label.textContent = translations[lang]['achievement-dev'];
                } else if (labelText.includes('مستخدم نشط')) {
                    label.textContent = translations[lang]['achievement-users'];
                } else if (labelText.includes('تحميل') && !labelText.includes('مستخدم')) {
                    label.textContent = translations[lang]['achievement-downloads'];
                } else if (labelText.includes('تقييم متوسط')) {
                    label.textContent = translations[lang]['achievement-rating'];
                } else if (labelText.includes('تقييم') && !labelText.includes('متوسط')) {
                    label.textContent = translations[lang]['achievement-reviews'];
                } else if (labelText.includes('دولة')) {
                    label.textContent = translations[lang]['achievement-countries'];
                } else if (labelText.includes('لغة')) {
                    label.textContent = translations[lang]['achievement-languages'];
                } else if (labelText.includes('تحديث')) {
                    label.textContent = translations[lang]['achievement-updates'];
                } else if (labelText.includes('خصوصية')) {
                    label.textContent = translations[lang]['achievement-privacy'];
                } else if (labelText.includes('ميزة')) {
                    label.textContent = translations[lang]['achievement-features'];
                } else if (labelText.includes('رضا')) {
                    label.textContent = translations[lang]['achievement-satisfaction'];
                }
            } else {
                const original = label.getAttribute('data-ar-original');
                if (original) {
                    label.textContent = original;
                }
            }
        }
        
        if (desc) {
            if (lang === 'en') {
                if (!desc.hasAttribute('data-ar-original')) {
                    desc.setAttribute('data-ar-original', desc.textContent);
                }
                const descText = desc.getAttribute('data-ar-original') || desc.textContent;
                if (descText.includes('تطبيق متاح على Google Play')) {
                    desc.textContent = translations[lang]['achievement-apps-desc'];
                } else if (descText.includes('قريباً على المتاجر')) {
                    desc.textContent = translations[lang]['achievement-dev-desc'];
                } else if (descText.includes('يستخدمون تطبيقاتنا يومياً')) {
                    desc.textContent = translations[lang]['achievement-users-desc'];
                } else if (descText.includes('من Google Play Store')) {
                    desc.textContent = translations[lang]['achievement-downloads-desc'];
                } else if (descText.includes('من المستخدمين')) {
                    desc.textContent = translations[lang]['achievement-rating-desc'];
                } else if (descText.includes('تقييمات إيجابية')) {
                    desc.textContent = translations[lang]['achievement-reviews-desc'];
                } else if (descText.includes('يستخدمون تطبيقاتنا') && !descText.includes('يومياً')) {
                    desc.textContent = translations[lang]['achievement-countries-desc'];
                } else if (descText.includes('العربية والإنجليزية')) {
                    desc.textContent = translations[lang]['achievement-languages-desc'];
                } else if (descText.includes('تحسينات وميزات جديدة')) {
                    desc.textContent = translations[lang]['achievement-updates-desc'];
                } else if (descText.includes('بيانات محلية فقط')) {
                    desc.textContent = translations[lang]['achievement-privacy-desc'];
                } else if (descText.includes('في كل تطبيق')) {
                    desc.textContent = translations[lang]['achievement-features-desc'];
                } else if (descText.includes('معدل رضا المستخدمين')) {
                    desc.textContent = translations[lang]['achievement-satisfaction-desc'];
                }
            } else {
                const original = desc.getAttribute('data-ar-original');
                if (original) {
                    desc.textContent = original;
                }
            }
        }
    });
    
    // Translate feature items
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        const featureTitle = item.querySelector('h3');
        const featureDesc = item.querySelector('p');
        
        if (featureTitle) {
            if (lang === 'en') {
                if (!featureTitle.hasAttribute('data-ar-original')) {
                    featureTitle.setAttribute('data-ar-original', featureTitle.textContent);
                }
                if (index === 0) featureTitle.textContent = translations[lang]['feature-fast-title'];
                else if (index === 1) featureTitle.textContent = translations[lang]['feature-security-title'];
                else if (index === 2) featureTitle.textContent = translations[lang]['feature-support-title'];
            } else {
                const original = featureTitle.getAttribute('data-ar-original');
                if (original) {
                    featureTitle.textContent = original;
                }
            }
        }
        
        if (featureDesc) {
            if (lang === 'en') {
                if (!featureDesc.hasAttribute('data-ar-original')) {
                    featureDesc.setAttribute('data-ar-original', featureDesc.textContent);
                }
                if (index === 0) featureDesc.textContent = translations[lang]['feature-fast-desc'];
                else if (index === 1) featureDesc.textContent = translations[lang]['feature-security-desc'];
                else if (index === 2) featureDesc.textContent = translations[lang]['feature-support-desc'];
            } else {
                const original = featureDesc.getAttribute('data-ar-original');
                if (original) {
                    featureDesc.textContent = original;
                }
            }
        }
    });
    
    // Translate footer
    const footerTitle = document.querySelector('.footer-info h3');
    if (footerTitle) {
        if (lang === 'en') {
            if (!footerTitle.hasAttribute('data-ar-original')) {
                footerTitle.setAttribute('data-ar-original', footerTitle.textContent);
            }
            footerTitle.textContent = translations[lang]['footer-title'];
        } else {
            const original = footerTitle.getAttribute('data-ar-original');
            if (original) {
                footerTitle.textContent = original;
            }
        }
    }
    
    const footerDesc = document.querySelector('.footer-info p');
    if (footerDesc) {
        if (lang === 'en') {
            if (!footerDesc.hasAttribute('data-ar-original')) {
                footerDesc.setAttribute('data-ar-original', footerDesc.textContent);
            }
            footerDesc.textContent = translations[lang]['footer-desc'];
        } else {
            const original = footerDesc.getAttribute('data-ar-original');
            if (original) {
                footerDesc.textContent = original;
            }
        }
    }
    
    const footerPrivacyTitle = document.querySelector('.footer-privacy-links h4');
    if (footerPrivacyTitle) {
        if (lang === 'en') {
            if (!footerPrivacyTitle.hasAttribute('data-ar-original')) {
                footerPrivacyTitle.setAttribute('data-ar-original', footerPrivacyTitle.textContent);
            }
            footerPrivacyTitle.textContent = translations[lang]['footer-privacy-title'];
        } else {
            const original = footerPrivacyTitle.getAttribute('data-ar-original');
            if (original) {
                footerPrivacyTitle.textContent = original;
            }
        }
    }
    
    const footerCopyright = document.querySelector('.footer-bottom p');
    if (footerCopyright) {
        if (lang === 'en') {
            if (!footerCopyright.hasAttribute('data-ar-original')) {
                footerCopyright.setAttribute('data-ar-original', footerCopyright.textContent);
            }
            const copyrightText = footerCopyright.getAttribute('data-ar-original') || footerCopyright.textContent;
            if (copyrightText.includes('جميع الحقوق محفوظة')) {
                footerCopyright.textContent = '© 2025 ' + translations[lang]['footer-title'] + '. ' + translations[lang]['footer-copyright'];
            }
        } else {
            const original = footerCopyright.getAttribute('data-ar-original');
            if (original) {
                footerCopyright.textContent = original;
            }
        }
    }
    
    // Translate websites note
    const websitesNote = document.querySelector('.websites-section p');
    if (websitesNote && websitesNote.textContent.includes('نعمل على تطوير')) {
        if (lang === 'en') {
            if (!websitesNote.hasAttribute('data-ar-original')) {
                websitesNote.setAttribute('data-ar-original', websitesNote.textContent);
            }
            websitesNote.textContent = translations[lang]['websites-note'];
        } else {
            const original = websitesNote.getAttribute('data-ar-original');
            if (original) {
                websitesNote.textContent = original;
            }
        }
    }
    
    // Translate content section
    const contentSection = document.querySelector('section[style*="background: #f8f9fa"]');
    if (contentSection) {
        const contentTitle = contentSection.querySelector('h2');
        const contentParas = contentSection.querySelectorAll('p');
        
        if (contentTitle) {
            if (lang === 'en') {
                if (!contentTitle.hasAttribute('data-ar-original')) {
                    contentTitle.setAttribute('data-ar-original', contentTitle.textContent);
                }
                contentTitle.textContent = translations[lang]['content-title'];
            } else {
                const original = contentTitle.getAttribute('data-ar-original');
                if (original) {
                    contentTitle.textContent = original;
                }
            }
        }
        
        contentParas.forEach((para, index) => {
            if (lang === 'en') {
                if (!para.hasAttribute('data-ar-original')) {
                    para.setAttribute('data-ar-original', para.textContent);
                }
                if (index === 0) para.textContent = translations[lang]['content-para1'];
                else if (index === 1) para.textContent = translations[lang]['content-para2'];
                else if (index === 2) para.textContent = translations[lang]['content-para3'];
            } else {
                const original = para.getAttribute('data-ar-original');
                if (original) {
                    para.textContent = original;
                }
            }
        });
    }
    
    // Translate About page content
    const aboutStoryTitle = document.querySelector('.about-intro h2');
    if (aboutStoryTitle) {
        if (lang === 'en') {
            if (!aboutStoryTitle.hasAttribute('data-ar-original')) {
                aboutStoryTitle.setAttribute('data-ar-original', aboutStoryTitle.textContent);
            }
            aboutStoryTitle.textContent = translations[lang]['about-story-title'];
        } else {
            const original = aboutStoryTitle.getAttribute('data-ar-original');
            if (original) {
                aboutStoryTitle.textContent = original;
            }
        }
    }
    
    const aboutStoryParas = document.querySelectorAll('.about-intro p');
    aboutStoryParas.forEach((para, index) => {
        if (lang === 'en') {
            if (!para.hasAttribute('data-ar-original')) {
                para.setAttribute('data-ar-original', para.textContent);
            }
            if (index === 0) para.textContent = translations[lang]['about-story-para1'];
            else if (index === 1) para.textContent = translations[lang]['about-story-para2'];
            else if (index === 2) para.textContent = translations[lang]['about-story-para3'];
        } else {
            const original = para.getAttribute('data-ar-original');
            if (original) {
                para.textContent = original;
            }
        }
    });
    
    // Translate Mission & Vision
    const missionItems = document.querySelectorAll('.mission-item');
    missionItems.forEach((item, index) => {
        const title = item.querySelector('h3');
        const desc = item.querySelector('p');
        
        if (title) {
            if (lang === 'en') {
                if (!title.hasAttribute('data-ar-original')) {
                    title.setAttribute('data-ar-original', title.textContent);
                }
                if (index === 0) title.textContent = translations[lang]['about-vision-title'];
                else if (index === 1) title.textContent = translations[lang]['about-mission-title'];
            } else {
                const original = title.getAttribute('data-ar-original');
                if (original) {
                    title.textContent = original;
                }
            }
        }
        
        if (desc) {
            if (lang === 'en') {
                if (!desc.hasAttribute('data-ar-original')) {
                    desc.setAttribute('data-ar-original', desc.textContent);
                }
                if (index === 0) desc.textContent = translations[lang]['about-vision-desc'];
                else if (index === 1) desc.textContent = translations[lang]['about-mission-desc'];
            } else {
                const original = desc.getAttribute('data-ar-original');
                if (original) {
                    desc.textContent = original;
                }
            }
        }
    });
    
    // Translate Services section
    const servicesTitle = document.querySelector('.services-section h2');
    if (servicesTitle) {
        if (lang === 'en') {
            if (!servicesTitle.hasAttribute('data-ar-original')) {
                servicesTitle.setAttribute('data-ar-original', servicesTitle.textContent);
            }
            servicesTitle.textContent = translations[lang]['about-services-title'];
        } else {
            const original = servicesTitle.getAttribute('data-ar-original');
            if (original) {
                servicesTitle.textContent = original;
            }
        }
    }
    
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach((item, index) => {
        const title = item.querySelector('h4');
        const desc = item.querySelector('p');
        
        if (title) {
            if (lang === 'en') {
                if (!title.hasAttribute('data-ar-original')) {
                    title.setAttribute('data-ar-original', title.textContent);
                }
                if (index === 0) title.textContent = translations[lang]['service-apps-title'];
                else if (index === 1) title.textContent = translations[lang]['service-websites-title'];
                else if (index === 2) title.textContent = translations[lang]['service-tutorials-title'];
                else if (index === 3) title.textContent = translations[lang]['service-design-title'];
                else if (index === 4) title.textContent = translations[lang]['service-support-title'];
            } else {
                const original = title.getAttribute('data-ar-original');
                if (original) {
                    title.textContent = original;
                }
            }
        }
        
        if (desc) {
            if (lang === 'en') {
                if (!desc.hasAttribute('data-ar-original')) {
                    desc.setAttribute('data-ar-original', desc.textContent);
                }
                if (index === 0) desc.textContent = translations[lang]['service-apps-desc'];
                else if (index === 1) desc.textContent = translations[lang]['service-websites-desc'];
                else if (index === 2) desc.textContent = translations[lang]['service-tutorials-desc'];
                else if (index === 3) desc.textContent = translations[lang]['service-design-desc'];
                else if (index === 4) desc.textContent = translations[lang]['service-support-desc'];
            } else {
                const original = desc.getAttribute('data-ar-original');
                if (original) {
                    desc.textContent = original;
                }
            }
        }
    });
    
    // Translate Values section
    const valuesTitle = document.querySelector('.values-section h2');
    if (valuesTitle) {
        if (lang === 'en') {
            if (!valuesTitle.hasAttribute('data-ar-original')) {
                valuesTitle.setAttribute('data-ar-original', valuesTitle.textContent);
            }
            valuesTitle.textContent = translations[lang]['about-values-title'];
        } else {
            const original = valuesTitle.getAttribute('data-ar-original');
            if (original) {
                valuesTitle.textContent = original;
            }
        }
    }
    
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach((item, index) => {
        const title = item.querySelector('h4');
        const desc = item.querySelector('p');
        
        if (title) {
            if (lang === 'en') {
                if (!title.hasAttribute('data-ar-original')) {
                    title.setAttribute('data-ar-original', title.textContent);
                }
                if (index === 0) title.textContent = translations[lang]['value-innovation-title'];
                else if (index === 1) title.textContent = translations[lang]['value-quality-title'];
                else if (index === 2) title.textContent = translations[lang]['value-transparency-title'];
                else if (index === 3) title.textContent = translations[lang]['value-teamwork-title'];
            } else {
                const original = title.getAttribute('data-ar-original');
                if (original) {
                    title.textContent = original;
                }
            }
        }
        
        if (desc) {
            if (lang === 'en') {
                if (!desc.hasAttribute('data-ar-original')) {
                    desc.setAttribute('data-ar-original', desc.textContent);
                }
                if (index === 0) desc.textContent = translations[lang]['value-innovation-desc'];
                else if (index === 1) desc.textContent = translations[lang]['value-quality-desc'];
                else if (index === 2) desc.textContent = translations[lang]['value-transparency-desc'];
                else if (index === 3) desc.textContent = translations[lang]['value-teamwork-desc'];
            } else {
                const original = desc.getAttribute('data-ar-original');
                if (original) {
                    desc.textContent = original;
                }
            }
        }
    });
    
    // Translate Team section
    const teamTitle = document.querySelector('.team-section h2');
    if (teamTitle) {
        if (lang === 'en') {
            if (!teamTitle.hasAttribute('data-ar-original')) {
                teamTitle.setAttribute('data-ar-original', teamTitle.textContent);
            }
            teamTitle.textContent = translations[lang]['about-team-title'];
        } else {
            const original = teamTitle.getAttribute('data-ar-original');
            if (original) {
                teamTitle.textContent = original;
            }
        }
    }
    
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member) => {
        const role = member.querySelector('.member-role');
        if (role) {
            if (lang === 'en') {
                if (!role.hasAttribute('data-ar-original')) {
                    role.setAttribute('data-ar-original', role.textContent);
                }
                const roleText = role.getAttribute('data-ar-original') || role.textContent;
                if (roleText.includes('مدير المشروع')) {
                    role.textContent = translations[lang]['member-role-manager'];
                } else if (roleText.includes('مطور تطبيقات')) {
                    role.textContent = translations[lang]['member-role-developer'];
                } else if (roleText.includes('المختبر الأول')) {
                    role.textContent = translations[lang]['member-role-tester'];
                } else if (roleText.includes('خبير أول')) {
                    role.textContent = translations[lang]['member-role-expert'];
                }
            } else {
                const original = role.getAttribute('data-ar-original');
                if (original) {
                    role.textContent = original;
                }
            }
        }
    });
    
    // Translate Timeline section
    const timelineTitle = document.querySelector('.timeline-section h2');
    if (timelineTitle) {
        if (lang === 'en') {
            if (!timelineTitle.hasAttribute('data-ar-original')) {
                timelineTitle.setAttribute('data-ar-original', timelineTitle.textContent);
            }
            timelineTitle.textContent = translations[lang]['about-timeline-title'];
        } else {
            const original = timelineTitle.getAttribute('data-ar-original');
            if (original) {
                timelineTitle.textContent = original;
            }
        }
    }
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        const title = item.querySelector('.timeline-content h4');
        const desc = item.querySelector('.timeline-content p');
        
        if (title) {
            if (lang === 'en') {
                if (!title.hasAttribute('data-ar-original')) {
                    title.setAttribute('data-ar-original', title.textContent);
                }
                const titleText = title.getAttribute('data-ar-original') || title.textContent;
                if (titleText.includes('تأسيس الفريق')) {
                    title.textContent = translations[lang]['timeline-foundation-title'];
                } else if (titleText.includes('أول تطبيق') && !titleText.includes('إصدار')) {
                    title.textContent = translations[lang]['timeline-first-app-title'];
                } else if (titleText.includes('إصدار أول تطبيق')) {
                    title.textContent = translations[lang]['timeline-release-title'];
                } else if (titleText.includes('المستقبل')) {
                    title.textContent = translations[lang]['timeline-future-title'];
                }
            } else {
                const original = title.getAttribute('data-ar-original');
                if (original) {
                    title.textContent = original;
                }
            }
        }
        
        if (desc) {
            if (lang === 'en') {
                if (!desc.hasAttribute('data-ar-original')) {
                    desc.setAttribute('data-ar-original', desc.textContent);
                }
                const descText = desc.getAttribute('data-ar-original') || desc.textContent;
                if (descText.includes('تأسس الفريق')) {
                    desc.textContent = translations[lang]['timeline-foundation-desc'];
                } else if (descText.includes('تم البدء بالعمل على أول تطبيق')) {
                    desc.textContent = translations[lang]['timeline-first-app-desc'];
                } else if (descText.includes('تم إصدار أول تطبيق')) {
                    desc.textContent = translations[lang]['timeline-release-desc'];
                } else if (descText.includes('إطلاق مشاريع جديدة')) {
                    desc.textContent = translations[lang]['timeline-future-desc'];
                }
            } else {
                const original = desc.getAttribute('data-ar-original');
                if (original) {
                    desc.textContent = original;
                }
            }
        }
    });
    
    // Translate Contact page content
    const contactFormTitle = document.querySelector('.contact-form-section h2');
    if (contactFormTitle) {
        if (lang === 'en') {
            if (!contactFormTitle.hasAttribute('data-ar-original')) {
                contactFormTitle.setAttribute('data-ar-original', contactFormTitle.textContent);
            }
            contactFormTitle.textContent = translations[lang]['contact-form-title'];
        } else {
            const original = contactFormTitle.getAttribute('data-ar-original');
            if (original) {
                contactFormTitle.textContent = original;
            }
        }
    }
    
    // Translate form labels
    const formLabels = document.querySelectorAll('.form-group label');
    formLabels.forEach(label => {
        if (lang === 'en') {
            if (!label.hasAttribute('data-ar-original')) {
                label.setAttribute('data-ar-original', label.textContent);
            }
            const labelText = label.getAttribute('data-ar-original') || label.textContent;
            if (labelText.includes('الاسم الكامل')) {
                label.textContent = translations[lang]['form-label-name'];
            } else if (labelText.includes('البريد الإلكتروني')) {
                label.textContent = translations[lang]['form-label-email'];
            } else if (labelText.includes('رقم الهاتف')) {
                label.textContent = translations[lang]['form-label-phone'];
            } else if (labelText.includes('الموضوع')) {
                label.textContent = translations[lang]['form-label-subject'];
            } else if (labelText.includes('الرسالة')) {
                label.textContent = translations[lang]['form-label-message'];
            }
        } else {
            const original = label.getAttribute('data-ar-original');
            if (original) {
                label.textContent = original;
            }
        }
    });
    
    // Translate form select options
    const formSelect = document.querySelector('#subject');
    if (formSelect) {
        const options = formSelect.querySelectorAll('option');
        options.forEach((option, index) => {
            if (index === 0) {
                if (lang === 'en') {
                    if (!option.hasAttribute('data-ar-original')) {
                        option.setAttribute('data-ar-original', option.textContent);
                    }
                    option.textContent = translations[lang]['form-placeholder-subject'];
                } else {
                    const original = option.getAttribute('data-ar-original');
                    if (original) {
                        option.textContent = original;
                    }
                }
            } else {
                if (lang === 'en') {
                    if (!option.hasAttribute('data-ar-original')) {
                        option.setAttribute('data-ar-original', option.textContent);
                    }
                    const optionText = option.getAttribute('data-ar-original') || option.textContent;
                    if (optionText.includes('دعم فني للتطبيقات')) {
                        option.textContent = translations[lang]['form-option-support'];
                    } else if (optionText.includes('تقرير خطأ')) {
                        option.textContent = translations[lang]['form-option-bug'];
                    } else if (optionText.includes('اقتراح ميزة')) {
                        option.textContent = translations[lang]['form-option-feature'];
                    } else if (optionText.includes('استفسار حول شروحات يوتيوب')) {
                        option.textContent = translations[lang]['form-option-youtube'];
                    } else if (optionText.includes('أعمال تجارية')) {
                        option.textContent = translations[lang]['form-option-business'];
                    } else if (optionText.includes('شراكة أو تعاون')) {
                        option.textContent = translations[lang]['form-option-partnership'];
                    } else if (optionText.includes('أخرى')) {
                        option.textContent = translations[lang]['form-option-other'];
                    }
                } else {
                    const original = option.getAttribute('data-ar-original');
                    if (original) {
                        option.textContent = original;
                    }
                }
            }
        });
    }
    
    // Translate form textarea placeholder
    const formTextarea = document.querySelector('#message');
    if (formTextarea) {
        if (lang === 'en') {
            if (!formTextarea.hasAttribute('data-ar-original')) {
                formTextarea.setAttribute('data-ar-original', formTextarea.getAttribute('placeholder') || '');
            }
            formTextarea.setAttribute('placeholder', translations[lang]['form-placeholder-message']);
        } else {
            const original = formTextarea.getAttribute('data-ar-original');
            if (original) {
                formTextarea.setAttribute('placeholder', original);
            }
        }
    }
    
    // Translate form submit button
    const formSubmitBtn = document.querySelector('.contact-form button[type="submit"]');
    if (formSubmitBtn) {
        const btnText = formSubmitBtn.textContent.trim();
        if (lang === 'en') {
            if (!formSubmitBtn.hasAttribute('data-ar-original')) {
                formSubmitBtn.setAttribute('data-ar-original', btnText);
            }
            formSubmitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> ' + translations[lang]['form-btn-send'];
        } else {
            const original = formSubmitBtn.getAttribute('data-ar-original');
            if (original) {
                formSubmitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> ' + original;
            }
        }
    }
    
    // Translate contact info section
    const contactInfoTitle = document.querySelector('.contact-info-section h2');
    if (contactInfoTitle) {
        if (lang === 'en') {
            if (!contactInfoTitle.hasAttribute('data-ar-original')) {
                contactInfoTitle.setAttribute('data-ar-original', contactInfoTitle.textContent);
            }
            contactInfoTitle.textContent = translations[lang]['contact-info-title'];
        } else {
            const original = contactInfoTitle.getAttribute('data-ar-original');
            if (original) {
                contactInfoTitle.textContent = original;
            }
        }
    }
    
    const contactInfoItems = document.querySelectorAll('.contact-info-item');
    contactInfoItems.forEach(item => {
        const title = item.querySelector('.contact-details h4');
        const desc = item.querySelector('.contact-details p');
        
        if (title) {
            if (lang === 'en') {
                if (!title.hasAttribute('data-ar-original')) {
                    title.setAttribute('data-ar-original', title.textContent);
                }
                const titleText = title.getAttribute('data-ar-original') || title.textContent;
                if (titleText.includes('البريد الإلكتروني')) {
                    title.textContent = translations[lang]['contact-email-title'];
                } else if (titleText.includes('العنوان')) {
                    title.textContent = translations[lang]['contact-address-title'];
                } else if (titleText.includes('ساعات العمل')) {
                    title.textContent = translations[lang]['contact-hours-title'];
                }
            } else {
                const original = title.getAttribute('data-ar-original');
                if (original) {
                    title.textContent = original;
                }
            }
        }
        
        if (desc) {
            if (lang === 'en') {
                if (!desc.hasAttribute('data-ar-original')) {
                    desc.setAttribute('data-ar-original', desc.textContent);
                }
                const descText = desc.getAttribute('data-ar-original') || desc.textContent;
                if (descText.includes('مسقط')) {
                    desc.textContent = translations[lang]['contact-address'];
                } else if (descText.includes('الأحد - الاربعاء')) {
                    desc.textContent = translations[lang]['contact-hours-weekdays'];
                } else if (descText.includes('الخميس - السبت')) {
                    desc.textContent = translations[lang]['contact-hours-weekend'];
                }
            } else {
                const original = desc.getAttribute('data-ar-original');
                if (original) {
                    desc.textContent = original;
                }
            }
        }
    });
    
    // Translate FAQ section
    const faqTitle = document.querySelector('.faq-section h2');
    if (faqTitle) {
        if (lang === 'en') {
            if (!faqTitle.hasAttribute('data-ar-original')) {
                faqTitle.setAttribute('data-ar-original', faqTitle.textContent);
            }
            faqTitle.textContent = translations[lang]['contact-faq-title'];
        } else {
            const original = faqTitle.getAttribute('data-ar-original');
            if (original) {
                faqTitle.textContent = original;
            }
        }
    }
    
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item, index) => {
        const question = item.querySelector('h4');
        const answer = item.querySelector('p');
        
        if (question) {
            if (lang === 'en') {
                if (!question.hasAttribute('data-ar-original')) {
                    question.setAttribute('data-ar-original', question.textContent);
                }
                const qText = question.getAttribute('data-ar-original') || question.textContent;
                if (qText.includes('كيف يمكنني تحميل')) {
                    question.textContent = translations[lang]['faq-download-q'];
                } else if (qText.includes('هل تطبيقاتكم مجانية')) {
                    question.textContent = translations[lang]['faq-free-q'];
                } else if (qText.includes('متى ستكون تطبيقات')) {
                    question.textContent = translations[lang]['faq-coming-q'];
                } else if (qText.includes('هل تقدمون شروحات')) {
                    question.textContent = translations[lang]['faq-youtube-q'];
                } else if (qText.includes('كيف يمكنني الإبلاغ')) {
                    question.textContent = translations[lang]['faq-bug-q'];
                } else if (qText.includes('هل تقدمون دعم فني')) {
                    question.textContent = translations[lang]['faq-support-q'];
                }
            } else {
                const original = question.getAttribute('data-ar-original');
                if (original) {
                    question.textContent = original;
                }
            }
        }
        
        if (answer) {
            if (lang === 'en') {
                if (!answer.hasAttribute('data-ar-original')) {
                    answer.setAttribute('data-ar-original', answer.textContent);
                }
                const aText = answer.getAttribute('data-ar-original') || answer.textContent;
                if (aText.includes('يمكنك تحميل تطبيقاتنا من متجر')) {
                    answer.textContent = translations[lang]['faq-download-a'];
                } else if (aText.includes('نعم، جميع تطبيقاتنا الأساسية')) {
                    answer.textContent = translations[lang]['faq-free-a'];
                } else if (aText.includes('نعمل حالياً على تطوير هذه التطبيقات')) {
                    answer.textContent = translations[lang]['faq-coming-a'];
                } else if (aText.includes('حالياً لا، ولكن نأمل')) {
                    answer.textContent = translations[lang]['faq-youtube-a'];
                } else if (aText.includes('يمكنك استخدام نموذج الاتصال')) {
                    answer.textContent = translations[lang]['faq-bug-a'];
                } else if (aText.includes('نعم، نقدم دعم فني مجاني')) {
                    answer.textContent = translations[lang]['faq-support-a'];
                }
            } else {
                const original = answer.getAttribute('data-ar-original');
                if (original) {
                    answer.textContent = original;
                }
            }
        }
    });
    
    // Translate social section
    const socialTitle = document.querySelector('.social-section h2');
    if (socialTitle) {
        if (lang === 'en') {
            if (!socialTitle.hasAttribute('data-ar-original')) {
                socialTitle.setAttribute('data-ar-original', socialTitle.textContent);
            }
            socialTitle.textContent = translations[lang]['contact-social-title'];
        } else {
            const original = socialTitle.getAttribute('data-ar-original');
            if (original) {
                socialTitle.textContent = original;
            }
        }
    }
    
    const socialLinks = document.querySelectorAll('.social-link-large span');
    socialLinks.forEach(link => {
        if (lang === 'en') {
            if (!link.hasAttribute('data-ar-original')) {
                link.setAttribute('data-ar-original', link.textContent);
            }
            const linkText = link.getAttribute('data-ar-original') || link.textContent;
            if (linkText.includes('تويتر')) {
                link.textContent = translations[lang]['social-twitter'];
            } else if (linkText.includes('إنستغرام')) {
                link.textContent = translations[lang]['social-instagram'];
            } else if (linkText.includes('يوتيوب')) {
                link.textContent = translations[lang]['social-youtube'];
            }
        } else {
            const original = link.getAttribute('data-ar-original');
            if (original) {
                link.textContent = original;
            }
        }
    });
    
    // Translate Privacy Options page
    const privacyOptionsIntro = document.querySelector('.privacy-intro p');
    if (privacyOptionsIntro) {
        if (lang === 'en') {
            if (!privacyOptionsIntro.hasAttribute('data-ar-original')) {
                privacyOptionsIntro.setAttribute('data-ar-original', privacyOptionsIntro.textContent);
            }
            privacyOptionsIntro.textContent = translations[lang]['privacy-options-intro'];
        } else {
            const original = privacyOptionsIntro.getAttribute('data-ar-original');
            if (original) {
                privacyOptionsIntro.textContent = original;
            }
        }
    }
    
    const privacyBadge = document.querySelector('.privacy-badge span');
    if (privacyBadge) {
        if (lang === 'en') {
            if (!privacyBadge.hasAttribute('data-ar-original')) {
                privacyBadge.setAttribute('data-ar-original', privacyBadge.textContent);
            }
            privacyBadge.textContent = translations[lang]['privacy-badge-text'];
        } else {
            const original = privacyBadge.getAttribute('data-ar-original');
            if (original) {
                privacyBadge.textContent = original;
            }
        }
    }
    
    // Translate privacy option cards
    const privacyCards = document.querySelectorAll('.privacy-option-card');
    privacyCards.forEach((card, index) => {
        const title = card.querySelector('.privacy-card-header h3');
        const desc = card.querySelector('.privacy-card-header p');
        const badge = card.querySelector('.featured-badge, .security-badge');
        const features = card.querySelectorAll('.privacy-features li');
        const btn = card.querySelector('.btn');
        
        if (title) {
            if (lang === 'en') {
                if (!title.hasAttribute('data-ar-original')) {
                    title.setAttribute('data-ar-original', title.textContent);
                }
                const titleText = title.getAttribute('data-ar-original') || title.textContent;
                if (titleText.includes('سياسة الخصوصية العامة')) {
                    title.textContent = translations[lang]['privacy-website-title'];
                } else if (titleText.includes('تطبيق التسبيح')) {
                    title.textContent = translations[lang]['privacy-tasbiah-title'];
                } else if (titleText.includes('DIY Electric Calculator')) {
                    title.textContent = translations[lang]['privacy-electric-title'];
                } else if (titleText.includes('صيانة السيارات')) {
                    title.textContent = translations[lang]['privacy-car-title'];
                } else if (titleText.includes('إدارة المال الشخصي')) {
                    title.textContent = translations[lang]['privacy-money-title'];
                }
            } else {
                const original = title.getAttribute('data-ar-original');
                if (original) {
                    title.textContent = original;
                }
            }
        }
        
        if (desc) {
            if (lang === 'en') {
                if (!desc.hasAttribute('data-ar-original')) {
                    desc.setAttribute('data-ar-original', desc.textContent);
                }
                const descText = desc.getAttribute('data-ar-original') || desc.textContent;
                if (descText.includes('للموقع والخدمات العامة')) {
                    desc.textContent = translations[lang]['privacy-website-desc'];
                } else if (descText.includes('حماية البيانات الروحية')) {
                    desc.textContent = translations[lang]['privacy-tasbiah-desc'];
                } else if (descText.includes('حسابات الكهرباء')) {
                    desc.textContent = translations[lang]['privacy-electric-desc'];
                } else if (descText.includes('بيانات السيارة')) {
                    desc.textContent = translations[lang]['privacy-car-desc'];
                } else if (descText.includes('البيانات المالية الحساسة')) {
                    desc.textContent = translations[lang]['privacy-money-desc'];
                }
            } else {
                const original = desc.getAttribute('data-ar-original');
                if (original) {
                    desc.textContent = original;
                }
            }
        }
        
        if (badge) {
            if (lang === 'en') {
                if (!badge.hasAttribute('data-ar-original')) {
                    badge.setAttribute('data-ar-original', badge.textContent);
                }
                const badgeText = badge.getAttribute('data-ar-original') || badge.textContent;
                if (badgeText.includes('الأكثر شمولية')) {
                    badge.textContent = translations[lang]['privacy-tasbiah-badge'];
                } else if (badgeText.includes('أعلى مستوى أمان')) {
                    badge.textContent = translations[lang]['privacy-money-badge'];
                }
            } else {
                const original = badge.getAttribute('data-ar-original');
                if (original) {
                    badge.textContent = original;
                }
            }
        }
        
        // Translate features
        features.forEach((feature, featIndex) => {
            if (lang === 'en') {
                if (!feature.hasAttribute('data-ar-original')) {
                    feature.setAttribute('data-ar-original', feature.innerHTML);
                }
                const titleText = title ? (title.getAttribute('data-ar-original') || title.textContent) : '';
                
                if (titleText.includes('سياسة الخصوصية العامة') || titleText.includes('General Privacy')) {
                    if (featIndex === 0) feature.innerHTML = '<i class="fas fa-check"></i> ' + translations[lang]['privacy-feature-website-1'];
                    else if (featIndex === 1) feature.innerHTML = '<i class="fas fa-check"></i> ' + translations[lang]['privacy-feature-website-2'];
                    else if (featIndex === 2) feature.innerHTML = '<i class="fas fa-check"></i> ' + translations[lang]['privacy-feature-website-3'];
                    else if (featIndex === 3) feature.innerHTML = '<i class="fas fa-check"></i> ' + translations[lang]['privacy-feature-website-4'];
                } else if (titleText.includes('تطبيق التسبيح') || titleText.includes('Tasbih App')) {
                    if (featIndex === 0) feature.innerHTML = '<i class="fas fa-check"></i> ' + translations[lang]['privacy-feature-tasbiah-1'];
                    else if (featIndex === 1) feature.innerHTML = '<i class="fas fa-check"></i> ' + translations[lang]['privacy-feature-tasbiah-2'];
                    else if (featIndex === 2) feature.innerHTML = '<i class="fas fa-check"></i> ' + translations[lang]['privacy-feature-tasbiah-3'];
                    else if (featIndex === 3) feature.innerHTML = '<i class="fas fa-check"></i> ' + translations[lang]['privacy-feature-tasbiah-4'];
                } else if (titleText.includes('Electric Calculator')) {
                    if (featIndex === 0) feature.innerHTML = '<i class="fas fa-check"></i> ' + translations[lang]['privacy-feature-electric-1'];
                    else if (featIndex === 1) feature.innerHTML = '<i class="fas fa-check"></i> ' + translations[lang]['privacy-feature-electric-2'];
                    else if (featIndex === 2) feature.innerHTML = '<i class="fas fa-check"></i> ' + translations[lang]['privacy-feature-electric-3'];
                    else if (featIndex === 3) feature.innerHTML = '<i class="fas fa-check"></i> ' + translations[lang]['privacy-feature-electric-4'];
                } else if (titleText.includes('صيانة السيارات') || titleText.includes('Car Maintenance')) {
                    if (featIndex === 0) feature.innerHTML = '<i class="fas fa-check"></i> ' + translations[lang]['privacy-feature-car-1'];
                    else if (featIndex === 1) feature.innerHTML = '<i class="fas fa-check"></i> ' + translations[lang]['privacy-feature-car-2'];
                    else if (featIndex === 2) feature.innerHTML = '<i class="fas fa-check"></i> ' + translations[lang]['privacy-feature-car-3'];
                    else if (featIndex === 3) feature.innerHTML = '<i class="fas fa-check"></i> ' + translations[lang]['privacy-feature-car-4'];
                } else if (titleText.includes('إدارة المال') || titleText.includes('Money Management')) {
                    if (featIndex === 0) feature.innerHTML = '<i class="fas fa-check"></i> ' + translations[lang]['privacy-feature-money-1'];
                    else if (featIndex === 1) feature.innerHTML = '<i class="fas fa-check"></i> ' + translations[lang]['privacy-feature-money-2'];
                    else if (featIndex === 2) feature.innerHTML = '<i class="fas fa-check"></i> ' + translations[lang]['privacy-feature-money-3'];
                    else if (featIndex === 3) feature.innerHTML = '<i class="fas fa-check"></i> ' + translations[lang]['privacy-feature-money-4'];
                }
            } else {
                const original = feature.getAttribute('data-ar-original');
                if (original) {
                    feature.innerHTML = original;
                }
            }
        });
        
        // Translate button
        if (btn) {
            const btnText = btn.textContent.trim();
            if (lang === 'en') {
                if (!btn.hasAttribute('data-ar-original')) {
                    btn.setAttribute('data-ar-original', btnText);
                }
                btn.innerHTML = '<i class="fas fa-arrow-left"></i> ' + translations[lang]['btn-view-policy'];
            } else {
                const original = btn.getAttribute('data-ar-original');
                if (original) {
                    btn.innerHTML = '<i class="fas fa-arrow-left"></i> ' + original;
                }
            }
        }
    });
    
    // Translate privacy summary section
    const privacySummaryTitle = document.querySelector('.privacy-summary h2');
    if (privacySummaryTitle) {
        if (lang === 'en') {
            if (!privacySummaryTitle.hasAttribute('data-ar-original')) {
                privacySummaryTitle.setAttribute('data-ar-original', privacySummaryTitle.textContent);
            }
            const icon = privacySummaryTitle.querySelector('i');
            const iconHTML = icon ? icon.outerHTML + ' ' : '';
            privacySummaryTitle.innerHTML = iconHTML + translations[lang]['privacy-summary-title'];
        } else {
            const original = privacySummaryTitle.getAttribute('data-ar-original');
            if (original) {
                privacySummaryTitle.innerHTML = original;
            }
        }
    }
    
    const summaryItems = document.querySelectorAll('.summary-item');
    summaryItems.forEach((item, index) => {
        const title = item.querySelector('h4');
        const desc = item.querySelector('p');
        
        if (title) {
            if (lang === 'en') {
                if (!title.hasAttribute('data-ar-original')) {
                    title.setAttribute('data-ar-original', title.textContent);
                }
                if (index === 0) title.textContent = translations[lang]['summary-protection-title'];
                else if (index === 1) title.textContent = translations[lang]['summary-privacy-title'];
                else if (index === 2) title.textContent = translations[lang]['summary-encryption-title'];
                else if (index === 3) title.textContent = translations[lang]['summary-compliance-title'];
            } else {
                const original = title.getAttribute('data-ar-original');
                if (original) {
                    title.textContent = original;
                }
            }
        }
        
        if (desc) {
            if (lang === 'en') {
                if (!desc.hasAttribute('data-ar-original')) {
                    desc.setAttribute('data-ar-original', desc.textContent);
                }
                if (index === 0) desc.textContent = translations[lang]['summary-protection-desc'];
                else if (index === 1) desc.textContent = translations[lang]['summary-privacy-desc'];
                else if (index === 2) desc.textContent = translations[lang]['summary-encryption-desc'];
                else if (index === 3) desc.textContent = translations[lang]['summary-compliance-desc'];
            } else {
                const original = desc.getAttribute('data-ar-original');
                if (original) {
                    desc.textContent = original;
                }
            }
        }
    });
    
    // Translate privacy contact section
    const privacyContactTitle = document.querySelector('.privacy-contact h2');
    if (privacyContactTitle) {
        if (lang === 'en') {
            if (!privacyContactTitle.hasAttribute('data-ar-original')) {
                privacyContactTitle.setAttribute('data-ar-original', privacyContactTitle.textContent);
            }
            const icon = privacyContactTitle.querySelector('i');
            const iconHTML = icon ? icon.outerHTML + ' ' : '';
            privacyContactTitle.innerHTML = iconHTML + translations[lang]['privacy-contact-title'];
        } else {
            const original = privacyContactTitle.getAttribute('data-ar-original');
            if (original) {
                privacyContactTitle.innerHTML = original;
            }
        }
    }
    
    const privacyContactDesc = document.querySelector('.privacy-contact p');
    if (privacyContactDesc) {
        if (lang === 'en') {
            if (!privacyContactDesc.hasAttribute('data-ar-original')) {
                privacyContactDesc.setAttribute('data-ar-original', privacyContactDesc.textContent);
            }
            privacyContactDesc.textContent = translations[lang]['privacy-contact-desc'];
        } else {
            const original = privacyContactDesc.getAttribute('data-ar-original');
            if (original) {
                privacyContactDesc.textContent = original;
            }
        }
    }
    
    // Translate Delete Account page
    const deleteWarningTitle = document.querySelector('.warning-box h3');
    if (deleteWarningTitle) {
        if (lang === 'en') {
            if (!deleteWarningTitle.hasAttribute('data-ar-original')) {
                deleteWarningTitle.setAttribute('data-ar-original', deleteWarningTitle.textContent);
            }
            deleteWarningTitle.textContent = translations[lang]['delete-warning-title'];
        } else {
            const original = deleteWarningTitle.getAttribute('data-ar-original');
            if (original) {
                deleteWarningTitle.textContent = original;
            }
        }
    }
    
    const deleteWarningText = document.querySelector('.warning-box p');
    if (deleteWarningText) {
        if (lang === 'en') {
            if (!deleteWarningText.hasAttribute('data-ar-original')) {
                deleteWarningText.setAttribute('data-ar-original', deleteWarningText.textContent);
            }
            deleteWarningText.textContent = translations[lang]['delete-warning-text'];
        } else {
            const original = deleteWarningText.getAttribute('data-ar-original');
            if (original) {
                deleteWarningText.textContent = original;
            }
        }
    }
    
    // Translate delete account sections
    const deleteSections = document.querySelectorAll('.delete-account-content .privacy-section');
    deleteSections.forEach(section => {
        const h2 = section.querySelector('h2');
        if (h2) {
            if (lang === 'en') {
                if (!h2.hasAttribute('data-ar-original')) {
                    h2.setAttribute('data-ar-original', h2.textContent);
                }
                const h2Text = h2.getAttribute('data-ar-original') || h2.textContent;
                const icon = h2.querySelector('i');
                const iconHTML = icon ? icon.outerHTML + ' ' : '';
                
                if (h2Text.includes('ما سيتم حذفه')) {
                    h2.innerHTML = iconHTML + translations[lang]['delete-what-title'];
                } else if (h2Text.includes('قبل الحذف')) {
                    h2.innerHTML = iconHTML + translations[lang]['delete-before-title'];
                } else if (h2Text.includes('طلب حذف الحساب')) {
                    h2.innerHTML = iconHTML + translations[lang]['delete-form-title'];
                } else if (h2Text.includes('عملية الحذف')) {
                    h2.innerHTML = iconHTML + translations[lang]['delete-process-title'];
                } else if (h2Text.includes('خيارات بديلة')) {
                    h2.innerHTML = iconHTML + translations[lang]['delete-alternatives-title'];
                } else if (h2Text.includes('التواصل معنا') && section.closest('.delete-account-content')) {
                    h2.innerHTML = iconHTML + translations[lang]['delete-contact-title'];
                } else if (h2Text.includes('حقوقك القانونية')) {
                    h2.innerHTML = iconHTML + translations[lang]['delete-rights-title'];
                }
            } else {
                const original = h2.getAttribute('data-ar-original');
                if (original) {
                    h2.innerHTML = original;
                }
            }
        }
        
        // Translate subsections
        const subsections = section.querySelectorAll('.privacy-subsection');
        subsections.forEach(subsection => {
            const h3 = subsection.querySelector('h3');
            const ul = subsection.querySelector('ul');
            const ol = subsection.querySelector('ol');
            const p = subsection.querySelector('p:not(.contact-item)');
            
            if (h3) {
                if (lang === 'en') {
                    if (!h3.hasAttribute('data-ar-original')) {
                        h3.setAttribute('data-ar-original', h3.textContent);
                    }
                    const h3Text = h3.getAttribute('data-ar-original') || h3.textContent;
                    if (h3Text.includes('البيانات التي سيتم حذفها')) {
                        h3.textContent = translations[lang]['delete-what-deleted'];
                    } else if (h3Text.includes('البيانات التي لن يتم حذفها')) {
                        h3.textContent = translations[lang]['delete-what-not-deleted'];
                    } else if (h3Text.includes('ننصحك بالقيام')) {
                        h3.textContent = translations[lang]['delete-before-advice'];
                    } else if (h3Text.includes('ما يحدث بعد إرسال')) {
                        h3.textContent = translations[lang]['delete-process-what'];
                    } else if (h3Text.includes('مدة المعالجة')) {
                        h3.textContent = translations[lang]['delete-process-duration'];
                    } else if (h3Text.includes('قبل حذف حسابك')) {
                        h3.textContent = translations[lang]['delete-alternatives-before'];
                    } else if (h3Text.includes('حقك في حذف البيانات')) {
                        h3.textContent = translations[lang]['delete-rights-gdpr'];
                    }
                } else {
                    const original = h3.getAttribute('data-ar-original');
                    if (original) {
                        h3.textContent = original;
                    }
                }
            }
            
            // Translate list items
            if (ul) {
                const items = ul.querySelectorAll('li');
                items.forEach(item => {
                    if (lang === 'en') {
                        if (!item.hasAttribute('data-ar-original')) {
                            item.setAttribute('data-ar-original', item.innerHTML);
                        }
                        const itemText = item.getAttribute('data-ar-original') || item.innerHTML;
                        const strong = item.querySelector('strong');
                        const strongText = strong ? strong.textContent : '';
                        
                        if (strongText.includes('معلومات الحساب:')) {
                            item.innerHTML = '<strong>' + translations[lang]['delete-account-info'] + '</strong> ' + translations[lang]['delete-account-info-desc'];
                        } else if (strongText.includes('البيانات الشخصية:')) {
                            item.innerHTML = '<strong>' + translations[lang]['delete-personal-data'] + '</strong> ' + translations[lang]['delete-personal-data-desc'];
                        } else if (strongText.includes('بيانات التطبيقات:')) {
                            item.innerHTML = '<strong>' + translations[lang]['delete-app-data'] + '</strong> ' + translations[lang]['delete-app-data-desc'];
                        } else if (strongText.includes('الإعدادات والتفضيلات:')) {
                            item.innerHTML = '<strong>' + translations[lang]['delete-settings'] + '</strong> ' + translations[lang]['delete-settings-desc'];
                        } else if (strongText.includes('سجل النشاط:')) {
                            item.innerHTML = '<strong>' + translations[lang]['delete-activity'] + '</strong> ' + translations[lang]['delete-activity-desc'];
                        } else if (strongText.includes('النسخ الاحتياطية:')) {
                            item.innerHTML = '<strong>' + translations[lang]['delete-backups'] + '</strong> ' + translations[lang]['delete-backups-desc'];
                        } else if (strongText.includes('البيانات المجهولة الهوية:')) {
                            item.innerHTML = '<strong>' + translations[lang]['delete-anonymous'] + '</strong> ' + translations[lang]['delete-anonymous-desc'];
                        } else if (strongText.includes('سجلات الأمان:')) {
                            item.innerHTML = '<strong>' + translations[lang]['delete-security-logs'] + '</strong> ' + translations[lang]['delete-security-logs-desc'];
                        } else if (strongText.includes('البيانات المحفوظة محلياً:')) {
                            item.innerHTML = '<strong>' + translations[lang]['delete-local-data'] + '</strong> ' + translations[lang]['delete-local-data-desc'];
                        } else if (strongText.includes('تصدير بياناتك:')) {
                            item.innerHTML = '<strong>' + translations[lang]['delete-export'] + '</strong> ' + translations[lang]['delete-export-desc'];
                        } else if (strongText.includes('حفظ النسخ الاحتياطية:')) {
                            item.innerHTML = '<strong>' + translations[lang]['delete-save-backups'] + '</strong> ' + translations[lang]['delete-save-backups-desc'];
                        } else if (strongText.includes('إلغاء الاشتراكات:')) {
                            item.innerHTML = '<strong>' + translations[lang]['delete-cancel-subs'] + '</strong> ' + translations[lang]['delete-cancel-subs-desc'];
                        } else if (strongText.includes('حفظ المعلومات المهمة:')) {
                            item.innerHTML = '<strong>' + translations[lang]['delete-save-info'] + '</strong> ' + translations[lang]['delete-save-info-desc'];
                        } else if (strongText.includes('التواصل معنا:')) {
                            item.innerHTML = '<strong>' + translations[lang]['delete-contact-first'] + '</strong> ' + translations[lang]['delete-contact-first-desc'];
                        } else if (strongText.includes('تعديل البيانات:')) {
                            const link = item.querySelector('a');
                            const linkHTML = link ? link.outerHTML : '';
                            item.innerHTML = '<strong>' + translations[lang]['delete-alt-edit'] + '</strong> ' + linkHTML + ' ' + translations[lang]['delete-alt-edit-desc'];
                        } else if (strongText.includes('تحديث الإعدادات:')) {
                            item.innerHTML = '<strong>' + translations[lang]['delete-alt-settings'] + '</strong> ' + translations[lang]['delete-alt-settings-desc'];
                        } else if (strongText.includes('إلغاء الاشتراكات:') && itemText.includes('غير المرغوب')) {
                            item.innerHTML = '<strong>' + translations[lang]['delete-alt-cancel'] + '</strong> ' + translations[lang]['delete-alt-cancel-desc'];
                        } else if (strongText.includes('حذف البيانات المحددة:')) {
                            item.innerHTML = '<strong>' + translations[lang]['delete-alt-specific'] + '</strong> ' + translations[lang]['delete-alt-specific-desc'];
                        } else if (strongText.includes('تجميد الحساب:')) {
                            item.innerHTML = '<strong>' + translations[lang]['delete-alt-freeze'] + '</strong> ' + translations[lang]['delete-alt-freeze-desc'];
                        } else if (strongText.includes('التحقق من الهوية:')) {
                            item.innerHTML = '<strong>' + translations[lang]['delete-duration-verify'] + '</strong> ' + translations[lang]['delete-duration-verify-desc'];
                        } else if (strongText.includes('حذف البيانات:')) {
                            item.innerHTML = '<strong>' + translations[lang]['delete-duration-delete'] + '</strong> ' + translations[lang]['delete-duration-delete-desc'];
                        } else if (strongText.includes('التأكيد النهائي:')) {
                            item.innerHTML = '<strong>' + translations[lang]['delete-duration-confirm'] + '</strong> ' + translations[lang]['delete-duration-confirm-desc'];
                        } else if (strongText.includes('حق الحذف:')) {
                            item.innerHTML = '<strong>' + translations[lang]['delete-right-delete'] + '</strong> ' + translations[lang]['delete-right-delete-desc'];
                        } else if (strongText.includes('الاستجابة السريعة:')) {
                            item.innerHTML = '<strong>' + translations[lang]['delete-right-response'] + '</strong> ' + translations[lang]['delete-right-response-desc'];
                        } else if (strongText.includes('التأكيد:') && itemText.includes('اكتمال')) {
                            item.innerHTML = '<strong>' + translations[lang]['delete-right-confirm'] + '</strong> ' + translations[lang]['delete-right-confirm-desc'];
                        } else if (strongText.includes('عدم التمييز:')) {
                            item.innerHTML = '<strong>' + translations[lang]['delete-right-discrimination'] + '</strong> ' + translations[lang]['delete-right-discrimination-desc'];
                        }
                    } else {
                        const original = item.getAttribute('data-ar-original');
                        if (original) {
                            item.innerHTML = original;
                        }
                    }
                });
            }
            
            // Translate ordered list items
            if (ol) {
                const items = ol.querySelectorAll('li');
                items.forEach((item, index) => {
                    if (lang === 'en') {
                        if (!item.hasAttribute('data-ar-original')) {
                            item.setAttribute('data-ar-original', item.innerHTML);
                        }
                        const itemText = item.getAttribute('data-ar-original') || item.innerHTML;
                        const strong = item.querySelector('strong');
                        const strongText = strong ? strong.textContent : '';
                        
                        if (strongText.includes('استلام الطلب:')) {
                            item.innerHTML = '<strong>' + translations[lang]['delete-process-1'] + '</strong> ' + translations[lang]['delete-process-1-desc'];
                        } else if (strongText.includes('التحقق من الهوية:')) {
                            item.innerHTML = '<strong>' + translations[lang]['delete-process-2'] + '</strong> ' + translations[lang]['delete-process-2-desc'];
                        } else if (strongText.includes('معالجة الطلب:')) {
                            item.innerHTML = '<strong>' + translations[lang]['delete-process-3'] + '</strong> ' + translations[lang]['delete-process-3-desc'];
                        } else if (strongText.includes('إشعار التأكيد:')) {
                            item.innerHTML = '<strong>' + translations[lang]['delete-process-4'] + '</strong> ' + translations[lang]['delete-process-4-desc'];
                        } else if (strongText.includes('اكتمال الحذف:')) {
                            item.innerHTML = '<strong>' + translations[lang]['delete-process-5'] + '</strong> ' + translations[lang]['delete-process-5-desc'];
                        }
                    } else {
                        const original = item.getAttribute('data-ar-original');
                        if (original) {
                            item.innerHTML = original;
                        }
                    }
                });
            }
            
            if (p && !p.closest('.contact-item')) {
                if (lang === 'en') {
                    if (!p.hasAttribute('data-ar-original')) {
                        p.setAttribute('data-ar-original', p.textContent);
                    }
                    const pText = p.getAttribute('data-ar-original') || p.textContent;
                    if (pText.includes('إذا كان لديك أي أسئلة حول عملية حذف الحساب')) {
                        p.textContent = translations[lang]['delete-contact-desc'];
                    }
                } else {
                    const original = p.getAttribute('data-ar-original');
                    if (original) {
                        p.textContent = original;
                    }
                }
            }
        });
    });
    
    // Translate delete account form
    const deleteFormLabels = document.querySelectorAll('.delete-account-form label');
    deleteFormLabels.forEach(label => {
        if (lang === 'en') {
            if (!label.hasAttribute('data-ar-original')) {
                label.setAttribute('data-ar-original', label.textContent);
            }
            const labelText = label.getAttribute('data-ar-original') || label.textContent;
            if (labelText.includes('البريد الإلكتروني المرتبط')) {
                label.textContent = translations[lang]['delete-form-email'];
            } else if (labelText.includes('التطبيق المراد حذف')) {
                label.textContent = translations[lang]['delete-form-app'];
            } else if (labelText.includes('سبب طلب الحذف')) {
                label.textContent = translations[lang]['delete-form-reason'];
            } else if (labelText.includes('تفاصيل إضافية')) {
                label.textContent = translations[lang]['delete-form-details'];
            } else if (labelText.includes('تأكيد الطلب')) {
                label.textContent = translations[lang]['delete-form-confirm'];
            } else if (labelText.includes('أؤكد أنني أريد حذف')) {
                label.textContent = translations[lang]['delete-confirm1'];
            } else if (labelText.includes('أفهم أن عملية الحذف')) {
                label.textContent = translations[lang]['delete-confirm2'];
            } else if (labelText.includes('أؤكد أنني قمت بحفظ')) {
                label.textContent = translations[lang]['delete-confirm3'];
            }
        } else {
            const original = label.getAttribute('data-ar-original');
            if (original) {
                label.textContent = original;
            }
        }
    });
    
    // Translate form inputs placeholders
    const deleteFormEmail = document.querySelector('#email[type="email"]');
    if (deleteFormEmail && deleteFormEmail.closest('.delete-account-form')) {
        if (lang === 'en') {
            if (!deleteFormEmail.hasAttribute('data-ar-original')) {
                deleteFormEmail.setAttribute('data-ar-original', deleteFormEmail.getAttribute('placeholder') || '');
            }
            deleteFormEmail.setAttribute('placeholder', translations[lang]['delete-form-email-placeholder']);
        } else {
            const original = deleteFormEmail.getAttribute('data-ar-original');
            if (original) {
                deleteFormEmail.setAttribute('placeholder', original);
            }
        }
    }
    
    const deleteFormTextarea = document.querySelector('#details');
    if (deleteFormTextarea && deleteFormTextarea.closest('.delete-account-form')) {
        if (lang === 'en') {
            if (!deleteFormTextarea.hasAttribute('data-ar-original')) {
                deleteFormTextarea.setAttribute('data-ar-original', deleteFormTextarea.getAttribute('placeholder') || '');
            }
            deleteFormTextarea.setAttribute('placeholder', translations[lang]['delete-form-details-placeholder']);
        } else {
            const original = deleteFormTextarea.getAttribute('data-ar-original');
            if (original) {
                deleteFormTextarea.setAttribute('placeholder', original);
            }
        }
    }
    
    // Translate form select options
    const deleteFormApp = document.querySelector('#app');
    if (deleteFormApp) {
        const options = deleteFormApp.querySelectorAll('option');
        options.forEach((option, index) => {
            if (index === 0) {
                if (lang === 'en') {
                    if (!option.hasAttribute('data-ar-original')) {
                        option.setAttribute('data-ar-original', option.textContent);
                    }
                    option.textContent = translations[lang]['delete-form-app-placeholder'];
                } else {
                    const original = option.getAttribute('data-ar-original');
                    if (original) {
                        option.textContent = original;
                    }
                }
            } else {
                if (lang === 'en') {
                    if (!option.hasAttribute('data-ar-original')) {
                        option.setAttribute('data-ar-original', option.textContent);
                    }
                    const optionText = option.getAttribute('data-ar-original') || option.textContent;
                    if (optionText.includes('تطبيق التسبيح')) {
                        option.textContent = translations[lang]['app-tasbiah-title'];
                    } else if (optionText.includes('صيانة السيارات')) {
                        option.textContent = translations[lang]['app-car-title'];
                    } else if (optionText.includes('إدارة المال الشخصي')) {
                        option.textContent = translations[lang]['app-money-title'];
                    } else if (optionText.includes('حساب الموقع')) {
                        option.textContent = 'Website Account';
                    } else if (optionText.includes('جميع التطبيقات')) {
                        option.textContent = 'All Apps and Accounts';
                    }
                } else {
                    const original = option.getAttribute('data-ar-original');
                    if (original) {
                        option.textContent = original;
                    }
                }
            }
        });
    }
    
    const deleteFormReason = document.querySelector('#reason');
    if (deleteFormReason) {
        const options = deleteFormReason.querySelectorAll('option');
        options.forEach((option, index) => {
            if (index === 0) {
                if (lang === 'en') {
                    if (!option.hasAttribute('data-ar-original')) {
                        option.setAttribute('data-ar-original', option.textContent);
                    }
                    option.textContent = translations[lang]['delete-form-reason-placeholder'];
                } else {
                    const original = option.getAttribute('data-ar-original');
                    if (original) {
                        option.textContent = original;
                    }
                }
            } else {
                if (lang === 'en') {
                    if (!option.hasAttribute('data-ar-original')) {
                        option.setAttribute('data-ar-original', option.textContent);
                    }
                    const optionText = option.getAttribute('data-ar-original') || option.textContent;
                    if (optionText.includes('مخاوف الخصوصية')) {
                        option.textContent = translations[lang]['delete-reason-privacy'];
                    } else if (optionText.includes('لا أستخدم التطبيق')) {
                        option.textContent = translations[lang]['delete-reason-not-using'];
                    } else if (optionText.includes('وجدت بديلاً')) {
                        option.textContent = translations[lang]['delete-reason-alternative'];
                    } else if (optionText.includes('مشاكل تقنية')) {
                        option.textContent = translations[lang]['delete-reason-technical'];
                    } else if (optionText.includes('أسباب أخرى')) {
                        option.textContent = translations[lang]['delete-reason-other'];
                    }
                } else {
                    const original = option.getAttribute('data-ar-original');
                    if (original) {
                        option.textContent = original;
                    }
                }
            }
        });
    }
    
    // Translate form buttons
    const deleteFormSubmit = document.querySelector('.delete-account-form button[type="submit"]');
    if (deleteFormSubmit) {
        if (lang === 'en') {
            if (!deleteFormSubmit.hasAttribute('data-ar-original')) {
                deleteFormSubmit.setAttribute('data-ar-original', deleteFormSubmit.textContent.trim());
            }
            deleteFormSubmit.innerHTML = '<i class="fas fa-trash-alt"></i> ' + translations[lang]['delete-btn-submit'];
        } else {
            const original = deleteFormSubmit.getAttribute('data-ar-original');
            if (original) {
                deleteFormSubmit.innerHTML = '<i class="fas fa-trash-alt"></i> ' + original;
            }
        }
    }
    
    const deleteFormContactBtn = document.querySelector('.delete-account-form + .privacy-subsection .btn-secondary, .form-actions .btn-secondary');
    if (deleteFormContactBtn && deleteFormContactBtn.textContent.includes('تواصل')) {
        if (lang === 'en') {
            if (!deleteFormContactBtn.hasAttribute('data-ar-original')) {
                deleteFormContactBtn.setAttribute('data-ar-original', deleteFormContactBtn.textContent.trim());
            }
            deleteFormContactBtn.innerHTML = '<i class="fas fa-question-circle"></i> ' + translations[lang]['delete-btn-contact'];
        } else {
            const original = deleteFormContactBtn.getAttribute('data-ar-original');
            if (original) {
                deleteFormContactBtn.innerHTML = '<i class="fas fa-question-circle"></i> ' + original;
            }
        }
    }
    
    // Translate footer privacy rights section
    const footerPrivacyRights = document.querySelector('.footer-privacy-links h4');
    if (footerPrivacyRights && footerPrivacyRights.textContent.includes('الخصوصية والحقوق')) {
        if (lang === 'en') {
            if (!footerPrivacyRights.hasAttribute('data-ar-original')) {
                footerPrivacyRights.setAttribute('data-ar-original', footerPrivacyRights.textContent);
            }
            footerPrivacyRights.textContent = translations[lang]['footer-privacy-rights'];
        } else {
            const original = footerPrivacyRights.getAttribute('data-ar-original');
            if (original) {
                footerPrivacyRights.textContent = original;
            }
        }
    }
    
    const footerDeleteLink = document.querySelector('.footer-privacy-links a[href*="delete-account"]');
    if (footerDeleteLink) {
        if (lang === 'en') {
            if (!footerDeleteLink.hasAttribute('data-ar-original')) {
                footerDeleteLink.setAttribute('data-ar-original', footerDeleteLink.textContent);
            }
            footerDeleteLink.textContent = translations[lang]['footer-delete-account'];
        } else {
            const original = footerDeleteLink.getAttribute('data-ar-original');
            if (original) {
                footerDeleteLink.textContent = original;
            }
        }
    }
    
    const footerExerciseRights = document.querySelector('.footer-privacy-links a[href*="contact"]');
    if (footerExerciseRights && footerExerciseRights.textContent.includes('ممارسة')) {
        if (lang === 'en') {
            if (!footerExerciseRights.hasAttribute('data-ar-original')) {
                footerExerciseRights.setAttribute('data-ar-original', footerExerciseRights.textContent);
            }
            footerExerciseRights.textContent = translations[lang]['footer-exercise-rights'];
        } else {
            const original = footerExerciseRights.getAttribute('data-ar-original');
            if (original) {
                footerExerciseRights.textContent = original;
            }
        }
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
            if (lang === 'en') {
                if (!firstPara.hasAttribute('data-ar-original')) {
                    firstPara.setAttribute('data-ar-original', firstPara.textContent);
                }
                firstPara.textContent = translations[lang]['privacy-intro-1'];
            } else {
                const original = firstPara.getAttribute('data-ar-original');
                if (original) {
                    firstPara.textContent = original;
                }
            }
        }
        
        // Translate "Last Updated" paragraph
        if (introParagraphs.length > 1) {
            const secondPara = introParagraphs[1];
            if (secondPara.textContent.includes('تاريخ آخر تحديث')) {
                if (lang === 'en') {
                    if (!secondPara.hasAttribute('data-ar-original')) {
                        secondPara.setAttribute('data-ar-original', secondPara.innerHTML);
                    }
                    secondPara.innerHTML = '<strong>' + translations[lang]['last-updated'] + '</strong> 15 September 2025';
                } else {
                    const original = secondPara.getAttribute('data-ar-original');
                    if (original) {
                        secondPara.innerHTML = original;
                    }
                }
            }
        }
    }
    
    // Translate app badge
    const appBadge = document.querySelector('.app-badge span');
    if (appBadge) {
        if (lang === 'en') {
            if (!appBadge.hasAttribute('data-ar-original')) {
                appBadge.setAttribute('data-ar-original', appBadge.textContent);
            }
            appBadge.textContent = translations[lang]['app-name'];
        } else {
            const original = appBadge.getAttribute('data-ar-original');
            if (original) {
                appBadge.textContent = original;
            }
        }
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
    
    // Translate Tasbiah page elements
    const tasbiahHero = document.querySelector('.tasbiah-hero');
    if (tasbiahHero) {
        const heroTitle = tasbiahHero.querySelector('h1');
        const heroSubtitle = tasbiahHero.querySelector('p');
        const downloadButtons = tasbiahHero.querySelectorAll('.download-btn span');
        
        if (heroTitle) {
            if (lang === 'en') {
                if (!heroTitle.hasAttribute('data-ar-original')) {
                    heroTitle.setAttribute('data-ar-original', heroTitle.textContent);
                }
                heroTitle.textContent = translations[lang]['tasbiah-hero-title'];
            } else {
                const original = heroTitle.getAttribute('data-ar-original');
                if (original) {
                    heroTitle.textContent = original;
                }
            }
        }
        
        if (heroSubtitle) {
            if (lang === 'en') {
                if (!heroSubtitle.hasAttribute('data-ar-original')) {
                    heroSubtitle.setAttribute('data-ar-original', heroSubtitle.textContent);
                }
                heroSubtitle.textContent = translations[lang]['tasbiah-hero-subtitle'];
            } else {
                const original = heroSubtitle.getAttribute('data-ar-original');
                if (original) {
                    heroSubtitle.textContent = original;
                }
            }
        }
        
        downloadButtons.forEach((btn, index) => {
            if (lang === 'en') {
                if (!btn.hasAttribute('data-ar-original')) {
                    btn.setAttribute('data-ar-original', btn.textContent);
                }
                const btnText = btn.getAttribute('data-ar-original') || btn.textContent;
                if (btnText.includes('Google Play')) {
                    btn.textContent = translations[lang]['tasbiah-download-google'];
                } else if (btnText.includes('App Store')) {
                    btn.textContent = translations[lang]['tasbiah-download-apple'];
                }
            } else {
                const original = btn.getAttribute('data-ar-original');
                if (original) {
                    btn.textContent = original;
                }
            }
        });
    }
    
    // Translate features section
    const featuresSection = document.querySelector('.features-section-tasbiah');
    if (featuresSection) {
        const featuresTitle = featuresSection.querySelector('.section-title');
        if (featuresTitle) {
            if (lang === 'en') {
                if (!featuresTitle.hasAttribute('data-ar-original')) {
                    featuresTitle.setAttribute('data-ar-original', featuresTitle.textContent);
                }
                featuresTitle.textContent = translations[lang]['tasbiah-features-title'];
            } else {
                const original = featuresTitle.getAttribute('data-ar-original');
                if (original) {
                    featuresTitle.textContent = original;
                }
            }
        }
        
        const featureCards = featuresSection.querySelectorAll('.feature-card-tasbiah');
        const featureTitles = [
            'tasbiah-feature-smart-counter',
            'tasbiah-feature-dhikr',
            'tasbiah-feature-favorites',
            'tasbiah-feature-goals',
            'tasbiah-feature-achievements',
            'tasbiah-feature-privacy',
            'tasbiah-feature-night',
            'tasbiah-feature-reminders',
            'tasbiah-feature-stats',
            'tasbiah-feature-design',
            'tasbiah-feature-free',
            'tasbiah-feature-export',
            'tasbiah-feature-delete',
            'tasbiah-feature-ads'
        ];
        const featureDescs = [
            'tasbiah-feature-smart-counter-desc',
            'tasbiah-feature-dhikr-desc',
            'tasbiah-feature-favorites-desc',
            'tasbiah-feature-goals-desc',
            'tasbiah-feature-achievements-desc',
            'tasbiah-feature-privacy-desc',
            'tasbiah-feature-night-desc',
            'tasbiah-feature-reminders-desc',
            'tasbiah-feature-stats-desc',
            'tasbiah-feature-design-desc',
            'tasbiah-feature-free-desc',
            'tasbiah-feature-export-desc',
            'tasbiah-feature-delete-desc',
            'tasbiah-feature-ads-desc'
        ];
        
        featureCards.forEach((card, index) => {
            const cardTitle = card.querySelector('h3');
            const cardDesc = card.querySelector('p');
            
            if (cardTitle && featureTitles[index]) {
                if (lang === 'en') {
                    if (!cardTitle.hasAttribute('data-ar-original')) {
                        cardTitle.setAttribute('data-ar-original', cardTitle.textContent);
                    }
                    cardTitle.textContent = translations[lang][featureTitles[index]];
                } else {
                    const original = cardTitle.getAttribute('data-ar-original');
                    if (original) {
                        cardTitle.textContent = original;
                    }
                }
            }
            
            if (cardDesc && featureDescs[index]) {
                if (lang === 'en') {
                    if (!cardDesc.hasAttribute('data-ar-original')) {
                        cardDesc.setAttribute('data-ar-original', cardDesc.textContent);
                    }
                    cardDesc.textContent = translations[lang][featureDescs[index]];
                } else {
                    const original = cardDesc.getAttribute('data-ar-original');
                    if (original) {
                        cardDesc.textContent = original;
                    }
                }
            }
        });
    }
    
    // Translate privacy highlight section
    const privacyHighlight = document.querySelector('.privacy-highlight');
    if (privacyHighlight) {
        const privacyTitle = privacyHighlight.querySelector('h2');
        const privacyIntro = privacyHighlight.querySelector('p');
        const privacyBadges = privacyHighlight.querySelectorAll('.privacy-badge');
        const privacyLink = privacyHighlight.querySelector('a');
        
        if (privacyTitle) {
            if (lang === 'en') {
                if (!privacyTitle.hasAttribute('data-ar-original')) {
                    privacyTitle.setAttribute('data-ar-original', privacyTitle.textContent);
                }
                privacyTitle.textContent = translations[lang]['tasbiah-privacy-title'];
            } else {
                const original = privacyTitle.getAttribute('data-ar-original');
                if (original) {
                    privacyTitle.textContent = original;
                }
            }
        }
        
        if (privacyIntro) {
            if (lang === 'en') {
                if (!privacyIntro.hasAttribute('data-ar-original')) {
                    privacyIntro.setAttribute('data-ar-original', privacyIntro.textContent);
                }
                privacyIntro.textContent = translations[lang]['tasbiah-privacy-intro'];
            } else {
                const original = privacyIntro.getAttribute('data-ar-original');
                if (original) {
                    privacyIntro.textContent = original;
                }
            }
        }
        
        if (privacyBadges.length >= 4) {
            const badgeTexts = [
                'tasbiah-privacy-no-login',
                'tasbiah-privacy-no-data',
                'tasbiah-privacy-local',
                'tasbiah-privacy-no-servers'
            ];
            privacyBadges.forEach((badge, index) => {
                const badgeText = badge.textContent.trim();
                if (lang === 'en') {
                    if (!badge.hasAttribute('data-ar-original')) {
                        badge.setAttribute('data-ar-original', badgeText);
                    }
                    const icon = badge.querySelector('i');
                    const iconHTML = icon ? icon.outerHTML + ' ' : '';
                    badge.innerHTML = iconHTML + translations[lang][badgeTexts[index]];
                } else {
                    const original = badge.getAttribute('data-ar-original');
                    if (original) {
                        const icon = badge.querySelector('i');
                        const iconHTML = icon ? icon.outerHTML + ' ' : '';
                        badge.innerHTML = iconHTML + original;
                    }
                }
            });
        }
        
        if (privacyLink) {
            if (lang === 'en') {
                if (!privacyLink.hasAttribute('data-ar-original')) {
                    privacyLink.setAttribute('data-ar-original', privacyLink.textContent);
                }
                privacyLink.textContent = translations[lang]['tasbiah-privacy-link'];
            } else {
                const original = privacyLink.getAttribute('data-ar-original');
                if (original) {
                    privacyLink.textContent = original;
                }
            }
        }
    }
    
    // Translate content section
    const contentSection = document.querySelector('.content-section');
    if (contentSection) {
        const contentTitle = contentSection.querySelector('h2');
        const contentParagraphs = contentSection.querySelectorAll('p');
        const contentWhyTitle = contentSection.querySelector('h3');
        
        if (contentTitle) {
            if (lang === 'en') {
                if (!contentTitle.hasAttribute('data-ar-original')) {
                    contentTitle.setAttribute('data-ar-original', contentTitle.textContent);
                }
                contentTitle.textContent = translations[lang]['tasbiah-content-title'];
            } else {
                const original = contentTitle.getAttribute('data-ar-original');
                if (original) {
                    contentTitle.textContent = original;
                }
            }
        }
        
        if (contentParagraphs.length >= 5) {
            const paraKeys = [
                'tasbiah-content-para1',
                'tasbiah-content-para2',
                'tasbiah-content-para3',
                'tasbiah-content-para4',
                'tasbiah-content-para5'
            ];
            contentParagraphs.forEach((para, index) => {
                if (paraKeys[index]) {
                    if (lang === 'en') {
                        if (!para.hasAttribute('data-ar-original')) {
                            para.setAttribute('data-ar-original', para.textContent);
                        }
                        para.textContent = translations[lang][paraKeys[index]];
                    } else {
                        const original = para.getAttribute('data-ar-original');
                        if (original) {
                            para.textContent = original;
                        }
                    }
                }
            });
        }
        
        if (contentWhyTitle) {
            if (lang === 'en') {
                if (!contentWhyTitle.hasAttribute('data-ar-original')) {
                    contentWhyTitle.setAttribute('data-ar-original', contentWhyTitle.textContent);
                }
                contentWhyTitle.textContent = translations[lang]['tasbiah-content-why-title'];
            } else {
                const original = contentWhyTitle.getAttribute('data-ar-original');
                if (original) {
                    contentWhyTitle.textContent = original;
                }
            }
            
            // Translate paragraphs after why title
            const whyParagraphs = Array.from(contentWhyTitle.parentElement.querySelectorAll('p')).filter(p => 
                p.compareDocumentPosition(contentWhyTitle) & Node.DOCUMENT_POSITION_PRECEDING ? false : true
            );
            if (whyParagraphs.length >= 2) {
                const whyParaKeys = [
                    'tasbiah-content-why-para1',
                    'tasbiah-content-why-para2'
                ];
                whyParagraphs.forEach((para, index) => {
                    if (whyParaKeys[index]) {
                        if (lang === 'en') {
                            if (!para.hasAttribute('data-ar-original')) {
                                para.setAttribute('data-ar-original', para.textContent);
                            }
                            para.textContent = translations[lang][whyParaKeys[index]];
                        } else {
                            const original = para.getAttribute('data-ar-original');
                            if (original) {
                                para.textContent = original;
                            }
                        }
                    }
                });
            }
        }
    }
    
    // Translate FAQ section
    const faqSection = document.querySelector('.faq-section');
    if (faqSection) {
        const faqTitle = faqSection.querySelector('.section-title');
        if (faqTitle) {
            if (lang === 'en') {
                if (!faqTitle.hasAttribute('data-ar-original')) {
                    faqTitle.setAttribute('data-ar-original', faqTitle.textContent);
                }
                faqTitle.textContent = translations[lang]['tasbiah-faq-title'];
            } else {
                const original = faqTitle.getAttribute('data-ar-original');
                if (original) {
                    faqTitle.textContent = original;
                }
            }
        }
        
        const faqItems = faqSection.querySelectorAll('.faq-item');
        const faqQuestions = [
            'tasbiah-faq-q1',
            'tasbiah-faq-q2',
            'tasbiah-faq-q3',
            'tasbiah-faq-q4',
            'tasbiah-faq-q5',
            'tasbiah-faq-q6'
        ];
        const faqAnswers = [
            'tasbiah-faq-a1',
            'tasbiah-faq-a2',
            'tasbiah-faq-a3',
            'tasbiah-faq-a4',
            'tasbiah-faq-a5',
            'tasbiah-faq-a6'
        ];
        
        faqItems.forEach((item, index) => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            if (question && faqQuestions[index]) {
                if (lang === 'en') {
                    if (!question.hasAttribute('data-ar-original')) {
                        question.setAttribute('data-ar-original', question.textContent);
                    }
                    question.textContent = translations[lang][faqQuestions[index]];
                } else {
                    const original = question.getAttribute('data-ar-original');
                    if (original) {
                        question.textContent = original;
                    }
                }
            }
            
            if (answer && faqAnswers[index]) {
                if (lang === 'en') {
                    if (!answer.hasAttribute('data-ar-original')) {
                        answer.setAttribute('data-ar-original', answer.textContent);
                    }
                    answer.textContent = translations[lang][faqAnswers[index]];
                } else {
                    const original = answer.getAttribute('data-ar-original');
                    if (original) {
                        answer.textContent = original;
                    }
                }
            }
        });
    }
    
    // Translate screenshots section
    const screenshotsSection = document.querySelector('.screenshots-section');
    if (screenshotsSection) {
        const screenshotsTitle = screenshotsSection.querySelector('.section-title');
        if (screenshotsTitle) {
            if (lang === 'en') {
                if (!screenshotsTitle.hasAttribute('data-ar-original')) {
                    screenshotsTitle.setAttribute('data-ar-original', screenshotsTitle.textContent);
                }
                screenshotsTitle.textContent = translations[lang]['tasbiah-screenshots-title'];
            } else {
                const original = screenshotsTitle.getAttribute('data-ar-original');
                if (original) {
                    screenshotsTitle.textContent = original;
                }
            }
        }
        
        const screenshotCards = screenshotsSection.querySelectorAll('.screenshot-card h4');
        const screenshotTexts = [
            'tasbiah-screenshot-main',
            'tasbiah-screenshot-counter',
            'tasbiah-screenshot-dhikr',
            'tasbiah-screenshot-stats'
        ];
        
        screenshotCards.forEach((card, index) => {
            if (screenshotTexts[index]) {
                if (lang === 'en') {
                    if (!card.hasAttribute('data-ar-original')) {
                        card.setAttribute('data-ar-original', card.textContent);
                    }
                    card.textContent = translations[lang][screenshotTexts[index]];
                } else {
                    const original = card.getAttribute('data-ar-original');
                    if (original) {
                        card.textContent = original;
                    }
                }
            }
        });
    }
    
    // Translate footer
    const tasbiahFooter = document.querySelector('.site-footer');
    if (tasbiahFooter) {
        const footerTitle = tasbiahFooter.querySelector('.footer-info h3');
        const footerDesc = tasbiahFooter.querySelector('.footer-info p');
        
        if (footerTitle && footerTitle.textContent.includes('المسبحة')) {
            if (lang === 'en') {
                if (!footerTitle.hasAttribute('data-ar-original')) {
                    footerTitle.setAttribute('data-ar-original', footerTitle.textContent);
                }
                footerTitle.textContent = translations[lang]['tasbiah-footer-title'];
            } else {
                const original = footerTitle.getAttribute('data-ar-original');
                if (original) {
                    footerTitle.textContent = original;
                }
            }
        }
        
        if (footerDesc && footerDesc.textContent.includes('تطبيق ذكي')) {
            if (lang === 'en') {
                if (!footerDesc.hasAttribute('data-ar-original')) {
                    footerDesc.setAttribute('data-ar-original', footerDesc.textContent);
                }
                footerDesc.textContent = translations[lang]['tasbiah-footer-desc'];
            } else {
                const original = footerDesc.getAttribute('data-ar-original');
                if (original) {
                    footerDesc.textContent = original;
                }
            }
        }
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
