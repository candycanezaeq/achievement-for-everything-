import { achievements } from './achievements.js';

let unlockedAchievements = new Set(JSON.parse(localStorage.getItem("unlockedAchievements") || "[]"));
const achievementsContainer = document.getElementById("achievements");
const achievementPopup = document.getElementById("achievement-popup");
const popupDescription = document.getElementById("popup-description");
const progressBar = document.getElementById("progress");
const achievementCountEl = document.getElementById("achievement-count");
const totalAchievementsEl = document.getElementById("total-achievements");

// Update statistics
function updateStats() {
  const count = unlockedAchievements.size;
  const total = achievements.length;
  achievementCountEl.textContent = count;
  totalAchievementsEl.textContent = total;
  progressBar.style.width = `${(count / total) * 100}%`;
}

// Show achievement popup
function showAchievementPopup(achievement) {
  popupDescription.textContent = `${achievement.title} - ${achievement.description}`;
  achievementPopup.classList.add("show");
  setTimeout(() => {
    achievementPopup.classList.remove("show");
  }, 3000);
}

// Render achievements
function renderAchievements() {
  achievementsContainer.innerHTML = "";
  achievements.forEach(achievement => {
    const achievementElement = document.createElement("div");
    achievementElement.className = `achievement ${unlockedAchievements.has(achievement.id) ? "unlocked" : ""}`;
    achievementElement.innerHTML = `
      <h3>${achievement.title}</h3>
      <p>${achievement.description}</p>
    `;
    achievementsContainer.appendChild(achievementElement);
  });
  updateStats();
}

// Unlock achievement
const originalUnlock = function(id) {
  if (!unlockedAchievements.has(id)) {
    const achievement = achievements.find(a => a.id === id);
    unlockedAchievements.add(id);
    localStorage.setItem("unlockedAchievements", JSON.stringify([...unlockedAchievements]));
    renderAchievements();
    showAchievementPopup(achievement);
    
    // Check meta achievements
    checkMetaAchievements();
  }
};

function unlockAchievement(id) {
  originalUnlock(id);
  trackAchievementSpeed();
}

// Check meta achievements
function checkMetaAchievements() {
  const count = unlockedAchievements.size;
  if (count >= 5) unlockAchievement("achievement-hunter");
  if (count >= 10) unlockAchievement("master-achiever");
  if (count >= 20) unlockAchievement("legend");
}

// Track time-based achievements
function checkTimeAchievements() {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay();
  
  if (hour >= 0 && hour < 4) unlockAchievement("night-owl");
  if (hour >= 5 && hour < 8) unlockAchievement("early-bird");
  if (day === 0 || day === 6) unlockAchievement("weekend-warrior");
  if (hour >= 12 && hour <= 14) unlockAchievement("lunch-break");
  if (hour === 0 && now.getMinutes() === 0) unlockAchievement("midnight-player");
  
  // Check for holidays
  const month = now.getMonth();
  const date = now.getDate();
  if ((month === 11 && date === 25) || // Christmas
      (month === 0 && date === 1) ||   // New Year
      (month === 10 && date === 31)) { // Halloween
    unlockAchievement("holiday-spirit");
  }
}

// Event listeners
let clicks = [];
let lastMouseMove = Date.now();
let zenTimeout;

// Mouse movement and zen achievement
document.addEventListener("mousemove", () => {
  unlockAchievement("move-mouse");
  clearTimeout(zenTimeout);
  const now = Date.now();
  if (now - lastMouseMove > 30000) {
    unlockAchievement("zen-master");
  }
  lastMouseMove = now;
  zenTimeout = setTimeout(() => unlockAchievement("zen-master"), 30000);
});

// Click tracking
document.addEventListener("click", (e) => {
  unlockAchievement("left-click");
  const now = Date.now();
  clicks = clicks.filter(time => now - time < 2000);
  clicks.push(now);
  if (clicks.length >= 5) unlockAchievement("rapid-clicks");
});

// Initialize other event listeners
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  unlockAchievement("right-click");
});

document.addEventListener("scroll", () => unlockAchievement("scroll"));
window.addEventListener("resize", () => unlockAchievement("resize-master"));
document.addEventListener("copy", () => unlockAchievement("copy-paste"));
document.addEventListener("paste", () => unlockAchievement("copy-paste"));
document.addEventListener("selectstart", () => unlockAchievement("select-text"));

// Konami code detection
let konamiSequence = [];
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
document.addEventListener('keydown', (e) => {
  konamiSequence.push(e.key);
  if (konamiSequence.length > konamiCode.length) {
    konamiSequence.shift();
  }
  if (JSON.stringify(konamiSequence) === JSON.stringify(konamiCode)) {
    unlockAchievement('konami');
  }
});

// Fullscreen detection
document.addEventListener('fullscreenchange', () => {
  if (document.fullscreenElement) {
    unlockAchievement('fullscreen');
  }
});

// Dark/Light mode detection
if (window.matchMedia) {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    unlockAchievement('dark-mode');
  } else {
    unlockAchievement('light-mode');
  }
}

// Mobile-specific achievements
if ('ontouchstart' in window) {
  let lastTap = 0;
  document.addEventListener('touchend', (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 500 && tapLength > 0) {
      unlockAchievement('double-tap');
    }
    lastTap = currentTime;
  });

  // Pinch detection
  let lastDist = 0;
  document.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      if (Math.abs(dist - lastDist) > 50) {
        unlockAchievement('pinch-zoom');
      }
      lastDist = dist;
    }
  });
}

// Emoji detection
document.addEventListener('input', (e) => {
  if (e.target.value && /\p{Emoji}/u.test(e.target.value)) {
    unlockAchievement('emoji-master');
  }
});

// Drag and drop
document.addEventListener('dragstart', () => unlockAchievement('drag-drop'));

// Tab count tracking
function checkTabCount() {
  const channel = new BroadcastChannel('achievement-tabs');
  channel.postMessage('ping');
  
  let tabCount = 1;
  channel.onmessage = () => {
    tabCount++;
    if (tabCount >= 5) {
      unlockAchievement('tab-hoarder');
    }
  };
}
checkTabCount();

// Speed achievement tracking
let achievementTimes = [];
function trackAchievementSpeed() {
  const now = Date.now();
  achievementTimes = achievementTimes.filter(time => now - time < 60000);
  achievementTimes.push(now);
  if (achievementTimes.length >= 10) {
    unlockAchievement('speed-demon');
  }
}

// Dedication tracking
function checkDedication() {
  const visits = JSON.parse(localStorage.getItem('visitDates') || '[]');
  const today = new Date().toDateString();
  
  if (!visits.includes(today)) {
    visits.push(today);
    localStorage.setItem('visitDates', JSON.stringify(visits));
    
    // Check for consecutive days
    if (visits.length >= 5) {
      const sorted = visits.sort();
      let consecutive = 1;
      for (let i = 1; i < sorted.length; i++) {
        const prev = new Date(sorted[i-1]);
        const curr = new Date(sorted[i]);
        if ((curr - prev) === 86400000) consecutive++;
        else consecutive = 1;
        
        if (consecutive >= 5) {
          unlockAchievement('dedication');
          break;
        }
      }
    }
  }
}
checkDedication();

// Initialize
renderAchievements();
checkTimeAchievements();
setInterval(checkTimeAchievements, 60000);

// Stay awhile achievement
setTimeout(() => unlockAchievement("stay-awhile"), 300000);

// Initialize existing detection logic
detectBrowserAndOS();
isIncognito().then(incognito => {
  if (incognito) unlockAchievement("incognito");
});