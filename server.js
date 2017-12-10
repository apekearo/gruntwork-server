var opbeat = require('opbeat').start()
var express = require ("express");
var bodyParser= require("body-parser");
var cookieParser = require('cookie-parser');
var morgan = require("morgan");

var PORT = process.env.PORT || 3000;
var app = express();
var router = require('./controllers/api.js');
var db = require ("./models");

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(morgan("dev"));
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text());
app.use(express.static('public'));
app.use(allowCrossDomain);
app.use('/api', router);
app.use('*', function (req, res){
    // res.render('./views/index.html')
    res.sendFile('./public/index.html', { root: __dirname });
});
//adding opbeat heroku module
app.use(opbeat.middleware.express())
// app.use(function(err, req, res, next) {
//     console.log(err);
//     next();
// })

db.sequelize.sync().then(function(){
    app.listen(PORT, function() {
        console.log("Listening on port %s", PORT);
    })
});
