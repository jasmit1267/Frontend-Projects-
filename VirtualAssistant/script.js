const btn = document.querySelector('#btn');
const content = document.querySelector('#content');
const vigi = document.getElementById('vigi');

function speak(text) {
        const text_speak = new SpeechSynthesisUtterance(text);

        text_speak.rate = 1;
        text_speak.volume = 1;
        text_speak.pitch = 1;
        // text_speak.lang="hi-GB"

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date(); // Sat Mar 16 2025 14:35:22 GMT+0530 (India Standard Time)
    let hour = day.getHours();

    if(hour>=0 && hour<12){
        speak("Good Morning Sir... ");
    }else if(hour>=12 && hour<17){
        speak("Good Afternoon Sir... ");
    }else{
        speak("Good Evening Sir... ");
    }
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Check if speech recognition is supported
if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        content.textContent = transcript;
        takeCommand(transcript.toLowerCase());
        
        // Hide visualization after getting result
        setTimeout(() => {
            vigi.style.display = "none";
        }, 1000);
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        content.textContent = "Error: " + event.error;
        vigi.style.display = "none";
    };

    // Reset when recognition ends
    recognition.onend = () => {
        btn.disabled = false;
    };

    // COMBINE the two event listeners into one
    btn.addEventListener('click', () => {
        content.textContent = "Initializing...";
        vigi.style.display = "block";
        btn.disabled = true;
        
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        setTimeout(() => {
            speak("Activating Jeevaa...");
            wishMe();
            speak("How may I help you sir");
            setTimeout(() => {
                // Only start recognition AFTER speaking is complete
                content.textContent = "Listening to you...";
                try {
                    recognition.start();
                } catch (err) {
                    console.error('Recognition error:', err);
                    recognition.stop();
                    setTimeout(() => {
                        recognition.start();
                    }, 200);
                }
            }, 6000)
        }, 1000);
    });
} else {
    btn.textContent = "Speech Recognition Not Supported";
    btn.disabled = true;
}

// Hardcode
function takeCommand(message) {
    console.log("Command received:", message);

    if(message.includes('hi') || message.includes('hello Jeevaa')) {
        speak("Hello Sir, How May I Help You?");
    }else if(message.includes("Jeevaa")) {
        speak("Yes Master");
    }else if(message.includes("who made you")){
        speak("Jasmit");
    }else if(message.includes('how are you')) {
        speak("I am fine boss tell me how can i help you");
    }else if(message.includes('open google')) {
        window.open("https://google.com", "_blank");
        speak("Opening Google....");
    }else if(message.includes('open instagram')) {
        window.open("https://instagram.com", "_blank");
        speak("opening instagram...");
    }else if(message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what i found on internet regarding " + message;
        speak(finalText);
    }else if(message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what i found on Wikipedia regarding " + message;
        speak(finalText);
    }else if(message.includes('time')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        const finalText ="The current time is " + time;
        speak(finalText);
    }else if(message.includes('date')) {
        const date = new Date().toLocaleString(undefined, {month: "short", day: "numeric"});
        const finalText ="Today's date is " + date;
        speak(finalText);
    }else if(message.includes('calculator')) {
        window.open('Calculator:///');
        const finalText = "opening Calculator";
        speak(finalText);
    }else if (message.includes("linkedin")) {
        window.open("https://www.linkedin.com/", "_blank");
        speak("Here it is");
    }else if (message.includes("github")) {
        window.open("https://github.com/LakshayD02", "_blank");
        speak("Lakshay's Github");
    }else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }
}
