// Get pattern number from URL query string
function getPatternNum() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const patternNum = (urlParams.get("pattern"));
    return patternNum;
}

// Get source from URL query string
function getSource() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const source = (urlParams.get("source"));
    return source;
}

// Change a cell's attributes and content when clicked
function toggle(cell) {
    if (cell.alive == 0) {
        cell.alive = 1;
        cell.className = "alive";
    }
    else {
        cell.alive = 0;
        cell.className = "empty";
    }
    cell.innerHTML = icons[cell.alive];
}

// Given a pattern number and a source, load the pattern.
// When done, apply the pattern to the gameboard and the
// starting pattern thumbnail.
function loadPattern(patt, startPatt, patternNum, source) {
    if (source == "local") {
        // Load the pattern from the browser's local storage
        let patterns = JSON.parse(localStorage.patterns);
        patterns.forEach(data => {
            if (data.id == patternNum) {
                patt.width = data.width; 
                patt.boolRows = data.pattern;
                patt.height = pattern.boolRows.length; 
                patt.author = data.author;
                patt.name = data.name; 
                startPatt.width = data.width; 
                startPatt.boolRows = data.pattern;
                startPatt.height = pattern.boolRows.length; 
                startPatt.author = data.author;
                startPatt.name = data.name; 
            }
        });
    }
    else {
        // Load the pattern from the remote database server
        fetch(url + "?id=eq." + patternNum) // issue the request asynchronously
            // When a response is returned...
            .then(response => {
                if (response.ok &&
                    response.headers.get("Content-Type") === "application/json; charset=utf-8") {
                    return response.json();
                }
                else {
                    throw new Error(
                        `Unexpected response status ${response.status} or content type`
                    );
                }
            })
            // If the response is valid...
            .then(data => {
                // Load the requested pattern into the current and starting patterns
                patt.width = data[0].width; 
                patt.boolRows = data[0].pattern;
                patt.height = pattern.boolRows.length; 
                patt.author = data[0].author;
                patt.name = data[0].name;
                startPatt.width = data[0].width; 
                startPatt.boolRows = data[0].pattern;
                startPatt.height = pattern.boolRows.length; 
                startPatt.author = data[0].author;
                startPatt.name = data[0].name;
                // Populate the displayed gameboard and starting pattern
                // (if the tables exist in the HTML) 
                let tbl = document.querySelector("#gameboard");
                if (tbl != null) {
                    patt.apply(tbl);
                }
                let thumb = document.querySelector("#startPattern");
                if (thumb != null) {
                    startPatt.apply(thumb);
                }
                // Set button states (if the buttons exist in the HTML)
                if (!pattern.isEmpty()) {
                    let clearButton = document.querySelector("#clear");
                    if (clearButton != null) {
                        clearButton.disabled = false;
                    }
                    let saveButton = document.querySelector("#save");
                    if (saveButton != null) {
                        saveButton.disabled = false;
                    }
                }
            })
            // If an error was encountered...
            .catch(error => {
                console.log("Error while fetching pattern:", error);
                alert("Error while getting pattern!");
            });
    }
}

// Save the current starting pattern to the specified destination
function savePattern(pattern, destination) {
    if (destination == "local") {
        // Save the pattern to the browser's local storage
        let storedPatterns = [];
        let lastId = 0;
        if (localStorage.patterns) {
            storedPatterns = JSON.parse(localStorage.patterns);
            lastIndex = storedPatterns.length - 1;
            lastId = storedPatterns[lastIndex].hasOwnProperty('id') ? storedPatterns[lastIndex].id : 0;
        }
        currentPattern = JSON.parse(JSON.stringify(pattern.payload));
        currentPattern.id = lastId + 1;
        currentPattern.created_at = new Date().toISOString();
        storedPatterns.push(currentPattern);
        localStorage.patterns = JSON.stringify(storedPatterns);
    }
    else {
        // Save the pattern to the remote database server
        const options = {
            method: 'POST',
            body: JSON.stringify(pattern.payload),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }
        fetch(url, options) // issue the request asynchronously
            // When a response is returned...
            .then(response => {
                 if (!response.ok) {
                    throw new Error(
                        `Unexpected response status ${response.status}`
                    );
                 }
            })
            // If an error was encountered...
            .catch(error => {
                console.log("Error while saving pattern:", error);
                alert("Save failed!");
            });
    }
}

