//Zeit aktualisieren
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById("time").textContent = `${hours}:${minutes}`;
}

updateTime();
setInterval(updateTime, 1000); 



const draggables = document.querySelectorAll(".draggable");
const trash = document.getElementById("trash");
const trashImage = document.getElementById("trashImage");
const overlay = document.getElementById("overlay");
const blackout = document.getElementById("blackout");
const deleteSound = document.getElementById("delete_sound");
const confirmPopup = document.getElementById("confirmPopup");
const confirmYes = document.getElementById("confirmYes");
const confirmNo = document.getElementById("confirmNo");

let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let currentElement = null;

draggables.forEach((element) => {
    element.addEventListener("mousedown", (event) => {
        isDragging = true;
        currentElement = element;
        offsetX = event.clientX - element.offsetLeft;
        offsetY = event.clientY - element.offsetTop;

        // Positionierung erlauben
        element.style.position = "absolute";
        element.style.zIndex = "1000";
    });
});

document.addEventListener("mousemove", (event) => {
    if (isDragging && currentElement) {
        let newX = event.clientX - offsetX;
        let newY = event.clientY - offsetY;

        const maxX = window.innerWidth - currentElement.offsetWidth;
        const maxY = window.innerHeight - currentElement.offsetHeight;

        if (newX < 0) newX = 0;
        if (newY < 0) newY = 0;
        if (newX > maxX) newX = maxX;
        if (newY > maxY) newY = maxY;

        currentElement.style.left = `${newX}px`;
        currentElement.style.top = `${newY}px`;
    }
});

document.addEventListener("mouseup", (event) => {
    if (isDragging && currentElement) {
        const trashRect = trash.getBoundingClientRect();
        const currentRect = currentElement.getBoundingClientRect();

        const isOverTrash = (
            currentRect.right > trashRect.left &&
            currentRect.left < trashRect.right &&
            currentRect.bottom > trashRect.top &&
            currentRect.top < trashRect.bottom
        );

        if (isOverTrash) {
            if (currentElement.id === "mypc_desktop") {
                // Bestätigungs-Popup anzeigen
                confirmPopup.style.display = "block";
                confirmPopup.style.zIndex = "3000";
                isDragging = false;
                return; // Warten auf Benutzeraktion
            } else if (currentElement.classList.contains("deletable")) {
                // Für andere deletable-Elemente: Element verstecken und Sound abspielen
                currentElement.style.display = 'none';
                deleteSound.play();
                trashImage.src = "img/trash_full.png";
            }
        }

        // Ziehen beenden
        isDragging = false;
        currentElement = null;
    }
});

// Popup-Button "Ja" -> Element entfernen und Overlay anzeigen
confirmYes.addEventListener("click", () => {
    confirmPopup.style.display = "none";
    overlay.style.display = "block";

    const mypc = document.getElementById("mypc_desktop");
    mypc.style.display = "none";
    trashImage.src = "img/trash_full.png";
    const crack = document.getElementById("crack");
    crack.play();
    setTimeout(() => {
        overlay.style.display = "none";
        blackout.style.display = "block";
    }, 5000);
});

// Popup-Button "Nein" -> Element zurücksetzen
// Stelle sicher, dass dieser Code nach dem Laden des DOMs ausgeführt wird
document.addEventListener("DOMContentLoaded", () => {
    const confirmNo = document.getElementById("confirmNo");
    const confirmPopup = document.getElementById("confirmPopup");
    const mypc = document.getElementById("mypc_desktop"); // Das Element, das du zurücksetzen möchtest

    confirmNo.addEventListener("click", () => {
        confirmPopup.style.display = "none";

        // Überprüfen, ob mypc existiert
        if (mypc) {
            mypc.style.left = ""; // oder ein Wert, falls nötig
            mypc.style.top = "120px"; // Ursprungsposition zurücksetzen
        } else {
            console.error("Das Element mit der ID 'mypc' wurde nicht gefunden.");
        }
    });
});






//Ordner öffnen
const privat = document.getElementById("privat_desktop");
const privat_icon = document.querySelectorAll(".privat_icon")
const privat_task = document.getElementById("privat_task");
const privat_fenster = document.getElementById("privat_fenster");
const privat_fenster_x = document.getElementById("privat_fenster_x");

privat.addEventListener("dblclick", () => {
        privat_fenster.style.display = "flex";
        privat_task.style.display = "flex";
        privat_fenster.style.zIndex = "2000";
});

