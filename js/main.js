$(document).ready(function() {
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
   

})