let currentQuestion = -1;

function nextQuestionValue () {
    currentQuestion ++;
}

let currentCorrect = 0;

function tallyCorrect(){
    currentCorrect ++;
}


function createQuestion() {
  nextQuestionValue();
  console.log(currentQuestion);
  return ` 
 <header class="top">
<h1 class="counter" role="heading">
<div>Question:<span class="questionCount">${currentQuestion + 1}</span></div>
<span class="totalCorrect">${currentCorrect}</span>/10 Correct</h1>
</header>

<main role="main">
    <h2 class="question"> ${STORE[currentQuestion].question}</h2>
    <form>
    <fieldset>
    <label class="answerForm">
        <input type="radio" id="input1" value="${STORE[currentQuestion].answers[0]}" name="answer"> <label for="input1">${STORE[currentQuestion].answers[0]}</label><br>
        <input type="radio" id="input2" value="${STORE[currentQuestion].answers[1]}" name="answer"> <label for="input2">${STORE[currentQuestion].answers[1]}</label><br>
        <input type="radio" id="input3" value="${STORE[currentQuestion].answers[2]}" name="answer"> <label for="input3">${STORE[currentQuestion].answers[2]}</label><br>
        <input type="radio" id="input4" value="${STORE[currentQuestion].answers[3]}" name="answer"> <label for="input4">${STORE[currentQuestion].answers[3]}</label><br>    
  <button type="submit" id="checkCorrect" class="nextButton">Bog Me</button>
  </fieldset>
</form>
</main>
`; }




function  wrongAnswerPage () { return `
  <header class="top">
    <h1 class="counter" role="heading">WRONG ANSWER</h1>
  </header>
  <main role="main">
    <h2 class="answerResponse">That was a terrible guess... The correct answer was \"${STORE[currentQuestion].correctAnswer}\" </h2>
    <button type="button" id="js-nextQ" class="nextButton">Keep On Boggin</button>
  </main>
`;}


function correctAnswerPage () { return `
  <header class="top">
    <h1 class="counter" role="heading">WOW</h1>
  </header>
  <main role="main">
    <h2 class="answerResponse">Guess you may know a thing or two afterall...</h2>
    <button type="button" id="js-nextQ" class="nextButton">Keep On Boggin</button>
  </main>
`;}

  function retryPage () { currentQuestion = -1;
    return `
  <header class="top">
    <h1 class="counter" role="heading">Whew. <span class="totalCorrect">${currentCorrect}</span>/10 Correct</h1>
  </header>
  <main role="main">
    <h2 class="answerResponse">Care to try again?</h2>
    <button type="button" id="returnToStart" class="nextButton">Re-Bog</button>
  </main>
`;}

function homePage () { return `
<div class="js-target">
  <header class="top">
    <h1 class="intro" role="heading">Only the top 1% know anything about the Bogdanoff's... Are you in the 1%?</h1>
  </header>
      <button type="button" id="startButton" class="nextButton">Test Your Mettle</button>
        </div>
  <div class="sidebar-right" role="image sidebar">
      <img class="rightBogImg" src="./assets/right_bog.jpg" alt="Ominous Bogdanoff Face">
    </div>
`}



function startOnClick () { currentCorrect = 0;
    $('.js-target').on('click', '#startButton', function (event) {
      $('.js-target').html(createQuestion());
  });
  }


  
function checkAnswer() {
  $(".js-target").on("click", "#checkCorrect", function (event) {
    event.preventDefault();
      if ($("input:checked").val() === `${STORE[currentQuestion].correctAnswer}`)
      { $('.js-target').html(correctAnswerPage());
    tallyCorrect();}
    else if 
        ($("input:checked").val() == undefined) 
    {
      console.log("blank submitted");
      alert("please select your answer");
    }
    else{
      $('.js-target').html(wrongAnswerPage());
    }

  }); 
}

  function cyclePages () {
    $('.js-target').on('click', '#js-nextQ', function (event) {
if (currentQuestion < 9){
      $('.js-target').html(createQuestion());
}
else if (currentQuestion == 9){
  $('.js-target').html(retryPage());

}
else {$('.js-target').html(retryPage());}
  });
  }


  function retryButton () {
    $('.js-target').on('click', '#returnToStart', function (event) {
      //currentQuestion = 0; 
      window.location.href = window.location.href
      //$(createQuiz);
  });
  }

  function createQuiz () {
    startOnClick();
    cyclePages();
    checkAnswer();
    retryButton ();
  }
  
  $(createQuiz);