// Scroll animation
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.2
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("show");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
// ===== SLIDER =====

let slides = document.querySelectorAll(".slide");
let index = 0;

function showSlide(i) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[i].classList.add("active");
}

document.querySelector(".next").addEventListener("click", () => {
  index = (index + 1) % slides.length;
  showSlide(index);
});

document.querySelector(".prev").addEventListener("click", () => {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
});

// Auto slide
setInterval(() => {
  index = (index + 1) % slides.length;
  showSlide(index);
}, 4000);

// ===== STICKY NAVBAR SHADOW EFFECT =====

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
