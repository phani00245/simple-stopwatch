document.addEventListener('DOMContentLoaded', function() {

    // Okay, first things first, let's grab those elements from the HTML.
    let display = document.getElementById('timeDisplay');
    let startButton = document.getElementById('startBtn');
    let stopButton = document.getElementById('stopBtn');
    let resetButton = document.getElementById('resetBtn');

    // We'll need these to keep track of time and the timer's state.
    let timerInterval;
    let startTime = 0; // When did we start?
    let running = false; // Is the timer running?
    let pausedTime = 0; // How much time was paused?

    // This function turns milliseconds into a nice time string.
    function formatTime(milliseconds) {
        let totalSeconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        let ms = Math.floor((milliseconds % 1000) / 10);

        // Make sure everything's two digits, like "01:05:03".
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(ms).padStart(2, '0')}`;
    }

    // This updates the display with the current time.
    function updateTimer() {
        let now = Date.now();
        let elapsed = now - startTime;
        display.textContent = formatTime(elapsed + pausedTime); // Don't forget the paused time!
    }

    // What happens when you click "Start"?
    startButton.addEventListener('click', function() {
        if (!running) {
            // Start the timer!
            startTime = Date.now();
            timerInterval = setInterval(updateTimer, 10); // Update every 10ms for accuracy.
            running = true;
            startButton.textContent = 'Pause'; // Change the button text.
        } else {
            // Pause the timer.
            clearInterval(timerInterval);
            running = false;
            pausedTime += Date.now() - startTime; // Save the paused time.
            startButton.textContent = 'Resume'; // Change the button text.
        }
    });

    // What about "Stop"?
    stopButton.addEventListener('click', function() {
        clearInterval(timerInterval); // Stop the timer.
        running = false;
        pausedTime = 0; // Reset the paused time.
        startButton.textContent = 'Start'; // Back to the beginning.
    });

    // And "Reset"?
    resetButton.addEventListener('click', function() {
        clearInterval(timerInterval); // Stop the timer.
        display.textContent = '00:00:00'; // Back to zero.
        startTime = 0;
        pausedTime = 0; // Reset the paused time too.
        startButton.textContent = 'Start'; // Ready to go again.
    });

});