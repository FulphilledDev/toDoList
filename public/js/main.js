// assign variable to select all '.fa-trash' elements
const deleteBtn = document.querySelectorAll('.fa-trash')
// assign variable to select all '.item span' elements
const item = document.querySelectorAll('.item span')
// assign variable to select all '.item span.completed' elements
const itemCompleted = document.querySelectorAll('.item span.completed')

// Make array from all elements in deleteBtn and cycle through with forEach
Array.from(deleteBtn).forEach((element) => {
    // Add event listener to each element that runs 'deleteItem()' on click
    element.addEventListener('click', deleteItem)
})

// Make array from all elements in item and cycle through with forEach
Array.from(item).forEach((element) => {
    // Add event listener to each element that runs 'markComplete()' on click
    element.addEventListener('click', markComplete)
})

// Make array from all elements in itemCompleted and cycle through with forEach
Array.from(itemCompleted).forEach((element) => {
    // Add event listener to each element that runs 'markUnComplete()' on click
    element.addEventListener('click', markUnComplete)
})

// Make asynchronous function deleteItem() for listener above 
async function deleteItem() {
    // Assign variable to select innerText of 'this' to do item 
    const itemText = this.parentNode.childNodes[1].innerText
    // Attempt this...
    try {
        // Make a response variable that fetches deleteItem from server.js
        const response = await fetch('deleteItem', {
            // Identify method as delete
            method: 'delete',
            // Assign type headers
            headers: { 'Content-Type': 'application/json' },
            // Create body property of 'itemFromJS' with a value that is stringified itemText (in order to communicate with server)
            body: JSON.stringify({
                // Match property with referred value in line above 
                'itemFromJS': itemText
            })
        })
        // Upon receiving, assign variable a value of responded json
        const data = await response.json()
        // Console log json data
        console.log(data)
        // And refresh the page
        location.reload()
        // If that doesnt work...
    } catch (err) {
        // Console log the issue
        console.log(err)
    }
}

// Make asynchronous function markComplete() for listener above
async function markComplete() {
    // Assign variable to select innerText of 'this' to do item
    const itemText = this.parentNode.childNodes[1].innerText
    // Attempt this...
    try {
        // Make a response variable that fetches markComplete from server.js
        const response = await fetch('markComplete', {
            // Identify method as put
            method: 'put',
            // Assign type headers
            headers: { 'Content-Type': 'application/json' },
            // Create body property of 'itemFromJS' with a value that is stringified itemText(in order to communicate with server)
            body: JSON.stringify({
                // Match property with referred value in line above
                itemFromJS: itemText
            })
        })
        // Upon receiving, assign variable a value of responded json
        const data = await response.json()
        // Console log json data
        console.log(data)
        // And refresh the page
        location.reload()
        // If that doesnt work...
    } catch (err) {
        // Console log the issue
        console.log(err)
    }
}

// Make asynchronous function markUnComplete() for listener above
async function markUnComplete() {
    // Assign variable to select innerText of 'this' to do item
    const itemText = this.parentNode.childNodes[1].innerText
    // Attempt this...
    try {
        // Make a response variable that fetches markUnComplete from server.js
        const response = await fetch('markUnComplete', {
            // Identify method as put
            method: 'put',
            // Assign type headers
            headers: { 'Content-Type': 'application/json' },
            // Create body property of 'itemFromJS' with a value that is stringified itemText(in order to communicate with server)
            body: JSON.stringify({
                // Match property with referred value in line above
                itemFromJS: itemText
            })
        })
        // Upon receiving, assign variable a value of responded json
        const data = await response.json()
        // Console log json data
        console.log(data)
        // And refresh the page
        location.reload()
        // If that doesnt work...
    } catch (err) {
        // Console log the issue
        console.log(err)
    }
}