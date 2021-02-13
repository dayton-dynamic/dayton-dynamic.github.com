// Get source from URL query string
function getSource() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const source = (urlParams.get("source"));
    return source;
}

// Populate the HTML list of stored patterns (displayed as tiles in the Gallery)
function fillUl(gameList) {

    // Add a single item to the list
    function addLi(row) {
        // Create list item
        var li = document.createElement('li');
        gameList.append(li);
        let html = `<a id=id${row['id']} href="index.html?pattern=${row['id']}&source=${getSource()}">`;
        html = html + `<p><span class="name">${row['name']}</span><br><span class="author">by ${row['author']}</span></p>`;
        html = html + `<div class="start-pattern-thumb">`;
        html = html + `<table class="thumbnail"></table>`;
        html = html + `</div>`;
        html = html + `</a>`;
        li.innerHTML = html;
        // Add thumbnail
        let startPattern = Pattern.defaultPattern();
        startPattern.width = row['width'];
        startPattern.height = row['pattern'].length;
        startPattern.boolRows = JSON.parse(JSON.stringify(row['pattern']));
        let thumb = document.querySelector('#id' + row['id'] + ' div table.thumbnail');
        startPattern.new_thumb(thumb);
        startPattern.apply(thumb);
    }

    if (getSource() == "local") {
        // Get list of stored patterns from the browser's local storage
        let storedPatterns = [];
        if (localStorage.patterns) {
            storedPatterns = JSON.parse(localStorage.patterns);
        }
        if (storedPatterns.length > 0) {
            storedPatterns.forEach(addLi);
            document.querySelector('#list').style.display = "block";
        } else {
            document.querySelector('#empty').style.display = "block";
        }

    }
    else {
        // Get list of stored patterns from the remote database server
        fetch(url)
            // When the response is returned...
            .then(response => {
                if (response.ok &&
                    response.headers.get("Content-Type") === "application/json; charset=utf-8") {
                    return response.json();
                }
                else {
                    throw new Error(
                        'Unexpected response status ${response.status} or content type'
                    );
                }
            })
            // If the response is valid...
            .then(data => {
                if (data.length > 0) {
                    data.forEach(addLi);
                    document.querySelector('#list').style.display = "block";
                } else {
                    document.querySelector('#empty').style.display = "block";
                }
            })
            // If an error was encountered...
            .catch(error => {
                console.log("Error while fetching list of patterns:", error);
                alert("Error while getting patterns!");
            });
    }

}

let url = "http://45.79.202.219:3000/pattern"; // URL for the remote database server
let icons = { 1: "•", 0: "◦" };  // Define display characters for non-styles cells

// Once the page is comletely loaded, find the unordered list and populate it
window.addEventListener("load", function() {
    let gameList = document.getElementById("game-list");
    fillUl(gameList);
});
