/*
 * Tasbiah Web App - Main Application Logic
 * Handles counter, dhikr, protocols, statistics, goals, and achievements
 */

// Application State
const appState = {
    counter: 0,
    target: 0,
    currentDate: new Date().toISOString().split('T')[0],
    statistics: {},
    goals: [],
    achievements: [],
    favorites: [],
    protocolProgress: {},
    currentProtocol: null,
    currentProtocolIndex: 0,
    settings: {
        sound: true,
        vibration: true,
        keepScreenOn: false
    }
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadAppState();
    initializeUI();
    setupEventListeners();
    updateDisplay();
});

// Load state from localStorage
function loadAppState() {
    const saved = localStorage.getItem('tasbiah-app-state');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            appState.target = parsed.target || 0;
            appState.statistics = parsed.statistics || {};
            appState.goals = parsed.goals || [];
            appState.achievements = parsed.achievements || [];
            appState.favorites = parsed.favorites || [];
            appState.protocolProgress = parsed.protocolProgress || {};
            appState.settings = { ...appState.settings, ...(parsed.settings || {}) };
            appState.currentProtocol = parsed.currentProtocol || null;
            appState.currentProtocolIndex = parsed.currentProtocolIndex || 0;
        } catch (e) {
            console.error('Error loading app state:', e);
        }
    }
    
    // Load today's counter (always load fresh for today)
    const todayCounter = localStorage.getItem(`tasbiah-counter-${appState.currentDate}`);
    if (todayCounter) {
        appState.counter = parseInt(todayCounter) || 0;
    } else {
        appState.counter = 0;
    }
}

// Save state to localStorage
function saveAppState() {
    // Don't save counter in main state, save it separately per day
    const stateToSave = {
        target: appState.target,
        statistics: appState.statistics,
        goals: appState.goals,
        achievements: appState.achievements,
        favorites: appState.favorites,
        protocolProgress: appState.protocolProgress,
        currentProtocol: appState.currentProtocol,
        currentProtocolIndex: appState.currentProtocolIndex,
        settings: appState.settings
    };
    
    localStorage.setItem('tasbiah-app-state', JSON.stringify(stateToSave));
    localStorage.setItem(`tasbiah-counter-${appState.currentDate}`, appState.counter.toString());
}

// Initialize UI
function initializeUI() {
    // Set target input value
    const targetInput = document.getElementById('targetInput');
    if (targetInput) {
        targetInput.value = appState.target;
    }
    
    // Load settings
    const soundEnabled = document.getElementById('soundEnabled');
    const vibrationEnabled = document.getElementById('vibrationEnabled');
    const keepScreenOn = document.getElementById('keepScreenOn');
    
    if (soundEnabled) soundEnabled.checked = appState.settings.sound;
    if (vibrationEnabled) vibrationEnabled.checked = appState.settings.vibration;
    if (keepScreenOn) keepScreenOn.checked = appState.settings.keepScreenOn;
    
    // Load tabs
    loadTabContent('counter');
    
    // Update theme selector when themes are ready
    if (window.tasbiahThemes) {
        window.tasbiahThemes.initializeThemeSelector();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Tab navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.getAttribute('data-tab');
            switchTab(tab);
        });
    });
    
    // Counter buttons
    const incrementBtn = document.getElementById('incrementBtn');
    const decrementBtn = document.getElementById('decrementBtn');
    const resetBtn = document.getElementById('resetBtn');
    const targetInput = document.getElementById('targetInput');
    
    if (incrementBtn) {
        incrementBtn.addEventListener('click', incrementCounter);
    }
    
    if (decrementBtn) {
        decrementBtn.addEventListener('click', decrementCounter);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetCounter);
    }
    
    if (targetInput) {
        targetInput.addEventListener('change', (e) => {
            appState.target = parseInt(e.target.value) || 0;
            saveAppState();
            updateDisplay();
        });
    }
    
    // Settings modal
    const settingsBtn = document.getElementById('settingsBtn');
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            if (settingsModal) settingsModal.classList.add('active');
        });
    }
    
    if (closeSettingsBtn) {
        closeSettingsBtn.addEventListener('click', () => {
            if (settingsModal) settingsModal.classList.remove('active');
        });
    }
    
    // Settings checkboxes
    const soundEnabled = document.getElementById('soundEnabled');
    const vibrationEnabled = document.getElementById('vibrationEnabled');
    const keepScreenOn = document.getElementById('keepScreenOn');
    
    if (soundEnabled) {
        soundEnabled.addEventListener('change', (e) => {
            appState.settings.sound = e.target.checked;
            saveAppState();
        });
    }
    
    if (vibrationEnabled) {
        vibrationEnabled.addEventListener('change', (e) => {
            appState.settings.vibration = e.target.checked;
            saveAppState();
        });
    }
    
    if (keepScreenOn) {
        keepScreenOn.addEventListener('change', (e) => {
            appState.settings.keepScreenOn = e.target.checked;
            if (e.target.checked && 'wakeLock' in navigator) {
                navigator.wakeLock.request('screen');
            }
        });
    }
    
    // Data export/delete
    const exportDataBtn = document.getElementById('exportDataBtn');
    const deleteDataBtn = document.getElementById('deleteDataBtn');
    
    if (exportDataBtn) {
        exportDataBtn.addEventListener('click', exportData);
    }
    
    if (deleteDataBtn) {
        deleteDataBtn.addEventListener('click', deleteData);
    }
    
    // Stats button
    const statsBtn = document.getElementById('statsBtn');
    if (statsBtn) {
        statsBtn.addEventListener('click', () => {
            switchTab('statistics');
        });
    }
    
    // Goal form
    const goalForm = document.getElementById('goalForm');
    if (goalForm) {
        goalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            addGoal();
        });
    }
    
    // Goal modal
    const addGoalBtn = document.getElementById('addGoalBtn');
    const closeGoalBtn = document.getElementById('closeGoalBtn');
    const goalModal = document.getElementById('goalModal');
    
    if (addGoalBtn) {
        addGoalBtn.addEventListener('click', () => {
            if (goalModal) goalModal.classList.add('active');
        });
    }
    
    if (closeGoalBtn) {
        closeGoalBtn.addEventListener('click', () => {
            if (goalModal) goalModal.classList.remove('active');
        });
    }
    
    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
}

