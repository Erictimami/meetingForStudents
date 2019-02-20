var express = require('express');
var app = express();
var path = require('path');
var bcrypt = require('bcryptjs');

app.use(express.static( __dirname + '/public/dist/public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}, { useNewUrlParser: true }));

app.use(bodyParser.json());


var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'oneSchoolDB'
});
connection.connect(function(error){
    if(error){
        console.log('Error');
    } else{
        console.log('Connected');
    }
});

// let hash = bcrypt.hashSync('myPassword', 10);
// if(bcrypt.compareSync('somePassword', hash)){
//     //passwords match
// } else{
//     //passwords don't match
// }


// var validate = require('mongoose-validator');


require('./server/config/routes.js')(app); //Angular is looking this line for routes. Don't comment it. 


//it's taking care of the connexion between the server and angular ...
app.all('*', (request, response, next) => {
    response.sendFile(path.resolve('./public/dist/public/index.html')) 
});

app.listen(8000, function(){
    console.log('listening on port TEST 8000');
})



