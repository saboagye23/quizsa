    
function renderQuestion(qNum, question, previousAnswer, timer){
    var questionText="<h2>"+ question.content+ "</h2><ul class='anwserChoices'>";
    question.choices.forEach((choice, index) => {
        questionText += "<li> <div qNum ="+qNum+" index='"+index+"' class='choice btn'>" +(index+1)+". "+ choice + "</div></li>";
    });
    questionText += "</ul>";

    if (previousAnswer){
        questionText+="<div class='checkAnswer'><hr/><h2>" + previousAnswer + "</h2></div>";
    }
 
    $('#questions').html(questionText);

    //update timer;
    $("#timer").html(timer);

}

function renderScores(currentScore){
    var scoreText = "<h2>All done!</h2>"+
                    "<p>Your final Score is "+currentScore+".</p>"+
                    "<div>Enter intials: <input type='text' id='txtInitials'/> <button id='btnSubmitScore' class='btn'>Submit</button>"; 
    
    $('#questions').html(scoreText);                
}

function renderHighScores(scores){
    var highScoresText = "<h2>High Scores</h2><ul class='highScores'>";

    scores.forEach((score, index)=>{
        highScoresText += "<li class='bgGrey'>"+ (index + 1) +". "+ score.initials + " - "+ score.value +"</li>";
    });

    highScoresText +="</ul>";
    highScoresText +="<div><button class='btn' id='btnGoBack' >Go Back</button> <button class='btn' id='btnClear'>Clear high Scores</button></div>"

    $('#questions').html(highScoresText);    
}

$(document).ready(function(){
    var questions = [
        {
            content: "Commonly used data types DO Not Include:",
            choices: ["strings", "booleans", "alerts", "numbers"],
            answer: 2,
            score: 5
        },
        {
            content: "The condition in an if / else statement is enclosed with _________.",
            choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
            answer: 1,
            score: 5
        },
        {
            content: "Arrays in Javescript can be used to store ___________.",
            choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
            answer: 3,
            score: 5
        },
        {
            content: "String values must be enclosed within ______ when being assigned to variables",
            choices: ["commas", "curly brackets", "quotes", "parenthesis"],
            answer: 2,
            score: 2
        },
        {
            content: "A very useful tool used during development and debugging for printing content to the debugger is:",
            choices: ["JavaScript" , "terminal/bash", "for loops", "console.log"],
            answer: 3,
            score: 5
        }
    ];

    var scores = [], timer=75, currentScore;
    function updateTimer(){
        if(timer > 0){
            timer -= 1;
        } else {
            timer = 0;
        }
    
        $("#timer").html(timer);
    }

    $(document).on('click','#btnStartQuiz', function(){
        $('#startQuiz').addClass('hidden');
        $('#questions').removeClass('hidden');

        currentScore = 0; 
        timer = 75;

        renderQuestion(0, questions[0],undefined, timer);

        setInterval(updateTimer, 1000);
    });

    $(document).on('click','.anwserChoices li .choice', function(){
        
        var qNum = parseInt($(this).attr('qNum'));
        var choice = parseInt($(this).attr('index'));

        // check answser
        var answer;;
        if(questions[qNum].answer == choice){
            answer =  'Correct';
            currentScore += questions[qNum].score;
        }else{
            answer =  'Wrong!';
            if(timer > 0){
                timer -= 15;
            }
        }

        // Go to next question;
        var nextQNum = qNum + 1; 
        if(timer > 0 && nextQNum < questions.length){ 
            renderQuestion(nextQNum, questions[nextQNum], answer, timer);
        } else {
            // end of quiz
            clearInterval(updateTimer);
            renderScores(currentScore);
        }
    });

    $(document).on('click','#btnSubmitScore', function(){
        var initialsText = $('#txtInitials').val();
        scores.push({
            value: currentScore,
            initials: initialsText
        });

        renderHighScores(scores);
    });

    $(document).on('click','#viewHighScores', function(){
        $('#startQuiz').addClass('hidden');
        $('#questions').removeClass('hidden');
        renderHighScores(scores);
    });

    $(document).on('click','#btnGoBack', function(){
        $('#startQuiz').removeClass('hidden');
        $('#questions').addClass('hidden');
        $('#questions').html('');
    });

    $(document).on('click','#btnClear', function(){
        scores = [];
        renderHighScores(scores);
    });
});