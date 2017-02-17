//liri.js

var k = require('./keys');
var T = require('twitter');
var S = require('spotify');
var R = require('request');
var fs = require('fs');
var imdb = require('imdb-api');
var p = process.argv;

var command = p[2];
var arg2 = p[3];

for (i = 4; i < p.length; i++){
	arg2 += ' ' + p[i];
}

//SPOTIFY
var client_id = 'f3de64b71de44fd48a83a4e12d7b847e'; // Your client id
var client_secret = '1f2b33bfc5d94bf3a451523ef418d191'; // Your secret
var redirect_uri = 'http://www.google.com'; // Your redirect uri


//TWITTER
var consumer_secret = k.twitterKeys.consumer_secret;
var consumer_key = k.twitterKeys.consumer_key;
var access_token_key = k.twitterKeys.access_token_key;
var access_token_secret = k.twitterKeys.access_token_secret;

var client = new T({
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  access_token_key: access_token_key,
  access_token_secret: access_token_secret
});

function movie(){
	var movie;
 	if (!arg2) {
 		arg2 = 'mr nobody';
 	}

	imdb.getReq({ name: arg2 }, (err, things) => {
	    movie = things;
	    console.log('\r\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n');
	    console.log('Title:         ' + movie.title +'\r\n');
	    console.log('Year:          ' + movie.year +'\r\n');
	    console.log('Rating:        ' + movie.rating +'\r\n');
	    console.log('Country:       ' + movie.country +'\r\n');
	    console.log('Language(s):   ' + movie.languages +'\r\n');
	    console.log('Actors:        ' + movie.actors +'\r\n');
	    console.log('Plot:          ' + movie.plot +'\r\n');
	    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
	});
}

    // * Title of the movie.
    // * Year the movie came out.
    // * IMDB Rating of the movie.
    // * Country where the movie was produced.
    // * Language of the movie.
    // * Plot of the movie.
    // * Actors in the movie.
    // * Rotten Tomatoes Rating.
    // * Rotten Tomatoes URL.


function myTweets() {
	client.get('statuses/user_timeline', 'bigllamashouse', function(error, tweets, response) {
	 	if(error) throw error;
	 	console.log('\r\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n\r\n');
		for (i in tweets) {
		  	console.log('Timestamp:           ' + tweets[i].created_at);
		  	console.log('Text:                ' + tweets[i].text + '\r\n\r\n');
	  	}
	  	console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n');
	});
}

function spotifySong(){
	if (!arg2){
		arg2 = 'The Sign Ace of Base';
	}
	S.search({ type: 'track', query: arg2}, function(err,data){
		if (err) {
			console.log(err);
		}
		console.log('\r\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n');
		console.log('Artist name:   	' + data.tracks.items[0].artists[0].name);
		console.log('Song name:     	' + data.tracks.items[0].name);
		//preview link and album
		// console.log(data.tracks.items[0]);
		console.log('Preview URL:   	' + data.tracks.items[0].preview_url);
		console.log('Album name:    	' + data.tracks.items[0].album.name);
		console.log('\r\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n');
	});
}

function doit() {
	var string = fs.readFileSync('random.txt', 'utf8');
	string = string.split(',');
	arg2 = string[1];
	command = string[0];
	command = command.slice(2,command.length);
	run(command);
	console.log(command);
	console.log(arg2);
}



function run(command){
	switch(command) {
		case 'my-tweets':
			myTweets();
			break;
		case 'spotify-this-song':
			spotifySong();
			break;
		case 'movie-this':
			movie();
			break;
		case 'do-what-it-says':
			doit();
			break;

	}
}

run(command);

