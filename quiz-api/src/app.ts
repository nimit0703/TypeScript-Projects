import { QuizData } from "./classes/QuizData.js";
let _:any;

const intro = document.getElementById("intro") as HTMLDivElement;
const quizPage = document.getElementById("quizPage") as HTMLDivElement;
const playBtn = document.getElementById("btn") as HTMLButtonElement;

let  count = 1;

playBtn.addEventListener("click", function () {
  intro.style.display = "none";
  quizPage.style.display = "block";
  startGame();
});

async function startGame() {
  const quizData = await getDataFromAPI();
  displayQue(quizData);
}

window.onload = function () {
  intro.style.display = "flex";
  quizPage.style.display = "none";
};
function getDataFromAPI() {
  return fetch(
    "https://opentdb.com/api.php?amount=1&category=18&difficulty=medium&type=multiple"
  )
    .then((responce) => {
      return responce.json();
    })
    .then((data) => {
      const que = data.results[0].question;
      const ans = data.results[0].correct_answer;
      const otherOpt = data.results[0].incorrect_answers;
      return new QuizData(que, ans, otherOpt);
    });
}


function displayQue(quizData: QuizData) {
  console.log(quizData);
  let que = document.getElementById("ques-sec") as HTMLDivElement;
  que.innerText = quizData.que;
  let opctionBtn = document.querySelectorAll(".opt button");
  quizData.options.push(quizData.ans);

  quizData.options = _.shuffle(quizData.options);

  for (let i = 0; i < 4; i++) {
    let btn = opctionBtn[i] as HTMLButtonElement;
    btn.innerText = quizData.options[i];
    btn.dataset.isCorrect =
      quizData.options[i] === quizData.ans ? "true" : "false";

    btn.addEventListener("click", function selected(e) {
      const isCorrect = btn.dataset.isCorrect === "true";

      if (isCorrect) {
        count++;
        let opt = btn.closest(".opt") as HTMLDivElement;
        opt.style.backgroundColor = "green";
        console.log("Correct Answer:", quizData.ans);
        setTimeout(() => {
            startGame();
            const queNo = document.getElementById('que-no') as HTMLSpanElement;
            queNo.innerText = count.toString();
            opt.style.backgroundColor = "transparent";
        }, 1000);
      } else {
        count = 0;
        let opt = btn.closest(".opt") as HTMLDivElement;
        opt.style.backgroundColor = "red";
        console.log("Incorrect Answer:", btn.innerText);
        setTimeout(() => {
            const queNo = document.getElementById('que-no') as HTMLSpanElement;
            queNo.innerText = count.toString();
            opt.style.backgroundColor = "transparent";
            startGame()
        }, 1000);
      }
    });
  }
}
