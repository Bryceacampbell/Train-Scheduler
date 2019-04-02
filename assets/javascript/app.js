$(document).ready(function () {

    //on click event listener to capture user input
    $("#submit-form-btn").on("click", function (event) {

        event.preventDefault();

        //capture user input and storing it into variables
        var trainNameInput = $("#train-name-input").val();
        var destinationInput = $("#destination-input").val()
        var firstTrainTimeInput = $("#first-train-time-input").val();
        var frequencyInput = $("#frequency-input").val();

        console.log(trainNameInput);
        console.log(destinationInput);
        console.log(firstTrainTimeInput);
        console.log(frequencyInput);

        // Creates local "temporary" object for holding data
        var newTrain = {

            name: trainNameInput,
            destination: destinationInput,
            firstTrainTime: firstTrainTimeInput,
            frequency: frequencyInput
        };

        //pushes the object into the firebase database
        database.ref().push(newTrain);

    });

        database.ref().on("child_added", function (childSnapshot) {
            console.log(childSnapshot.val());

            var trainName = childSnapshot.val().name;
            var trainDestination = childSnapshot.val().destination;
            var firstTrainTime = childSnapshot.val().firstTrainTime;
            var trainFrequency = childSnapshot.val().frequency;

            console.log(trainName);
            console.log(trainDestination);
            console.log(firstTrainTime);
            console.log(trainFrequency);


            //using moment.js to 
            var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
            console.log(firstTimeConverted);

            // Current Time
            var currentTime = moment();
            console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

            // Difference between the times
            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            console.log("DIFFERENCE IN TIME: " + diffTime);

            // Time apart (remainder)
            var tRemainder = diffTime % trainFrequency;
            console.log(tRemainder);

            // Minutes Until Train
            var tMinutesTillTrain = trainFrequency - tRemainder;
            console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

            // Next Train
            var nextTrain = moment().add(tMinutesTillTrain, "minutes");
            console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


            var trainNameDisplay = $("<td>").text(trainName);

            var trainDestinationDisplay = $("<td>").text(trainDestination);

            var trainFrequencyDisplay = $("<td>").text(trainFrequency);

            var nextTrainDisplay = $("<td>").text(moment(nextTrain).format("hh:mm A"));

            var minutesAwayDisplay = $("<td>").text(tMinutesTillTrain);

            var trainRow = $("<tr>");

            trainRow.append(trainNameDisplay, trainDestinationDisplay, trainFrequencyDisplay, nextTrainDisplay, minutesAwayDisplay);

            $("tbody").prepend(trainRow);






        })


    
})
