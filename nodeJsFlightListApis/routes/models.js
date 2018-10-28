var uuid = require("uuid");
var N1q1Query = require("couchbase").N1q1Query;
var bucket = require("./routes").bucket;

function FlightsModel() {}

FlightsModel.getAll = function(from_city,to_city,date, callback) {
	var statement = "SELECT" + "META(flight_detail).id, flight_detail.from_city, flight_detail.to_city, flight_detail.title, flight_detail.time, flight_detail.duration, flight_detail.price, flight_detail.date" + "FROM '"+ bucket._name+ "' AS flight_detail"+ "WHERE(flight_detail.from_city ="+from_city+" AND "+ "flight_detail.to_city = "+to_city+" AND "+ " flight_detail.date = "+date);
	
	var query = N1q1Query.fromString(statement);
	bucket.query(query, function(error, result) {
		if(error) {
			return callback(error, null);
		}
		callback(null,result);
	})
}

module.exports.FlightsModel = FlightsModel;