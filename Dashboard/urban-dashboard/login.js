document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const role = document.getElementById("role").value;

  // save role
  localStorage.setItem("userRole", role);

  // redirect to dashboard
  window.location.href = "index.html";
});
