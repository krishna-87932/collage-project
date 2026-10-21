// ==========================================
// ATSS CONNECT - Main Script (index.js)
// Beginner-friendly JavaScript for College Project
// ==========================================

// Default accounts
const DEFAULT_USERS = [
  {
    username: "admin",
    password: "123123",
    role: "admin",
    name: "ATSS College Admin",
    roll: "STAFF-01",
    course: "Administration & Faculty",
    email: "admin@atss.edu.in"
  },
  {
    username: "krishna",
    password: "password",
    role: "student",
    name: "Krishna Suryawanshi",
    roll: "55",
    course: "B.Com. (Computer Applications)",
    email: "krishna.suryawanshi@atss.edu.in"
  }
];

// Ensure users exist in localStorage
function ensureDefaultUsers() {
  if (!localStorage.getItem("atss_users")) {
    localStorage.setItem("atss_users", JSON.stringify(DEFAULT_USERS));
  }
  // If no user is logged in, default to student Krishna
  if (!localStorage.getItem("atss_current_user")) {
    localStorage.setItem("atss_current_user", JSON.stringify(DEFAULT_USERS[1]));
  }
}

// Get currently logged-in user
function getCurrentUser() {
  ensureDefaultUsers();
  try {
    return JSON.parse(localStorage.getItem("atss_current_user")) || DEFAULT_USERS[1];
  } catch (e) {
    return DEFAULT_USERS[1];
  }
}

// Check if current user is admin
function isAdmin() {
  const user = getCurrentUser();
  return user && user.role === "admin";
}

// Logout function
function logout() {
  if (confirm("Are you sure you want to log out of the portal?")) {
    localStorage.removeItem("atss_current_user");
    alert("You have been logged out. Redirecting to login page...");
    window.location.href = "./login.html";
  }
}

// Sidebar Auth Navigation handler
function handleAuthNav() {
  const user = getCurrentUser();
  if (user && user.role === "admin") {
    logout();
  } else {
    window.location.href = "./login.html";
  }
}

// Function to update sidebar across all pages based on current user
function updateSidebarUser() {
  const user = getCurrentUser();
  if (!user) return;

  const avatarEl = document.getElementById("sidebar-avatar");
  const nameEl = document.getElementById("sidebar-user-name");
  const roleEl = document.getElementById("sidebar-user-role");
  const authLinkEl = document.getElementById("sidebar-auth-link");

  if (avatarEl) {
    if (user.role === "admin") {
      avatarEl.textContent = "AD";
      avatarEl.style.background = "#d8ff4f";
      avatarEl.style.color = "#101216";
      avatarEl.style.border = "2px solid #101216";
    } else {
      // Initials from student name
      const initials = user.name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase() || "KS";
      avatarEl.textContent = initials;
      avatarEl.style.background = "#e5e7eb";
      avatarEl.style.color = "#25272b";
      avatarEl.style.border = "none";
    }
  }

  if (nameEl) {
    nameEl.textContent = user.name;
  }

  if (roleEl) {
    if (user.role === "admin") {
      roleEl.textContent = "Administrator";
      roleEl.style.color = "#d8ff4f";
      roleEl.style.fontWeight = "bold";
    } else {
      roleEl.textContent = `Student • Roll ${user.roll || "55"}`;
      roleEl.style.color = "#777c87";
      roleEl.style.fontWeight = "normal";
    }
  }

  if (authLinkEl) {
    if (user.role === "admin") {
      authLinkEl.innerHTML = `<span>🚪</span> Logout Admin`;
    } else {
      authLinkEl.innerHTML = `<span>🔑</span> Switch to Admin`;
    }
  }

  // Update Settings modal user preview if present
  const setUserName = document.getElementById("settings-user-display");
  const setUserRole = document.getElementById("settings-role-display");
  if (setUserName) setUserName.textContent = `${user.name} (${user.username})`;
  if (setUserRole) setUserRole.textContent = user.role === "admin" ? "Administrator" : (user.course || "Student");
}

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

  localStorage.setItem("atss_settings", JSON.stringify(settings));
  alert("Preferences saved successfully!");
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
  ensureDefaultUsers();
  updateSidebarUser();

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
