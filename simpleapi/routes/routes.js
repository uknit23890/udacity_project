var faker = require("faker");
var cors = require('cors');
var fs = require('fs');
var flightObj;
const morgan = require('morgan');

fs.readFile('data.json', 'utf8', function(err, data) {
    if (err)
        throw err;
    flightObj = JSON.parse(data);
});
var appRouter = function (app) {
	app.use(cors());//use this after the variable declaration

  app.get("/", function(req, res) {
    res.status(200).send("Welcome to our restful API");
  });

app.get("/user", function (req, res) {
    var data = ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: faker.internet.userName(),
      email: faker.internet.email()
    });
    res.status(200).send(data);
  });
  
 app.get('/cities', function(req, res) {
    res.json(flightObj.cities); // return all cities in JSON format
});

 app.get("/getFlightSearch/:from/:to", function(req, res) {
	 console.log(req.params.from);
	 var f = req.params.from;
	 var t = req.params.to;
	 var flightFound = flightObj.flights.filter(function(item) {
				if(item.from_city_id == f && item.to_city_id == t) {
					return item;
				};
		});
	res.status(200).send(flightFound); 	
 });
 
 app.get("/getFlights", function(req, res) {
	 console.log(req.params.search.from);
	 var f = req.params.from;
	 var t = req.params.to;
	 var flightFound = flightObj.flights.filter(function(item) {
				if(item.from_city_id == f && item.to_city_id == t) {
					return item;
				};
		});
	res.status(200).send(flightFound); 	
 });
 
app.get('/flights', function(req, res) {
	var flights = [];
    flights = res.json(flightObj.flights); // return all cities in JSON format
});

 app.get("/users/:num", function (req, res) {
   var users = [];
   var num = req.params.num;

   if (isFinite(num) && num  > 0 ) {
     for (i = 0; i <= num-1; i++) {
       users.push({
           firstName: faker.name.firstName(),
           lastName: faker.name.lastName(),
           username: faker.internet.userName(),
           email: faker.internet.email()
        });
     }

     res.status(200).send(users);
    
   } else {
     res.status(400).send({ message: 'invalid number supplied' });
   }

 });
}
module.exports = appRouter;