let url = "http://45.79.202.219:3000/pattern"; // URL for the remote database server
let icons = { 1: "•", 0: "◦" };  // Define display characters for non-styles cells
let rules = [
    [0, 0, 0, 1, 0, 0, 0, 0, 0], // Empty cells with 3 or more neighbors come to life
    [0, 0, 1, 1, 0, 0, 0, 0, 0]  // Living cells survive if they have 2-3 neighbors
];
let pattern = {};
let startPattern = {};
let running = false;
let runner; // Interval timer
let interval = 500; // Interval time
let nameRE = /^[a-zA-Z0-9][a-zA-Z0-9\s]{1,14}$/; // Validation rule for the Name field
let authorRE = /^[a-zA-Z][a-zA-Z\s]{1,14}$/; // Validation rule for the Author field
let nameInvalid = "The Pattern Name must be 2 to 15 characters (letters, numbers or spaces).";
let authorInvalid = "The Author First Name must be 2 to 15 characters (letters or spaces).";

// Set up initial pattern and starting pattern
pattern = Pattern.defaultPattern();
let patternNum = getPatternNum();
let source = getSource();
startPattern = Pattern.defaultPattern();
startPattern.width = pattern.width;
startPattern.height = pattern.height;
startPattern.boolRows = JSON.parse(JSON.stringify(pattern.boolRows));
if (patternNum) {
    loadPattern(pattern, startPattern, patternNum, source);
}

