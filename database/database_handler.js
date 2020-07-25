const sqlLite3 = require("sqlite3").verbose()

function startMemoryDatabase() {
    // open database in memory
    let sqlite3 = new sqlLite3.Database(':memory:', (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the in-memory SQlite database.');
    });


}
function stopMemoryDatabase() {
    // close the database connection
    sqlLite3.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}