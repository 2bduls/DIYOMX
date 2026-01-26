/*
 * Tasbiah Themes Manager
 * Manages theme switching and customization
 */

const themes = {
    classic: {
        id: 'classic',
        name: { ar: 'كلاسيكي', en: 'Classic', fr: 'Classique' },
        colors: {
            primary: '#2c5530',
            primaryLight: '#4a7c59',
            primaryDark: '#1a3a1e',
            secondary: '#81c784',
            accent: '#a5d6a7'
        }
    },
    'islamic-green': {
        id: 'islamic-green',
        name: { ar: 'إسلامي أخضر', en: 'Islamic Green', fr: 'Vert Islamique' },
        colors: {
            primary: '#1b5e20',
            primaryLight: '#2e7d32',
            primaryDark: '#0d3e11',
            secondary: '#4caf50',
            accent: '#66bb6a'
        }
    },
    'islamic-blue': {
        id: 'islamic-blue',
        name: { ar: 'إسلامي أزرق', en: 'Islamic Blue', fr: 'Bleu Islamique' },
        colors: {
            primary: '#0d47a1',
            primaryLight: '#1565c0',
            primaryDark: '#0a3d91',
            secondary: '#1976d2',
            accent: '#42a5f5'
        }
    },
    sunset: {
        id: 'sunset',
        name: { ar: 'غروب الشمس', en: 'Sunset', fr: 'Coucher de Soleil' },
        colors: {
            primary: '#e65100',
            primaryLight: '#ff6f00',
            primaryDark: '#bf360c',
            secondary: '#ff9800',
            accent: '#ffb74d'
        }
    },
    purple: {
        id: 'purple',
        name: { ar: 'بنفسجي', en: 'Purple', fr: 'Violet' },
        colors: {
            primary: '#4a148c',
            primaryLight: '#6a1b9a',
            primaryDark: '#38006b',
            secondary: '#7b1fa2',
            accent: '#ab47bc'
        }
    },
    ocean: {
        id: 'ocean',
        name: { ar: 'محيط', en: 'Ocean', fr: 'Océan' },
        colors: {
            primary: '#006064',
            primaryLight: '#00838f',
            primaryDark: '#004d40',
            secondary: '#00acc1',
            accent: '#4dd0e1'
        }
    },
    pink: {
        id: 'pink',
        name: { ar: 'وردي', en: 'Pink', fr: 'Rose' },
        colors: {
            primary: '#880e4f',
            primaryLight: '#ad1457',
            primaryDark: '#560027',
            secondary: '#c2185b',
            accent: '#ec407a'
        }
    },
    oled: {
        id: 'oled',
        name: { ar: 'OLED', en: 'OLED', fr: 'OLED' },
        colors: {
            primary: '#000000',
            primaryLight: '#1a1a1a',
            primaryDark: '#000000',
            secondary: '#2d2d2d',
            accent: '#4a4a4a'
        }
    }
};

// Get current theme from localStorage or default to classic
function getCurrentTheme() {
    return localStorage.getItem('tasbiah-theme') || 'classic';
}

// Set current theme
function setCurrentTheme(themeId) {
    if (!themes[themeId] && themeId !== 'custom') {
        console.warn(`Theme ${themeId} not found, using classic`);
        themeId = 'classic';
    }
    
    localStorage.setItem('tasbiah-theme', themeId);
    applyTheme(themeId);
}

// Apply theme to the page
function applyTheme(themeId) {
    const html = document.documentElement;
    
    // Remove all theme classes
    Object.keys(themes).forEach(theme => {
        html.removeAttribute(`data-theme-${theme}`);
    });
    
    // Apply new theme
    html.setAttribute('data-theme', themeId);
    
    // If custom theme, apply custom colors
    if (themeId === 'custom') {
        applyCustomTheme();
    }
    
    // Trigger theme change event
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { themeId } }));
}

