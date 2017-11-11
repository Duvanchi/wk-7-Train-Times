var config = {
	apiKey: "AIzaSyCGOjYukRvcZ8xXjwAQN8hV7_keYo75QZI",
	authDomain: "train-schedule-43773.firebaseapp.com",
	databaseURL: "https://train-schedule-43773.firebaseio.com",
	projectId: "train-schedule-43773",
	storageBucket: "",
	messagingSenderId: "1010866869898"
	};

firebase.initializeApp(config);

var database = firebase.database();

var trainName = ''
var destination = ''
var iniTime = ''
var freq = ''
var nextTrain = ''
var nextTrainFormatted = ''
var minutesAway = ''
var firstTimeConverted = ''
var currentTime = ''
var diffTime = ''
var tRemainder = ''
var minutesTilTrain = ''

$('#submitTrain').on('click', function () {
	event.preventDefault();

	trainName = $('#trainNameInput').val().trim();
	destination = $('#destInput').val().trim();
	iniTime = $('#firstTimeInput').val().trim();
	freq = $('#freqInput').val().trim();
	firstTimeConverted = moment(iniTime, "hh:mm");
	currentTime = moment.now();
	diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	tRemainder = diffTime % freq;
	minutesTilTrain = freq - tRemainder;
	nextTrain = moment().add(minutesTilTrain, "minutes");
	nextTrainFormatted = moment(nextTrain).format("UTC")

	database.ref().push({
		trainName: trainName,
		destination: destination,
		iniTime: iniTime,
		freq: freq,
		nextTrainFormatted: nextTrainFormatted,
		minutesTilTrain: minutesTilTrain,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	})

	console.log(trainName);
	console.log(destination);
	console.log(iniTime);
	console.log(freq);
})

database.ref().orderByChild('dateAdded').on('child_added', function(snapshot, prevChildKey) {
	var train = snapshot.val();

	var tr = $("<tr/>")

	var trainDiv = "<td>"+train.trainName+"</td>"
	var destDiv = "<td>"+train.destination+"</td>"
	var freqDiv = "<td>"+train.freq+"</td>"
	var nextDiv = "<td>"+train.nextTrainFormatted+"</td>"
	var minutesDiv = "<td>"+train.minutesTilTrain+"</td>"

	


	tr.append(trainDiv);
	tr.append(destDiv);
	tr.append(freqDiv);
	tr.append(nextDiv);
	tr.append(minutesDiv);
	

	$('#trainsDiv').append(tr);
})