privat_icon.forEach(element => {
    element.addEventListener("click", () => {
        privat_fenster.style.display = "flex";
        privat_task.style.display = "flex";
        const start_fenster = document.getElementById("start_fenster");
        start_fenster.style.display = "none";
        privat_fenster.style.zIndex = "2000";
    });
});


privat_fenster_x.addEventListener("click", () => {
    privat_fenster.style.display = "none";
    privat_task.style.display = "none";
    privat_fenster.style.zIndex = "";
});


const musik = document.getElementById("musik_desktop");
const musik_icon = document.querySelectorAll(".musik_icon")
const musik_task = document.getElementById("musik_task");
const musik_fenster = document.getElementById("musik_fenster");
const musik_fenster_x = document.getElementById("musik_fenster_x");

musik.addEventListener("dblclick", () => {
    musik_fenster.style.display = "flex";
    musik_task.style.display = "flex";
    musik_fenster.style.zIndex = "2000";
});


musik_icon.forEach(element => {
    element.addEventListener("click", () => {
        musik_fenster.style.display = "flex";
        musik_task.style.display = "flex";
        const start_fenster = document.getElementById("start_fenster");
        start_fenster.style.display = "none";
        musik_fenster.style.zIndex = "2000";
    });
});


musik_fenster_x.addEventListener("click", () => {
    musik_fenster.style.display = "none";
    musik_task.style.display = "none";
    musik_fenster.style.zIndex = "";
});

const wahl_x = document.getElementById("wahl_x");
const error_fenster = document.getElementById("error");
const error_x = document.getElementById("error_x");

wahl_x.addEventListener("click", () => {
    error_fenster.style.display = "flex";
    error_fenster.style.zIndex = "2001";
});

error_x.addEventListener("click", () => {
    error_fenster.style.display = "none";
    error_fenster.style.zIndex = "";
});


const editor = document.querySelectorAll(".editor");
const editor_task = document.getElementById("editor_task");
const editor_fenster = document.getElementById("editor_fenster");
const editor_fenster_x = document.getElementById("editor_fenster_x");

editor.forEach(element => {
    element.addEventListener("click", () => {
        editor_fenster.style.display = "flex";
        editor_task.style.display = "flex";
        const start_fenster = document.getElementById("start_fenster");
        start_fenster.style.display = "none";
        editor_fenster.style.zIndex = "2000";
    });
});

editor_fenster_x.addEventListener("click", () => {
    editor_fenster.style.display = "none";
    editor_task.style.display = "none";
    editor_fenster.style.zIndex = "";
    const textarea = document.getElementById("editor_textarea");
    textarea.value = "";
});


const rechner = document.querySelectorAll(".rechner");
const rechner_task = document.getElementById("rechner_task");
const rechner_fenster = document.getElementById("rechner_fenster");
const rechner_fenster_x = document.getElementById("rechner_fenster_x");

rechner.forEach(element => {
    element.addEventListener("click", () => {
        rechner_fenster.style.display = "flex";
        rechner_task.style.display = "flex";
        const start_fenster = document.getElementById("start_fenster");
        start_fenster.style.display = "none";
        rechner_fenster.style.zIndex = "2000";
    });
});

rechner_fenster_x.addEventListener("click", () => {
    rechner_fenster.style.display = "none";
    rechner_task.style.display = "none";
    rechner_fenster.style.zIndex = "";
});


const internet = document.querySelectorAll(".internet");
const internet_task = document.getElementById("internet_task");
const internet_fenster = document.getElementById("internet_fenster");
const internet_fenster_x = document.getElementById("internet_fenster_x");

internet.forEach(element => {
    element.addEventListener("click", () => {
        internet_fenster.style.display = "flex";
        internet_task.style.display = "flex";
        const start_fenster = document.getElementById("start_fenster");
        start_fenster.style.display = "none";
        internet_fenster.style.zIndex = "2000";
    });
});

internet_fenster_x.addEventListener("click", () => {
    internet_fenster.style.display = "none";
    internet_task.style.display = "none";
    internet_fenster.style.zIndex = "";
});


const mypc = document.getElementById("mypc_desktop");
const mypc_icon = document.getElementById("mypc_icon");
const mypc_task = document.getElementById("mypc_task");
const mypc_fenster = document.getElementById("mypc_fenster");
const mypc_fenster_x = document.getElementById("mypc_fenster_x");