// Apply custom theme colors
function applyCustomTheme() {
    const customColors = JSON.parse(localStorage.getItem('tasbiah-custom-colors') || '{}');
    const root = document.documentElement;
    
    if (customColors.primary) {
        root.style.setProperty('--theme-primary', customColors.primary);
    }
    if (customColors.primaryLight) {
        root.style.setProperty('--theme-primary-light', customColors.primaryLight);
    }
    if (customColors.primaryDark) {
        root.style.setProperty('--theme-primary-dark', customColors.primaryDark);
    }
    if (customColors.secondary) {
        root.style.setProperty('--theme-secondary', customColors.secondary);
    }
    if (customColors.accent) {
        root.style.setProperty('--theme-accent', customColors.accent);
    }
    if (customColors.bg) {
        root.style.setProperty('--theme-bg', customColors.bg);
    }
    if (customColors.text) {
        root.style.setProperty('--theme-text', customColors.text);
    }
}

// Save custom theme colors
function saveCustomTheme(colors) {
    localStorage.setItem('tasbiah-custom-colors', JSON.stringify(colors));
    if (getCurrentTheme() === 'custom') {
        applyCustomTheme();
    }
}

// Get theme name in current language
function getThemeName(themeId, lang = null) {
    const langCode = lang || (window.tasbiahI18n?.getCurrentLanguage() || 'ar');
    const theme = themes[themeId];
    if (!theme) return themeId;
    return theme.name[langCode] || theme.name.ar;
}

// Initialize theme selector UI
function initializeThemeSelector() {
    const selector = document.getElementById('themeSelector');
    if (!selector) return;
    
    const currentLang = window.tasbiahI18n?.getCurrentLanguage() || 'ar';
    const currentTheme = getCurrentTheme();
    
    selector.innerHTML = '';
    
    // Add predefined themes
    Object.values(themes).forEach(theme => {
        const themeOption = document.createElement('div');
        themeOption.className = `theme-option ${theme.id === currentTheme ? 'active' : ''}`;
        themeOption.setAttribute('data-theme-id', theme.id);
        themeOption.setAttribute('title', getThemeName(theme.id, currentLang));
        
        themeOption.innerHTML = `
            <div class="theme-preview">
                <div class="theme-preview-top" style="background: ${theme.colors.primary}"></div>
                <div class="theme-preview-bottom" style="background: ${theme.colors.secondary}"></div>
            </div>
        `;
        
        themeOption.addEventListener('click', () => {
            setCurrentTheme(theme.id);
            // Update active state
            selector.querySelectorAll('.theme-option').forEach(opt => {
                opt.classList.remove('active');
            });
            themeOption.classList.add('active');
        });
        
        selector.appendChild(themeOption);
    });
    
    // Add custom theme option
    const customOption = document.createElement('div');
    customOption.className = `theme-option ${currentTheme === 'custom' ? 'active' : ''}`;
    customOption.setAttribute('data-theme-id', 'custom');
    customOption.setAttribute('title', currentLang === 'ar' ? 'مخصص' : currentLang === 'en' ? 'Custom' : 'Personnalisé');
    
    customOption.innerHTML = `
        <div class="theme-preview">
            <div class="theme-preview-top" style="background: linear-gradient(45deg, #667eea 0%, #764ba2 100%)"></div>
            <div class="theme-preview-bottom" style="background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%)"></div>
        </div>
    `;
    
    customOption.addEventListener('click', () => {
        // Open custom theme dialog (to be implemented)
        setCurrentTheme('custom');
        selector.querySelectorAll('.theme-option').forEach(opt => {
            opt.classList.remove('active');
        });
        customOption.classList.add('active');
    });
    
    selector.appendChild(customOption);
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const theme = getCurrentTheme();
    applyTheme(theme);
    initializeThemeSelector();
    
    // Update theme selector when language changes
    window.addEventListener('languageChanged', () => {
        initializeThemeSelector();
    });
});

// Export functions
window.tasbiahThemes = {
    themes,
    getCurrentTheme,
    setCurrentTheme,
    applyTheme,
    saveCustomTheme,
    getThemeName,
    initializeThemeSelector
};
