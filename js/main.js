$(document).ready(function() {

var firebaseConfig = {
  apiKey: "AIzaSyApgFiZLePsuQKK7czF8uMSgwA9o8BBhRg",
  authDomain: "hallowed-be-thy-train.firebaseapp.com",
  databaseURL: "https://hallowed-be-thy-train.firebaseio.com",
  projectId: "hallowed-be-thy-train",
  storageBucket: "",
  messagingSenderId: "231354534972",
  appId: "1:231354534972:web:c651acae66e4a968"
};
// Initialize Firebase 
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

  $("#submit").on("click", function() {
  let trainName = $('#name').val().trim();
 	let trainDestination = $('#destination').val().trim();
 	let trainDeparture = $('#departure').val().trim();
  let trainFrequency = $('#frequency').val().trim();
  let minutesAway;
  var currentTime = moment();

 	console.log(trainName)
 	console.log(trainDestination)
 	console.log(trainDeparture)
  console.log(trainFrequency)
  console.log('CURRENT TIME: ' + moment(currentTime).format('hh:mm:ss A'));

  database.ref().push({
    name: trainName,
    destination: trainDestination,
    firstTime: trainDeparture,
    frequency: trainFrequency
});
  
$("#name").val("");
$("#destination").val("");
$("#departure").val("");
$("#frequency").val("");
  
  return false;
});
database.ref().on("child_added", function(snapshot){
	console.log(snapshot.val());
	console.log(snapshot.val().name);
	console.log(snapshot.val().destination);
	console.log(snapshot.val().firstTime);
	console.log(snapshot.val().frequency);
  
  //redefining firstTime in snapshot
  var firstTime = snapshot.val().firstTime;
  //redefining frequency in snapshot
  var frequency = snapshot.val().frequency;
  var currentTime = moment();
  console.log(currentTime);

  var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
	  console.log(firstTimeConverted);
  //difference in time between current time and converted time
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("difference in time " + diffTime);

  
  var tRemainder = diffTime % frequency;
  var minutesAway = frequency - tRemainder;
  var nextTime = moment().add(minutesAway, "minutes");
  var nextTrainTime = moment(nextTime).format("hh:mm a");
	$("#table").append("<tr><td>" + snapshot.val().name + "</td><td>" + snapshot.val().destination + "</td><td>" + frequency +  "</td><td>" + nextTrainTime +  "</td><td>" + minutesAway + "</td></tr>");
	}, function(errorObject){
  });
})
