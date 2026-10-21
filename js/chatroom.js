// ==========================================
// ATSS CONNECT - Chatroom Script (chatroom.js)
// Beginner-friendly JavaScript for College Project
// ==========================================

// Pre-populated conversations for each room
const roomMessages = {
  "bcom-ca-3rd-sem": [
    { sender: "Prof. Sharma", role: "teacher", avatar: "PS", time: "10:15 AM", text: "Good morning class. Please ensure your Web Development project frontend files are ready for practical assessment." },
    { sender: "Sneha Patil", role: "student", avatar: "SP", time: "10:18 AM", text: "Good morning Sir! Will the demonstration take place in Computer Lab 2?" },
    { sender: "Prof. Sharma", role: "teacher", avatar: "PS", time: "10:20 AM", text: "Yes, Lab 2 starting from 11:00 AM. Bring your project documentation synopsis as well." },
    { sender: "Rohan Verma", role: "student", avatar: "RV", time: "10:22 AM", text: "Noted Sir, thank you! Sarthak and Krishna, are your project files ready?" },
    { sender: "Sarthak Ghadge", role: "student", avatar: "SG", time: "10:25 AM", text: "Yes Rohan, we just finalized the frontend interface!" }
  ],
  "general": [
    { sender: "Admin Office", role: "teacher", avatar: "AO", time: "09:00 AM", text: "Welcome students. The college library will remain open until 6:00 PM throughout the exam week." },
    { sender: "Sarthak Ghadge", role: "student", avatar: "SG", time: "09:30 AM", text: "Does anyone know if the identity card renewal counter is open today?" },
    { sender: "Sneha Patil", role: "student", avatar: "SP", time: "09:35 AM", text: "Yes Sarthak, counter 3 in student section is handling ID renewals." },
    { sender: "Amit Patil", role: "student", avatar: "AP", time: "11:00 AM", text: "Reminder: Annual Sports Day registration deadline is this Friday!" }
  ],
  "exam-prep": [
    { sender: "Rohan Verma", role: "student", avatar: "RV", time: "Yesterday", text: "Does anyone have previous year question papers for Database Management Systems?" },
    { sender: "Sneha Patil", role: "student", avatar: "SP", time: "Yesterday", text: "I have the 2024 and 2025 question papers. Let me share the PDF in our group drive." },
    { sender: "Krishna Suryawanshi", role: "student", avatar: "KS", isSelf: true, time: "Yesterday", text: "Thanks Sneha! That will be super helpful for the revision." },
    { sender: "Prof. Sharma", role: "teacher", avatar: "PS", time: "08:45 AM", text: "Focus especially on Normalization (1NF, 2NF, 3NF) and ER diagrams, students." }
  ],
  "coding-club": [
    { sender: "Krishna Suryawanshi", role: "student", avatar: "KS", isSelf: true, time: "Yesterday", text: "Hey team! Working on the ATSS Connect College Portal project frontend." },
    { sender: "Sarthak Ghadge", role: "student", avatar: "SG", time: "Yesterday", text: "Great! Let's ensure the color theme is consistent and beginner-friendly." },
    { sender: "Prof. Sharma", role: "teacher", avatar: "PS", time: "Today", text: "Good initiative Krishna & Sarthak. Clean UI and semantic HTML are essential for your viva demo." }
  ],
  "sports-and-events": [
    { sender: "Sports Sec", role: "student", avatar: "SS", time: "Yesterday", text: "Cricket and Badminton tournament trials start tomorrow morning at 8:00 AM sharp on campus ground." },
    { sender: "Amit Patil", role: "student", avatar: "AP", time: "Yesterday", text: "Count me in for Badminton singles and doubles!" },
    { sender: "Rohan Verma", role: "student", avatar: "RV", time: "Today", text: "Will there be chess tournaments too?" },
    { sender: "Sports Sec", role: "student", avatar: "SS", time: "Today", text: "Yes! Chess entries will be accepted at the sports room desk." }
  ]
};

// Current active room identifier
let currentRoom = "bcom-ca-3rd-sem";

