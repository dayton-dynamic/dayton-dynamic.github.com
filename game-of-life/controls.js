function listProperties(obj) {
    let propList = "";
    for (let propName in obj) {
        if (typeof (obj[propName]) != "undefined") {
            propList += (propName + ", ");
        }
    }
    return propList
}



function read_pattern() {
    pattern = []
    let table = document.querySelector("#gameboard");
    for (let row of table.rows) {
        let row_str = "";
        for (let cell of row.cells) {
            row_str += cell.innerHTML;
        }
        pattern.push(row_str);
    }
    console.log(pattern);
    return pattern
}

