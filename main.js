let timer;
let focusTime = 25 * 60; // Default fokus: 25 menit
let breakTime = 5 * 60;  // Default istirahat: 5 menit
let timeLeft = focusTime;
let isFocusSession = true; // Status sesi: fokus atau istirahat

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const focusInput = document.getElementById('focusTime');
const breakInput = document.getElementById('breakTime');

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

startBtn.addEventListener('click', () => {
  if (!timer) {
    if (isFocusSession) {
      timeLeft = parseInt(focusInput.value) * 60;
    } else {
      timeLeft = parseInt(breakInput.value) * 60;
    }
    updateDisplay();
    timer = setInterval(countdown, 1000);
  }
});

function countdown() {
  if (timeLeft > 0) {
    timeLeft--;
    updateDisplay();
  } else {
    clearInterval(timer);
    timer = null;
    alert(isFocusSession ? "Waktu fokus selesai! Istirahat sekarang." : "Waktu istirahat selesai! Mulai fokus lagi.");
    isFocusSession = !isFocusSession; // Ganti sesi
    startBtn.click(); // Mulai sesi berikutnya secara otomatis
  }
}

resetBtn.addEventListener('click', () => {
  clearInterval(timer);
  timer = null;
  isFocusSession = true; // Reset ke sesi fokus
  timeLeft = parseInt(focusInput.value) * 60;
  updateDisplay();
});

updateDisplay(); // Inisialisasi tampilan awal
