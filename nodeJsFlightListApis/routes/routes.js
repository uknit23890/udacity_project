var cors = require('cors');
var fs = require('fs');
var couchbase = require('couchbase');
var flightObj;
var cluster = new couchbase.Cluster("couchbase://localhost");
var bucket = cluster.openBucket("flights");
var FlightsModel = require("./models").FlightsModel;
const morgan = require('morgan');

fs.readFile('data.json', 'utf8', function(err, data) {
    if (err)
        throw err;
    flightObj = JSON.parse(data);
 });

var appRouter = function (app) {
	app.use(cors());//use this after the variable declaration
	
  app.get("/", function(req, res) {
	res.send('Welcome');
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

FlightsModel.getAll(f,t,d,function(error, result) {
	if(error) {
		return res.status(400).send(error);
	}
	res.send(result);
})	 
 });
 
 app.get("/getFlightsByFlightNumber/:flightNum", function(req, res) {
 bucket.get(req.params.flightNum, function(error, result) {
	if(error) {
		return res.status(400).send(error);
	}
	res.send(result);
});
 });
 
}
module.exports = appRouter;