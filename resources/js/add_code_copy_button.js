const copyButtonLabel = "Copy Code";

// use a class selector if available
const  blocks = document.querySelectorAll(".pre_content");

blocks.forEach((block) => {
  const preElement = block.querySelector("pre");
  // only add button if browser supports Clipboard API
  if (navigator.clipboard) {
    const button = document.createElement("button");
    button.classList.add("copy");

    button.innerText = copyButtonLabel;
    block.insertBefore(button,preElement);

    button.addEventListener("click", async () => {
      await copyCode(block, button);
    });
  }
});

async function copyCode(block, button) {
  const code = block.querySelector("code");
  const text = code.innerText;

  await navigator.clipboard.writeText(text);

  // visual feedback that task is completed
  button.innerText = "Code Copied";

  setTimeout(() => {
    button.innerText = copyButtonLabel;
  }, 1000);
}
