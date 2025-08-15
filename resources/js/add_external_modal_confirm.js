function createExternalModal() {
  const modalHTML = `
    <div id="external-confirm" class="modal hidden">
      <div class="modal-content">
        <h1>注意：外部サイトへ</h1>
        <img
          src="/resources/img/site/redirect.png"
          alt="redirecting"
          style="width: 30vw; max-width: 300px; filter: drop-shadow(0 0 3px white);"
        />
        <p>外部サイトへ移動しようとしています。<br>
        本当に続行しますか？</p>
        <div class="modal-actions">
          <button id="confirm-go">はい、行きます</button>
          <button id="cancel">戻ります</button>
        </div>
      </div>
    </div>
  `;
  const container = document.createElement('div');
  container.innerHTML = modalHTML;
  document.body.appendChild(container.firstElementChild);
}

createExternalModal();

const currentHost = location.host;
const allLinks = document.querySelectorAll('a');
const modal = document.getElementById('external-confirm');
const confirmBtn = document.getElementById('confirm-go');
const cancelBtn = document.getElementById('cancel');

allLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;

  const linkHost = (new URL(href, location.href)).host;

  if (linkHost !== currentHost) {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetUrl = link.href;

      confirmBtn.onclick = () => {
        window.open(targetUrl, '_blank');
        modal.classList.add('hidden');
      };

      modal.classList.remove('hidden');
    });
  }
});

cancelBtn.onclick = () => {
  modal.classList.add('hidden');
};

modal.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    modal.classList.add('hidden');
  }
});

