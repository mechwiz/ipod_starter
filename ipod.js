// Global Variables:
var tracklist = ["Let It Happen", "Nangs", "The Moment", "Yes I'm Changing", "Eventually", "Gossip", "The Less I Know The Better", "Past Life", "Disciples", "'Cause I'm A Man"];
var volLevels = [];
var songChange = false; // Tracks if the next or previous
                        // song button has been clicked


function init() {
	// Put all volume level ids into an array
    for (i=0;i<6;i++) {
        volLevels[i] = document.getElementById("vl"+i.toString());
    }

    // Fill the first 3 volume levels with color
    for (i=0;i<3;i++) {
        volLevels[i].style.backgroundColor = "#9f5cc4";
    }
}

function volUp() {
	// Loop through array until an unfilled level bar is found and fill it
    // If all of them are filled, then do nothing
    for (i=0;i<6;i++) {
        if (volLevels[i].style.backgroundColor != "rgb(159, 92, 196)") {
            volLevels[i].style.backgroundColor = "#9f5cc4";
            break;
        }
    }
}

function volDown() {
    // Loop through array until a filled level bar is found and unfill it
    // If all of them are unfilled, then do nothing
    for (i=5;i>=0;i--) {
        if (volLevels[i].style.backgroundColor == "rgb(159, 92, 196)") {
            volLevels[i].style.backgroundColor = "white";
            break;
        }
    }
}

function switchPlay() {
	// Switch the play icon to pause and vice-versa depending if the
    // user hits play or pause
    var pp = document.getElementById("play-pause").innerHTML;
    if (pp=="play_arrow") {
        document.getElementById("play-pause").innerHTML="pause";
    } else {
        document.getElementById("play-pause").innerHTML="play_arrow";
    }
}

function updateTime() {
    // This function is run every second to keep track of the
    // slider bar and the time elapsed.

    // Check to see if song was changed
    // If so, then reset slider and time elapsed to 0
    if (songChange==true) {
        songChange = false;
        document.getElementById("player-time").value = 0;
        document.getElementById("time-elapsed").innerHTML = secondsToMs(0);
        // Uncomment the following line if line 92 is also uncommented
        // document.getElementById("time-total").innerHTML = secondsToMs(180);
    } else {
        // If song was not changed, then check to see if player
        // is in play or pause mode
        var t;
        if (document.getElementById("play-pause").innerHTML=="pause") {
            // If the player button is showing pause
            // (i.e. the player is playing), then increase player time by 1
            t = parseInt(document.getElementById("player-time").value) + parseInt(1);

            // If song is over, move to next song
            if (t>180) {
                t = 0;
                nextSong();
            }

        } else {
            // If the player button is showing play
            // (i.e. the player is paused), then update player time
            // in case the slider was moved
            t = parseInt(document.getElementById("player-time").value);
        }

        // Update the slider value and the time elapsed using
        // the updated player time value
        document.getElementById("player-time").value = t;
        document.getElementById("time-elapsed").innerHTML = secondsToMs(t);
        // Uncomment the following line to see the total time left of the song
        // document.getElementById("time-total").innerHTML = secondsToMs(180-t);
    }
}


function nextSong() {
	// Loops through song array until the index of the current song is found.
    // Then change the name to the next song in the list
    songChange=true;
    for (i=0;i<tracklist.length;i++) {
        if (tracklist[i]==document.getElementById("player-song-name").innerHTML) {

            // If last song in list is in play, loop back to the beginning of list
            if (i==tracklist.length-1) {
                document.getElementById("player-song-name").innerHTML=tracklist[0];
            } else {
                document.getElementById("player-song-name").innerHTML=tracklist[i+1];
            }
            break;
        }
    }
}

function prevSong() {
	// Loop through song array until the index of the current song is found.
    // Then change the name to the previous song in the list
    songChange=true;
    for (i=tracklist.length-1;i>=0;i--) {
        if (tracklist[i]==document.getElementById("player-song-name").innerHTML) {

            // If first song is in play, loop back to the end of list
            if (i==0) {
                document.getElementById("player-song-name").innerHTML=tracklist[tracklist.length-1];
            } else {
                document.getElementById("player-song-name").innerHTML=tracklist[i-1];
            }
            break;
        }
    }
}

function secondsToMs(d) {
    d = Number(d);

    var min = Math.floor(d / 60);
    var sec = Math.floor(d % 60);

    return `0${min}`.slice(-1) + ":" + `00${sec}`.slice(-2);
}

init(); // Initialize volume levels
setInterval(updateTime,1000); // Update relevant page info every second
