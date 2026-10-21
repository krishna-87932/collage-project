// ==========================================
// ATSS CONNECT - Authentication Script (auth.js)
// Beginner-friendly JavaScript for College Project
// ==========================================

// Predefined default accounts
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

// Initialize users in localStorage if not already present
function initUsers() {
  const existing = localStorage.getItem("atss_users");
  if (!existing) {
    localStorage.setItem("atss_users", JSON.stringify(DEFAULT_USERS));
  }
}

// Get all registered users
function getUsers() {
  initUsers();
  try {
    return JSON.parse(localStorage.getItem("atss_users")) || DEFAULT_USERS;
  } catch (e) {
    return DEFAULT_USERS;
  }
}

// Helper to fill demo credentials into the form
function fillDemo(username, password) {
  const uInput = document.getElementById("login-username");
  const pInput = document.getElementById("login-password");
  if (uInput) uInput.value = username;
  if (pInput) pInput.value = password;
}

// Show alert banner on auth forms
function showAuthAlert(msg, isError = true) {
  const alertBox = document.getElementById("auth-alert");
  if (!alertBox) {
    alert(msg);
    return;
  }
  alertBox.textContent = msg;
  alertBox.style.display = "block";
  alertBox.className = isError ? "auth-alert auth-alert-error" : "auth-alert auth-alert-success";
}

// Handle Login Form Submission
function handleLogin(event) {
  if (event) event.preventDefault();

  const uInput = document.getElementById("login-username");
  const pInput = document.getElementById("login-password");

  const username = uInput ? uInput.value.trim().toLowerCase() : "";
  const password = pInput ? pInput.value : "";

  if (!username || !password) {
    showAuthAlert("Please enter both username and password.");
    return false;
  }

  const users = getUsers();
  const matchedUser = users.find(u => u.username.toLowerCase() === username && u.password === password);

  if (!matchedUser) {
    showAuthAlert("Invalid credentials! For demo Admin use: admin / 123123, or Student: krishna / password");
    return false;
  }

  // Save current active session
  localStorage.setItem("atss_current_user", JSON.stringify(matchedUser));
  showAuthAlert(`Welcome back, ${matchedUser.name}! Redirecting...`, false);

  setTimeout(() => {
    window.location.href = "./index.html";
  }, 600);

  return false;
}

// Handle Student Registration Form Submission
function handleRegister(event) {
  if (event) event.preventDefault();

  const nameInput = document.getElementById("reg-name");
  const rollInput = document.getElementById("reg-roll");
  const courseInput = document.getElementById("reg-course");
  const emailInput = document.getElementById("reg-email");
  const usernameInput = document.getElementById("reg-username");
  const passwordInput = document.getElementById("reg-password");
  const confirmInput = document.getElementById("reg-confirm");

  const name = nameInput ? nameInput.value.trim() : "";
  const roll = rollInput ? rollInput.value.trim() : "";
  const course = courseInput ? courseInput.value : "B.Com. (Computer Applications)";
  const email = emailInput ? emailInput.value.trim() : "";
  const username = usernameInput ? usernameInput.value.trim().toLowerCase() : "";
  const password = passwordInput ? passwordInput.value : "";
  const confirm = confirmInput ? confirmInput.value : "";

  // Validation
  if (!name || !roll || !email || !username || !password) {
    showAuthAlert("Please fill in all required fields.");
    return false;
  }

  if (password.length < 4) {
    showAuthAlert("Password should be at least 4 characters long.");
    return false;
  }

  if (password !== confirm) {
    showAuthAlert("Passwords do not match. Please re-enter.");
    return false;
  }

  const users = getUsers();
  const exists = users.some(u => u.username.toLowerCase() === username);

  if (exists) {
    showAuthAlert("Username already taken! Please choose another username.");
    return false;
  }

  // Create new student account
  const newUser = {
    username: username,
    password: password,
    role: "student",
    name: name,
    roll: roll,
    course: course,
    email: email
  };

  users.push(newUser);
  localStorage.setItem("atss_users", JSON.stringify(users));

  // Automatically log in newly registered student
  localStorage.setItem("atss_current_user", JSON.stringify(newUser));

  showAuthAlert("Registration successful! Logging in...", false);

  setTimeout(() => {
    window.location.href = "./index.html";
  }, 700);

  return false;
}

// Ensure default users exist upon page load
document.addEventListener("DOMContentLoaded", initUsers);
