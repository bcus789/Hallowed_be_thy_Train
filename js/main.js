$(document).ready(function() {})

$("#submit").on("click", function(){
  let trainName = $('#name').val().trim();
 	let trainDestination = $('#destination').val().trim();
 	let trainDeparture = $('#departure').val().trim();
  let trainFrequency = $('#frequency').val().trim();
  let minutesAway;
  let currentTime = moment();

 	console.log(trainName)
 	console.log(trainDestination)
 	console.log(trainDeparture)
  console.log(trainFrequency)
  console.log('CURRENT TIME: ' + moment(currentTime).format('hh:mm:ss A'));

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
  var trainData = firebase.database();
  var newTrain = {
    name:  trainName,
    destination: trainDestination,
    trainTime: trainDeparture,
    frequency: trainFrequency,
  }
  trainData.push(newTrain);

		// clear text-boxes
		$("#name").val("");
		$("#destination").val("");
		$("#departure").val("");
    $("#frequency").val("");
    
    return false;
  });
  var trainData = firebase.database();
  
  trainData.on("child_added", function(childSnapshot, prevChildKey){

		console.log(childSnapshot.val());

		// assign firebase variables to snapshots.
		var firebaseName = childSnapshot.val().name;
		var firebaseLine = childSnapshot.val().line;
		var firebaseDestination = childSnapshot.val().destination;
		var firebaseTrainTimeInput = childSnapshot.val().trainTime;
		var firebaseFrequency = childSnapshot.val().frequency;
		
		var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
		var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
		var minutes = firebaseFrequency - timeRemainder;

		var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
		
		// Test for correct times and info
		console.log(minutes);
		console.log(nextTrainArrival);
		console.log(moment().format("hh:mm A"));
		console.log(nextTrainArrival);
		console.log(moment().format("X"));

		// Append train info to table on page
		$("#table > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseLine + "</td><td>"+ firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

	});


 