mypc_icon.addEventListener("click", () => {
        mypc_fenster.style.display = "flex";
        mypc_task.style.display = "flex";
        const start_fenster = document.getElementById("start_fenster");
        start_fenster.style.display = "none";
        mypc_fenster.style.zIndex = "2000";
});

mypc.addEventListener("dblclick", () => {
        mypc_fenster.style.display = "flex";
        mypc_task.style.display = "flex";
        mypc_fenster.style.zIndex = "2000";
    });


mypc_fenster_x.addEventListener("click", () => {
    mypc_fenster.style.display = "none";
    mypc_task.style.display = "none";
    mypc_fenster.style.zIndex = "";
});


const ergebnis_fenster = document.getElementById("ergebnis_fenster");
const ergebnis_task = document.getElementById("ergebnis_task");
const adminbtn = document.getElementById("adminResultsButton");
const ergebnis_fenster_x = document.getElementById("ergebnis_fenster_x");

adminbtn.addEventListener("click", () => {
    ergebnis_fenster.style.display = "flex";
    ergebnis_task.style.display = "flex";
    ergebnis_fenster.style.zIndex = "2000";
});

ergebnis_fenster_x.addEventListener("click", () => {
    ergebnis_fenster.style.display = "none";
    ergebnis_task.style.display = "none";
    ergebnis_fenster.style.zIndex = "";
});


//Start öffnen
const start_btn = document.getElementById("start");
const start_fenster = document.getElementById("start_fenster");

start_btn.addEventListener("click", () => {
    if (start_fenster.style.display === "flex") {
        start_fenster.style.display = "none"; // Ausblenden
    } else {
        start_fenster.style.display = "flex"; // Einblenden
    }
});

//Musik Player
// Alle Play/Pause-Icons und Audio-Elemente auswählen
const playPauseIcons = document.querySelectorAll(".playPauseIcon");
const audioPlayers = document.querySelectorAll(".audioPlayer");

let currentAudio = null; // Variable, um das aktuell abgespielte Audio zu speichern

// Play/Pause für jedes Icon konfigurieren
playPauseIcons.forEach((icon, index) => {
    const audio = audioPlayers[index];

    // Klick-Event für das jeweilige Icon
    icon.addEventListener("click", () => {
        // Wenn bereits ein anderes Audio spielt, dieses pausieren und Icon zurücksetzen
        if (currentAudio && currentAudio !== audio) {
            currentAudio.pause();
            playPauseIcons[audioPlayers.indexOf(currentAudio)].classList.remove('fa-stop');
            playPauseIcons[audioPlayers.indexOf(currentAudio)].classList.add('fa-play');
        }

        // Aktuelles Audio starten oder pausieren
        if (audio.paused) {
            audio.play().then(() => {
                icon.classList.remove('fa-play');
                icon.classList.add('fa-stop');
                currentAudio = audio; // Dieses Audio als aktuell setzen
            }).catch(error => {
                console.error("Error playing audio:", error);
            });
        } else {
            audio.pause();
            icon.classList.remove('fa-stop');
            icon.classList.add('fa-play');
            currentAudio = null; // Kein Audio wird aktuell abgespielt
        }
    });

    // Icon zurücksetzen, wenn das Audio zu Ende ist
    audio.addEventListener("ended", () => {
        icon.classList.remove('fa-stop');
        icon.classList.add('fa-play');
        currentAudio = null; // Kein Audio wird aktuell abgespielt
    });
});


//RECHNER
function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.value += value;
}

function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
}

function calculate() {
    const display = document.getElementById('display');
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Fehler';
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (!isNaN(key) || ['+', '-', '*', '/'].includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        clearDisplay();
    }
});




//Shutdown
const shutdown_btn = document.getElementById("turnoff");

shutdown_btn.addEventListener("click", () => {
    const shutdown = document.getElementById("shutdown");
    const shutdown_sound = document.getElementById("shutdown_sound")
    const blackout = document.getElementById("blackout");
    const desktop = document.getElementById("desktop");
    
    shutdown_sound.play();
    shutdown.style.display = "flex";

    setTimeout(() => {
        shutdown.style.opacity = "0";
        blackout.style.display = "block";
        desktop.style.display = "none";
        shutdown_sound.pause();
        shutdown_sound.currentTime = 0;
    }, 5000);

});


