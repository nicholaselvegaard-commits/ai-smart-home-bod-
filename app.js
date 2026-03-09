// Strømpriser simulert (realistiske norske priser)
const prices = [0.42, 0.38, 0.35, 0.33, 0.40, 0.55, 0.72, 0.85, 0.78, 0.65, 0.50, 0.44];
const hours = ['13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '00'];

function getColor(price) {
  if (price < 0.50) return '#4ade80';
  if (price < 0.70) return '#facc15';
  return '#f87171';
}

function buildChart() {
  const bars = document.getElementById('bars');
  const labels = document.getElementById('labels');
  const max = Math.max(...prices);

  prices.forEach((p, i) => {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = (p / max * 100) + '%';
    bar.style.background = getColor(p);
    bar.title = p + ' kr/kWh';
    bars.appendChild(bar);

    const label = document.createElement('div');
    label.className = 'chart-label';
    label.textContent = hours[i];
    labels.appendChild(label);
  });
}

function toggle(id) {
  const device = document.getElementById(id);
  const isOn = device.classList.contains('on');
  device.classList.toggle('on', !isOn);
  device.classList.toggle('off', isOn);
  const btn = device.querySelector('.toggle');
  const status = device.querySelector('.device-status');
  const icon = device.querySelector('.device-icon');

  if (isOn) {
    btn.textContent = 'Slå på';
    status.textContent = 'AV';
    status.style.color = '#666';
    icon.textContent = '❄️';
  } else {
    btn.textContent = 'Slå av';
    status.textContent = 'PÅ — Aktiv';
    status.style.color = '#4ade80';
    icon.textContent = '🔥';
  }
}

const responses = {
  varm: '✅ Forstått. Starter oppvarming av stue og soverom kl 16:15 slik at det er 21°C når du ankommer kl 17:00. Strøm er billig mellom 15-17 — utnytter dette. Estimert kostnad: 1.80kr.',
  spar: '✅ Sparemodus aktivert. Slår av alle ovner mellom 17-21 (dyrest). Holder minimumstemp på 17°C. Estimert besparelse i dag: 28kr.',
  natt: '✅ Nattmodus aktivert. Soverom holdes på 18°C fra kl 22. Stue, bad og lys slått av. Slår på igjen kl 06:30 basert på morgenpriser.',
  rapport: '📊 Denne måneden: Brukt 312kr mindre enn gjennomsnittet. Beste dag: mandag (strøm til 0.28kr/kWh). Mest spart: forhåndsvarming i billige timer. Total reduksjon: 18%.'
};

function runCommand(type) {
  const box = document.getElementById('response');
  box.style.display = 'block';
  box.textContent = '🤖 Behandler...';
  setTimeout(() => { box.textContent = responses[type]; }, 800);
}

buildChart();