// Switch tab
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-tab') === tabName) {
            btn.classList.add('active');
        }
    });
    
    // Update tab panes
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    
    const activePane = document.getElementById(`${tabName}Tab`);
    if (activePane) {
        activePane.classList.add('active');
        loadTabContent(tabName);
    }
}

// Load tab content
function loadTabContent(tabName) {
    switch(tabName) {
        case 'counter':
            updateCounterDisplay();
            break;
        case 'dhikr':
            loadDhikrList();
            break;
        case 'protocols':
            loadProtocolsList();
            break;
        case 'statistics':
            loadStatistics();
            break;
        case 'goals':
            loadGoals();
            break;
        case 'achievements':
            loadAchievements();
            break;
    }
}

// Counter functions
function incrementCounter() {
    appState.counter++;
    updateStatistics();
    
    // Update protocol progress if in protocol mode
    if (appState.currentProtocol) {
        updateProtocolProgress();
    }
    
    saveAppState();
    updateDisplay();
    playSound();
    vibrate();
    checkGoals();
    checkAchievements();
}

function decrementCounter() {
    if (appState.counter > 0) {
        appState.counter--;
        updateDisplay();
        
        // Update protocol progress if in protocol mode
        if (appState.currentProtocol) {
            updateProtocolProgress();
        }
        
        saveAppState();
    }
}

function resetCounter() {
    const lang = window.tasbiahI18n?.getCurrentLanguage() || 'ar';
    const confirmMsg = window.tasbiahI18n?.t('confirm-reset', lang) || 'هل تريد إعادة تعيين العداد؟';
    
    if (confirm(confirmMsg)) {
        appState.counter = 0;
        
        // Update protocol progress if in protocol mode
        if (appState.currentProtocol) {
            updateProtocolProgress();
        }
        
        updateDisplay();
        saveAppState();
    }
}

// Update display
function updateDisplay() {
    updateCounterDisplay();
    updateProgressBar();
}

function updateCounterDisplay() {
    const counterValue = document.getElementById('counterValue');
    if (counterValue) {
        counterValue.textContent = appState.counter;
    }
    
    // Update protocol info if in protocol mode
    if (appState.currentProtocol) {
        const protocol = window.dhikrData?.getProtocol(appState.currentProtocol);
        if (protocol) {
            const currentDhikr = protocol.dhikrs[appState.currentProtocolIndex];
            if (currentDhikr) {
                const lang = window.tasbiahI18n?.getCurrentLanguage() || 'ar';
                const dhikrData = window.dhikrData?.getDhikrText(currentDhikr.id, lang);
                const counterLabel = document.querySelector('.counter-label');
                if (counterLabel && dhikrData) {
                    counterLabel.textContent = `${dhikrData.name} (${appState.currentProtocolIndex + 1}/${protocol.dhikrs.length})`;
                }
                
                // Update target to current dhikr count
                const targetInput = document.getElementById('targetInput');
                if (targetInput) {
                    targetInput.value = currentDhikr.count;
                    appState.target = currentDhikr.count;
                }
            }
        }
    } else {
        // Reset label to default
        const counterLabel = document.querySelector('.counter-label');
        if (counterLabel) {
            const lang = window.tasbiahI18n?.getCurrentLanguage() || 'ar';
            counterLabel.textContent = window.tasbiahI18n?.t('count', lang) || 'العدد';
        }
    }
}