//Login Name und Bild auswählen

// Funktion, um das ausgewählte Bild anzuzeigen und im versteckten Input zu speichern
function selectImage(imageName, altText) {
    const selectedImageDisplay = document.getElementById("selectedImageDisplay");
    const selectedImageInput = document.getElementById("selectedImage");

    // Setze den Text und das versteckte Feld auf die Auswahl
    selectedImageDisplay.innerHTML = `<img src="img/${imageName}" alt="${altText}" style="width: 30px; height: auto;">`;
    selectedImageInput.value = imageName;
}

// Funktion zum Anzeigen von Name und Bild in der Ausgabe
function displayData() {
    const nameInput = document.getElementById("name");
    const name = nameInput.value;
    const selectedImage = document.getElementById("selectedImage").value;

    if (!name || !selectedImage) {
        alert("Bitte geben Sie einen Namen ein und wählen Sie ein Bild aus.");
        return;
    }

    const imageUrl = "img/" + selectedImage;
    const outputName = document.getElementById("outputName");
    const outputImage = document.getElementById("outputImage");

    outputName.textContent = name;
    outputImage.src = imageUrl;
}

// StartUp
window.onload = () => {
    const startup = document.getElementById("startup");
    const formContainer = document.getElementById("login");

    // Startup-Element ausblenden und Sound abspielen
    setTimeout(() => {
        startup.style.opacity = "0";
    }, 5000);

    // Startup-Element komplett verbergen und Formular einblenden
    setTimeout(() => {
        startup.style.display = "none";
        formContainer.style.display = "flex";
        setTimeout(() => {
            formContainer.style.opacity = "1";
        }, 50); // Kleine Verzögerung für sanftes Einblenden
    }, 5000);
};


function submitForm() {
    const nameInput = document.getElementById("name");
    const selectedImage = document.getElementById("selectedImage").value;
    
    // Überprüfen, ob Name und Bild ausgewählt wurden
    if (!nameInput.value || !selectedImage) {
        alert("Bitte geben Sie einen Namen ein und wählen Sie ein Bild aus.");
        return; // Beende die Funktion, damit das Formular nicht ausgeblendet wird
    }
    
    const formContainer = document.getElementById("login");
    formContainer.style.opacity = "0"; // Formular ausblenden
    setTimeout(() => {
        formContainer.style.display = "none"; // Komplett verbergen
    }, 500);
    
    const start_sound = document.getElementById("start_sound");
    start_sound.play(); // Sound abspielen
}



const go_btn = document.getElementById("go");

go_btn.addEventListener("click" , submitForm);



//LOGOFF
const logoff_btn = document.getElementById("logoff");

logoff_btn.addEventListener("click", () => {
    const loginContainer = document.getElementById("login");
    loginContainer.style.display = "flex"; 
    loginContainer.style.opacity = "1"; 

    // Eingabefeld für den Namen zurücksetzen
    const nameInput = document.getElementById("name");
    nameInput.value = ""; // Name leeren

    // Bild zurücksetzen
    const selectedImage = document.getElementById("selectedImage");
    selectedImage.value = ""; // Wert zurücksetzen

    // Optional: Bildanzeige zurücksetzen
    const imageDisplay = document.getElementById("imageDisplay"); // Angenommen, es gibt ein Bild-Element mit dieser ID
    if (imageDisplay) {
        imageDisplay.src = ""; // Bildquelle leeren
        imageDisplay.alt = ""; // Alternativtext leeren
    }

    // Text in der Bildauswahl zurücksetzen
    const imageLabel = document.getElementById("selectedImageDisplay"); // Angenommen, es gibt ein Label mit dieser ID
    if (imageLabel) {
        imageLabel.textContent = "Profilbild auswählen"; // Text zurücksetzen
    }

    const start_fenster = document.getElementById("start_fenster");
    start_fenster.style.display = "none";
});


document.addEventListener("DOMContentLoaded", () => {
    const draggables = document.querySelectorAll(".draggable");

    draggables.forEach(draggable => {
        draggable.addEventListener("mousedown", () => {
            // Setze alle anderen draggable-Elemente zurück
            draggables.forEach(item => {
                item.style.zIndex = ""; // Ursprünglichen z-index entfernen
            });

            // Setze den z-index des geklickten Elements auf 2000
            draggable.style.zIndex = "2000";
        });
    });
});







