// Initiate express and assign in order to use express syntax in this document
const express = require('express')
// Assign variable for easier use
const app = express()
// Initiate mongoDB and assign variable in order to use later (line 15)
const MongoClient = require('mongodb').MongoClient
// Assign a port variable a value for local host
const PORT = 2121
// Initiate dotenv package to access environment variable ('.env')
require('dotenv').config()

// Create a variable without value
let db,
    // Assign local variable to environment variable
    dbConnectionStr = process.env.DB_STRING,
    // Assign name of database collection
    dbName = 'todo'

// Connect server.js to MongoDB ... (But dont know what 'useUnifiedTopology' means/is... middleware?)
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    // Then tell us, via the console, we successfully connected to database
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        // Assign db value to currently connected mongoDB
        db = client.db(dbName)
    })

// Let the browser know that our view engine is ejs to transform it to HTML file
app.set('view engine', 'ejs')
// Use static files in public folder (middleware)
app.use(express.static('public'))
// Use middleware to parse incoming requests (including form data)
app.use(express.urlencoded({ extended: true }))
// Use middleware to parse body from post/fetch requests to json
app.use(express.json())

// Get request for home page, then do this...
app.get('/', async (request, response) => {

    // Assign variable, and Search the 'todos' collection in 'todo' db and convert data into an array
    const todoItems = await db.collection('todos').find().toArray()
    // Assign variable, and Search the 'todos' collection in 'todo' db and count the number of separate items that have a property of completed and a value of false
    const itemsLeft = await db.collection('todos').countDocuments({ completed: false })
    // Render the index.ejs file with the retrieved data (in the form of an object)
    response.render('index.ejs', { items: todoItems, left: itemsLeft })

    // db.collection('todos').find().toArray()
    //     .then(data => {
    //         db.collection('todos').countDocuments({ completed: false })
    //             .then(itemsLeft => {
    //                 response.render('index.ejs', { items: data, left: itemsLeft })
    //             })
    //     })
    //     .catch(error => console.error(error))
})

// When client requests the /addTodo POST (from ejs form), do this...
app.post('/addTodo', (request, response) => {
    // Insert one object with the form data to the monogdb 'todo' collection with default completed value of false
    db.collection('todos').insertOne({ thing: request.body.todoItem, completed: false })
        // Then do this...
        .then(result => {
            // Console log that the todo was added to the list
            console.log('Todo Added')
            // Then refresh page
            response.redirect('/')
        })
        // Otherwise, catch the error(s) and console log it(them)
        .catch(error => console.error(error))
})

// When the client requests the /markComplete update (PUT), do this...
app.put('/markComplete', (request, response) => {
    // Grab the item from the 'todos' collection that has a thing value of whatever is clicked and ...
    db.collection('todos').updateOne({ thing: request.body.itemFromJS }, {
        // Set the completed property to have a true value
        $set: {
            completed: true
        }
    }, {
        // 
        sort: { _id: -1 },
        upsert: false
    })
        // Then do this...
        .then(result => {
            // Console log that the todo was marked complete
            console.log('Marked Complete')
            response.json('Marked Complete') // Not understanding why we would have a second confirmation response
        })
        // Otherwise, catch the error(s) and console log it(them)
        .catch(error => console.error(error))

})

// When the client requests the /markUnComplete update (PUT), do this...
app.put('/markUnComplete', (request, response) => {
    // Grab the item from the 'todos' collection that has a thing value of whatever is clicked and ...
    db.collection('todos').updateOne({ thing: request.body.itemFromJS }, {
        // Set the completed property to have a value of false
        $set: {
            completed: false
        }
    }, {
        //
        sort: { _id: -1 },
        upsert: false
    })
        // Then do this...
        .then(result => {
            // Console log that the todo was marked uncomplete
            console.log('Marked UnComplete')
            response.json('Marked UnComplete') // Not understanding why we would have a second confirmation response
        })
        // Otherwise, catch the error(s) and console log it(them)
        .catch(error => console.error(error))

})

// When client requests /deleteItem (DELETE), do this...
app.delete('/deleteItem', (request, response) => {
    // Grab the item from the 'todos' collection that has a thing value of what is clicked and delete from the database
    db.collection('todos').deleteOne({ thing: request.body.itemFromJS })
        // Then tell us the result...
        .then(result => {
            // When successful, console log string
            console.log('Todo Deleted')
            response.json('Todo Deleted')
        })
        // Otherwise, catch the error(s) and console log it(them)
        .catch(error => console.error(error))

})

// Listen for visitors at the port environment
app.listen(process.env.PORT || PORT, () => {
    // Console log which port the server is running on
    console.log(`Server running on port ${PORT}`)
})