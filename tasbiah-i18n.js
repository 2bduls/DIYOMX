/*
 * Tasbiah i18n - Internationalization System
 * Supports Arabic (ar), English (en), French (fr)
 */

const translations = {
    ar: {
        // Navigation
        'app-title': 'المسبحة الذكية',
        'stats': 'الإحصائيات',
        'settings': 'الإعدادات',
        
        // Tabs
        'tab-counter': 'عداد التسبيح',
        'tab-dhikr': 'الأذكار',
        'tab-protocols': 'البروتوكولات',
        'tab-statistics': 'الإحصائيات',
        'tab-goals': 'الأهداف',
        'tab-achievements': 'الإنجازات',
        
        // Counter
        'count': 'العدد',
        'target': 'الهدف',
        'increment': 'زيادة',
        'decrement': 'نقصان',
        'reset': 'إعادة تعيين',
        
        // Search & Filter
        'search-dhikr': 'بحث في الأذكار...',
        'filter-all': 'الكل',
        'filter-morning': 'أذكار الصباح',
        'filter-evening': 'أذكار المساء',
        'filter-sleep': 'أذكار النوم',
        'filter-prayer': 'بعد الصلاة',
        'filter-tasbih': 'التسبيحات',
        
        // Statistics
        'stat-today': 'اليوم',
        'stat-week': 'هذا الأسبوع',
        'stat-month': 'هذا الشهر',
        'stat-streak': 'سلسلة الأيام',
        
        // Goals
        'goals-title': 'الأهداف',
        'add-goal': 'إضافة هدف',
        'goals-daily': 'يومية',
        'goals-weekly': 'أسبوعية',
        'goals-monthly': 'شهرية',
        'goal-name': 'اسم الهدف',
        'goal-target': 'الهدف',
        'goal-type': 'النوع',
        
        // Settings
        'settings-title': 'الإعدادات',
        'settings-theme': 'المظهر',
        'settings-language': 'اللغة',
        'settings-other': 'إعدادات أخرى',
        'settings-sound': 'الصوت',
        'settings-vibration': 'الاهتزاز',
        'settings-keep-screen': 'إبقاء الشاشة مضاءة',
        'settings-data': 'البيانات',
        'export-data': 'تصدير البيانات',
        'delete-data': 'حذف جميع البيانات',
        
        // Languages
        'lang-ar': 'العربية',
        'lang-en': 'English',
        'lang-fr': 'Français',
        
        // Actions
        'add-favorite': 'إضافة للمفضلة',
        'start-dhikr': 'بدء التسبيح',
        'save': 'حفظ',
        
        // Footer
        'home': 'الرئيسية',
        'app-page': 'صفحة التطبيق',
        'privacy': 'سياسة الخصوصية',
        
        // Messages
        'confirm-reset': 'هل تريد إعادة تعيين العداد؟',
        'confirm-delete': 'هل أنت متأكد من حذف جميع البيانات؟',
        'data-exported': 'تم تصدير البيانات بنجاح',
        'data-deleted': 'تم حذف جميع البيانات',
        'goal-added': 'تم إضافة الهدف بنجاح',
        'goal-completed': 'تهانينا! لقد حققت هدفك',
        'view-more': 'عرض المزيد',
        'no-results': 'لا توجد نتائج',
        'no-protocols': 'لا توجد بروتوكولات',
        'no-goals': 'لا توجد أهداف',
        'more': 'أخرى',
        'restart': 'إعادة',
        'protocol-completed': 'تهانينا! لقد أكملت البروتوكول',
        'remove-favorite': 'إزالة من المفضلة',
        'daily-chart': 'الإحصائيات اليومية (آخر 7 أيام)',
        'weekly-chart': 'الإحصائيات الأسبوعية (آخر 4 أسابيع)',
        'goal-name-required': 'يرجى إدخال اسم الهدف',
        'goal-target-required': 'يرجى إدخال هدف صحيح',
        'restart-protocol-confirm': 'هذا البروتوكول مكتمل. هل تريد إعادة البدء؟',
    },
    en: {
        // Navigation
        'app-title': 'Smart Tasbih',
        'stats': 'Statistics',
        'settings': 'Settings',
        
        // Tabs
        'tab-counter': 'Counter',
        'tab-dhikr': 'Dhikr',
        'tab-protocols': 'Protocols',
        'tab-statistics': 'Statistics',
        'tab-goals': 'Goals',
        'tab-achievements': 'Achievements',
        
        // Counter
        'count': 'Count',
        'target': 'Target',
        'increment': 'Increment',
        'decrement': 'Decrement',
        'reset': 'Reset',
        
        // Search & Filter
        'search-dhikr': 'Search dhikr...',
        'filter-all': 'All',
        'filter-morning': 'Morning Dhikr',
        'filter-evening': 'Evening Dhikr',
        'filter-sleep': 'Sleep Dhikr',
        'filter-prayer': 'After Prayer',
        'filter-tasbih': 'Tasbih',
        
        // Statistics
        'stat-today': 'Today',
        'stat-week': 'This Week',
        'stat-month': 'This Month',
        'stat-streak': 'Streak',
        
        // Goals
        'goals-title': 'Goals',
        'add-goal': 'Add Goal',
        'goals-daily': 'Daily',
        'goals-weekly': 'Weekly',
        'goals-monthly': 'Monthly',
        'goal-name': 'Goal Name',
        'goal-target': 'Target',
        'goal-type': 'Type',
        
        // Settings
        'settings-title': 'Settings',
        'settings-theme': 'Theme',
        'settings-language': 'Language',
        'settings-other': 'Other Settings',
        'settings-sound': 'Sound',
        'settings-vibration': 'Vibration',
        'settings-keep-screen': 'Keep Screen On',
        'settings-data': 'Data',
        'export-data': 'Export Data',
        'delete-data': 'Delete All Data',
        
        // Languages
        'lang-ar': 'العربية',
        'lang-en': 'English',
        'lang-fr': 'Français',
        
        // Actions
        'add-favorite': 'Add to Favorites',
        'start-dhikr': 'Start Dhikr',
        'save': 'Save',
        
        // Footer
        'home': 'Home',
        'app-page': 'App Page',
        'privacy': 'Privacy Policy',
        
        // Messages
        'confirm-reset': 'Do you want to reset the counter?',
        'confirm-delete': 'Are you sure you want to delete all data?',
        'data-exported': 'Data exported successfully',
        'data-deleted': 'All data deleted',
        'goal-added': 'Goal added successfully',
        'goal-completed': 'Congratulations! You achieved your goal',
        'view-more': 'View More',
        'no-results': 'No results found',
        'no-protocols': 'No protocols available',
        'no-goals': 'No goals set',
        'more': 'more',
        'restart': 'Restart',
        'protocol-completed': 'Congratulations! You completed the protocol',
        'remove-favorite': 'Remove from Favorites',
        'daily-chart': 'Daily Statistics (Last 7 Days)',
        'weekly-chart': 'Weekly Statistics (Last 4 Weeks)',
        'goal-name-required': 'Please enter goal name',
        'goal-target-required': 'Please enter a valid target',
        'restart-protocol-confirm': 'This protocol is completed. Do you want to restart?',
    },
    fr: {
        // Navigation
        'app-title': 'Tasbih Intelligent',
        'stats': 'Statistiques',
        'settings': 'Paramètres',
        
        // Tabs
        'tab-counter': 'Compteur',
        'tab-dhikr': 'Dhikr',
        'tab-protocols': 'Protocoles',
        'tab-statistics': 'Statistiques',
        'tab-goals': 'Objectifs',
        'tab-achievements': 'Réalisations',
        
        // Counter
        'count': 'Nombre',
        'target': 'Objectif',
        'increment': 'Augmenter',
        'decrement': 'Diminuer',
        'reset': 'Réinitialiser',
        
        // Search & Filter
        'search-dhikr': 'Rechercher dhikr...',
        'filter-all': 'Tout',
        'filter-morning': 'Dhikr du matin',
        'filter-evening': 'Dhikr du soir',
        'filter-sleep': 'Dhikr du sommeil',
        'filter-prayer': 'Après la prière',
        'filter-tasbih': 'Tasbih',
        
        // Statistics
        'stat-today': "Aujourd'hui",
        'stat-week': 'Cette semaine',
        'stat-month': 'Ce mois',
        'stat-streak': 'Série',
        
        // Goals
        'goals-title': 'Objectifs',
        'add-goal': 'Ajouter un objectif',
        'goals-daily': 'Quotidien',
        'goals-weekly': 'Hebdomadaire',
        'goals-monthly': 'Mensuel',
        'goal-name': "Nom de l'objectif",
        'goal-target': 'Objectif',
        'goal-type': 'Type',
        
        // Settings
        'settings-title': 'Paramètres',
        'settings-theme': 'Thème',
        'settings-language': 'Langue',
        'settings-other': 'Autres paramètres',
        'settings-sound': 'Son',
        'settings-vibration': 'Vibration',
        'settings-keep-screen': 'Garder l\'écran allumé',
        'settings-data': 'Données',
        'export-data': 'Exporter les données',
        'delete-data': 'Supprimer toutes les données',
        
        // Languages
        'lang-ar': 'العربية',
        'lang-en': 'English',
        'lang-fr': 'Français',
        
        // Actions
        'add-favorite': 'Ajouter aux favoris',
        'start-dhikr': 'Commencer le dhikr',
        'save': 'Enregistrer',
        
        // Footer
        'home': 'Accueil',
        'app-page': 'Page de l\'application',
        'privacy': 'Politique de confidentialité',
        
        // Messages
        'confirm-reset': 'Voulez-vous réinitialiser le compteur?',
        'confirm-delete': 'Êtes-vous sûr de vouloir supprimer toutes les données?',
        'data-exported': 'Données exportées avec succès',
        'data-deleted': 'Toutes les données supprimées',
        'goal-added': 'Objectif ajouté avec succès',
        'goal-completed': 'Félicitations! Vous avez atteint votre objectif',
        'view-more': 'Voir plus',
        'no-results': 'Aucun résultat trouvé',
        'no-protocols': 'Aucun protocole disponible',
        'no-goals': 'Aucun objectif défini',
        'more': 'plus',
        'restart': 'Redémarrer',
        'protocol-completed': 'Félicitations! Vous avez terminé le protocole',
        'remove-favorite': 'Retirer des favoris',
        'daily-chart': 'Statistiques quotidiennes (7 derniers jours)',
        'weekly-chart': 'Statistiques hebdomadaires (4 dernières semaines)',
        'goal-name-required': 'Veuillez entrer le nom de l\'objectif',
        'goal-target-required': 'Veuillez entrer un objectif valide',
        'restart-protocol-confirm': 'Ce protocole est terminé. Voulez-vous recommencer?',
    }
};

