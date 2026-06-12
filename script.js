// ============================================
// STICKY NAVBAR
// ============================================
const header = document.getElementById('navbar');
if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// ============================================
// MOBILE HAMBURGER MENU
// ============================================
const hamburger = document.getElementById('nav-hamburger');
const mobileMenu = document.getElementById('nav-mobile-menu');
const mobileClose = document.getElementById('nav-mobile-close');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    const closeMobileMenu = () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    };

    if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) closeMobileMenu();
    });
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => revealObserver.observe(el));

window.addEventListener('load', () => {
    reveals.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 40) {
            el.classList.add('active');
        }
    });
});

// ============================================
// ZEN MODE (THEME) TOGGLE
// ============================================
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

if (themeToggle) {
    const saved = localStorage.getItem('soulmi-theme');
    if (saved) html.setAttribute('data-theme', saved);

    themeToggle.addEventListener('click', () => {
        const next = html.getAttribute('data-theme') === 'zen' ? 'light' : 'zen';
        html.setAttribute('data-theme', next);
        localStorage.setItem('soulmi-theme', next);
    });
}

// ============================================
// MOOD SLIDER
// ============================================
const moodSlider = document.getElementById('mood-slider');
if (moodSlider) {
    moodSlider.addEventListener('input', (e) => {
        const val = Number(e.target.value);
        const label = moodSlider.closest('.mood-widget')?.querySelector('label');
        if (!label) return;
        if (val < 35) label.textContent = 'How is your mind feeling right now? — Quite anxious';
        else if (val < 65) label.textContent = 'How is your mind feeling right now? — Getting there';
        else label.textContent = 'How is your mind feeling right now? — Feeling calm';
    });
}

// ============================================
// BREATHING MODAL
// ============================================
const breatheBtn = document.getElementById('open-breathe');
const breatheModal = document.getElementById('breathing-modal');
const closeBreathe = document.getElementById('close-breathe');
const breatheText = document.getElementById('breathe-text');
const breatheCircle = document.querySelector('.breathe-circle');
let breatheInterval = null;

if (breatheBtn && breatheModal) {
    breatheBtn.addEventListener('click', () => {
        breatheModal.classList.add('active');
        breatheText.textContent = 'Breathe In…';
        breatheCircle.style.transform = 'scale(2)';

        breatheInterval = setInterval(() => {
            if (breatheText.textContent.startsWith('Breathe In')) {
                breatheText.textContent = 'Breathe Out…';
                breatheCircle.style.transform = 'scale(1)';
            } else {
                breatheText.textContent = 'Breathe In…';
                breatheCircle.style.transform = 'scale(2)';
            }
        }, 4000);
    });

    const stopBreathing = () => {
        breatheModal.classList.remove('active');
        clearInterval(breatheInterval);
        breatheInterval = null;
        setTimeout(() => {
            breatheText.textContent = 'Ready?';
            breatheCircle.style.transform = 'scale(1)';
        }, 350);
    };

    if (closeBreathe) closeBreathe.addEventListener('click', stopBreathing);
    breatheModal.addEventListener('click', (e) => {
        if (e.target === breatheModal) stopBreathing();
    });
}

// ============================================
// DAILY AFFIRMATIONS
// ============================================
const affBtn = document.getElementById('new-affirmation');
const affText = document.getElementById('affirmation-text');
const affirmations = [
    'You are enough, exactly as you are.',
    'Every storm runs out of rain.',
    "It's okay to rest and reset.",
    'Your feelings are completely valid.',
    'Progress, not perfection.',
    'You are stronger than you think.',
    'Breathe. You\'ve got this.',
    'Healing is not linear — and that\'s okay.',
    'You deserve the same kindness you give others.',
    'One moment at a time is enough.',
];

