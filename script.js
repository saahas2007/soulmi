// --- Sticky Navbar ---
const header = document.getElementById('navbar');
if(header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });
}

// --- Scroll Reveal Animations ---
const reveals = document.querySelectorAll('.reveal');
const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

reveals.forEach(reveal => revealOnScroll.observe(reveal));
window.addEventListener('load', () => {
    reveals.forEach(reveal => {
        if (reveal.getBoundingClientRect().top < window.innerHeight - 50) {
            reveal.classList.add('active');
        }
    });
});

// --- Zen Mode Toggle ---
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

if(themeToggle) {
    themeToggle.addEventListener('click', () => {
        if (html.getAttribute('data-theme') === 'light') {
            html.setAttribute('data-theme', 'zen');
        } else {
            html.setAttribute('data-theme', 'light');
        }
    });
}

// --- Dynamic Mood Slider ---
const moodSlider = document.getElementById('mood-slider');
const rootStyles = document.documentElement.style;

if(moodSlider) {
    moodSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        if (val < 40) {
            rootStyles.setProperty('--soft-blue', '#64748b'); 
            rootStyles.setProperty('--mint', '#94a3b8');     
        } else if (val >= 40 && val < 70) {
            rootStyles.setProperty('--soft-blue', '#a3c4f3'); 
            rootStyles.setProperty('--mint', '#81e6d9');      
        } else {
            rootStyles.setProperty('--soft-blue', '#a3c4f3');
            rootStyles.setProperty('--mint', '#8ee4af');      
        }
    });
}

// --- Draggable Therapist Slider ---
const slider = document.getElementById('therapist-slider');
if(slider) {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; 
        slider.scrollLeft = scrollLeft - walk;
    });
}

// --- Interactive AI Chat Widget ---
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');
const sendBtn = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input-field');
const chatBody = document.getElementById('chat-body');

