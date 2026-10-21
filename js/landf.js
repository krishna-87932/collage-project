// ==========================================
// ATSS CONNECT - Lost & Found Script (landf.js)
// Beginner-friendly JavaScript for College Project
// ==========================================

const lafModalOverlay = document.getElementById("laf-modal-overlay");

// Open Report Modal
function openLafModal() {
  if (lafModalOverlay) {
    lafModalOverlay.style.display = "flex";
  }
}

// Close Report Modal
function closeLafModal() {
  if (lafModalOverlay) {
    lafModalOverlay.style.display = "none";
  }
}

// Close modal when clicking outside box
if (lafModalOverlay) {
  lafModalOverlay.addEventListener("click", function(event) {
    if (event.target === lafModalOverlay) {
      closeLafModal();
    }
  });
}

// Function to Submit a new Lost / Found Item
function submitLafItem() {
  const statusEl = document.querySelector('input[name="laf-status"]:checked');
  const titleInput = document.getElementById("laf-title");
  const categorySelect = document.getElementById("laf-category");
  const locationInput = document.getElementById("laf-location");
  const reporterInput = document.getElementById("laf-reporter");
  const descInput = document.getElementById("laf-desc");

  const status = statusEl ? statusEl.value : "FOUND";
  const title = titleInput ? titleInput.value.trim() : "";
  const category = categorySelect ? categorySelect.value : "Other";
  const location = locationInput ? locationInput.value.trim() : "Campus";
  const reporter = reporterInput && reporterInput.value.trim() !== "" ? reporterInput.value.trim() : "Krishna Suryawanshi (Roll 55)";
  const desc = descInput ? descInput.value.trim() : "";

  // Validation
  if (title === "") {
    alert("Please enter the item title.");
    if (titleInput) titleInput.focus();
    return;
  }

  if (desc === "") {
    alert("Please write a short description of the item.");
    if (descInput) descInput.focus();
    return;
  }

  // Create new Card element
  const grid = document.querySelector(".laf-grid");
  const newCard = document.createElement("div");
  newCard.className = "laf-card";
  newCard.setAttribute("data-status", status);

  const isFound = status === "FOUND";
  const badgeClass = isFound ? "badge-found" : "badge-lost";
  const badgeText = isFound ? "FOUND" : "LOST";
  const btnClass = isFound ? "claim-btn" : "claim-btn btn-lost";
  const btnText = isFound ? "Claim This Item" : "I Found This Item";
  const iconEmoji = isFound ? "📦" : "🔍";

  newCard.innerHTML = `
    <div class="card-img-wrap">
      <div class="no-img-placeholder">${iconEmoji}</div>
      <span class="status-badge ${badgeClass}">${badgeText}</span>
      <span class="category-tag">${category}</span>
    </div>
    <div class="card-body">
      <h3 class="item-title">${title}</h3>
      <p class="item-desc">${desc}</p>
      <div class="item-meta">
        <div class="meta-row">
          <span>📍 <strong>Location:</strong> ${location}</span>
        </div>
        <div class="meta-row">
          <span>👤 <strong>Posted by:</strong> ${reporter}</span>
        </div>
        <div class="meta-row">
          <span>🕒 <strong>Posted:</strong> Today • Just now</span>
        </div>
      </div>
      <button class="${btnClass}" onclick="claimItem('${title.replace(/'/g, "\\'")}', '${reporter.replace(/'/g, "\\'")}', '${location.replace(/'/g, "\\'")}')">${btnText}</button>
    </div>
  `;

  // Prepend new card to the grid
  if (grid) {
    grid.prepend(newCard);
  }

  // Reset form inputs & close modal
  titleInput.value = "";
  descInput.value = "";
  if (locationInput) locationInput.value = "";
  closeLafModal();

  alert(`Your ${status} item report has been published successfully!`);
}

// Function to Claim or Contact regarding an item
function claimItem(title, reporter, location) {
  alert(`Item: ${title}\nReported by: ${reporter}\nLocation: ${location}\n\n👉 Instructions: Please visit the ${location} or contact ${reporter} directly. You can also chat with students in the Chatrooms section!`);
}

// Function to filter by Status: ALL, LOST, FOUND
function filterLafStatus(status) {
  // Update chips UI
  const chips = document.querySelectorAll(".filter-chip");
  chips.forEach(chip => {
    chip.classList.remove("active");
    if (chip.getAttribute("data-filter") === status) {
      chip.classList.add("active");
    }
  });

  const cards = document.querySelectorAll(".laf-card");
  cards.forEach(card => {
    const cardStatus = card.getAttribute("data-status");
    if (status === "ALL" || cardStatus === status) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

// Function to search items
function searchLafItems() {
  const searchInput = document.getElementById("laf-search");
  if (!searchInput) return;

  const query = searchInput.value.toLowerCase().trim();
  const cards = document.querySelectorAll(".laf-card");

  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    if (text.includes(query)) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}