if (affBtn && affText) {
    let current = affText.textContent.replace(/['"]/g, '').trim();

    affBtn.addEventListener('click', () => {
        affText.style.opacity = '0';
        setTimeout(() => {
            let next;
            do {
                next = affirmations[Math.floor(Math.random() * affirmations.length)];
            } while (next === current);
            current = next;
            affText.textContent = `"${next}"`;
            affText.style.opacity = '1';
        }, 400);
    });
}

// ============================================
// AI CHAT WIDGET
// ============================================
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');
const sendBtn = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input-field');
const chatBody = document.getElementById('chat-body');

const aiResponses = [
    "I hear you. Take a deep breath — I'm right here with you.",
    "It's completely okay to feel that way. You are in a safe space.",
    "That sounds difficult. Would you like to try a quick grounding exercise?",
    "Thank you for sharing that with me. I'm listening, fully.",
    "You don't have to figure everything out right now. One breath at a time.",
    "Your feelings make sense. You're not too much.",
    "I'm glad you reached out. That took courage.",
];

if (chatToggle && chatWindow) {
    chatToggle.addEventListener('click', () => chatWindow.classList.toggle('active'));
    if (closeChat) closeChat.addEventListener('click', () => chatWindow.classList.remove('active'));

    const sendMessage = () => {
        const text = chatInput.value.trim();
        if (!text) return;

        const userMsg = document.createElement('div');
        userMsg.classList.add('message', 'user-msg');
        userMsg.textContent = text;
        chatBody.appendChild(userMsg);
        chatInput.value = '';
        chatBody.scrollTop = chatBody.scrollHeight;

        const typing = document.createElement('div');
        typing.classList.add('typing-indicator');
        typing.textContent = 'SoulMi AI is typing…';
        chatBody.appendChild(typing);
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {
            chatBody.removeChild(typing);
            const aiMsg = document.createElement('div');
            aiMsg.classList.add('message', 'ai-msg');
            aiMsg.textContent = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            chatBody.appendChild(aiMsg);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 1400);
    };

    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
}

// ============================================
// THERAPIST DIRECTORY FILTERING
// ============================================
const gridContainer = document.getElementById('therapists-grid');

if (gridContainer) {
    const therapistsData = [
        {
            name: 'Mrs. Soujanya Yanamandra',
            spec: ['child', 'anxiety', 'relationships'],
            specLabel: 'Child & Adolescent Mental Health',
            location: 'hyderabad',
            locationLabel: 'Hyderabad & Remote',
            lang: ['english', 'telugu', 'hindi'],
            img: 'images/therapist 1.jpg',
            desc: 'Compassionate professional focusing on emotional balance, understanding, and long-term wellbeing for children and adolescents.',
        },
        {
            name: 'Mrs. Srinidhi Veldanda',
            spec: ['trauma', 'anxiety'],
            specLabel: 'Emotional Trauma Healing',
            location: 'remote',
            locationLabel: 'Remote (Online)',
            lang: ['english', 'hindi', 'telugu', 'kannada', 'tamil'],
            img: 'images/therapist 2.png',
            desc: 'Psychosomatic practitioner supporting individuals through emotional trauma and deep inner rewiring for lasting change.',
        },
    ];

    const filterLoc = document.getElementById('filter-location');
    const filterSpec = document.getElementById('filter-spec');
    const filterLang = document.getElementById('filter-lang');
    const resetBtn = document.getElementById('reset-filters');

    const renderTherapists = (data) => {
        gridContainer.innerHTML = '';

        if (!data.length) {
            gridContainer.innerHTML = '<p style="color:var(--text-muted); text-align:center; grid-column:1/-1; padding:60px 0;">No therapists match your filters. Try adjusting your criteria.</p>';
            return;
        }

        data.forEach(t => {
            const card = document.createElement('div');
            card.classList.add('therapist-card-large');
            const langs = t.lang.map(l => l.charAt(0).toUpperCase() + l.slice(1)).join(' · ');
            card.innerHTML = `
                <div class="t-image-large" style="background-image:url('${t.img}')"></div>
                <h3>${t.name}</h3>
                <span class="t-spec">${t.specLabel}</span>
                <p style="font-size:0.9rem;color:var(--text-muted);margin-bottom:18px;line-height:1.6;">${t.desc}</p>
                <div class="t-details">
                    <span class="t-tag">📍 ${t.locationLabel}</span>
                    <span class="t-tag">🗣️ ${langs}</span>
                </div>
                <button class="btn btn-primary" style="width:100%;" onclick="window.location='register.html'">Book a Session</button>
            `;
            gridContainer.appendChild(card);
        });
    };

    const applyFilters = () => {
        const loc = filterLoc?.value || 'all';
        const spec = filterSpec?.value || 'all';
        const lang = filterLang?.value || 'all';

        const filtered = therapistsData.filter(t =>
            (loc === 'all' || t.location === loc) &&
            (spec === 'all' || t.spec.includes(spec)) &&
            (lang === 'all' || t.lang.includes(lang))
        );
        renderTherapists(filtered);
    };

    filterLoc?.addEventListener('change', applyFilters);
    filterSpec?.addEventListener('change', applyFilters);
    filterLang?.addEventListener('change', applyFilters);
    resetBtn?.addEventListener('click', () => {
        if (filterLoc) filterLoc.value = 'all';
        if (filterSpec) filterSpec.value = 'all';
        if (filterLang) filterLang.value = 'all';
        applyFilters();
    });

    renderTherapists(therapistsData);
}

// ============================================
// AUTH TABS (register page)
// ============================================
const authTabs = document.querySelectorAll('.auth-tab');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const authSwitchText = document.getElementById('auth-switch-text');
const authSwitchLink = document.getElementById('auth-switch-link');

if (authTabs.length && registerForm && loginForm) {
    const switchToTab = (tab) => {
        authTabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
        if (tab === 'register') {
            registerForm.style.display = 'flex';
            loginForm.style.display = 'none';
            if (authSwitchText) authSwitchText.innerHTML = 'Already have an account? <a href="#" id="auth-switch-link">Sign in here</a>';
        } else {
            registerForm.style.display = 'none';
            loginForm.style.display = 'flex';
            if (authSwitchText) authSwitchText.innerHTML = "Don't have an account? <a href=\"#\" id=\"auth-switch-link\">Create one here</a>";
        }
        // Re-bind after innerHTML update
        document.getElementById('auth-switch-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            switchToTab(tab === 'register' ? 'login' : 'register');
        });
    };

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameVal = document.getElementById('reg-name')?.value.trim() || 'Priya';
        const emailVal = document.getElementById('reg-email')?.value.trim() || 'priya@example.com';
        localStorage.setItem('soulmi-user', JSON.stringify({ name: nameVal, email: emailVal }));
        window.location.href = 'dashboard.html';
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailVal = document.getElementById('login-email')?.value.trim() || 'priya@example.com';
        localStorage.setItem('soulmi-user', JSON.stringify({ name: 'Priya', email: emailVal }));
        window.location.href = 'dashboard.html';
    });

    authTabs.forEach(tab => {
        tab.addEventListener('click', () => switchToTab(tab.dataset.tab));
    });

    authSwitchLink?.addEventListener('click', (e) => {
        e.preventDefault();
        const active = document.querySelector('.auth-tab.active');
        switchToTab(active?.dataset.tab === 'register' ? 'login' : 'register');
    });
}

// ============================================
// COMMUNITY TABS (community page)
// ============================================
const communityTabs = document.querySelectorAll('.community-tab');

if (communityTabs.length) {
    communityTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            communityTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            document.querySelectorAll('.tab-panel').forEach(panel => {
                panel.style.display = 'none';
            });
            const target = document.getElementById(`tab-${tab.dataset.tab}`);
            if (target) target.style.display = 'block';
        });
    });
}

// ============================================
// RESOURCE FILTER CHIPS (resources page)
// ============================================
const filterChips = document.querySelectorAll('.filter-chip');
filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
    });
});
