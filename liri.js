require("dotenv").config();
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var input = process.argv[2];
var input2 = process.argv[3];

switch(input){
  case 'my-tweets':
    pullTweats();
    break;

  case 'spotify-this-song':
    Spotify(input2);
    break;

  case 'movie-this':
    movie(input2);
    break;

  case 'do-what-it-says':
    doit();
    // break;

};

function pullTweats () {
  //twitter API
  

}

function Spotify (song) {
  //get song

}

function movie (movieName) {
  // Code Goes Here...
}

function doit () {
  //take text from text.txt and do something with it.
}
