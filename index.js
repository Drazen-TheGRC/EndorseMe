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

const endorsmentContainerEl = document.getElementById("endorsment-container")

const submitButtonEl = document.getElementById("submit-btn")

let snapshotExists
let snapshotLength

// Button event listener 
submitButtonEl.addEventListener("click", () => {
    
    let endorsmentText = endorsmentTextEl.value
    let fromInput = fromInputEl.value
    let toInput = toInputEl.value

    push(endorseMeDatabase, getEndorsment(toInput, endorsmentText, fromInput, 0))

    console.log("endorsmentText:", endorsmentText)
    console.log("fromInput:", fromInput)
    console.log("toInput:", toInput)

    appendEndorsmentToEndorsments(toInput, endorsmentText, fromInput, 0)

    clearAllInputs()
})

// Fetching data from the database
onValue(endorseMeDatabase, (snapshot) => {
    // Clear endorsmentContainerEl
    clearEndorsmentContainerEl()

    // If snapshot exists
    if(snapshot.exists()){
        
        snapshotExists = true
        // Create an array of snapshot entries (each entry is an array of an id[0] and a value[1])
        let endorsmentsArray = Object.entries(snapshot.val())
        
        // Append all values to endorsmentContainerEl
        endorsmentsArray.forEach( (currentEndorsment) => {
            appendEndorsmentToEndorsments(currentEndorsment[0], currentEndorsment[1])
        })
    }else{
        snapshotExists = false
    }
})



// My functions 
function clearAllInputs(){
    endorsmentTextEl.value = ""
    fromInputEl.value = ""
    toInputEl.value = ""
}

function clearEndorsmentContainerEl(){
    endorsmentContainerEl.innerHTML = ""
}

function appendEndorsmentToEndorsments(endorsmentId, endorsment){


    endorsmentContainerEl.innerHTML += `
    <div class="endorsment-div">
        <h3 class="to-render">To: ${endorsment.to}</h2>
        <p>${endorsment.endorsmentText}</p>
        <h3 class="from-render">From: ${endorsment.from}</h2>
        <span class="like-span"><i class="fa-solid fa-heart"></i> ${endorsment.likes}</span>    
    </div>
    `
}

function getEndorsment(toInput, endorsmentText, fromInput, numOfLikes){
    let endorsment = {
        to : toInput,
        endorsmentText : endorsmentText,
        from : fromInput,
        date : "",
        likes : numOfLikes
    }
    return endorsment
}


                
