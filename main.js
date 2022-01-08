prediction_1 = "";

Webcam.set
(
    {
        width:350,
        height:300,
        image_format: 'png',
        png_quality: 90
    }
);

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id = "captured_image" src = "'+data_uri+'"/>';
    });

}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/oipkdHRNw/model.json', modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded!');
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function speak()
{
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function gotResult(error, results)
{
    if (error) {
        console.error(error);
    } else
    {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak_data = "";
        
        if (prediction_1 == "Best")
        {
            speak_data = "All the best";
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if (prediction_1 == "Amazing")
        {
            speak_data = "This is looking amazing";
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
        if (prediction_1 == "Victory")
        {
            speak_data = "That was a marvellous victory";
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        speak();
    }
}