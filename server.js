var express = require ("express");
var bodyParser= require("body-parser");

var PORT = process.env.PORT || 3000;
var app = express();
var router = require('./controllers/api.js');
var db = require ("./models");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text());
app.use(express.static('public'));
app.use('/api', router);
app.use('/', function (req, res){
    res.render('./views/index.html')
});

db.sequelize.sync().then(function(){
    app.listen(PORT, function() {
        console.log("Listening on port %s", PORT);
    })
});