// Once the page is comletely loaded, update the display and set up
// event handlers for the buttons
window.addEventListener("load", function() {
    // Populate the gameboard and the starting pattern 
    let tbl = document.querySelector("#gameboard");
    pattern.new_table(tbl);
    pattern.apply(tbl);
    let thumb = document.querySelector("#startPattern");
    startPattern.new_thumb(thumb);
    startPattern.apply(thumb);
    // Set button states
    if (!pattern.isEmpty()) {
        document.querySelector("#clear").disabled = false;
    }
    if (!startPattern.isEmpty()) {
        document.querySelector("#save").disabled = false;
    }

    // Attach event listener to the "click" event of the Start button
    document.querySelector("#start").addEventListener("click", function() {
        startPattern.boolRows = JSON.parse(JSON.stringify(pattern.boolRows));
        startPattern.apply(thumb);
        running = true;
        runner = setInterval(() => {
            // Define what happens on each timer cycle
            pattern.advance(tbl);
            pattern.apply(tbl);
            if (pattern.isEmpty()) { // If the pattern is now empty...
                // Stop the timer cycle
                running = false;
                clearInterval(runner);
                // Set button states
                document.querySelector("#start").disabled = false;
                document.querySelector("#stop").disabled = true;
                document.querySelector("#step").disabled = false;
                document.querySelector("#reset").disabled = false;
                document.querySelector("#save").disabled = false;
                document.querySelector("#load").disabled = false;
            }
        }, interval);
        // Set button states
        document.querySelector("#stop").disabled = false;
        document.querySelector("#step").disabled = true;
        document.querySelector("#reset").disabled = true;
        document.querySelector("#clear").disabled = true;
        document.querySelector("#save").disabled = true;
        document.querySelector("#load").disabled = true;
        this.disabled = true;
    });

    // Attach event listener to the "click" event of the Stop button
    document.querySelector("#stop").addEventListener("click", function() {
        // Stop the timer cycle
        running = false;
        clearInterval(runner);
        // Set button states
        document.querySelector("#start").disabled = false;
        document.querySelector("#stop").disabled = true;
        document.querySelector("#step").disabled = false;
        document.querySelector("#reset").disabled = false;
        document.querySelector("#save").disabled = false;
        if (!pattern.isEmpty()) {
            document.querySelector("#clear").disabled = false;
        }
        document.querySelector("#load").disabled = false;
    });

    // Attach event listener to the "click" event of the Step button
    document.querySelector("#step").addEventListener("click", function() {
        // Advance the game one cycle only
        pattern.advance(tbl);
        pattern.apply(tbl);
        // Set button state
        if (pattern.isEmpty()) {
            document.querySelector("#clear").disabled = true;
        }
    });

    // Attach event listener to the "click" event of the Reset button
    document.querySelector("#reset").addEventListener("click", function() {
        pattern.boolRows = JSON.parse(JSON.stringify(startPattern.boolRows));
        pattern.apply(tbl);
        document.querySelector("#clear").disabled = false;
    });

    // Attach event listener to the "click" event of the Clear button
    document.querySelector("#clear").addEventListener("click", function() {
        pattern.clear();
        pattern.apply(tbl);
        startPattern.boolRows = JSON.parse(JSON.stringify(pattern.boolRows));
        startPattern.apply(thumb);
        // Set button states
        document.querySelector("#reset").disabled = true;
        document.querySelector("#clear").disabled = true;
        document.querySelector("#save").disabled = true;
    });

    // Attach event listener to the "click" event of the Save button
    document.querySelector("#save").addEventListener("click", function() {
        // Set up the Save dialog
        document.querySelector("#save-message").innerHTML = "";
        document.querySelector("#pattern-name").value = pattern.name;
        document.querySelector("#author").value = pattern.author;
        // "Open" the Save dialog
        document.querySelector("#page-mask").style.display = "block";
        document.querySelector("#save-dialog").style.display = "block";
    });

    // Attach event listener to the "click" event of the Load button
    document.querySelector("#load").addEventListener("click", function() {
        // "Open" the Load dialog
        document.querySelector("#page-mask").style.display = "block";
        document.querySelector("#load-dialog").style.display = "block";
    });

    // Attach event listener to the "click" event of the Rules button
    document.querySelector("#rules").addEventListener("click", function() {
        // "Open" the Rules dialog
        document.querySelector("#page-mask").style.display = "block";
        document.querySelector("#rules-dialog").style.display = "block";
    });

    // Attach event listener to the "click" event of the Save button
    // on the Save dialog
    document.querySelector("#save-submit").addEventListener("click", function() {
        let name = document.querySelector("#pattern-name").value.trim();
        let author = document.querySelector("#author").value.trim();
        let message = document.querySelector("#save-message");
        let destination = document.querySelector('input[name="destination"]:checked').value;
        message.innerHTML = "";
        // Validate name and author fields
        if (!nameRE.test(name)) {
            message.innerHTML = nameInvalid;
        }
        else {
            startPattern.name = name;
        }
        if (!authorRE.test(author)) {
            message.innerHTML = authorInvalid;
        }
        else {
            startPattern.author = author;
        }
        if (!(message.innerHTML)) {
            // Save the pattern
            savePattern(startPattern, destination);
            // "Close" the dialog
            document.querySelector("#page-mask").style.display = "none";
            document.querySelector("#save-dialog").style.display = "none";
        }
    });

    // Attach event listener to the "click" event of the Cancel button
    // on the Save dialog
    document.querySelector("#save-cancel").addEventListener("click", function() {
        // "Close" the dialog
        document.querySelector("#page-mask").style.display = "none";
        document.querySelector("#save-dialog").style.display = "none";
    });

    // Attach event listener to the "click" event of the Load button
    // on the Load dialog
    document.querySelector("#load-submit").addEventListener("click", function() {
        // Switch to the Gallery page
        let source = document.querySelector('input[name="source"]:checked').value;
        window.location.href = 'gallery.html?source=' + source;
    });

    // Attach event listener to the "click" event of the Cancel button
    // on the Load dialog
    document.querySelector("#load-cancel").addEventListener("click", function() {
        // "Close" the dialog
        document.querySelector("#page-mask").style.display = "none";
        document.querySelector("#load-dialog").style.display = "none";
    });

    // Attach event listener to the "click" event of the Close button
    // on the Rules dialog
    document.querySelector("#rules-close").addEventListener("click", function() {
        // "Close" the dialog
        document.querySelector("#page-mask").style.display = "none";
        document.querySelector("#rules-dialog").style.display = "none";
    });

});
