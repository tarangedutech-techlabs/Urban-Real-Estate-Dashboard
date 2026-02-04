document.addEventListener("DOMContentLoaded", () => {

  // ===== Tabs (Home page) =====
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  if (tabButtons.length > 0) {
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        tabContents.forEach((content) => content.classList.remove("active"));

        const targetId = btn.getAttribute("data-tab");
        document.getElementById(targetId).classList.add("active");
      });
    });
  }

  // ===== Search Popup =====
  const openSearch = document.getElementById("openSearch");
  const closeSearch = document.getElementById("closeSearch");
  const searchPopup = document.getElementById("searchPopup");
  const searchNow = document.getElementById("searchNow");
  const searchInput = document.getElementById("searchInput");

  if (openSearch && searchPopup) {
    openSearch.addEventListener("click", () => {
      searchPopup.classList.add("active");
      if (searchInput) searchInput.focus();
    });
  }

  if (closeSearch) {
    closeSearch.addEventListener("click", () => {
      searchPopup.classList.remove("active");
      if (searchInput) searchInput.value = "";
    });
  }

  if (searchPopup) {
    searchPopup.addEventListener("click", (e) => {
      if (e.target === searchPopup) {
        searchPopup.classList.remove("active");
        if (searchInput) searchInput.value = "";
      }
    });
  }

  if (searchNow) {
    searchNow.addEventListener("click", () => {
      const value = searchInput.value.trim();
      if (value === "") {
        alert("Please enter something to search!");
        return;
      }
      alert("Searching for: " + value);
    });
  }

  if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        searchNow.click();
      }
    });
  }

  // ===== Dropdown =====
  const projectsBtn = document.getElementById("projectsBtn");
  const projectsMenu = document.getElementById("projectsMenu");

  if (projectsBtn && projectsMenu) {
    projectsBtn.addEventListener("click", () => {
      projectsMenu.classList.toggle("show");
    });

    window.addEventListener("click", (e) => {
      if (!e.target.closest(".dropdown")) {
        projectsMenu.classList.remove("show");
      }
    });
  }

  // ===== Sidebar Menu =====
  const openMenu = document.getElementById("openMenu");
  const closeMenu = document.getElementById("closeMenu");
  const sidebarMenu = document.getElementById("sidebarMenu");
  const menuOverlay = document.getElementById("menuOverlay");

  if (openMenu && sidebarMenu && menuOverlay) {
    openMenu.addEventListener("click", () => {
      sidebarMenu.classList.add("active");
      menuOverlay.classList.add("active");
    });
  }

  if (closeMenu) {
    closeMenu.addEventListener("click", () => {
      sidebarMenu.classList.remove("active");
      menuOverlay.classList.remove("active");
    });
  }

  if (menuOverlay) {
    menuOverlay.addEventListener("click", () => {
      sidebarMenu.classList.remove("active");
      menuOverlay.classList.remove("active");
    });
  }

  // ===== Slider (Project Details) WITHOUT BUTTONS =====
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.getElementById("dots");

  if (slides.length > 0 && dotsContainer) {

    // Create dots
    slides.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll("span");

    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove("active"));
      dots.forEach(dot => dot.classList.remove("active"));

      slides[index].classList.add("active");
      dots[index].classList.add("active");
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    function goToSlide(index) {
      currentSlide = index;
      showSlide(currentSlide);
    }

    // Auto slide
    setInterval(nextSlide, 3000);

    // Start
    showSlide(currentSlide);
  }

});


// ===== Project Details Tabs Function (ONLY ONE TIME) =====
function changeTab(tabName, btn) {

  document.querySelectorAll(".details-tab-btn").forEach((b) => {
    b.classList.remove("active");
  });

  btn.classList.add("active");

  const tabContent = document.getElementById("tabContent");

  if (tabName === "description") {
    tabContent.innerText = `
N.A bungalow plots in makhmalabad shiwar in nashik municipality available at very cheap rates
Residential N.A. bungalow plot available near meghraj bakery, Nashik-Peth Highway, Scenic Environment
N.A.Plot onwards from Rs.13.51 Lakhs
Plots available from 657 sq.ft. to 3000 sq.ft.
Makhamalabad Gat no-347
Road rate for 9mtr- 18,500 Per War
Road rate for 18mtr- 21,000 Per War

Residential Plot
Min. Plot Area 657 sq.ft.
Cost= 13,51,000
Max. Plot Area 2028 sq.ft.
Cost = 37,51,000

Commercial Plot
Min. Plot Area 2786 sq.ft.
Cost= 65,00,000
Max. Plot Area 5249 sq.ft.
Cost = 1,22,47,000
    `;
  }

  else if (tabName === "location") {
    tabContent.innerText = `
📍 Location:
Makhamalabad Gat No-347,
Near Meghraj Bakery,
Nashik-Peth Highway,
Nashik.
    `;
  }

  else if (tabName === "amenities") {
    tabContent.innerText = `
✅ Amenities:
• 9mtr & 18mtr Road Access
• Scenic Environment
• Residential + Commercial Plots
• Nearby Highway Connectivity
• Peaceful Location
    `;
  }

  else if (tabName === "layout") {
    tabContent.innerText = `
📌 Layout Plans:
• Plot Size: 657 sq.ft. to 3000 sq.ft.
• Residential & Commercial Options Available
• Contact us for full layout PDF.
    `;
  }
}
document.getElementById("contactForm").addEventListener("submit", function(e){
  e.preventDefault();
  alert("Message Sent Successfully!");
});
