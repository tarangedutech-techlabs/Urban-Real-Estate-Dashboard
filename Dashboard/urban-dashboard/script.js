// 🔐 AUTH CHECK
const savedRole = localStorage.getItem("userRole");

if (!savedRole) {
  window.location.href = "login.html";
}

/***********************
 * ROLE SWITCH LOGIC
 ***********************/
const roleSelect = document.getElementById("roleSelect");

// 🔹 CURRENT USER (simulate login)
let currentRole = "admin";      // admin | manager | agent
let currentAgent = "Agent A";   // used when role = agent

function applyRole(role) {

  currentRole = role; // ⭐ sync role everywhere

  // ===== SECTION SELECTORS =====
  const cards = document.querySelector(".role-cards");
  const projects = document.querySelector(".role-projects");
  const status = document.querySelector(".role-status");
  const inventory = document.querySelector(".role-inventory");
  const analytics = document.querySelector(".role-analytics");
  const inquiry = document.querySelector(".role-inquiry");
  const reviewsSection = document.querySelector(".role-reviews");
  const adminActions = document.querySelectorAll(".admin-only");

  // ===== RESET (SHOW ALL FIRST) =====
  if (cards) cards.style.display = "grid";
  if (projects) projects.style.display = "block";
  if (status) status.style.display = "block";
  if (inventory) inventory.style.display = "block";
  if (analytics) analytics.style.display = "block";
  if (inquiry) inquiry.style.display = "block";
  if (reviewsSection) reviewsSection.style.display = "block";

  adminActions.forEach(el => el.style.display = "table-cell");

  // ===== AGENT RULES =====
  if (role === "agent") {
    if (cards) cards.style.display = "none";
    if (projects) projects.style.display = "none";
    if (status) status.style.display = "none";
    if (inventory) inventory.style.display = "none";
    if (analytics) analytics.style.display = "none";
    if (inquiry) inquiry.style.display = "none";
    // reviews visible (view only)

    adminActions.forEach(el => el.style.display = "none");
  }

  // ===== SALES MANAGER RULES =====
  if (role === "manager") {
    if (inventory) inventory.style.display = "none";
    adminActions.forEach(el => el.style.display = "none");
    // analytics + inquiry + reviews visible
  }

  // Re-render role-based data
  renderLeads();
  renderReviews();
}

// DEFAULT LOAD
applyRole(savedRole);

// ROLE CHANGE
roleSelect.addEventListener("change", () => {
  applyRole(roleSelect.value);
});



/***********************
 * CRM (LEADS)
 ***********************/
const leads = [
  { name: "Rahul Patil", property: "2BHK", location: "Gangapur Rd", status: "Site Visit", priority: "Hot", agent: "Agent A" },
  { name: "Sneha Joshi", property: "Plot", location: "Trimbak Rd", status: "New", priority: "Warm", agent: "Unassigned" },
  { name: "Amit Kale", property: "Shop", location: "Dwarka", status: "Closed", priority: "Cold", agent: "Agent B" }
];

const table = document.getElementById("crmTable");

function renderLeads() {
  table.innerHTML = `
    <tr>
      <th>Name</th>
      <th>Property</th>
      <th>Location</th>
      <th>Status</th>
      <th>Priority</th>
      <th>Assigned To</th>
      <th>Action</th>
    </tr>
  `;

  leads.forEach((lead, index) => {

    // Agent sees only assigned leads
    if (currentRole === "agent" && lead.agent !== currentAgent) return;

    let tagClass =
      lead.priority === "Hot" ? "tag-hot" :
      lead.priority === "Warm" ? "tag-warm" : "tag-cold";

    table.innerHTML += `
      <tr>
        <td>${lead.name}</td>
        <td>${lead.property}</td>
        <td>${lead.location}</td>
        <td>${lead.status}</td>
        <td class="${tagClass}">${lead.priority}</td>
        <td>${lead.agent}</td>
        <td>
          ${currentRole === "admin" || currentRole === "manager"
            ? `<button class="assign-btn" onclick="assignLead(${index})">Assign</button>`
            : "📞 💬"}
        </td>
      </tr>
    `;
  });
}

