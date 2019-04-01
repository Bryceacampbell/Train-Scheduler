$(document).ready(function() {

    //on click event listener to capture user input
$("#submit-form-btn").on("click", function(event) {

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

    //storing user input variables into an object 
    var userInputObject = {

        name: trainNameInput,
        destination: destinationInput,
        firstTrainTime: firstTrainTimeInput,
        frequency: frequencyInput
    };
    
    //pushes the object into the firebase database
    database.ref().push(userInputObject);
    
});
})
