// The Firebase functions
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const database = admin.database();

// Returns a list of all the users who have ordered in this venue order 
// with related data about their orders
exports.handler = function (req, res) {
  // Getting data from the request
  var venueOrderId = req.query.venue_order_id

  //The DB references needed
  var venueOrder = database.ref("venueOrders/" + venueOrderId + "/userOrders");
  var users = database.ref("users");

  // Getting the users data from the users node
  var usersIDs = [] // declaring the usersIDs to access it in all the functions
  //getting the users Ids from the venueOrder node
  venueOrder.once("value")
    .then(function (snapShot) {
      usersIDs = Object.keys(snapShot.val())
    })
    //getting the users data from the users node
    .then(users.once("value").then(function (data) {
      var users = data.val();
      var usersData = []
      for (var i = 0; i < usersIDs.length; i++) {
        var userID = usersIDs[i]
        var userObj = {}
        userObj.id = usersIDs[i]
        userObj.name = users[userID].name
        userObj.image = users[userID].img
        userObj.phone = users[userID].phone
        userObj.profile = users[userID].fb_profile
        usersData.push(userObj);
      }
      // Responding with a success message
      var responseObj = {}
      responseObj.status = "Successful request"
      responseObj.result = usersData
      res.status(200).send(responseObj)
    })
      // Catching errorsr and sending Error message
      .catch(function (error) {
        console.log(error);
        res.status(500).send({ error: "couldn't retrieve data from the database" });
      })
    );
};