// ASSIGN LEAD
function assignLead(index) {
  if (currentRole === "agent") return;

  const agent = prompt("Assign to Agent (Agent A / Agent B):");
  if (agent) {
    leads[index].agent = agent;
    renderLeads();
  }
}

// FILTER BY STATUS
document.getElementById("statusFilter").addEventListener("change", (e) => {
  const status = e.target.value;
  table.querySelectorAll("tr").forEach((row, i) => {
    if (i === 0) return;
    row.style.display =
      status === "all" || row.children[3].innerText === status
        ? ""
        : "none";
  });
});

renderLeads();



/***********************
 * INVENTORY (STEP 5)
 ***********************/
function editInventory() {
  if (currentRole !== "admin") {
    alert("Only Admin can edit inventory");
    return;
  }

  let available = prompt("Enter Available Units:");
  let booked = prompt("Enter Booked Units:");
  let blocked = prompt("Enter Blocked Units:");

  if (available && booked && blocked) {
    document.getElementById("availableUnits").innerText = available;
    document.getElementById("bookedUnits").innerText = booked;
    document.getElementById("blockedUnits").innerText = blocked;
  }
}



/***********************
 * ANALYTICS / CHARTS
 ***********************/
let salesChart, revenueChart, propertyChart;

function loadCharts() {

  salesChart = new Chart(document.getElementById("salesChart"), {
    type: "bar",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [{
        label: "Units Sold",
        data: [32, 45, 38, 60, 72, 85]
      }]
    }
  });

  revenueChart = new Chart(document.getElementById("revenueChart"), {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [{
        label: "Revenue (₹ Cr)",
        data: [1.2, 1.6, 2.1, 2.7, 3.0, 3.2]
      }]
    }
  });

  propertyChart = new Chart(document.getElementById("propertyChart"), {
    type: "pie",
    data: {
      labels: ["Flats", "Plots", "Commercial"],
      datasets: [{
        data: [62, 21, 17]
      }]
    }
  });
}

loadCharts();



/***********************
 * STEP 6: ADD NEW LEAD
 ***********************/
document.getElementById("leadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (currentRole === "agent") {
    alert("Agents cannot add leads");
    return;
  }

  const name = leadName.value;
  const property = leadProperty.value;
  const location = leadLocation.value;
  const budget = leadBudget.value;

  let priority = "Cold";
  if (budget === "high") priority = "Hot";
  else if (budget === "medium") priority = "Warm";

  leads.push({
    name,
    property,
    location,
    status: "New",
    priority,
    agent: "Unassigned"
  });

  renderLeads();
  this.reset();
});



/***********************
 * STEP 7: REVIEWS
 ***********************/
const reviews = [
  { name: "Rohit Deshmukh", text: "Very professional builder. On-time delivery.", rating: 5 },
  { name: "Neha Kulkarni", text: "Good quality construction and support.", rating: 4 },
  { name: "Amit Patil", text: "Satisfied with service.", rating: 4 }
];

const reviewTable = document.getElementById("reviewTable");

function renderReviews() {
  reviewTable.innerHTML = `
    <tr>
      <th>Customer</th>
      <th>Review</th>
      <th>Rating</th>
      <th class="admin-only">Action</th>
    </tr>
  `;

  reviews.forEach((review, index) => {
    reviewTable.innerHTML += `
      <tr>
        <td>${review.name}</td>
        <td>${review.text}</td>
        <td>${"⭐".repeat(review.rating)}</td>
        <td class="admin-only">
          <button class="review-btn" onclick="deleteReview(${index})">Delete</button>
        </td>
      </tr>
    `;
  });

  // admin-only buttons
  document.querySelectorAll(".admin-only").forEach(el => {
    el.style.display = currentRole === "admin" ? "table-cell" : "none";
  });
}

function deleteReview(index) {
  if (currentRole !== "admin") return;
  reviews.splice(index, 1);
  renderReviews();
}

function logout() {
  localStorage.removeItem("userRole");
  window.location.href = "login.html";
}


renderReviews();

