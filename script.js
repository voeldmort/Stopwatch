let timerInterval;
let isClockRunning = false;
let elapsedTime = localStorage.getItem('elapsedTime') ? parseInt(localStorage.getItem('elapsedTime')) : 0;
let lastHour = 0; // Keep track of the last hour when beep played
let beepAudio = new Audio('beep.mp3');
let pauseStartTime = 0;

// Function to format time
function formatTime(time) {
  const hours = String(Math.floor(time / 3600000)).padStart(2, '0');
  const minutes = String(Math.floor((time % 3600000) / 60000)).padStart(2, '0');
  const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
  const milliseconds = String(Math.floor(time % 1000 / 10)).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

// Function to update time display
function updateTime() {
  const now = Date.now();
  elapsedTime = now - startTime;
  localStorage.setItem('elapsedTime', elapsedTime.toString());
  document.getElementById('hour').textContent = formatTime(elapsedTime).slice(0, 2);
  document.getElementById('minute').textContent = formatTime(elapsedTime).slice(3, 5);
  document.getElementById('second').textContent = formatTime(elapsedTime).slice(6, 8);
  document.getElementById('millisecond').textContent = formatTime(elapsedTime).slice(9, 11);

  const currentHour = Math.floor(elapsedTime / 3600000);
  if (currentHour !== lastHour) {
    playBeep();
    lastHour = currentHour;
  }
}

// Function to play beep sound
function playBeep() {
  beepAudio.play();
}

// Function to start the clock
function startClock() {
  console.log("pauseStartTime", pauseStartTime);
    if (pauseStartTime !== 0) {
      // startTime = Date.now() - pauseStartTime;
        startTime = Date.now() - elapsedTime;
    } else {
      startTime = Date.now() - elapsedTime;
    }
    timerInterval = setInterval(updateTime, 10);
    isClockRunning = true;
}





// Function to pause the clock
function pauseClock() {
  console.log("isClockRunning", isClockRunning);
  if (isClockRunning) {
    clearInterval(timerInterval);
    isClockRunning = false;
    pauseStartTime = elapsedTime;
  }
  isClockRunning = false;
}

// Function to reset the clock
function resetClock() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  pauseStartTime = 0;
  localStorage.removeItem('elapsedTime');
  document.getElementById('hour').textContent = '00';
  document.getElementById('minute').textContent = '00';
  document.getElementById('second').textContent = '00';
  document.getElementById('millisecond').textContent = '00';
  isClockRunning = false;
}

// Function to toggle clock start/pause
function toggleClock() {
  if (!isClockRunning) {
    startClock();
    document.getElementById('startPauseButton').textContent = 'Pause';
  } else {
    pauseClock();
    document.getElementById('startPauseButton').textContent = 'Resume';
  }
  document.getElementById('resetButton').textContent = 'Reset';
}

// Event listeners for start/pause and reset buttons
document.getElementById('startPauseButton').addEventListener('click', toggleClock);
document.getElementById('resetButton').addEventListener('click', function() {
  resetClock();
  document.getElementById('startPauseButton').textContent = 'Start';
});

// Initialize clock display
  localStorage.setItem('elapsedTime', elapsedTime.toString());
  document.getElementById('hour').textContent = formatTime(elapsedTime).slice(0, 2);
  document.getElementById('minute').textContent = formatTime(elapsedTime).slice(3, 5);
  document.getElementById('second').textContent = formatTime(elapsedTime).slice(6, 8);
 document.getElementById('millisecond').textContent = formatTime(elapsedTime).slice(9, 11);
  
if (localStorage.getItem('elapsedTime') && localStorage.getItem('isClockRunning') === 'true') {
    pauseStartTime = elapsedTime;
}