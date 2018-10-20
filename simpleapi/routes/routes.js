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
  
 app.get('/cities', function(req, res) {
    res.json(flightObj.cities); // return all cities in JSON format
});

 app.get('/flights', function(req, res) {
    res.json(flightObj.flights); // return all cities in JSON format
});

 app.get("/getFlightSearch/:from/:to/:date", function(req, res) {
	 console.log(req.params);
	 var f = req.params.from;
	 var t = req.params.to;
	 var d = req.params.date;
	 var flightFound = flightObj.flights.filter(function(item) {
				if((item.from_city == f && item.to_city == t) && (item.date == d)) {
					return item;
				};
		});
	res.status(200).send(flightFound); 	
 });
 
 app.get("/getFlightsByFlightNumber/:flightNum", function(req, res) {
	 var f = req.params.flightNum;
	 var flightFound = flightObj.flights.filter(function(item) {
				if(item._id == f) {
					return item;
				};
		});
	res.status(200).send(flightFound); 	
 });
 
}
module.exports = appRouter;