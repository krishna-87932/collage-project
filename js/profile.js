// ==========================================
// ATSS CONNECT - Student Profile Script (profile.js)
// Beginner-friendly JavaScript for College Project
// ==========================================

const profileModalOverlay = document.getElementById("profile-modal-overlay");

// Open Edit Profile Modal
function openEditProfileModal() {
  if (profileModalOverlay) {
    profileModalOverlay.style.display = "flex";
  }
}

// Close Edit Profile Modal
function closeEditProfileModal() {
  if (profileModalOverlay) {
    profileModalOverlay.style.display = "none";
  }
}

// Close modal when clicking outside
if (profileModalOverlay) {
  profileModalOverlay.addEventListener("click", function(event) {
    if (event.target === profileModalOverlay) {
      closeEditProfileModal();
    }
  });
}

// Save Profile Updates
function saveProfileData() {
  const nameInput = document.getElementById("edit-name");
  const bioInput = document.getElementById("edit-bio");
  const phoneInput = document.getElementById("edit-phone");
  const emailInput = document.getElementById("edit-email");

  const nameVal = nameInput ? nameInput.value.trim() : "";
  const bioVal = bioInput ? bioInput.value.trim() : "";
  const phoneVal = phoneInput ? phoneInput.value.trim() : "";
  const emailVal = emailInput ? emailInput.value.trim() : "";

  if (nameVal === "") {
    alert("Please enter a valid student name.");
    return;
  }

  // Update page elements
  const displayTitle = document.getElementById("profile-display-name");
  const displayNameVal = document.getElementById("val-name");
  const displayBio = document.getElementById("val-bio");
  const displayPhone = document.getElementById("val-phone");
  const displayEmail = document.getElementById("val-email");

  if (displayTitle) displayTitle.textContent = nameVal;
  if (displayNameVal) displayNameVal.textContent = nameVal;
  if (displayBio) displayBio.textContent = bioVal;
  if (displayPhone) displayPhone.textContent = phoneVal;
  if (displayEmail) displayEmail.textContent = emailVal;

  // Save to browser localStorage
  const profileData = {
    name: nameVal,
    bio: bioVal,
    phone: phoneVal,
    email: emailVal
  };
  localStorage.setItem("atss_student_profile", JSON.stringify(profileData));

  closeEditProfileModal();
  alert("Profile updated successfully!");
}

// Load saved profile data when page opens
document.addEventListener("DOMContentLoaded", function() {
  const saved = localStorage.getItem("atss_student_profile");
  if (saved) {
    try {
      const data = JSON.parse(saved);
      if (data.name) {
        const displayTitle = document.getElementById("profile-display-name");
        const displayNameVal = document.getElementById("val-name");
        const nameInput = document.getElementById("edit-name");
        if (displayTitle) displayTitle.textContent = data.name;
        if (displayNameVal) displayNameVal.textContent = data.name;
        if (nameInput) nameInput.value = data.name;
      }
      if (data.bio) {
        const displayBio = document.getElementById("val-bio");
        const bioInput = document.getElementById("edit-bio");
        if (displayBio) displayBio.textContent = data.bio;
        if (bioInput) bioInput.value = data.bio;
      }
      if (data.phone) {
        const displayPhone = document.getElementById("val-phone");
        const phoneInput = document.getElementById("edit-phone");
        if (displayPhone) displayPhone.textContent = data.phone;
        if (phoneInput) phoneInput.value = data.phone;
      }
      if (data.email) {
        const displayEmail = document.getElementById("val-email");
        const emailInput = document.getElementById("edit-email");
        if (displayEmail) displayEmail.textContent = data.email;
        if (emailInput) emailInput.value = data.email;
      }
    } catch (e) {
      console.log("Could not parse saved profile", e);
    }
  }
});
