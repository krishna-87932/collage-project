// ==========================================
// ATSS CONNECT - Main Script (index.js)
// Beginner-friendly JavaScript for College Project
// ==========================================

// Function to open / close Settings Modal
function toggleSettingsModal() {
  const modal = document.getElementById("settings-modal");
  if (!modal) return;

  if (modal.style.display === "none" || modal.style.display === "") {
    modal.style.display = "flex";
  } else {
    modal.style.display = "none";
  }
}

// Function to save user settings
function saveSettings() {
  const emailNotif = document.getElementById("set-notif");
  const soundNotif = document.getElementById("set-sound");

  const settings = {
    notifications: emailNotif ? emailNotif.checked : true,
    sound: soundNotif ? soundNotif.checked : false
  };

  // Save to browser storage
  localStorage.setItem("atss_settings", JSON.stringify(settings));

  alert("Settings saved successfully!");
  toggleSettingsModal();
}

// Close modal when clicking outside modal box
window.addEventListener("click", function(event) {
  const settingsModal = document.getElementById("settings-modal");
  if (event.target === settingsModal) {
    settingsModal.style.display = "none";
  }
});

// Run when DOM is ready
document.addEventListener("DOMContentLoaded", function() {
  // Load saved settings if any
  const savedSettings = localStorage.getItem("atss_settings");
  if (savedSettings) {
    try {
      const parsed = JSON.parse(savedSettings);
      const emailNotif = document.getElementById("set-notif");
      const soundNotif = document.getElementById("set-sound");
      if (emailNotif) emailNotif.checked = parsed.notifications;
      if (soundNotif) soundNotif.checked = parsed.sound;
    } catch (e) {
      console.log("Error loading settings", e);
    }
  }
});
