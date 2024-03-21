const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const radius = 90; // 円の半径
let seconds = 10;
let isRunning = false;
let interval;

updateTimerText();

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(100, 100, radius, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * (10 - seconds) / 10);
    ctx.lineTo(100, 100);
    ctx.closePath();
    ctx.fillStyle = '#ff0000';
    ctx.fill();
}

function updateTimerText() {
    ctx.font = '24px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(seconds + '秒', 100, 100);
}

function toggleAnimation() {
    if (isRunning) {
        clearInterval(interval);
        isRunning = false;
    } else {
        isRunning = true;
        startCountdown();
    }
}

function resetCountdown() {
    clearInterval(interval);
    seconds = 10;
    draw();
    updateTimerText();
    isRunning = false;
}

function startCountdown() {
    draw();
    updateTimerText();
    interval = setInterval(() => {
        seconds--;
        if (seconds < 0) {
            clearInterval(interval);
            resetCountdown();
            return;
        }
        draw();
        updateTimerText();
    }, 1000);
}

canvas.addEventListener('click', toggleAnimation);
canvas.addEventListener('dblclick', resetCountdown);
