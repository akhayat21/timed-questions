//object with three properties

var trivia = {
    question: ["question1", "question2", "question3"],
    //2 dimensional array
    choices: [
        ["choice11", "choice21", "choice31", "choice41"],
        ["choice12", "choice22", "choice32", "choice42"],
        ["choice13", "choice23", "choice33", "choice43"],
    ],
    answer: ["choice11", "choice22", "choice33"],
    gif: ["gif1", "gif1", "gif1"]
}
var questionCount = 0;
var right = 0;
var wrong = 0;
var unanswered = 0;
var cdClock = 5;
var clock;
var timeOut = 10;



// sets up the start page when the window loads
window.onload = function () {
    //console log to test functionality
    //console.log("loaded page")
    initSetup();

    document.getElementById("start").onclick = start;
}


function initSetup() {
    //created a button with id start and innerhtml text Start
    var button = document.createElement("button");
    button.id = "start";
    button.innerHTML = "Start";

    //moved the button to the div element
    var body = document.getElementsByTagName("div")[0];
    body.appendChild(button);


    //when button is clicked, trivia game will start
}


function clearContainer() {
    console.log("ran clear container");
    var container = document.getElementById("container")
    container.innerHTML = "";
}


//start function
function start() {
    document.getElementById("start").style.visibility = "hidden";
    console.log("start function run");
    qPageSetup();
    

}

function qPageSetup() {
    clearContainer()
    console.log("qPageSetup function run");
    

    var timer = document.createElement("div");
    timer.id = "timer";
    timer.innerHTML = "Counterdown timer: " + cdClock;

    var body = document.getElementsByTagName("div")[0];
    body.appendChild(timer);

    var question = document.createElement("div");
    question.id = "question";
    question.innerHTML = "test";
    body.appendChild(question);

    for (let i = 0; i < 4; i++) {
        var choices = document.createElement("button");
        choices.className = "choice";
        choices.id = i;
        body.appendChild(choices);
    }
    qPage();
}

function aPageSetup() {
    clearContainer()
    console.log("aPageSetup function run");
    var body = document.getElementsByTagName("div")[0];

    var result = document.createElement("div");
    result.id = "result";
    result.innerHTML = "";
    body.appendChild(result);

    var resultDesc = document.createElement("div");
    resultDesc.id = "resultDesc";
    resultDesc.innerHTML = "";
    body.appendChild(resultDesc);

    var gifHolder = document.createElement("img");
    gifHolder.id = "gifHolder";
    gifHolder.src = "";
    body.appendChild(gifHolder);


}

function resultPageSetup(){
    clearContainer()
    var body = document.getElementsByTagName("div")[0];

    var title = document.createElement("div");
    title.innerHTML = "Game Ended";
    body.appendChild(title);

    var correct = document.createElement("div");
    correct.innerHTML = "Correct Answers: "+right;
    body.appendChild(correct);

    var incorrect = document.createElement("div");
    incorrect.innerHTML = "Incorrect Answers: "+wrong;
    body.appendChild(incorrect);

    var timeOut = document.createElement("div");
    timeOut.innerHTML = "Unanswered Answers: "+unanswered;
    body.appendChild(timeOut);

}

//function to open the question page 
function qPage() {
    console.log("qPage function run");

    question.innerHTML = trivia.question[questionCount];

    for (let i = 0; i < 4; i++) {
        var buttonCounter = document.getElementById(i);
        buttonCounter.innerHTML = trivia.choices[questionCount][i];
    }

    for (let j = 0; j < 4; j++) {
        document.getElementById(j).onclick = function () {
            var chosen = this.id;
            clearTimeout(clock);
            logic(chosen);

        }
    }



    timers();


}

//function to determine if the guess was correct
function logic(chosen) {
    //string below returns the position of the correct answer inside the choices array, can be used to 
    //match against parameter of logic function
    //trivia.choices[questionCount].indexOf(trivia.answer[questionCount])

    let correctIndex = trivia.choices[questionCount].indexOf(trivia.answer[questionCount]);

    if (chosen == correctIndex){
        //win condition
        
        right++;
        correct();
    } else {
        wrong++
        incorrect();
        //lose condition
    }


}



//function for incorrect answer
function incorrect() {
    aPageSetup()
    console.log("incorrect function run");
    result.innerHTML = "Nope!";
    resultDesc.innerHTML = "The correct answer was "+trivia.answer[questionCount];
    gifHolder.src = "assets/images/"+trivia.gif[questionCount]+".gif";
    questionCount++;
    setTimeout(() => {
        
        checkIfOver();
    }, 2000);
    

}

//function for correct answer
function correct() {
    aPageSetup()
    console.log("correct function run");
    result.innerHTML = "Exactly!";
    gifHolder.src = "assets/images/"+trivia.gif[questionCount]+".gif";
    questionCount++;
    setTimeout(() => {
        
        checkIfOver();
    }, 2000);
    

}

//function for out of time
function noinput() {
    aPageSetup()
    console.log("noinput function run");
    console.log("incorrect function run");
    result.innerHTML = "Time's Up!";
    resultDesc.innerHTML = "The correct answer was "+trivia.answer[questionCount];
    gifHolder.src = "assets/images/"+trivia.gif[questionCount]+".gif";
    questionCount++;
    setTimeout(() => {
        
        checkIfOver();
    }, 2000);
    

}


function timers() {

    clock = setTimeout(() => {
        cdClock--;
        timer.innerHTML = "Counterdown timer: " + cdClock;
        if (cdClock > 0) {
            timers();
        } else {
            noinput();
            unanswered++;
        }

    }, 1000);

}

function checkIfOver(){
    if(questionCount == (trivia.question.length)){
        clearTimeout(clock);
        resultPageSetup();
    }else{
        qPageSetup(); 
    }
}



