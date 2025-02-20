// Back Button Function
function goBack() {
    window.history.back();
}

// Generate Joke Function
async function generateJoke() {
    let language = document.getElementById("language").value;
    let jokeText = document.getElementById("joke-text");

    try {
        let response = await fetch(`https://v2.jokeapi.dev/joke/Any?lang=${language}`);
        let data = await response.json();

        if (data.type === "single") {
            jokeText.innerHTML = data.joke;
        } else {
            jokeText.innerHTML = `${data.setup} 😂 ${data.delivery}`;
        }
    } catch (error) {
        jokeText.innerHTML = "Oops! Couldn't load a joke. Try again!";
    }
}

// Copy Joke Function
function copyJoke() {
    let joke = document.getElementById("joke-text").innerText;
    navigator.clipboard.writeText(joke).then(() => alert("Joke copied!"));
}

// Theme Change Function
function changeTheme() {
    let theme = document.getElementById("theme").value;
    document.body.className = theme;
}

// Load First Joke on Page Load
generateJoke();
