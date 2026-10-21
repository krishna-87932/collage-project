// ==========================================
// ATSS CONNECT - Notice Board Script (notice.js)
// Beginner-friendly JavaScript for College Project
// Only Admin is allowed to publish notices
// ==========================================

// Modal Elements
const modalOverlay = document.getElementById("note-modal-overlay");
const xcross = document.querySelector(".x-cross");

// Open Notice Modal (Restricted to Admin Only)
function createnote() {
  const currentUser = typeof getCurrentUser === "function" ? getCurrentUser() : null;

  // Check if user is logged in as Admin
  if (!currentUser || currentUser.role !== "admin") {
    alert("Permission Denied: Only college administrators can publish official notices.\n\nPlease log in as admin.\n(Demo Admin Credentials: admin / 123123)");
    if (confirm("Would you like to go to the Login page now to sign in as Admin?")) {
      window.location.href = "./login.html";
    }
    return;
  }

  // If Admin, pre-fill author name and open modal
  const authorInput = document.getElementById("note-author");
  if (authorInput) {
    authorInput.value = `${currentUser.name} (Administrator)`;
  }

  if (modalOverlay) {
    modalOverlay.style.display = "flex";
  }
}

// Close Notice Modal
function closenote() {
  if (modalOverlay) {
    modalOverlay.style.display = "none";
  }
}

// Close modal when clicking on the dark background
if (modalOverlay) {
  modalOverlay.addEventListener("click", function(event) {
    if (event.target === modalOverlay) {
      closenote();
    }
  });
}

// Function to Publish a New Notice (Admin Verification)
function publishNotice() {
  const currentUser = typeof getCurrentUser === "function" ? getCurrentUser() : null;

  // Strict Admin Validation
  if (!currentUser || currentUser.role !== "admin") {
    alert("Unauthorized Action: Only college administrators can publish notices.");
    closenote();
    return;
  }

  const headInput = document.getElementById("note-head");
  const contentInput = document.getElementById("note-content");
  const typeSelect = document.getElementById("note-type");
  const authorInput = document.getElementById("note-author");

  const heading = headInput ? headInput.value.trim() : "";
  const content = contentInput ? contentInput.value.trim() : "";
  const type = typeSelect ? typeSelect.value : "Academic";
  const author = authorInput && authorInput.value.trim() !== "" ? authorInput.value.trim() : `${currentUser.name} (Administrator)`;

  // Form Field Validation
  if (heading === "") {
    alert("Please enter a notice heading.");
    if (headInput) headInput.focus();
    return;
  }

  if (content === "") {
    alert("Please enter the notice content details.");
    if (contentInput) contentInput.focus();
    return;
  }

  // Format current date and time
  const now = new Date();
  const timeString = "Today • " + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Determine badge styling based on notice type
  let badgeClass = "";
  const typeLower = type.toLowerCase();
  if (typeLower === "important") badgeClass = "type-important";
  else if (typeLower === "event") badgeClass = "type-event";
  else if (typeLower === "exam") badgeClass = "type-exam";

  // Create new Notice HTML Element
  const noticeContainer = document.querySelector(".bottom");
  const newNotice = document.createElement("div");
  newNotice.className = "notice-bar";
  newNotice.setAttribute("data-type", type.toUpperCase());

  newNotice.innerHTML = `
    <div class="type ${badgeClass}">
      <span>${type.toUpperCase()}</span>
    </div>
    <div class="content">
      <span class="notice-title">${heading}</span>
      <p>${content}</p>
      <div class="notice-actions">
        <button class="like-btn" onclick="toggleLike(this)">
          ❤️ <span class="like-count">0</span>
        </button>
      </div>
    </div>
    <div class="timedate">
      <div class="time">${timeString}</div>
      <div class="posted-by">
        <span>Posted by</span>
        <p>${author}</p>
      </div>
    </div>
  `;

  // Prepend to top of notices list
  if (noticeContainer) {
    noticeContainer.prepend(newNotice);
  }

  // Clear inputs and close modal
  headInput.value = "";
  contentInput.value = "";
  closenote();

  alert("Official Notice published successfully by Administrator!");
}

// Function to handle like button clicks
function toggleLike(button) {
  const countSpan = button.querySelector(".like-count");
  let count = parseInt(countSpan.textContent, 10) || 0;

  if (button.classList.contains("liked")) {
    button.classList.remove("liked");
    count = Math.max(0, count - 1);
  } else {
    button.classList.add("liked");
    count += 1;
  }
  countSpan.textContent = count;
}

// Function to filter notices by category
function filterCategory(category) {
  const chips = document.querySelectorAll(".filter-chip");
  chips.forEach(chip => {
    chip.classList.remove("active");
    if (chip.textContent.trim().toUpperCase() === category) {
      chip.classList.add("active");
    }
  });

  const notices = document.querySelectorAll(".notice-bar");
  notices.forEach(notice => {
    const noticeType = notice.getAttribute("data-type");
    if (category === "ALL" || noticeType === category) {
      notice.style.display = "flex";
    } else {
      notice.style.display = "none";
    }
  });
}

// Function to search notices by text
function filterNotices() {
  const searchInput = document.getElementById("notice-search");
  if (!searchInput) return;

  const query = searchInput.value.toLowerCase().trim();
  const notices = document.querySelectorAll(".notice-bar");

  notices.forEach(notice => {
    const title = notice.querySelector(".notice-title") ? notice.querySelector(".notice-title").textContent.toLowerCase() : "";
    const text = notice.querySelector("p") ? notice.querySelector("p").textContent.toLowerCase() : "";
    const type = notice.getAttribute("data-type") ? notice.getAttribute("data-type").toLowerCase() : "";

    if (title.includes(query) || text.includes(query) || type.includes(query)) {
      notice.style.display = "flex";
    } else {
      notice.style.display = "none";
    }
  });
}

// Update Notice page UI based on Admin permissions
function updateNoticePermissionUI() {
  const currentUser = typeof getCurrentUser === "function" ? getCurrentUser() : null;
  const publishBtn = document.getElementById("publish-notice-btn");
  const bannerBox = document.getElementById("admin-status-banner");

  if (!currentUser) return;

  if (currentUser.role === "admin") {
    // User is ADMIN
    if (publishBtn) {
      publishBtn.innerHTML = `+ Publish Notice`;
      publishBtn.classList.remove("btn-locked");
      publishBtn.title = "Publish a new official college notice";
    }
    if (bannerBox) {
      bannerBox.className = "admin-status-banner banner-admin";
      bannerBox.innerHTML = `
        <span>👑 <strong>Administrator Access:</strong> You are logged in as <strong>${currentUser.name}</strong>. Notice publishing permissions are active.</span>
        <button class="banner-switch-link" onclick="logout()">Sign Out</button>
      `;
    }
  } else {
    // User is STUDENT
    if (publishBtn) {
      publishBtn.innerHTML = `🔒 Publish Notice (Admin Only)`;
      publishBtn.classList.add("btn-locked");
      publishBtn.title = "Notice publishing is restricted to College Administrators";
    }
    if (bannerBox) {
      bannerBox.className = "admin-status-banner banner-student";
      bannerBox.innerHTML = `
        <span>👁️ <strong>Student View:</strong> Logged in as <strong>${currentUser.name}</strong>. Official notices can only be published by Administrators.</span>
        <a href="./login.html" class="banner-switch-link">Switch to Admin</a>
      `;
    }
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function() {
  updateNoticePermissionUI();
});
