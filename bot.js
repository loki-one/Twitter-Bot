console.log("follow bot is starting.");

var Twit = require('twit'); //import the library or module.

var config = require('./config');
//console.log(config);
var T = new Twit(config);

/*Basic commands:
get() -> you can search by hashtag, by location, by user.
post() -> tweeting!
stream() -> eg. any time someone @mentions me on twitter do something like tweet thank you.*/

//setting up a user stream
var stream = T.stream('user');

// Anytime someone follows me
stream.on('follow', followed);

/*This function will be called whenever someone follows you! or follow event occurs*/
function followed(eventMsg){
  console.log('you got followed');
  var name = eventMsg.source.name;
  var screenName = eventMsg.source.screen_name;
  tweetIt('.@'+screenName+' thank you for following!');
}

// Anytime someone tweets you, the bot will reply with thank you for tweeting me!
stream.on('tweet', tweetEvent);

/*This function will be called whenever someone follows you! or follow event occurs*/
function tweetEvent(eventMsg){
  // var fs = require('fs');
  // var json = JSON.stringify(eventMsg, null, 2);
  // fs.writeFile("tweet.json", json);
  var replyto = eventMsg.in_reply_to_screen_name;
  var text = eventMsg.text;
  var from = eventMsg.user.screen_name;

  console.log(replyto + ' ' + from);
  if(replyto === 'test_loki'){
    var newtweet = '@'+ from + ' thank you for tweeting me!'
    tweetIt(newtweet);
  }
}

/* Example for get() for getting tweets with codingtrain*/
function tweetGetIt(){

  var params = {
    q: 'codingtrain',
    count: 10
  }

  function gotData(err, data, response){
    var tweets = data.statuses;
    for (var i = 0; i < tweets.length; i++){
      console.log(tweets[i].text);
    }
  }

  T.get('search/tweets', params, gotData);

}

/*Exampe for posting a tweet with post()*/
function tweetIt(txt){

  // var r = Math.floor(Math.random()*100);
  // var tweet = {
  //   status: 'my random number '+ r +' #codingtrain from node.js'
  // };

  var tweet = {
    status: txt
  }

  function tweeted(err, data, response){
    if (err) {
      console.log('Something went wrong!');
    }else {
      console.log('It works');
    }
  }

  T.post('statuses/update', tweet, tweeted);

}

//tweetGetIt();
//tweetIt();

// tweeting every 20 secs
//setInterval(tweetIt, 1000*20);
