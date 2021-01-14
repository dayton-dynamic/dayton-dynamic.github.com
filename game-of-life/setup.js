function getPatternNum() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var patternNum = (urlParams.get("pattern"));
    return patternNum;
}

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

function save(pattern, destination) {
    if (destination == "local") {
        alert("Saving local");
    }
    else {
        alert("Saving remote");
    }
}

let icons = { 1: "•", 0: "◦" };  // thank you Stephen Hinton!
let rules = [
    [0, 0, 0, 1, 1, 1, 1, 1, 1], // Empty cells with 3 or more neighbors come to life
    [0, 0, 1, 1, 0, 0, 0, 0, 0]  // Living cells survive if they have 2-3 neighbors
];
let pattern = {};
let startPattern = {};
let running = false;
let runner; // Interval timer
let interval = 500; // Interval time
let nameRE = /^[a-zA-Z0-9][a-zA-Z0-9\s]{1,19}$/;
let authorRE = /^[a-zA-Z][a-zA-Z\s]{1,19}$/;
let nameInvalid = "The Pattern Name must be 2 to 20 characters (letters, numbers or spaces).";
let authorInvalid = "The Author First Name must be 2 to 20 characters (letters or spaces).";

patternNum = getPatternNum();
pattern = Pattern.load(patternNum);
startPattern = Pattern.defaultPattern();
startPattern.width = pattern.width;
startPattern.height = pattern.height;
startPattern.boolRows = JSON.parse(JSON.stringify(pattern.boolRows));

window.addEventListener("load", function(){
    let tbl = document.querySelector("#gameboard");
    pattern.new_table(tbl);
    pattern.apply(tbl);
    let thumb = document.querySelector("#startPattern");
    startPattern.new_thumb(thumb);

    // Attach event listeners to the buttons on the main screen
    document.querySelector("#start").addEventListener("click", function() {
        startPattern.boolRows = JSON.parse(JSON.stringify(pattern.boolRows));
        startPattern.apply(thumb);
        running = true;
        runner = setInterval(() => {
            pattern.advance(tbl);
            pattern.apply(tbl);
        }, interval);
        document.querySelector("#stop").disabled = false;
        document.querySelector("#step").disabled = true;
        document.querySelector("#reset").disabled = true;
        document.querySelector("#clear").disabled = true;
        document.querySelector("#save").disabled = true;
        document.querySelector("#load").disabled = true;
        this.disabled = true;
    });
    document.querySelector("#stop").addEventListener("click", function() {
        running = false;
        clearInterval(runner);
        document.querySelector("#start").disabled = false;
        document.querySelector("#step").disabled = false;
        document.querySelector("#reset").disabled = false;
        document.querySelector("#clear").disabled = false;
        document.querySelector("#save").disabled = false;
        document.querySelector("#load").disabled = false;
        this.disabled = true;
    });
    document.querySelector("#step").addEventListener("click", function() {
        pattern.advance(tbl);
        pattern.apply(tbl);
    });
    document.querySelector("#reset").addEventListener("click", function() {
        pattern.boolRows = JSON.parse(JSON.stringify(startPattern.boolRows));
        pattern.apply(tbl);
    });
    document.querySelector("#clear").addEventListener("click", function() {
        pattern.clear();
        pattern.apply(tbl);
        startPattern.boolRows = JSON.parse(JSON.stringify(pattern.boolRows));
        startPattern.apply(thumb);
        document.querySelector("#reset").disabled = true;
        document.querySelector("#clear").disabled = true;
        document.querySelector("#save").disabled = true;
    });
    document.querySelector("#save").addEventListener("click", function() {
        document.querySelector("#save-message").innerHTML = "";
        document.querySelector("#pattern-name").value = pattern.name;
        document.querySelector("#author").value = pattern.author;
        document.querySelector("#page-mask").style.display = "block";
        document.querySelector("#save-dialog").style.display = "block";
    });
    document.querySelector("#load").addEventListener("click", function() {
        document.querySelector("#page-mask").style.display = "block";
        document.querySelector("#load-dialog").style.display = "block";
    });
    document.querySelector("#rules").addEventListener("click", function() {
        document.querySelector("#page-mask").style.display = "block";
        document.querySelector("#rules-dialog").style.display = "block";
    });

    // Attach event listeners to the buttons on the Save dialog
    document.querySelector("#save-submit").addEventListener("click", function() {
        let name = document.querySelector("#pattern-name").value.trim();
        let author = document.querySelector("#author").value.trim();
        let message = document.querySelector("#save-message");
        let destination = document.querySelector('input[name="destination"]:checked').value;
        message.innerHTML = "";
        if (!nameRE.test(name)) {
            message.innerHTML = nameInvalid;
        }
        else {
            pattern.name = name;
        }
        if (!authorRE.test(author)) {
            message.innerHTML = authorInvalid;
        }
        else {
            pattern.author = author;
        }
        if (!(message.innerHTML)) {
            save(pattern, destination);
            document.querySelector("#page-mask").style.display = "none";
            document.querySelector("#save-dialog").style.display = "none";
        }
    });
    document.querySelector("#save-cancel").addEventListener("click", function() {
        document.querySelector("#page-mask").style.display = "none";
        document.querySelector("#save-dialog").style.display = "none";
    });

    // Attach event listeners to the buttons on the Load dialog
    document.querySelector("#load-submit").addEventListener("click", function() {
        document.querySelector("#page-mask").style.display = "none";
        document.querySelector("#load-dialog").style.display = "none";
    });
    document.querySelector("#load-cancel").addEventListener("click", function() {
        document.querySelector("#page-mask").style.display = "none";
        document.querySelector("#load-dialog").style.display = "none";
    });

    // Attach event listeners to the buttons on the Rules dialog
    document.querySelector("#rules-close").addEventListener("click", function() {
        document.querySelector("#page-mask").style.display = "none";
        document.querySelector("#rules-dialog").style.display = "none";
    });

});