if(chatToggle) {
    chatToggle.addEventListener('click', () => chatWindow.classList.toggle('active'));
    closeChat.addEventListener('click', () => chatWindow.classList.remove('active'));

    function sendMessage() {
        const text = chatInput.value.trim();
        if (text === '') return;

        const userMsg = document.createElement('div');
        userMsg.classList.add('message', 'user-msg');
        userMsg.textContent = text;
        chatBody.appendChild(userMsg);
        chatInput.value = '';
        chatBody.scrollTop = chatBody.scrollHeight;

        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('typing-indicator');
        typingIndicator.textContent = 'SoulMi AI is typing...';
        chatBody.appendChild(typingIndicator);
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {
            chatBody.removeChild(typingIndicator);
            
            const aiResponses = [
                "I hear you. Take a deep breath, I'm right here with you.",
                "It's completely okay to feel that way. You are in a safe space.",
                "That sounds difficult. Would you like to try a quick grounding exercise?",
                "Thank you for sharing that with me. I'm listening."
            ];
            const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            
            const aiMsg = document.createElement('div');
            aiMsg.classList.add('message', 'ai-msg');
            aiMsg.textContent = randomResponse;
            chatBody.appendChild(aiMsg);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 1500);
    }

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

// --- NEW: Breathing Exercise Modal Logic ---
const breatheBtn = document.getElementById('open-breathe');
const breatheModal = document.getElementById('breathing-modal');
const closeBreathe = document.getElementById('close-breathe');
const breatheText = document.getElementById('breathe-text');
const breatheCircle = document.querySelector('.breathe-circle');
let breatheInterval;

if(breatheBtn) {
    breatheBtn.addEventListener('click', (e) => {
        e.preventDefault();
        breatheModal.classList.add('active');
        
        // Start sequence
        breatheText.innerText = "Breathe In...";
        breatheCircle.style.transform = "scale(2)";
        
        breatheInterval = setInterval(() => {
            if (breatheText.innerText === "Breathe In...") {
                breatheText.innerText = "Breathe Out...";
                breatheCircle.style.transform = "scale(1)";
            } else {
                breatheText.innerText = "Breathe In...";
                breatheCircle.style.transform = "scale(2)";
            }
        }, 4000); // 4 seconds in, 4 seconds out
    });

    closeBreathe.addEventListener('click', () => {
        breatheModal.classList.remove('active');
        clearInterval(breatheInterval);
        setTimeout(() => {
            breatheText.innerText = "Ready?";
            breatheCircle.style.transform = "scale(1)";
        }, 300);
    });
}

// --- NEW: Daily Affirmation Logic ---
const affBtn = document.getElementById('new-affirmation');
const affText = document.getElementById('affirmation-text');
const affirmations = [
    "You are enough just as you are.",
    "Every storm runs out of rain.",
    "It's okay to rest and reset.",
    "Your feelings are completely valid.",
    "Progress, not perfection.",
    "You are stronger than you think.",
    "Breathe. You've got this."
];

if(affBtn) {
    affBtn.addEventListener('click', () => {
        affText.style.opacity = 0; // Fade out
        
        setTimeout(() => {
            // Pick random affirmation that isn't the current one
            let newAff = affirmations[Math.floor(Math.random() * affirmations.length)];
            while(newAff === affText.innerText.replace(/"/g, '')) {
                newAff = affirmations[Math.floor(Math.random() * affirmations.length)];
            }
            
            affText.innerText = `"${newAff}"`;
            affText.style.opacity = 1; // Fade in
        }, 400); // Wait for fade out to complete
    });
}

// ==========================================
// --- NEW: DIRECTORY FILTERING LOGIC ---
// ==========================================
const gridContainer = document.getElementById('therapists-grid');

if (gridContainer) {
    const therapistsData = [
        {
            name: "Mrs. Soujanya Yanamandra",
            spec: ["child", "anxiety", "relationships"],
            specLabel: "Child & Adolescent Mental Health",
            location: "hyderabad",
            locationLabel: "Hyderabad & Remote",
            lang: ["english", "telugu", "hindi"],
            img: "images/therapist 1.jpg",
            desc: "Compassionate professional focusing on emotional balance, understanding, and long-term wellbeing."
        },
        {
            name: "Mrs. Srinidhi Veldanda",
            spec: ["trauma", "anxiety"],
            specLabel: "Emotional Trauma Healing",
            location: "remote",
            locationLabel: "Remote (Online)",
            lang: ["english", "hindi", "telugu", "kannada", "tamil"],
            img: "images/therapist 2.png",
            desc: "Psychosomatic practitioner supporting individuals through emotional trauma and deep inner rewiring."
        }
    ];

    const filterLoc = document.getElementById('filter-location');
    const filterSpec = document.getElementById('filter-spec');
    const filterLang = document.getElementById('filter-lang');
    const resetBtn = document.getElementById('reset-filters');

    function renderTherapists(data) {
        gridContainer.innerHTML = '';
        
        if (data.length === 0) {
            gridContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center; grid-column: 1/-1; padding: 40px;">No therapists match your exact criteria. Try adjusting your filters.</p>';
            return;
        }

        data.forEach(t => {
            const card = document.createElement('div');
            card.classList.add('therapist-card-large');
            
            const langString = t.lang.map(l => l.charAt(0).toUpperCase() + l.slice(1)).join(' • ');

            card.innerHTML = `
                <div class="t-image-large" style="background-image: url('${t.img}')"></div>
                <h3>${t.name}</h3>
                <div class="t-spec">${t.specLabel}</div>
                <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 20px; line-height: 1.5;">${t.desc}</p>
                <div class="t-details">
                    <span class="t-tag">📍 ${t.locationLabel}</span>
                    <span class="t-tag">🗣️ ${langString}</span>
                </div>
                <button class="btn-primary" style="width: 100%; padding: 10px; margin-top: 10px;">Book Session</button>
            `;
            gridContainer.appendChild(card);
        });
    }

    function applyFilters() {
        const valLoc = filterLoc.value;
        const valSpec = filterSpec.value;
        const valLang = filterLang.value;

        const filtered = therapistsData.filter(t => {
            const matchLoc = valLoc === 'all' || t.location === valLoc;
            // Notice we use .includes() because spec and lang are arrays now
            const matchSpec = valSpec === 'all' || t.spec.includes(valSpec);
            const matchLang = valLang === 'all' || t.lang.includes(valLang);
            
            return matchLoc && matchSpec && matchLang;
        });

        renderTherapists(filtered);
    }

    filterLoc.addEventListener('change', applyFilters);
    filterSpec.addEventListener('change', applyFilters);
    filterLang.addEventListener('change', applyFilters);

    resetBtn.addEventListener('click', () => {
        filterLoc.value = 'all';
        filterSpec.value = 'all';
        filterLang.value = 'all';
        applyFilters();
    });

    renderTherapists(therapistsData);
}