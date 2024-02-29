// Citation for the following lines of code: 7-20
// Date: 1/13/2024
// Copied from starter code on CS 340 Activity 2.
// Source URL: https://canvas.oregonstate.edu/courses/1946034/assignments/9456203?module_item_id=23809270


// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_lappjo',
    password        : '4570',
    database        : 'cs340_lappjo'
})

// Export it for use in our application
module.exports.pool = pool;