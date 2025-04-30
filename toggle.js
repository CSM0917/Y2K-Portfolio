const toggleBtn = document.getElementById("theme-toggle");
const myspaceMode = document.getElementById("myspace-mode");
const modernMode = document.getElementById("modern-mode");
const viewMoreBtn = document.getElementById("view-more-btn");
const hiddenProjects = document.querySelectorAll(".hidden-projects");
let isExpanded = false;
const hireBtn = document.getElementById("hire-btn");
const contactForm = document.getElementById("contact-form");
const player = document.getElementById("y2k-player");
const musicBtn = document.getElementById("music-toggle");
let isPlaying = false;

// Tamagotchi State
const pet = {
  hunger: 5,
  happiness: 5,
  cleanliness: 5,
  isAlive: true,
  evolution: 0,
  sprites: ["(ᵔᴥᵔ)", "≧◡≦", "(◕‿◕✿)", "(づ｡◕‿‿◕｡)づ"],
};
const petElement = document.getElementById("pet");
const hungerDisplay = document.getElementById("hunger");
const happyDisplay = document.getElementById("happy");

// Check for saved preference
const savedMode = localStorage.getItem("portfolioMode");
if (savedMode === "modern") {
  myspaceMode.style.display = "none";
  modernMode.style.display = "block";
  toggleBtn.textContent = "💖 TOGGLE Y2K MODE";
}

// Toggle Page Switch function
toggleBtn.addEventListener("click", () => {
  const isModern = modernMode.style.display === "block";

  myspaceMode.style.display = isModern ? "block" : "none";
  modernMode.style.display = isModern ? "none" : "block";
  toggleBtn.textContent = isModern
    ? "🌙 TOGGLE MODERN MODE"
    : "💖 TOGGLE Y2K MODE";

  localStorage.setItem("portfolioMode", isModern ? "myspace" : "modern");
});

// Random Quote Generator
const quotes = [
  "i make websites like it's 1999",
  "error 404: adulting not found",
  "brb saving the internet",
  "got my heart broken by CSS gradients",
  "professional glitter distributor",
];

document.getElementById("random-quote").textContent =
  '"' + quotes[Math.floor(Math.random() * quotes.length)] + '"';

// Toggle music on button click
musicBtn.addEventListener("click", () => {
  isPlaying = !isPlaying;
  isPlaying ? player.play() : player.pause();
  musicBtn.textContent = isPlaying
    ? "♫ HOLD UP, STOP THE BEAT ♫"
    : "♫ PUT IT BACK ON ♫";
});

// Autoplay with mute
player.volume = 0.5; // 50% volume
player.muted = false;
player.play().catch((e) => console.log("Auto-play blocked:", e));

// Show a "Click to Play" button if autoplay fails
player.play().catch(() => {
  toggleBtn.style.display = "block";
});

// Change Buttons on Fake Contact List
document.getElementById("add-friend").addEventListener("click", function () {
  this.textContent = this.textContent.includes("Added")
    ? "➕ Add Friend"
    : "✅ Added!";
});

document.getElementById("add-favorites").addEventListener("click", function () {
  this.textContent = this.textContent.includes("Favorited")
    ? "⭐ Add to Favorites"
    : "⭐ Favorited!";
});

document.getElementById("send-message").addEventListener("click", function () {
  this.textContent = this.textContent.includes("Sent")
    ? "🗨️ Send Message"
    : "🗨️ Message Sent!";
});

document.getElementById("block-user").addEventListener("click", function () {
  if (this.textContent.includes("Blocked")) {
    if (confirm("~*~ Unblock this baddie? ~*~")) {
      this.textContent = "🚫 Block User";
    }
  } else {
    this.textContent = "🚫 Blocked!";
  }
});

document.getElementById("forward").addEventListener("click", function () {
  this.textContent = this.textContent.includes("Forwarded")
    ? "💌 Forward to Friend"
    : "💋 Forwarded!";
});