function updateProgressBar() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (!progressFill || !progressText) return;
    
    const progress = appState.target > 0 
        ? Math.min((appState.counter / appState.target) * 100, 100)
        : 0;
    
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${Math.round(progress)}%`;
    
    if (progress >= 100 && appState.target > 0) {
        showTargetReached();
    }
}

function showTargetReached() {
    const lang = window.tasbiahI18n?.getCurrentLanguage() || 'ar';
    const msg = window.tasbiahI18n?.t('goal-completed', lang) || 'تهانينا! لقد حققت هدفك';
    alert(msg);
}

// Sound and vibration
function playSound() {
    if (!appState.settings.sound) return;
    
    // Create audio context for beep sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

function vibrate() {
    if (!appState.settings.vibration) return;
    
    if ('vibrate' in navigator) {
        navigator.vibrate(50);
    }
}

// Statistics
function updateStatistics() {
    const date = appState.currentDate;
    
    if (!appState.statistics[date]) {
        appState.statistics[date] = {
            count: 0,
            dhikrs: {}
        };
    }
    
    appState.statistics[date].count = appState.counter;
}

function loadStatistics() {
    updateStatisticsCards();
    updateCharts();
}

function updateStatisticsCards() {
    const today = appState.currentDate;
    const todayCount = appState.statistics[today]?.count || appState.counter;
    
    // Calculate week count
    const weekCount = calculateWeekCount();
    
    // Calculate month count
    const monthCount = calculateMonthCount();
    
    // Calculate streak
    const streak = calculateStreak();
    
    const todayCountEl = document.getElementById('todayCount');
    const weekCountEl = document.getElementById('weekCount');
    const monthCountEl = document.getElementById('monthCount');
    const streakCountEl = document.getElementById('streakCount');
    
    if (todayCountEl) todayCountEl.textContent = todayCount;
    if (weekCountEl) weekCountEl.textContent = weekCount;
    if (monthCountEl) monthCountEl.textContent = monthCount;
    if (streakCountEl) streakCountEl.textContent = streak;
}

function calculateWeekCount() {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    weekStart.setHours(0, 0, 0, 0);
    
    let count = 0;
    for (let i = 0; i < 7; i++) {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        count += appState.statistics[dateStr]?.count || 0;
    }
    
    return count;
}

function calculateMonthCount() {
    const today = new Date();
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    
    let count = 0;
    const todayDate = new Date();
    
    for (let d = new Date(monthStart); d <= todayDate; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        count += appState.statistics[dateStr]?.count || 0;
    }
    
    return count;
}

function calculateStreak() {
    let streak = 0;
    const today = new Date();
    
    for (let d = new Date(today); d >= new Date(today.getFullYear(), today.getMonth(), 1); d.setDate(d.getDate() - 1)) {
        const dateStr = d.toISOString().split('T')[0];
        const dayCount = appState.statistics[dateStr]?.count || 0;
        
        if (dayCount > 0) {
            streak++;
        } else {
            break;
        }
    }
    
    return streak;
}

function updateCharts() {
    // Destroy existing charts if they exist
    if (window.dailyChartInstance) {
        window.dailyChartInstance.destroy();
        window.dailyChartInstance = null;
    }
    if (window.weeklyChartInstance) {
        window.weeklyChartInstance.destroy();
        window.weeklyChartInstance = null;
    }
    
    // Small delay to ensure canvas is ready
    setTimeout(() => {
        updateDailyChart();
        updateWeeklyChart();
    }, 100);
}

function updateDailyChart() {
    const canvas = document.getElementById('dailyChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const last7Days = getLast7Days();
    
    window.dailyChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: last7Days.map(d => formatDate(d)),
            datasets: [{
                label: window.tasbiahI18n?.t('stat-today') || 'اليوم',
                data: last7Days.map(d => {
                    const stats = appState.statistics[d];
                    return stats?.count || 0;
                }),
                borderColor: 'var(--theme-primary)',
                backgroundColor: 'rgba(44, 85, 48, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function updateWeeklyChart() {
    const canvas = document.getElementById('weeklyChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const last4Weeks = getLast4Weeks();
    
    window.weeklyChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: last4Weeks.map(w => {
                const lang = window.tasbiahI18n?.getCurrentLanguage() || 'ar';
                return lang === 'ar' ? `الأسبوع ${w.week}` : lang === 'en' ? `Week ${w.week}` : `Semaine ${w.week}`;
            }),
            datasets: [{
                label: window.tasbiahI18n?.t('stat-week') || 'هذا الأسبوع',
                data: last4Weeks.map(w => w.count),
                backgroundColor: 'var(--theme-primary)',
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function getLast7Days() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push(date.toISOString().split('T')[0]);
    }
    return days;
}

function getLast4Weeks() {
    const weeks = [];
    const today = new Date();
    
    for (let i = 3; i >= 0; i--) {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - (today.getDay() + i * 7));
        weekStart.setHours(0, 0, 0, 0);
        
        let count = 0;
        for (let j = 0; j < 7; j++) {
            const date = new Date(weekStart);
            date.setDate(weekStart.getDate() + j);
            const dateStr = date.toISOString().split('T')[0];
            count += appState.statistics[dateStr]?.count || 0;
        }
        
        weeks.push({ week: i + 1, count });
    }
    
    return weeks;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString(window.tasbiahI18n?.getCurrentLanguage() || 'ar', { 
        weekday: 'short',
        day: 'numeric'
    });
}

// Dhikr list
function loadDhikrList() {
    const dhikrList = document.getElementById('dhikrList');
    if (!dhikrList) return;
    
    const lang = window.tasbiahI18n?.getCurrentLanguage() || 'ar';
    const searchTerm = document.getElementById('dhikrSearch')?.value.toLowerCase() || '';
    const filterValue = document.getElementById('dhikrFilter')?.value || 'all';
    
    // Get all dhikrs
    let allDhikrs = [];
    
    // Add protocol dhikrs
    const allProtocols = window.dhikrData?.getAllProtocols() || [];
    allProtocols.forEach(protocol => {
        protocol.dhikrs.forEach(d => {
            if (!allDhikrs.find(dh => dh.id === d.id)) {
                allDhikrs.push({ id: d.id, type: 'protocol' });
            }
        });
    });
    
    // Add standalone dhikrs
    const standaloneDhikrs = window.dhikrData?.getAllDhikrTexts() || [];
    standaloneDhikrs.forEach(d => {
        if (!allDhikrs.find(dh => dh.id === d.id)) {
            allDhikrs.push({ id: d.id, type: 'standalone' });
        }
    });
    
    // Filter by type
    if (filterValue !== 'all') {
        allDhikrs = allDhikrs.filter(d => {
            const dhikrData = window.dhikrData?.getDhikrText(d.id, lang);
            if (!dhikrData) return false;
            
            const name = dhikrData.name.toLowerCase();
            if (filterValue === 'morning') return name.includes('صباح') || name.includes('morning');
            if (filterValue === 'evening') return name.includes('مساء') || name.includes('evening');
            if (filterValue === 'sleep') return name.includes('نوم') || name.includes('sleep');
            if (filterValue === 'prayer') return name.includes('صلاة') || name.includes('prayer');
            if (filterValue === 'tasbih') return d.id.startsWith('GE') || d.id.startsWith('TASB');
            return true;
        });
    }
    
    // Filter by search
    if (searchTerm) {
        allDhikrs = allDhikrs.filter(d => {
            const dhikrData = window.dhikrData?.getDhikrText(d.id, lang);
            if (!dhikrData) return false;
            return dhikrData.name.toLowerCase().includes(searchTerm) ||
                   dhikrData.text.toLowerCase().includes(searchTerm) ||
                   (dhikrData.benefit && dhikrData.benefit.toLowerCase().includes(searchTerm));
        });
    }
    
    dhikrList.innerHTML = '';
    
    if (allDhikrs.length === 0) {
        dhikrList.innerHTML = `<p style="text-align: center; color: var(--theme-text-secondary); padding: 2rem;">
            ${window.tasbiahI18n?.t('no-results', lang) || 'لا توجد نتائج'}
        </p>`;
        return;
    }
    
    allDhikrs.forEach(dhikr => {
        const dhikrData = window.dhikrData?.getDhikrText(dhikr.id, lang);
        if (!dhikrData) return;
        
        const isFavorite = appState.favorites.includes(dhikr.id);
        
        const card = document.createElement('div');
        card.className = 'dhikr-card';
        card.innerHTML = `
            <div class="dhikr-card-title">${dhikrData.name}</div>
            <div class="dhikr-card-text">${dhikrData.text.substring(0, 150)}${dhikrData.text.length > 150 ? '...' : ''}</div>
            ${dhikrData.benefit ? `<div class="dhikr-card-benefit" style="font-size: 0.9rem; color: var(--theme-text-secondary); margin-top: 0.5rem;">${dhikrData.benefit}</div>` : ''}
            <div class="dhikr-card-actions">
                <button class="btn btn-primary" onclick="viewDhikrDetail('${dhikr.id}')">
                    <i class="fas fa-eye"></i> ${window.tasbiahI18n?.t('view-more', lang) || 'عرض المزيد'}
                </button>
                <button class="btn btn-secondary" onclick="toggleFavorite('${dhikr.id}')" style="background: ${isFavorite ? 'var(--theme-accent)' : 'var(--theme-secondary)'};">
                    <i class="fas fa-${isFavorite ? 'heart' : 'heart-o'}"></i>
                </button>
            </div>
        `;
        
        dhikrList.appendChild(card);
    });
}

// Protocols list
function loadProtocolsList() {
    const protocolsList = document.getElementById('protocolsList');
    if (!protocolsList) return;
    
    const lang = window.tasbiahI18n?.getCurrentLanguage() || 'ar';
    const allProtocols = window.dhikrData?.getAllProtocols() || [];
    
    protocolsList.innerHTML = '';
    
    if (allProtocols.length === 0) {
        protocolsList.innerHTML = `<p style="text-align: center; color: var(--theme-text-secondary); padding: 2rem;">
            ${window.tasbiahI18n?.t('no-protocols', lang) || 'لا توجد بروتوكولات'}
        </p>`;
        return;
    }
    
    allProtocols.forEach(protocol => {
        const progress = appState.protocolProgress[protocol.id] || {};
        const total = protocol.dhikrs.reduce((sum, d) => sum + d.count, 0);
        const completed = Object.values(progress).reduce((sum, count) => sum + (count || 0), 0);
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        const isCompleted = percentage >= 100;
        
        const card = document.createElement('div');
        card.className = 'protocol-card';
        if (isCompleted) {
            card.style.borderColor = 'var(--theme-success)';
        }
        card.innerHTML = `
            <div class="protocol-header">
                <div class="protocol-title">${protocol.name[lang] || protocol.name.ar}</div>
                <div class="protocol-progress">
                    ${isCompleted ? '<span style="color: var(--theme-success);">✓</span> ' : ''}
                    ${completed}/${total} (${percentage}%)
                </div>
            </div>
            <div class="protocol-description" style="color: var(--theme-text-secondary); margin-bottom: 1rem;">
                ${protocol.description[lang] || protocol.description.ar}
            </div>
            <div class="protocol-progress-bar" style="width: 100%; height: 8px; background: var(--theme-bg-secondary); border-radius: 4px; overflow: hidden; margin-bottom: 1rem;">
                <div class="protocol-progress-fill" style="height: 100%; background: var(--theme-primary); width: ${percentage}%; transition: width 0.3s ease;"></div>
            </div>
            <div class="protocol-dhikrs">
                ${protocol.dhikrs.slice(0, 5).map(d => {
                    const dhikrData = window.dhikrData?.getDhikrText(d.id, lang);
                    const currentCount = progress[d.id] || 0;
                    const itemCompleted = currentCount >= d.count;
                    return `
                        <div class="protocol-dhikr-item" style="${itemCompleted ? 'opacity: 0.7;' : ''}">
                            <span>${dhikrData?.name || d.id}</span>
                            <span>${currentCount}/${d.count} ${itemCompleted ? '✓' : ''}</span>
                        </div>
                    `;
                }).join('')}
                ${protocol.dhikrs.length > 5 ? `<div style="text-align: center; color: var(--theme-text-secondary); padding: 0.5rem;">
                    +${protocol.dhikrs.length - 5} ${window.tasbiahI18n?.t('more', lang) || 'أخرى'}
                </div>` : ''}
            </div>
            <button class="btn btn-primary" onclick="startProtocol('${protocol.id}')" style="width: 100%; margin-top: 1rem;">
                ${isCompleted ? (window.tasbiahI18n?.t('restart', lang) || 'إعادة') : (window.tasbiahI18n?.t('start-dhikr', lang) || 'بدء التسبيح')}
            </button>
        `;
        
        protocolsList.appendChild(card);
    });
}

// Goals
function loadGoals() {
    const goalsList = document.getElementById('goalsList');
    if (!goalsList) return;
    
    const activeGoalType = document.querySelector('.goal-tab-btn.active')?.getAttribute('data-goal-type') || 'daily';
    const filteredGoals = appState.goals.filter(g => g.type === activeGoalType);
    
    goalsList.innerHTML = '';
    
    if (filteredGoals.length === 0) {
        const lang = window.tasbiahI18n?.getCurrentLanguage() || 'ar';
        goalsList.innerHTML = `<p style="text-align: center; color: var(--theme-text-secondary); padding: 2rem;">
            ${window.tasbiahI18n?.t('no-goals', lang) || 'لا توجد أهداف'}
        </p>`;
        return;
    }
    
    filteredGoals.forEach(goal => {
        const progress = goal.targetCount > 0 ? (goal.currentCount / goal.targetCount * 100) : 0;
        const isCompleted = goal.currentCount >= goal.targetCount;
        
        const card = document.createElement('div');
        card.className = 'goal-card';
        if (isCompleted) {
            card.style.borderColor = 'var(--theme-success)';
        }
        card.innerHTML = `
            <div class="goal-header">
                <div class="goal-name">${goal.name}</div>
                ${isCompleted ? '<span style="color: var(--theme-success); font-size: 1.5rem;">✓</span>' : ''}
            </div>
            <div class="goal-progress">
                <div class="goal-progress-bar">
                    <div class="goal-progress-fill" style="width: ${Math.min(progress, 100)}%; background: ${isCompleted ? 'var(--theme-success)' : 'var(--theme-primary)'};"></div>
                </div>
                <div class="goal-progress-text">${goal.currentCount}/${goal.targetCount} (${Math.round(progress)}%)</div>
            </div>
            <div style="margin-top: 1rem; font-size: 0.9rem; color: var(--theme-text-secondary);">
                ${goal.createdAt ? new Date(goal.createdAt).toLocaleDateString(window.tasbiahI18n?.getCurrentLanguage() || 'ar') : ''}
            </div>
        `;
        
        goalsList.appendChild(card);
    });
}

function addGoal() {
    const nameInput = document.getElementById('goalNameInput');
    const targetInput = document.getElementById('goalTargetInput');
    const typeSelect = document.getElementById('goalTypeSelect');
    
    if (!nameInput || !targetInput || !typeSelect) return;
    
    if (!nameInput.value.trim()) {
        const lang = window.tasbiahI18n?.getCurrentLanguage() || 'ar';
        alert(window.tasbiahI18n?.t('goal-name-required', lang) || 'يرجى إدخال اسم الهدف');
        return;
    }
    
    if (!targetInput.value || parseInt(targetInput.value) <= 0) {
        const lang = window.tasbiahI18n?.getCurrentLanguage() || 'ar';
        alert(window.tasbiahI18n?.t('goal-target-required', lang) || 'يرجى إدخال هدف صحيح');
        return;
    }
    
    const goal = {
        id: Date.now().toString(),
        name: nameInput.value.trim(),
        targetCount: parseInt(targetInput.value),
        currentCount: 0,
        type: typeSelect.value,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    appState.goals.push(goal);
    saveAppState();
    
    const goalModal = document.getElementById('goalModal');
    if (goalModal) goalModal.classList.remove('active');
    
    if (nameInput) nameInput.value = '';
    if (targetInput) targetInput.value = '';
    
    loadGoals();
    
    const lang = window.tasbiahI18n?.getCurrentLanguage() || 'ar';
    alert(window.tasbiahI18n?.t('goal-added', lang) || 'تم إضافة الهدف بنجاح');
}

function checkGoals() {
    const today = appState.currentDate;
    const todayStats = appState.statistics[today]?.count || appState.counter;
    
    appState.goals.forEach(goal => {
        if (goal.type === 'daily') {
            goal.currentCount = todayStats;
        } else if (goal.type === 'weekly') {
            // Calculate week count
            const weekCount = calculateWeekCount();
            goal.currentCount = weekCount;
        } else if (goal.type === 'monthly') {
            // Calculate month count
            const monthCount = calculateMonthCount();
            goal.currentCount = monthCount;
        }
        
        if (goal.currentCount >= goal.targetCount && !goal.completed) {
            goal.completed = true;
            goal.completedAt = new Date().toISOString();
            const lang = window.tasbiahI18n?.getCurrentLanguage() || 'ar';
            alert(window.tasbiahI18n?.t('goal-completed', lang) || 'تهانينا! لقد حققت هدفك');
        }
    });
    
    saveAppState();
    if (document.getElementById('goalsTab')?.classList.contains('active')) {
        loadGoals();
    }
}

// Achievements
function loadAchievements() {
    const achievementsList = document.getElementById('achievementsList');
    if (!achievementsList) return;
    
    const allAchievements = getAchievementsList();
    
    achievementsList.innerHTML = '';
    
    allAchievements.forEach(achievement => {
        const unlocked = appState.achievements.includes(achievement.id);
        const progress = calculateAchievementProgress(achievement);
        
        const card = document.createElement('div');
        card.className = `achievement-card ${unlocked ? 'unlocked' : 'locked'}`;
        card.innerHTML = `
            <div class="achievement-icon">
                <i class="${achievement.icon}"></i>
            </div>
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-description">${achievement.description}</div>
            ${!unlocked ? `
                <div class="achievement-progress">
                    <div class="achievement-progress-fill" style="width: ${progress}%"></div>
                </div>
            ` : ''}
        `;
        
        achievementsList.appendChild(card);
    });
}

function getAchievementsList() {
    const lang = window.tasbiahI18n?.getCurrentLanguage() || 'ar';
    return [
        {
            id: 'first_100',
            name: { ar: 'أول مئة', en: 'First 100', fr: 'Premier 100' },
            description: { ar: 'أكمل 100 تسبيحة', en: 'Complete 100 tasbih', fr: 'Compléter 100 tasbih' },
            icon: 'fas fa-star',
            target: 100
        },
        {
            id: 'first_1000',
            name: { ar: 'أول ألف', en: 'First 1000', fr: 'Premier 1000' },
            description: { ar: 'أكمل 1000 تسبيحة', en: 'Complete 1000 tasbih', fr: 'Compléter 1000 tasbih' },
            icon: 'fas fa-trophy',
            target: 1000
        },
        {
            id: 'week_streak',
            name: { ar: 'أسبوع متواصل', en: 'Week Streak', fr: 'Série d\'une semaine' },
            description: { ar: '7 أيام متتالية', en: '7 consecutive days', fr: '7 jours consécutifs' },
            icon: 'fas fa-fire',
            target: 7
        },
        {
            id: 'month_10000',
            name: { ar: 'شهر متميز', en: 'Excellent Month', fr: 'Mois excellent' },
            description: { ar: 'أكمل 10000 تسبيحة في الشهر', en: 'Complete 10000 tasbih in a month', fr: 'Compléter 10000 tasbih en un mois' },
            icon: 'fas fa-medal',
            target: 10000
        },
        {
            id: 'protocol_master',
            name: { ar: 'خبير البروتوكولات', en: 'Protocol Master', fr: 'Maître des protocoles' },
            description: { ar: 'أكمل جميع البروتوكولات', en: 'Complete all protocols', fr: 'Compléter tous les protocoles' },
            icon: 'fas fa-crown',
            target: 5 // Number of protocols
        }
    ];
}

function calculateAchievementProgress(achievement) {
    if (achievement.id === 'first_100' || achievement.id === 'first_1000') {
        return Math.min((appState.counter / achievement.target) * 100, 100);
    }
    if (achievement.id === 'week_streak') {
        return Math.min((calculateStreak() / achievement.target) * 100, 100);
    }
    return 0;
}

function checkAchievements() {
    const allAchievements = getAchievementsList();
    
    allAchievements.forEach(achievement => {
        if (appState.achievements.includes(achievement.id)) return;
        
        const progress = calculateAchievementProgress(achievement);
        if (progress >= 100) {
            appState.achievements.push(achievement.id);
            saveAppState();
            showAchievementUnlocked(achievement);
        }
    });
}

function showAchievementUnlocked(achievement) {
    const lang = window.tasbiahI18n?.getCurrentLanguage() || 'ar';
    alert(`🎉 ${achievement.name[lang] || achievement.name.ar}`);
}

// Data export/delete
function exportData() {
    const data = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        currentDate: appState.currentDate,
        counter: appState.counter,
        target: appState.target,
        statistics: appState.statistics,
        goals: appState.goals,
        achievements: appState.achievements,
        favorites: appState.favorites,
        protocolProgress: appState.protocolProgress,
        settings: appState.settings
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tasbiah-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    const lang = window.tasbiahI18n?.getCurrentLanguage() || 'ar';
    alert(window.tasbiahI18n?.t('data-exported', lang) || 'تم تصدير البيانات بنجاح');
}

function deleteData() {
    const lang = window.tasbiahI18n?.getCurrentLanguage() || 'ar';
    const confirmMsg = window.tasbiahI18n?.t('confirm-delete', lang) || 'هل أنت متأكد من حذف جميع البيانات؟';
    
    if (confirm(confirmMsg)) {
        // Clear all localStorage items related to tasbiah
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('tasbiah-')) {
                localStorage.removeItem(key);
            }
        });
        
        // Reset app state
        appState.counter = 0;
        appState.target = 0;
        appState.statistics = {};
        appState.goals = [];
        appState.achievements = [];
        appState.favorites = [];
        appState.protocolProgress = {};
        appState.currentProtocol = null;
        appState.currentProtocolIndex = 0;
        
        updateDisplay();
        loadTabContent('counter');
        
        // Reload all tabs
        if (document.getElementById('dhikrTab')?.classList.contains('active')) {
            loadDhikrList();
        }
        if (document.getElementById('protocolsTab')?.classList.contains('active')) {
            loadProtocolsList();
        }
        if (document.getElementById('statisticsTab')?.classList.contains('active')) {
            loadStatistics();
        }
        if (document.getElementById('goalsTab')?.classList.contains('active')) {
            loadGoals();
        }
        if (document.getElementById('achievementsTab')?.classList.contains('active')) {
            loadAchievements();
        }
        
        alert(window.tasbiahI18n?.t('data-deleted', lang) || 'تم حذف جميع البيانات');
    }
}

// View dhikr detail
window.viewDhikrDetail = function(dhikrId) {
    const lang = window.tasbiahI18n?.getCurrentLanguage() || 'ar';
    const dhikrData = window.dhikrData?.getDhikrText(dhikrId, lang);
    
    if (!dhikrData) return;
    
    const modal = document.getElementById('dhikrDetailModal');
    const title = document.getElementById('dhikrDetailTitle');
    const text = document.getElementById('dhikrDetailText');
    const benefit = document.getElementById('dhikrDetailBenefit');
    const translation = document.getElementById('dhikrDetailTranslation');
    const addToFavoritesBtn = document.getElementById('addToFavoritesBtn');
    const startDhikrBtn = document.getElementById('startDhikrBtn');
    
    if (title) title.textContent = dhikrData.name;
    if (text) {
        text.textContent = dhikrData.text;
        text.style.fontSize = '1.1rem';
        text.style.lineHeight = '1.8';
        text.style.textAlign = lang === 'ar' ? 'right' : 'left';
    }
    if (benefit) {
        benefit.textContent = dhikrData.benefit || '';
        benefit.style.fontSize = '0.95rem';
        benefit.style.color = 'var(--theme-text-secondary)';
        benefit.style.marginTop = '1rem';
    }
    
    // Show translation if available and language is not Arabic
    if (translation && lang !== 'ar' && dhikrData.translation) {
        translation.style.display = 'block';
        translation.innerHTML = `
            <strong style="display: block; margin-bottom: 0.5rem;">Translation:</strong>
            <div style="line-height: 1.6;">${dhikrData.translation}</div>
        `;
    } else if (translation) {
        translation.style.display = 'none';
    }
    
    // Update favorite button
    if (addToFavoritesBtn) {
        const isFavorite = appState.favorites.includes(dhikrId);
        addToFavoritesBtn.innerHTML = `<i class="fas fa-${isFavorite ? 'heart' : 'heart-o'}"></i> ${isFavorite ? (window.tasbiahI18n?.t('remove-favorite', lang) || 'إزالة من المفضلة') : (window.tasbiahI18n?.t('add-favorite', lang) || 'إضافة للمفضلة')}`;
        addToFavoritesBtn.onclick = () => {
            toggleFavorite(dhikrId);
            window.viewDhikrDetail(dhikrId); // Refresh modal
        };
    }
    
    // Update start dhikr button
    if (startDhikrBtn) {
        startDhikrBtn.onclick = () => {
            // Switch to counter and set this dhikr as target
            switchTab('counter');
            appState.target = 33; // Default count
            const targetInput = document.getElementById('targetInput');
            if (targetInput) targetInput.value = 33;
            saveAppState();
            updateDisplay();
            if (modal) modal.classList.remove('active');
        };
    }
    
    if (modal) modal.classList.add('active');
};

// Start protocol
window.startProtocol = function(protocolId) {
    const protocol = window.dhikrData?.getProtocol(protocolId);
    if (!protocol) return;
    
    // Check if protocol is already completed and ask for restart
    const progress = appState.protocolProgress[protocolId] || {};
    const total = protocol.dhikrs.reduce((sum, d) => sum + d.count, 0);
    const completed = Object.values(progress).reduce((sum, count) => sum + (count || 0), 0);
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    if (percentage >= 100) {
        const lang = window.tasbiahI18n?.getCurrentLanguage() || 'ar';
        if (!confirm(window.tasbiahI18n?.t('restart-protocol-confirm', lang) || 'هذا البروتوكول مكتمل. هل تريد إعادة البدء؟')) {
            return;
        }
        // Reset progress
        appState.protocolProgress[protocolId] = {};
    }
    
    // Store current protocol
    appState.currentProtocol = protocolId;
    appState.currentProtocolIndex = 0;
    
    // Initialize progress if not exists
    if (!appState.protocolProgress[protocolId]) {
        appState.protocolProgress[protocolId] = {};
    }
    
    // Reset counter
    appState.counter = 0;
    
    // Switch to counter tab
    switchTab('counter');
    
    // Show protocol info
    const lang = window.tasbiahI18n?.getCurrentLanguage() || 'ar';
    const currentDhikr = protocol.dhikrs[0];
    const dhikrData = window.dhikrData?.getDhikrText(currentDhikr.id, lang);
    
    if (dhikrData) {
        // Update counter display to show current dhikr
        const counterLabel = document.querySelector('.counter-label');
        if (counterLabel) {
            counterLabel.textContent = `${dhikrData.name} (${appState.currentProtocolIndex + 1}/${protocol.dhikrs.length})`;
        }
        
        // Set target to current dhikr count
        appState.target = currentDhikr.count;
        const targetInput = document.getElementById('targetInput');
        if (targetInput) {
            targetInput.value = currentDhikr.count;
        }
    }
    
    updateDisplay();
    saveAppState();
};

// Toggle favorite
window.toggleFavorite = function(dhikrId) {
    const index = appState.favorites.indexOf(dhikrId);
    if (index > -1) {
        appState.favorites.splice(index, 1);
    } else {
        appState.favorites.push(dhikrId);
    }
    saveAppState();
    loadDhikrList();
};

// Close dhikr detail
const closeDhikrDetailBtn = document.getElementById('closeDhikrDetailBtn');
if (closeDhikrDetailBtn) {
    closeDhikrDetailBtn.addEventListener('click', () => {
        const modal = document.getElementById('dhikrDetailModal');
        if (modal) modal.classList.remove('active');
    });
}

// Goal tabs
document.querySelectorAll('.goal-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.goal-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        loadGoals();
    });
});

// Search and filter
const dhikrSearch = document.getElementById('dhikrSearch');
const dhikrFilter = document.getElementById('dhikrFilter');

if (dhikrSearch) {
    dhikrSearch.addEventListener('input', filterDhikrList);
}

if (dhikrFilter) {
    dhikrFilter.addEventListener('change', filterDhikrList);
}

function filterDhikrList() {
    loadDhikrList();
}

// Handle date change (new day)
function checkDateChange() {
    const today = new Date().toISOString().split('T')[0];
    if (today !== appState.currentDate) {
        // New day - reset counter but keep statistics
        appState.currentDate = today;
        appState.counter = 0;
        appState.currentProtocol = null;
        appState.currentProtocolIndex = 0;
        saveAppState();
        updateDisplay();
    }
}

// Check date change every minute
setInterval(checkDateChange, 60000);

// Initialize date check on load
checkDateChange();

// Update counter when in protocol mode
function updateProtocolProgress() {
    if (!appState.currentProtocol) return;
    
    const protocol = window.dhikrData?.getProtocol(appState.currentProtocol);
    if (!protocol) return;
    
    const currentDhikr = protocol.dhikrs[appState.currentProtocolIndex];
    if (!currentDhikr) return;
    
    const progress = appState.protocolProgress[appState.currentProtocol] || {};
    progress[currentDhikr.id] = appState.counter;
    appState.protocolProgress[appState.currentProtocol] = progress;
    
    // Check if current dhikr is completed
    if (appState.counter >= currentDhikr.count) {
        // Move to next dhikr
        appState.currentProtocolIndex++;
        
        if (appState.currentProtocolIndex >= protocol.dhikrs.length) {
            // Protocol completed
            const lang = window.tasbiahI18n?.getCurrentLanguage() || 'ar';
            alert(window.tasbiahI18n?.t('protocol-completed', lang) || 'تهانينا! لقد أكملت البروتوكول');
            appState.currentProtocol = null;
            appState.currentProtocolIndex = 0;
            appState.counter = 0;
            updateCounterDisplay();
            loadProtocolsList();
            return;
        }
        
        // Update display for next dhikr
        const nextDhikr = protocol.dhikrs[appState.currentProtocolIndex];
        const lang = window.tasbiahI18n?.getCurrentLanguage() || 'ar';
        const dhikrData = window.dhikrData?.getDhikrText(nextDhikr.id, lang);
        
        const counterLabel = document.querySelector('.counter-label');
        if (counterLabel && dhikrData) {
            counterLabel.textContent = `${dhikrData.name} (${appState.currentProtocolIndex + 1}/${protocol.dhikrs.length})`;
        }
        
        // Reset counter for next dhikr
        appState.counter = 0;
    }
    
    saveAppState();
    if (document.getElementById('protocolsTab')?.classList.contains('active')) {
        loadProtocolsList();
    }
}
