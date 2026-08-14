//  ============  custom js start  ==========  //

// counter js start

$(function () {
  // Wedding date: 24 November 2026, 12:00 AM IST
  var targetDate = new Date("2026-11-24T00:00:00+05:30");
  var now = new Date();

  // Calculate remaining time
  var difference = targetDate - now;

  window.days = Math.floor(difference / (1000 * 60 * 60 * 24));

  var secondsLeft = Math.floor(difference / 1000);

  window.hours = Math.floor((secondsLeft % (60 * 60 * 24)) / (60 * 60));

  window.minutes = Math.floor((secondsLeft % (60 * 60)) / 60);

  window.seconds = secondsLeft % 60;

  startCountdown();
});

var interval;

// Start countdown
function startCountdown() {
  $("#input-container").hide();
  $("#countdown-container").show();

  displayValue("#js-days", window.days);
  displayValue("#js-hours", window.hours);
  displayValue("#js-minutes", window.minutes);
  displayValue("#js-seconds", window.seconds);

  interval = setInterval(function () {
    if (window.seconds > 0) {
      window.seconds--;
      displayValue("#js-seconds", window.seconds);
    } else {
      // Seconds is zero - check minutes
      if (window.minutes > 0) {
        window.minutes--;
        window.seconds = 59;

        updateValues("minutes");
      } else {
        // Minutes is zero - check hours
        if (window.hours > 0) {
          window.hours--;
          window.minutes = 59;
          window.seconds = 59;

          updateValues("hours");
        } else {
          // Hours is zero - check days
          if (window.days > 0) {
            window.days--;
            window.hours = 23;
            window.minutes = 59;
            window.seconds = 59;

            updateValues("days");
          } else {
            // Countdown finished
            clearInterval(interval);

            window.days = 0;
            window.hours = 0;
            window.minutes = 0;
            window.seconds = 0;

            updateValues("days");
          }
        }
      }
    }
  }, 1000);
}

// Update countdown values
function updateValues(context) {
  if (context === "days") {
    displayValue("#js-days", window.days);
    displayValue("#js-hours", window.hours);
    displayValue("#js-minutes", window.minutes);
    displayValue("#js-seconds", window.seconds);
  } else if (context === "hours") {
    displayValue("#js-hours", window.hours);
    displayValue("#js-minutes", window.minutes);
    displayValue("#js-seconds", window.seconds);
  } else if (context === "minutes") {
    displayValue("#js-minutes", window.minutes);
    displayValue("#js-seconds", window.seconds);
  }
}

// Display countdown value
function displayValue(target, value) {
  var newDigit = $("<span></span>");

  $(newDigit).text(pad(value)).addClass("new");

  $(target).prepend(newDigit);

  $(target).find(".current").addClass("old").removeClass("current");

  setTimeout(function () {
    $(target).find(".old").remove();

    $(target).find(".new").addClass("current").removeClass("new");
  }, 900);
}

// Add leading zero only for numbers below 10
// 1   -> 01
// 9   -> 09
// 10  -> 10
// 99  -> 99
// 101 -> 101
function pad(number) {
  return number < 10 ? "0" + number : number;
}

// AOS animation js start

AOS.init();

$(document).on("ready", function () {
  AOS.init({
    duration: 2000,
    once: true,
  });
});

// ============ Background Music ============ //

$(document).ready(function () {

    const music = document.getElementById("bgMusic");

    if (!music) {
        console.log("Music element not found");
        return;
    }

    music.volume = 0.5;

    function startMusic() {

        music.play()
            .then(function () {
                console.log("Music started successfully");
            })
            .catch(function (error) {
                console.log("Music could not be played:", error);
            });

        // Remove listeners after first interaction
        document.removeEventListener("click", startMusic);
        document.removeEventListener("touchstart", startMusic);
    }

    // Start music when user clicks/taps anywhere
    document.addEventListener("click", startMusic);
    document.addEventListener("touchstart", startMusic);

});