document.getElementById("report-user").addEventListener("click", function () {
  if (this.textContent.includes("Report User")) {
    if (
      confirm("~*~ REPORT USER?!?! For What?!? ~*~ Ughh I Guess...😒rat...~*~")
    ) {
      this.textContent = "🚩 Reported!";
    }
  } else {
    this.textContent = "🚩 Report User";
  }
});

// Fake counter (random number between 500-9999)
document.getElementById("counter").textContent =
  Math.floor(Math.random() * 9500) + 500;

// Toggle View More Projects Button
viewMoreBtn.addEventListener("click", () => {
  isExpanded = !isExpanded; // Toggle state

  hiddenProjects.forEach((project) => {
    project.style.display = isExpanded ? "block" : "none";
  });

  viewMoreBtn.textContent = isExpanded
    ? "▲ VIEW FEWER PROJECTS ▲"
    : "▼ VIEW MY PROJECTS ▼";
});

// Toggle contact form when button is clicked

hireBtn.addEventListener("click", () => {
  const isVisible = contactForm.style.display === "block";
  contactForm.style.display = isVisible ? "none" : "block";
  hireBtn.textContent = isVisible
    ? "✧･ﾟ:* HIRE ME *:･ﾟ✧"
    : "✧･ﾟ:* CLOSE FORM *:･ﾟ✧";    
});

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("~*~ MESSAGE SENT! THX 4 THE LUV ~*~");
  contactForm.style.display = "none";
  hireBtn.textContent = "✧･ﾟ:* HIRE ME *:･ﾟ✧";
});

// Update Stats Display
function updateStats() {
  hungerDisplay.textContent =
    "●".repeat(pet.hunger) + "○".repeat(5 - pet.hunger);
  happyDisplay.textContent =
    "●".repeat(pet.happiness) + "○".repeat(5 - pet.happiness);

  // Change sprite based on mood
  if (pet.happiness >= 4) {
    petElement.textContent = pet.sprites[1];
    petElement.classList.add("happy");
  } else if (pet.hunger <= 2) {
    petElement.textContent = "(╥﹏╥)";
    petElement.classList.remove("happy");
  } else {
    petElement.textContent = pet.sprites[0];
    petElement.classList.remove("happy");
  }

  // Check if dead
  if ((pet.hunger <= 0 || pet.happiness <= 0) && pet.isAlive) {
    pet.isAlive = false;
    petElement.textContent = "(X_X)";
    petElement.classList.remove("happy");
    alert(
      "~*~ GAME OVER ~*~\nYour Tamagotchi has crossed the rainbow bridge.\nRefresh to restart."
    );
  }
}

// Button Actions
document.getElementById("feed").addEventListener("click", () => {
  if (pet.isAlive) {
    pet.hunger = Math.min(5, pet.hunger + 1);
    updateStats();
    petElement.textContent = "ᕙ(⇀‸↼‶)ᕗ";
    setTimeout(updateStats, 1000);
  }
});

document.getElementById("play").addEventListener("click", () => {
  if (pet.isAlive) {
    pet.happiness = Math.min(5, pet.happiness + 1);
    pet.hunger = Math.max(0, pet.hunger - 1);
    updateStats();
    petElement.classList.add("happy");
  }
});

document.getElementById("clean").addEventListener("click", () => {
  if (pet.isAlive) {
    petElement.textContent = "(◕‿◕✿)";
    setTimeout(updateStats, 1000);
  }
});

// Game Loop (Decay stats over time)
setInterval(() => {
  if (pet.isAlive) {
    pet.hunger = Math.max(0, pet.hunger - 1);
    pet.happiness = Math.max(0, pet.happiness - 1);
    updateStats();

    // Random events
    if (Math.random() > 0.9) {
      petElement.textContent = "(⊙_⊙)？";
      setTimeout(updateStats, 1500);
    }
  }
}, 15000); // Every 15 seconds

// Initialize
updateStats();
