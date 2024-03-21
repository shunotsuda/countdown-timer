document.addEventListener("DOMContentLoaded", function () {
    const stopwatch = document.querySelector(".stopwatch");
    const countdown = document.querySelector(".countdown");
    const circle = document.querySelector(".circle");

    let countdownValue = 20; // count minits
    let isRunning = false;
    let intervalId;
    resetCountdown()

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(
            2,
            "0"
        )}:${String(seconds).padStart(2, "0")}`;
    }

    function updateCountdown() {
        countdown.textContent = formatTime(countdownValue);
    }

    function startCountdown() {
        clearInterval(intervalId); // タイマーを停止してから再開する
        intervalId = setInterval(() => {
            countdownValue--;
            updateCountdown();
            if (countdownValue <= 0) { // カウントダウンが0以下の場合は停止
                clearInterval(intervalId);
                countdownValue = 0; // マイナスにならないようにする
                countdown.textContent = "Finish";
                circle.style.animationPlayState = "paused";
            }
        }, 1000);
        circle.style.animationPlayState = "running";
    }

    function toggleAnimation() {
        if (isRunning) {
            clearInterval(intervalId);
            circle.style.animationPlayState = "paused";
        } else {
            startCountdown();
        }
        isRunning = !isRunning;
    }

    function resetCountdown() {
        clearInterval(intervalId);
        countdownValue = 20 
        updateCountdown();
        circle.style.animation = "none"; // Reset animation
        void circle.offsetWidth; // Trigger reflow
        circle.style.animation = `fillCircle ${countdownValue}s linear forwards`; // Restart animation
        circle.style.animationPlayState = "paused"; // Pause animation
        isRunning = false;
    }

    stopwatch.addEventListener("click", toggleAnimation);
    stopwatch.addEventListener("dblclick", resetCountdown);
});

