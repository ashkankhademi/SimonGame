var result = false;
var patterncheck = true;
var counter = 1;

var random = ["green", "red", "yellow", "blue"];
var patternsaver = []; // Generated sequence
var userclicks = []; // User's clicks

// Event listener for button clicks
$('.btn').click(function (event) {
    if (!result) {
        // Game over if result is false
        $('body').css('background-color', 'red');

        var sound = new Audio("sounds/wrong.mp3");
        sound.play();


        $('h1').text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $('body').css('background-color', '');
        }, 500);

    } else {
        // Save the user's click
        var buttonId = $(this).attr('id');
        userclicks.push(buttonId);

        // Play the button sound
        var sound = new Audio("sounds/" + buttonId + ".mp3");
        sound.play();

        // Check the user's input
        checkUserClick(userclicks.length - 1); // Compare current click
    }
});

// Event listener for starting the game
$(document).keypress(function () {
    if (!result) {
        $('h1').text("Level " + counter);
        result = true; 

        nextSequence(); // Generate the next sequence
    }
});

// Generate the next step in the sequence
function nextSequence() {
    userclicks = []; // Reset user's clicks
    var randomIndex = Math.floor(Math.random() * random.length);
    var randomColor = random[randomIndex];

    // Flash the selected button
    $('#' + randomColor).addClass('pressed');
    setTimeout(function () {
        $('#' + randomColor).removeClass('pressed');
    }, 500);

    patternsaver.push(randomColor); // Save the generated color
}

// Check user's clicks
function checkUserClick(currentLevel) {
    if (userclicks[currentLevel] === patternsaver[currentLevel]) {
        // If user matched the current step
        if (userclicks.length === patternsaver.length) {
            // If the user has completed the sequence
            setTimeout(function () {
                counter++;
                $('h1').text("Level " + counter);
                nextSequence(); // Generate the next level
            }, 1000);
        }
    } else {
        // If user made a mistake
        $('body').css('background-color', 'red');

        var sound = new Audio("sounds/wrong.mp3");
        sound.play();

        $('h1').text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $('body').css('background-color', '');
        }, 500);

        startOver(); // Reset the game
    }
}

// Reset the game
function startOver() {
    result = false;
    patternsaver = [];
    counter = 1;
}

        





