// Function to render messages for a room
function renderMessages(roomId) {
  const container = document.getElementById("chat-messages-box");
  if (!container) return;

  container.innerHTML = "";
  const messages = roomMessages[roomId] || [];

  messages.forEach(msg => {
    const msgElement = document.createElement("div");
    msgElement.className = msg.isSelf ? "chat-msg msg-self" : "chat-msg";

    const badgeHTML = msg.role === "teacher" 
      ? '<span class="msg-badge badge-teacher">Faculty</span>' 
      : '<span class="msg-badge badge-student">Student</span>';

    msgElement.innerHTML = `
      <div class="msg-avatar">${msg.avatar}</div>
      <div class="msg-bubble-wrap">
        <div class="msg-header">
          <span class="msg-sender">${msg.sender}</span>
          ${badgeHTML}
          <span class="msg-time">${msg.time}</span>
        </div>
        <div class="msg-text">${msg.text}</div>
      </div>
    `;

    container.appendChild(msgElement);
  });

  // Scroll to bottom
  container.scrollTop = container.scrollHeight;
}

// Function to select and switch chatroom
function selectRoom(channelElement, roomId, title, desc) {
  currentRoom = roomId;

  // Update active state in room sidebar
  document.querySelectorAll(".room-channel").forEach(ch => ch.classList.remove("active"));
  channelElement.classList.add("active");

  // Remove unread badge if any
  const badge = channelElement.querySelector(".unread-badge");
  if (badge) badge.style.display = "none";

  // Update Chat Header
  const headerTitle = document.getElementById("active-room-title");
  const headerDesc = document.getElementById("active-room-desc");
  const inputField = document.getElementById("chat-input");

  if (headerTitle) headerTitle.innerHTML = `<span class="hash">#</span> ${title}`;
  if (headerDesc) headerDesc.textContent = desc;
  if (inputField) inputField.placeholder = `Type a message in #${title}...`;

  // Render messages for this room
  renderMessages(roomId);
}

// Function to send a message
function sendMessage() {
  const inputField = document.getElementById("chat-input");
  if (!inputField) return;

  const text = inputField.value.trim();
  if (text === "") return;

  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Add message to current room data
  const newMsg = {
    sender: "Krishna Suryawanshi",
    role: "student",
    avatar: "KS",
    isSelf: true,
    time: timeString,
    text: text
  };

  if (!roomMessages[currentRoom]) {
    roomMessages[currentRoom] = [];
  }
  roomMessages[currentRoom].push(newMsg);

  // Render updated message stream
  renderMessages(currentRoom);

  // Clear input
  inputField.value = "";
  inputField.focus();

  // Natural simulated response after 1.2 seconds for realistic project demo
  setTimeout(() => {
    let replySender = "Sarthak Ghadge";
    let replyAvatar = "SG";
    let replyRole = "student";
    let replyText = "Got it Krishna! 👍";

    if (currentRoom === "bcom-ca-3rd-sem") {
      replySender = "Prof. Sharma";
      replyAvatar = "PS";
      replyRole = "teacher";
      replyText = "Good point Krishna. Keep up the good preparation.";
    } else if (currentRoom === "coding-club") {
      replySender = "Sarthak Ghadge";
      replyAvatar = "SG";
      replyText = "Awesome work Krishna, frontend looks totally ready!";
    } else if (currentRoom === "exam-prep") {
      replySender = "Sneha Patil";
      replyAvatar = "SP";
      replyText = "Thanks for asking Krishna! Let's discuss this during lunch break.";
    }

    const autoReply = {
      sender: replySender,
      role: replyRole,
      avatar: replyAvatar,
      isSelf: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: replyText
    };

    roomMessages[currentRoom].push(autoReply);
    renderMessages(currentRoom);
  }, 1200);
}

// Function to send a quick reply
function sendQuickReply(text) {
  const inputField = document.getElementById("chat-input");
  if (inputField) {
    inputField.value = text;
    sendMessage();
  }
}

// Listen for Enter key press on message input
document.addEventListener("DOMContentLoaded", function() {
  const inputField = document.getElementById("chat-input");
  if (inputField) {
    inputField.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
      }
    });
  }

  // Initial render of default room
  renderMessages(currentRoom);
});
