window.onload = () => {

    var minutes = 00;
    var seconds = 00;
    var tens = 00;
    var appendTens = document.getElementById("tens")
    var appendSeconds = document.getElementById("seconds")
    var appendMinutes = document.getElementById("minutes")
    var buttonStart = document.getElementById('button-start');
    var buttonStop = document.getElementById('button-stop');
    var buttonReset = document.getElementById('button-reset');
    var Interval;

    buttonStart.onclick = () => {
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
    }

    buttonStop.onclick = () => {
        clearInterval(Interval);
    }

    buttonReset.onclick = () => {
        clearInterval(Interval);
        tens = "00";
        seconds = "00";
        minutes = "00";
        appendTens.innerHTML = tens;
        appendSeconds.innerHTML = seconds;
        appendMinutes.innerHTML = minutes;
    }

    const startTimer = () => {
        tens++;

        // Tens
        if (tens <= 9) {
            appendTens.innerHTML = "0" + tens;
        }
        if (tens >= 10) {
            appendTens.innerHTML = tens;
        }
        if (tens >= 100) {
            console.log("+1 second");
            seconds++;
            appendSeconds.innerHTML = "0" + seconds;
            tens = 0;
            appendTens.innerHTML = "0" + 0;
        }

        // Seconds
        if (seconds >= 10) {
            appendSeconds.innerHTML = seconds;
        }
        if (seconds >= 60) {
            console.log("+1 minute");
            minutes++;
            appendMinutes.innerHTML = "0" + minutes;
            seconds = 0;
            appendSeconds.innerHTML = "0" + 0;
        }

        // Minutes
        if (minutes >= 10) {
            appendMinutes.innerHTML = minutes;
        }
    }


}