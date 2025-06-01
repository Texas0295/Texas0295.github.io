const darkModeToggle = document.getElementById("theme-switch");

function enableDarkMode() {
  document.documentElement.setAttribute("data-theme", "dark");
  localStorage.setItem("darkmode", "active");
}

function disableDarkMode() {
  document.documentElement.setAttribute("data-theme", "light");
  localStorage.setItem("darkmode", "disabled");
}

darkModeToggle.addEventListener("click", () => {
  const darkmode = localStorage.getItem("darkmode");
  darkmode !== "active" ? enableDarkMode() : disableDarkMode();
});

hljs.highlightAll();
