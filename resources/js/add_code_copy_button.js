const copyButtonLabel = "コピー";

const  blocks = document.querySelectorAll(".pre_content");

blocks.forEach((block) => {
  const preElement = block.querySelector("pre");
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

  button.innerText = "コピーしました";

  setTimeout(() => {
    button.innerText = copyButtonLabel;
  }, 1000);
}
