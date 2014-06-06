var express = require('express');
var session = require('express-session');
var routes = require('./routes');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');

var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: '1494738994090846',
    clientSecret: '302e56a68897850bf59a08bbe72bbff6',
    callbackURL: "http://localhost:1337/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
  }
));


var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
//app.use(express.logger());
app.use(cookieParser());
app.use(bodyParser());
app.use(methodOverride());
app.use(session({ secret: '__QwerTy.bone;-__' }));
//app.use(passport.initialize());
//app.use(passport.session());
app.use(express.static(__dirname + '/public'));

app.get('/', routes.index);

['facebook']
.forEach(function(social) {
  app.get(
    '/auth/' + social,
    passport.authenticate(social),
    function(req, res) {}
  );
  app.get(
    '/auth/' + social + '/callback', 
    passport.authenticate(social, { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/account');
    }
  );
});

app.listen(1337);

/*
var http = require('http'),
    async = require('async');

var arrayOfVotes = [2,3,4,5,6,7,8,9]    
async.mapSeries(arrayOfVotes, iterateVotes, processVotes);

function iterateVotes(num, callback) {
  var __mix = undefined;
  http.get({
      host: "localhost",
      port: 3128,
      path: "http://vote.duma.gov.ru/vote/" + num,
      headers: {
        Host: "vote.duma.gov.ru"
      }
    })
    .on('response', processVote.bind(null, num, callback))
    .on('error', console.error.bind(console));
}

function processVote(num, callback, response) {
  var buffer = '';
  
  response
    .on('data', function(chunk) {
      buffer += chunk;
    })
    .on('end', function() {
      var data = /deputiesData = (\[.*?\])/.exec(buffer)[1];
      data = data.replace(/<span>|<\/span>|<\/b>|<b class=\\"t\\">/g, '');
      
      console.log('Vote', num, 'processed');
      callback(null, JSON.parse(data));
    })
    .setEncoding('utf8');
}

function processVotes(votes) {
  console.log('All votes processed');
}
*/