// Define the Pattern class which holds a gameplay pattern along
// with associated information and behavior
class Pattern {

    // Create a default pattern
    static defaultPattern() {
        let result = new Pattern();
        result.width = 25;
        result.height = 25;
        result.author = "";
        result.name = "";
        let boolRows = [];
        for (let i = 0; i < result.height; i++) { boolRows.push(0); };
        result.boolRows = [...boolRows];
        return result;
    }

    // Translates the boolRows into 011001 string representation
    get rows() {
        let result = [];
        for (const boolRow of this.boolRows) {
            result.push(boolRow.toString(2).padStart(this.width, '0'))
        }
        return result
    }

    // Checks to see if the pattern is empty
    isEmpty() {
        let total = 0;
        for (const boolRow of this.boolRows) {
            total += boolRow;
        }
        return (total == 0);
    }

    // Counts the number of living neighbors for the specified cell
    countNeighbors(rowNum, colNum) {

        // Get cells in an aray of arrays
        let cells = [];
        for (const row of this.rows) {
            cells.push([...row].map(x => Number(x)));
        }

        let neighbors = 0;

        // Check all the adjacent cells
        for (let i = rowNum - 1; i <= rowNum + 1; i++) {
            if ((i < 0) || (i > this.height - 1)) continue;
            for (let j = colNum - 1; j <= colNum + 1; j++) {
                if ((j < 0) || (j > this.width - 1)) continue;
                if (i === rowNum && j === colNum) continue;
                if (cells[i][j] === 1) {
                    neighbors++;
                }
            }
        }
        return neighbors;
    }

    // Creates the HTML for the gameboard table
    new_table(tbl) {
        tbl.pattern = this;
        tbl.innerHTML = "";
        for (const row_values of this.rows) {
            let row = tbl.insertRow();
            for (const cell_value of row_values) {
                let cell = row.insertCell(-1);
                cell.addEventListener("click", function() {
                    toggle(this);
                    let table = this.closest("table");
                    table.pattern.updateFromTable(table);
                })
            }
        }
    }

    // Creates the HTML for a thumbnail table
    new_thumb(tbl) {
        tbl.pattern = this;
        tbl.innerHTML = "";
        for (const row_values of this.rows) {
            let row = tbl.insertRow();
            for (const cell_value of row_values) {
                let cell = row.insertCell(-1);
            }
        }
    }

    // Updated the pattern from the HTML table
    updateFromTable(tbl) {
        let boolRows = [];
        for (const row of tbl.rows) {
            let characters = "0b";
            for (const cell of row.cells) {
                characters += String(cell.alive);
            }
            boolRows.push(Number(characters))
        }
        this.boolRows = boolRows;
    }

    // Clears the pattern
    clear() {
        let boolRows = [];
        for (let i = 0; i < this.height; i++) { boolRows.push(0); };
        this.boolRows = [...boolRows];
    }

    // Applies the pattern to the specified HTML table
    apply(tbl) {
        let row_num = 0;
        for (const row of this.rows) {
            for (let char_num = 0; char_num < row.length; char_num++) {
                let cell = tbl.rows[row_num].cells[char_num]
                cell.alive = Number(row[char_num]);
                if((cell.alive == 1)) {
                    cell.className = "alive"
                } else {
                    cell.className = "empty"
                }
                cell.innerHTML = icons[cell.alive];
            }
            row_num++
        }
    }

    // Advances the gameplay one step
    advance(tbl) {
        // Get cells in an aray of arrays
        let cells = [];
        for (const row of this.rows) {
            cells.push([...row].map(x => Number(x)));
        }

        // Deternine new cell values
        let rowNum = 0;
        for (const row of cells) {
            let colNum = 0;
            for (const column of row) {
                let status = cells[rowNum][colNum];
                let neighbors = this.countNeighbors(rowNum, colNum);
                cells[rowNum][colNum] = rules[status][neighbors];
                colNum++;
            }
            rowNum++;
        }

        // Write cells array back to boolRows
        this.boolRows = [];
        for (const row of cells) {
            let characters = "0b" + row.join("");
            this.boolRows.push(Number(characters));
        }
    }

    // Gets attributes of the pattern so that they can be saved with it
    get payload() {
        return {
            "name": this.name,
            "author": this.author,
            "pattern": this.boolRows,
            "width": this.width
        }
    }
}
