let darkmode = localStorage.getItem("darkmode");
const darkModeToggle = document.getElementById("theme-switch");

function detectDarkMode() {
    if (darkmode === null) {
        let userDefaultIsDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        darkmode = userDefaultIsDarkMode ? "active" : "disabled";
        localStorage.setItem("darkmode", darkmode);
    }
}

function enableDarkMode() {
    document.body.classList.add("dark");
    localStorage.setItem("darkmode", "active");
}

function disableDarkMode() {
    document.body.classList.remove("dark");
    localStorage.setItem("darkmode", "disabled");
}

detectDarkMode();
if (darkmode === "active") {
    enableDarkMode();
} else {
    disableDarkMode();
}

darkModeToggle.addEventListener("click", () => {
    darkmode = localStorage.getItem("darkmode");
    darkmode !== "active" ? enableDarkMode() : disableDarkMode();
});

hljs.highlightAll();
