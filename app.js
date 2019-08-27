const btn = document.querySelector('.btn');
const input = document.querySelector('.quiz-form input[type=number]');
const label = document.querySelector('label');
const UIquestion = document.querySelector('.quiz h4');
const UIanswers = document.querySelector('.showQuestionsList');
const UIalert = document.querySelector('.alert');


UIalert.style.display = 'none';
label.style.display = 'none';
input.style.display = 'none';
btn.textContent = 'Play the game'

const Question = function (question, answers, aCorrect) {
  this.question = question;
  this.answers = answers;
  this.aCorrect = aCorrect;
}

const q1 = new Question('What does JS mean?', [`It's a programing language`, `New airfreshner`, `Cereal brand`], '0');

const q2 = new Question('What is the name of Trump?', [`Barack`, `Smith`, `Donald`], '2');

const q3 = new Question('What is the EyeX?', [`Tesla's autopilot function`, `Eye tracking device`, `Plane name`], '1');

const q4 = new Question('How many seasons did The Office tv show had?', [`Six`, `Nine`, `Seven`], '1');

const q5 = new Question('What Fitbit are know for?', [`For smartwatches`, `For world known yoga classes`, `Company for plasterboarding walls`], '0');

const allQuestions = [q1, q2, q3, q4, q5];

Question.prototype.showQuestion = (number) => {
  let output = '';
  UIquestion.textContent = `${allQuestions[number].question}`
  for (let i = 0; i < allQuestions[number].answers.length; i++) {
    output += `
    <p class="questionP">${i} - ${allQuestions[number].answers[i]}</p>
    `
    console.log(`${i}: ${allQuestions[number].answers[i]}`)
  }
  UIanswers.innerHTML = output;
}

const showAlert = function (text, color) {
  UIalert.style.display = 'block';
  UIalert.textContent = text;
  UIalert.style.backgroundColor = color;
  setTimeout(() => {
    UIalert.style.display = 'none';
  }, 1000)
}

let score = 0;

Question.prototype.checkQuestion = (UIinput, random) => {
  if (UIinput === allQuestions[random].aCorrect) {
    score++;
    showAlert(`Correct! Your score is ${score}`, '#6BBD6E')
    console.log(`Correct and your score is ${score}`);
  } else {
    showAlert(`Incorrect. Your score is ${score}`, '#f44336')
    console.log('Incorrect');
  }
}


let clickCount = 0;
let dice = Math.floor(Math.random() * allQuestions.length);
console.log(dice)
btn.addEventListener('click', (e) => {
  if (input.value !== 'exit') {
    clickCount++;
    allQuestions[dice].showQuestion(dice);
    btn.textContent = 'submit';
    label.style.display = 'block';
    input.style.display = 'block';
    let twoDice = dice;
    // console.log(clickCount)
    if (clickCount === 2) {
      scrollTo(0, 0);
      UIanswers.textContent = `Click "NEXT QUESTION" to proceed forward`
      allQuestions[twoDice].checkQuestion(input.value, twoDice);
      label.style.display = 'none';
      input.style.display = 'none';
      console.log(`DICE TWO IS ${twoDice}`);
      btn.textContent = 'next question';
      clickCount = 0;
      twoDice = 0;
      dice = Math.floor(Math.random() * allQuestions.length);
      input.value = '';
    }
  }
  e.preventDefault();
})