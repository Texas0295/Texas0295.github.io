document.addEventListener("DOMContentLoaded", function () {
      fetch("/resources/settings/navigation-bar.json")
        .then((response) => response.json())
        .then((entries) => {
          const bar = document.getElementById("navigation-bar");

          entries.forEach((entry) => {
            const link = document.createElement("a");
            link.href = `${entry.url}`;
            link.textContent = `${entry.name}`;

            bar.appendChild(link);
          });
        })
        .catch((error) => console.error("無法讀取列表", error));
});
