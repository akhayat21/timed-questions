//object with three properties

var trivia = {
    question: ["What was the first team to win both the Slam Dunk contest and Three-point shootout in the same year?", 
    "What team won the 2007-08 NBA Championship", 
    "What was the original name of the NBA?", 
    "What team has the best record in one season?", 
    "Who won the most NBA Finals MVP's?", 
    "What player has the most career personal fouls?", 
    "What team holds the record for the most consecutive NBA titles?", 
    "What is James Harden's number?", 
    "What was the original name of the Denver Nuggets?", 
    "What team won the first ever NBA game?"],
    //2 dimensional array
    choices: [
        //Happy Wes?
        //    ||
        //    ||    
        //    \/
        ["Philadelphia 76ers", "Miami Heat", "Golden State Warriors", "Milwuakee Bucks"],
        ["LA Lakers", "Dallas Mavericks", "San Antonio Spurs", "Boston Celtics"],
        ["NBL", "NBAA", "BAA", "ABA"],
        ["Chicago Bulls", "Golden State Warriors", "Miami Heat", "LA Lakers"],
        ["Magic Johnson", "Michael Jordan", "LeBron James", "Kareem Abdul-Jabbar"],
        ["Kareem Abdul-Jabbar", "Hakeem Olajuwon", "Shaquille O'Neal", "Wilt Chamberlain"],
        ["Boston Celtics", "Chicago Bulls", "Detriot Pistons", "LA Lakers"],
        ["07", "13", "15", "03"],
        ["Denver Rockets", "Denver Bullets", "Denver Rockies", "Denver Hawks"],
        ["Boston Celtics", "Toronto Huskie", "Philadelphia Warriors", "New York Knicks"],
    ],
    answer: ["Miami Heat", "Boston Celtics", "BAA", "Golden State Warriors", "Kareem Abdul-Jabbar", 
    "Kareem Abdul-Jabbar", "Boston Celtics", "13", "Denver Rockets", "New York Knicks",],
    gif: ["https://media.giphy.com/media/l41YboIeRy2b1EWty/giphy.gif", 
    "https://media.giphy.com/media/xUA7bi4fSQm6YnT9le/giphy.gif", 
    "https://media.giphy.com/media/q22mzwfrCwzny/giphy.gif", 
    "https://media1.giphy.com/media/DiMnfScJ4ZjoI/giphy.gif?cid=3640f6095c81f2ee4b77646e59a35eb3", 
    "https://media.giphy.com/media/3o7btYShHZTbYTRy80/giphy.gif", 
    "https://media0.giphy.com/media/9PyXQeQxH6rlNLVhAN/giphy.gif?cid=3640f6095c81f338364841762e794215",
    "https://media.giphy.com/media/sQpl7yebgk3Pq/giphy.gif", 
    "https://media.giphy.com/media/3oAt2dA6LxMkRrGc0g/giphy.gif", 
    "https://media.giphy.com/media/3oz8xzv7AMHgOx4URq/giphy.gif", 
    "https://media.giphy.com/media/VvjLPvqqMnlQc/giphy.gif",]
}
var questionCount = 0;
var right = 0;
var wrong = 0;
var unanswered = 0;
var cdClock = 24;
var clock;




// sets up the start page when the window loads
window.onload = function () {
    //console log to test functionality
    //console.log("loaded page")
    initSetup();

    
}


function initSetup() {
    clearContainer()
    var body = document.getElementsByTagName("div")[0];
    var triviaTitle = document.createElement("div");
    triviaTitle.id = "trivia";
    triviaTitle.innerHTML = "NBA Trivia";
    body.appendChild(triviaTitle);
    var triviaTitleTwo = document.createElement("div");
    triviaTitleTwo.id = "triviatwo";
    triviaTitleTwo.innerHTML = "Knock-Out!";
    body.appendChild(triviaTitleTwo);
    //created a button with id start and innerhtml text Start
    var button = document.createElement("button");
    button.id = "start";
    button.innerHTML = "Start";
    body.appendChild(button);
    //moved the button to the div element
    
    

    document.getElementById("start").onclick = start;
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
    clearContainer();
    console.log("qPageSetup function run");
    

    var timer = document.createElement("div");
    timer.id = "timer";
    timer.innerHTML = "Shot Clock: " + cdClock;

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
    clearContainer();
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
    clearContainer();
    var body = document.getElementsByTagName("div")[0];

    var title = document.createElement("div");
    title.innerHTML = "Game Over!";
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

    var button = document.createElement("button");
    button.id = "reset";
    button.innerHTML = "Rematch!";
    body.appendChild(button);
    document.getElementById("reset").onclick = reset;

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


    cdClock = 24;
    timer.innerHTML = "Shot Clock: " + cdClock;
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
    gifHolder.src = trivia.gif[questionCount];
    //"assets/images/"+trivia.gif[questionCount]+".gif"
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
    gifHolder.src = trivia.gif[questionCount];
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
    gifHolder.src = trivia.gif[questionCount];
    questionCount++;
    setTimeout(() => {
        
        checkIfOver();
    }, 2000);
    

}


function timers() {

    clock = setTimeout(() => {
        cdClock--;
        timer.innerHTML = "Shot Clock: " + cdClock;
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

function reset(){
questionCount = 0;
right = 0;
wrong = 0;
unanswered = 0;
cdClock = 24;
initSetup();
}