// Get current language from localStorage or default to Arabic
function getCurrentLanguage() {
    return localStorage.getItem('tasbiah-language') || 'ar';
}

// Set current language
function setCurrentLanguage(lang) {
    localStorage.setItem('tasbiah-language', lang);
    applyLanguage(lang);
}

// Apply language to the page
function applyLanguage(lang) {
    const currentLang = translations[lang] || translations.ar;
    
    // Update HTML attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // Translate all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (currentLang[key]) {
            element.textContent = currentLang[key];
        }
    });
    
    // Translate placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (currentLang[key]) {
            element.placeholder = currentLang[key];
        }
    });
    
    // Update select options
    document.querySelectorAll('option[data-i18n]').forEach(option => {
        const key = option.getAttribute('data-i18n');
        if (currentLang[key]) {
            option.textContent = currentLang[key];
        }
    });
    
    // Trigger language change event
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

// Get translation for a key
function t(key, lang = null) {
    const currentLang = lang || getCurrentLanguage();
    return translations[currentLang]?.[key] || translations.ar[key] || key;
}

// Initialize i18n on page load
document.addEventListener('DOMContentLoaded', () => {
    const lang = getCurrentLanguage();
    applyLanguage(lang);
    
    // Update language select if exists
    const langSelect = document.getElementById('languageSelect');
    if (langSelect) {
        langSelect.value = lang;
        langSelect.addEventListener('change', (e) => {
            setCurrentLanguage(e.target.value);
        });
    }
});

// Export functions
window.tasbiahI18n = {
    getCurrentLanguage,
    setCurrentLanguage,
    applyLanguage,
    t,
    translations
};
