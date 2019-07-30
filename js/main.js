$(document).ready(function() {
  function displayTime() {
    var time = moment().format('HH:mm:ss');
    $('#clock').html(time);
    setTimeout(displayTime, 1000);
}

$(document).ready(function() {
    displayTime();
});

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

//setting all the variables
  $("#submit").on("click", function() {
  let trainName = $('#name').val().trim();
 	let trainDestination = $('#destination').val().trim();
 	let trainDeparture = $('#departure').val().trim();
  let trainFrequency = $('#frequency').val().trim();
  let minutesAway;
  var currentTime = moment();

//log check
 	console.log(trainName)
 	console.log(trainDestination)
 	console.log(trainDeparture)
  console.log(trainFrequency)
  console.log('CURRENT TIME: ' + moment(currentTime).format('hh:mm:ss A'));

  //pushing object to firebase
  database.ref().push({
    name: trainName,
    destination: trainDestination,
    firstTime: trainDeparture,
    frequency: trainFrequency
});
  // clearing inputs
$("#name").val("");
$("#destination").val("");
$("#departure").val("");
$("#frequency").val("");
  
  return false;
});
database.ref().on("child_added", function(snapshot){
	/* console.log(snapshot.val());
	console.log(snapshot.val().name);
	console.log(snapshot.val().destination);
	console.log(snapshot.val().firstTime);
	console.log(snapshot.val().frequency); */
  

  let trainDeparture = snapshot.val().trainDeparture;
  let frequency = snapshot.val().frequency;
  let currentTime = moment();
  console.log(currentTime);

  let trainDepartureConverted = moment(trainDeparture, "hh:mm").subtract(1, "years");
	//console.log(trainDepartureConverted);
  let diffTime = moment().diff(moment(trainDepartureConverted), "minutes");
	//console.log("difference in time " + diffTime);
  let tRemainder = diffTime % frequency;
  let minutesAway = frequency - tRemainder;
  let nextTime = moment().add(minutesAway, "minutes");
  let nextTrainTime = moment(nextTime).format("hh:mm a");
	$("#table").append("<tr><td>" + snapshot.val().name + "</td><td>" + snapshot.val().destination + "</td><td>" + frequency +  "</td><td>" + nextTrainTime +  "</td><td>" + minutesAway + "</td></tr>");
	});
})
