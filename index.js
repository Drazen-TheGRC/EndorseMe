// javascript
/* FireBase Stuff & Browser module stuff*/
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js'
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js'


/* My database */
const firebaseConfig = {
    databaseURL: "https://endorse-me-8c141-default-rtdb.europe-west1.firebasedatabase.app/"
}


// Initialize Firebase
const app = initializeApp(firebaseConfig)
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app)
// Referencing the database and creating a table in it
const endorseMeDatabase = ref(database, "endorseMeDatabase")




const endorsmentTextEl = document.getElementById("endorsment-text")
const fromInputEl = document.getElementById("from-input")
const toInputEl = document.getElementById("to-input")

const submitButtonEl = document.getElementById("submit-btn")


// Button event listener 
submitButtonEl.addEventListener("click", () => {
    
    let endorsmentText = endorsmentTextEl.value
    let fromInput = fromInputEl.value
    let toInput = toInputEl.value

    push(endorseMeDatabase, getEndorsment(toInput, endorsmentText, fromInput))

    console.log("endorsmentText:", endorsmentText)
    console.log("fromInput:", fromInput)
    console.log("toInput:", toInput)

    clearAllInputs()
})



// My functions 
function clearAllInputs(){
    endorsmentTextEl.value = ""
    fromInputEl.value = ""
    toInputEl.value = ""
}

function getEndorsment(toInput, endorsmentText, fromInput){
    let endorsment = {
        to : toInput,
        endorsmentText : endorsmentText,
        from : fromInput,
        date : "",
        likes : 0
    }
    return endorsment
}
