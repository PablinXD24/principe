const moon = document.querySelector('.moon');
const meteors = document.querySelectorAll('.meteor');
const lineLeft = document.querySelector('.line-left');
const lineRight = document.querySelector('.line-right');

// Iniciar a música assim que a página for carregada
const music = document.getElementById('background-music');
window.addEventListener('load', () => {
  music.play();
});

let activeMeteor = null;
let offsetX = 0;
let offsetY = 0;

meteors.forEach(meteor => {
  meteor.addEventListener('mousedown', (e) => {
    e.preventDefault();
    const rect = meteor.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    activeMeteor = meteor;
    activeMeteor.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', (e) => {
    if (activeMeteor) {
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;

      activeMeteor.style.left = `${x}px`;
      activeMeteor.style.top = `${y}px`;

      updateLines();
    }
  });

  document.addEventListener('mouseup', () => {
    if (activeMeteor) {
      activeMeteor.style.cursor = 'grab';
      activeMeteor = null;
    }
  });
});

function updateLines() {
  const moonRect = moon.getBoundingClientRect();
  const moonCenterX = moonRect.left + moonRect.width / 2;
  const moonCenterY = moonRect.top + moonRect.height / 2;

  const leftMeteor = document.querySelector('.meteor-left');
  const rightMeteor = document.querySelector('.meteor-right');

  const leftMeteorRect = leftMeteor.getBoundingClientRect();
  const leftMeteorCenterX = leftMeteorRect.left + leftMeteorRect.width / 2;
  const leftMeteorCenterY = leftMeteorRect.top + leftMeteorRect.height / 2;

  const rightMeteorRect = rightMeteor.getBoundingClientRect();
  const rightMeteorCenterX = rightMeteorRect.left + rightMeteorRect.width / 2;
  const rightMeteorCenterY = rightMeteorRect.top + rightMeteorRect.height / 2;

  lineLeft.setAttribute('x1', `${moonCenterX}px`);
  lineLeft.setAttribute('y1', `${moonCenterY}px`);
  lineLeft.setAttribute('x2', `${leftMeteorCenterX}px`);
  lineLeft.setAttribute('y2', `${leftMeteorCenterY}px`);

  lineRight.setAttribute('x1', `${moonCenterX}px`);
  lineRight.setAttribute('y1', `${moonCenterY}px`);
  lineRight.setAttribute('x2', `${rightMeteorCenterX}px`);
  lineRight.setAttribute('y2', `${rightMeteorCenterY}px`);
}

// Inicializa as linhas
updateLines();
