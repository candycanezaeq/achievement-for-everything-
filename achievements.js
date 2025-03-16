export const achievements = [
  // Original achievements
  { id: "move-mouse", title: "Mouse Mover", description: "Move your mouse for the first time." },
  { id: "left-click", title: "Left Clicker", description: "Perform a left click." },
  { id: "right-click", title: "Right Clicker", description: "Perform a right click." },
  { id: "scroll", title: "Scroller", description: "Scroll the page for the first time." },
  { id: "key-press", title: "Key Presser", description: "Press any key on the keyboard." },
  { id: "close-tab", title: "Tab Closer", description: "Close the tab (or try to)." },
  { id: "visit-chrome", title: "Chrome User", description: "Visit the game on Google Chrome." },
  { id: "visit-firefox", title: "Firefox User", description: "Visit the game on Mozilla Firefox." },
  { id: "visit-safari", title: "Safari User", description: "Visit the game on Safari." },
  { id: "visit-edge", title: "Edge User", description: "Visit the game on Microsoft Edge." },
  { id: "visit-mobile", title: "Mobile User", description: "Visit the game on a mobile device." },
  { id: "visit-windows", title: "Windows User", description: "Visit the game on Windows OS." },
  { id: "visit-macos", title: "macOS User", description: "Visit the game on macOS." },
  { id: "visit-linux", title: "Linux User", description: "Visit the game on Linux OS." },
  { id: "mouse-out-in", title: "Tab Hopper", description: "Move your mouse out of the tab and back in." },
  { id: "incognito", title: "Incognito Player", description: "Play in Incognito mode." },
  
  // New achievements
  { id: "rapid-clicks", title: "Speed Clicker", description: "Click 5 times in 2 seconds." },
  { id: "achievement-hunter", title: "Achievement Hunter", description: "Unlock 5 achievements." },
  { id: "master-achiever", title: "Master Achiever", description: "Unlock 10 achievements." },
  { id: "legend", title: "Legend", description: "Unlock 20 achievements." },
  { id: "night-owl", title: "Night Owl", description: "Play between midnight and 4 AM." },
  { id: "early-bird", title: "Early Bird", description: "Play between 5 AM and 8 AM." },
  { id: "weekend-warrior", title: "Weekend Warrior", description: "Play on a weekend." },
  { id: "stay-awhile", title: "Stay Awhile", description: "Keep the page open for 5 minutes." },
  { id: "resize-master", title: "Resize Master", description: "Resize your browser window." },
  { id: "copy-paste", title: "Copy Cat", description: "Try to copy or paste something." },
  { id: "select-text", title: "Text Selector", description: "Select some text on the page." },
  { id: "zen-master", title: "Zen Master", description: "Don't move your mouse for 30 seconds." },
  
  // Social Media Sharing
  { id: "share-twitter", title: "Twitter Share", description: "Share on Twitter/X" },
  { id: "share-facebook", title: "Facebook Share", description: "Share on Facebook" },
  { id: "share-linkedin", title: "LinkedIn Share", description: "Share on LinkedIn" },
  
  // Time-based
  { id: "lunch-break", title: "Lunch Break", description: "Play during lunch (12 PM - 2 PM)" },
  { id: "midnight-player", title: "Midnight Player", description: "Play exactly at midnight" },
  { id: "holiday-spirit", title: "Holiday Spirit", description: "Play on a major holiday" },
  
  // Browser Features
  { id: "fullscreen", title: "Cinema Mode", description: "Enter fullscreen mode" },
  { id: "dark-mode", title: "Dark Side", description: "Use dark mode" },
  { id: "light-mode", title: "Light Side", description: "Use light mode" },
  { id: "bookmark", title: "Bookmarked", description: "Bookmark the page" },
  
  // Special Interactions
  { id: "konami", title: "Konami Master", description: "Enter the Konami code" },
  { id: "emoji-master", title: "Emoji Master", description: "Type an emoji" },
  { id: "drag-drop", title: "Drag Master", description: "Drag and drop something" },
  { id: "double-tap", title: "Double Tap", description: "Double tap on mobile" },
  { id: "pinch-zoom", title: "Pinch Master", description: "Pinch to zoom on mobile" },
  
  // Advanced
  { id: "tab-hoarder", title: "Tab Hoarder", description: "Open in 5+ tabs simultaneously" },
  { id: "speed-demon", title: "Speed Demon", description: "Complete 10 achievements in 1 minute" },
  { id: "completionist", title: "Completionist", description: "Unlock 50 achievements" },
  { id: "dedication", title: "Dedication", description: "Visit 5 days in a row" },
  
  // Keep existing key achievements at the end
  ...Array.from("qwertyuiopasdfghjklzxcvbnm1234567890-/:;()$&@\".,?!'[]{}#%^*+=_\\|~<>€£¥・").map(key => ({
    id: `key-${key}`, title: `Key Master: ${key}`, description: `Press the "${key}" key.`
  }))
];