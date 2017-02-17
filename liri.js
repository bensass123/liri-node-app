//liri.js

var k = require('./keys');
var T = require('twitter');
var S = require('spotify');
var R = require('request');
var fs = require('fs');
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


function myTweets() {
	client.get('statuses/user_timeline', 'bigllamashouse', function(error, tweets, response) {
	 	if(error) throw error;
		for (i in tweets) {
		  	console.log(tweets[i].created_at);
		  	console.log(tweets[i].text);
	  	}
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
		console.log(data.tracks.items[0].artists[0].name);
		console.log(data.tracks.items[0].name);
		//preview link and album
		// console.log(data.tracks.items[0]);
		console.log(data.tracks.items[0].preview_url);
		console.log(data.tracks.items[0].album.name);
	});
}

function doit() {
	var string = fs.readFileSync('random.txt', 'utf8');
	console.log(string);
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
			
			break;
		case 'do-what-it-says':
			doit();
			break;

	}
}

run(command);

