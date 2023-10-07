 const questions = [
    {
        question: "What does HTML stands for?",
        answers: [
            {text: "Hyperlinks and Text Markup Language", correct: false},
            {text: "Hyper Text Markup Language", correct: true},
            {text: "Home Tool MArkup Language", correct: false},
            {text: "Hyper Text Market Language", correct: false}
        ]
    },
    {
        question: "How do you apply a CSS rule only when the mouse hovers over an element?",
        answers: [
            {text: ":active", correct: false},
            {text: ":focus", correct: false},
            {text: "mouseover", correct: false},
            {text: ":hover", correct: true}
        ] 
    },
    {
        question: "Which of the following is not a valid way to declare a variable in JavaScript?",
        answers: [
            {text: "variable", correct: true},
            {text: "const", correct: false},
            {text: "let", correct: false},
            {text: "var", correct: false}
        ] 
    },
    {
        question: "What is React primarily used for?",
        answers: [
            {text: "Server-side Scripting", correct: false},
            {text: "database management", correct: false},
            {text: "building user-interface", correct: true},
            {text: "creating RESTful APIs", correct: false}
        ] 
    }
 ];

 const questionElement = document.getElementById('question');
 const answerButton = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You score ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
        answerButton.disabled;
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})
startQuiz();