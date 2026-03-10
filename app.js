const screens = [...document.querySelectorAll('.screen')];
const navButtons = [...document.querySelectorAll('[data-screen]')];
const backBtn = document.getElementById('backBtn');
const historyStack = ['splash'];

function showScreen(id, push = true) {
  screens.forEach((screen) => {
    screen.classList.toggle('active', screen.id === id);
  });

  if (push) {
    const last = historyStack[historyStack.length - 1];
    if (last !== id) historyStack.push(id);
  }

  backBtn.style.visibility = historyStack.length > 1 ? 'visible' : 'hidden';
}

navButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.screen;
    if (target) showScreen(target);
  });
});

backBtn.addEventListener('click', () => {
  if (historyStack.length <= 1) return;
  historyStack.pop();
  showScreen(historyStack[historyStack.length - 1], false);
});

showScreen('splash', false);
