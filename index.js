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




// My functions 
function clearAllInputs(){
    endorsmentTextEl.value = ""
    fromInputEl.value = ""
    toInputEl.value = ""
}

function appendEndorsmentToEndorsments(toInput, endorsmentText, fromInput, numOfLikes){
    endorsmentContainerEl.innerHTML += `
    <div class="endorsment-div">
        <h3 class="to-render">To: ${toInput}</h2>
        <p>${endorsmentText}</p>
        <h3 class="from-render">From: ${fromInput}</h2>
        <span class="like-span"><i class="fa-solid fa-heart"></i> ${numOfLikes}</span>    
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


                