// WAHL

// Funktion zur Überprüfung des Abstimmungscodes
function checkAdminCode(event) {
    // Standardaktion des Events verhindern (falls Enter gedrückt wird)
    if (event) event.preventDefault();

    const codeInput = document.getElementById('codeInput').value;
    const adminResultsButton = document.getElementById('adminResultsButton');

    // Überprüfen, ob der eingegebene Code "admin" ist
    if (codeInput.trim() === "admin") {
        adminResultsButton.style.display = "block"; // Button anzeigen
        
        // Auswahl der Abstimmungsoption zurücksetzen, falls vorhanden
        const selectedOption = document.querySelector('input[name="voteOption"]:checked');
        if (selectedOption) {
            selectedOption.checked = false;
        }
    } else {
        adminResultsButton.style.display = "none"; // Button verstecken
    }
}

async function submitVote(event) {
    // Standardaktion des Buttons verhindern
    if (event) event.preventDefault();

    const code = document.getElementById('codeInput').value; // Abstimmungscode
    const voteOption = document.querySelector('input[name="voteOption"]:checked')?.value; // Gewählte Option

    // Admin-Check
    if (code.trim() === "admin") {
        console.log('Admin hat Zugriff auf Ergebnisse.');
        alert('Du bist als Admin eingeloggt. Du kannst die Ergebnisse jetzt anzeigen.');
        return; // Admin gibt keine Stimme ab
    }

    // Überprüfen, ob der Code eingegeben wurde
    if (!code) {
        alert('Bitte gib deinen Abstimmungscode ein.');
        return;
    }

    console.log('Code:', code); // Debugging
    console.log('Gewählte Option:', voteOption); // Debugging

    // POST-Anfrage an den Server
    const response = await fetch('/votes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, voteOption }), // Daten im JSON-Format senden
    });

    const result = await response.json(); // Antwort als JSON parsen

    // Fehlerhandling
    if (!response.ok) {
        alert(`Fehler: ${result.message}`); // Fehler anzeigen
    } else {
        alert(result.message); // Erfolgreiche Nachricht
    }
}




// Funktion, um Wahlergebnisse abzurufen und anzuzeigen
async function fetchResults() {
    try {
        const response = await fetch('https://bs-wahl.vercel.app/results');
        if (!response.ok) {
            throw new Error("Fehler beim Abrufen der Ergebnisse.");
        }
        const results = await response.json();

        // Ergebnisse nach der Stimmenzahl in absteigender Reihenfolge sortieren
        results.sort((a, b) => b.count - a.count);

        // Gesamtanzahl der Stimmen berechnen
        const totalVotes = results.reduce((sum, result) => sum + result.count, 0);
        const maxBarHeight = 200; // Maximale Höhe für die Balken in Pixel

        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.innerHTML = ""; // Container leeren

        // Balkenfarben für jede Option festlegen
        const colors = {
            Windows: '#0078D7', // Blau für Windows
            Apple: '#A2AAAD',   // Grau für Apple
            Linux: '#FCC624'    // Gelb für Linux
        };

        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';

            // Balken erstellen
            const bar = document.createElement('div');
            bar.className = 'bar';

            // Berechnung der Balkenhöhe relativ zur höchsten Stimmenanzahl
            const height = totalVotes > 0 ? (result.count / totalVotes) * maxBarHeight : 0;
            bar.style.height = `${height}px`;
            bar.textContent = `${result.count} (${Math.round((result.count / totalVotes) * 100)}%)`;
            
            // Farbe basierend auf der Option festlegen
            bar.style.backgroundColor = colors[result._id] || '#ccc'; // Standardfarbe, falls Option nicht erkannt

            // Bild für die jeweilige Option hinzufügen
            const img = document.createElement('img');
            img.className = 'result-image';
            img.alt = result._id;

            // Bildpfad je nach Option setzen
            if (result._id === "Windows") img.src = 'img/windows.png';
            else if (result._id === "Apple") img.src = 'img/apple.png';
            else if (result._id === "Linux") img.src = 'img/linux.png';

            // Elemente in den Result-Bereich hinzufügen
            resultItem.appendChild(bar);
            resultItem.appendChild(img);
            resultsContainer.appendChild(resultItem);
        });
    } catch (error) {
        console.error("Fehler beim Abrufen der Ergebnisse:", error);
    }
}

