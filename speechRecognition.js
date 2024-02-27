



if ("webkitSpeechRecognition" in window ) {

    let speechRecognition = new webkitSpeechRecognition();
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = document.querySelector("#select_dialect")

    speechRecognition.onstart = () => {
        document.querySelector("#status").style.display = "block";
    };

    speechRecognition.onend = () => {
        document.querySelector("#status").style.display = "none";
    };

    speechRecognition.onError = () => {
        document.querySelector("#status").style.display = "none";
    };

    let final_transcript = "";

    speechRecognition.onresult = (event) => {
        let interim_transcript = "";



        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (!(event.results[i][0].confidence > 0)) continue;
            if (event.results[i].isFinal && event.results[i][0].confidence >= 0.7) {
              final_transcript += event.results[i][0].transcript;
            } else {
              interim_transcript += event.results[i][0].transcript;
            }
 }


        document.querySelector("#final").innerHTML = final_transcript;
        document.querySelector("#interim").innerHTML = interim_transcript;
    };



    document.querySelector("#start").onclick = () => {
        speechRecognition.start();
    };

    document.querySelector("#stop").onclick = () => {
        speechRecognition.stop();
    };

    document.querySelector("#clearButton").addEventListener("click", function() {
        final_transcript = "";
        interim_transcript = "";
        document.querySelector("#final").innerHTML = final_transcript;
        document.querySelector("interim").innerHTML = interim_transcript;
    })

} else {
    console.log("Speech Recognition Not Available")
}