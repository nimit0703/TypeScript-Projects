var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { QuizData } from "./classes/QuizData.js";
let _;
const intro = document.getElementById("intro");
const quizPage = document.getElementById("quizPage");
const playBtn = document.getElementById("btn");
let count = 1;
playBtn.addEventListener("click", function () {
    intro.style.display = "none";
    quizPage.style.display = "block";
    startGame();
});
function startGame() {
    return __awaiter(this, void 0, void 0, function* () {
        const quizData = yield getDataFromAPI();
        displayQue(quizData);
    });
}
window.onload = function () {
    intro.style.display = "flex";
    quizPage.style.display = "none";
};
function getDataFromAPI() {
    return fetch("https://opentdb.com/api.php?amount=1&category=18&difficulty=medium&type=multiple")
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
function displayQue(quizData) {
    console.log(quizData);
    let que = document.getElementById("ques-sec");
    que.innerText = quizData.que;
    let opctionBtn = document.querySelectorAll(".opt button");
    quizData.options.push(quizData.ans);
    quizData.options = _.shuffle(quizData.options);
    for (let i = 0; i < 4; i++) {
        let btn = opctionBtn[i];
        btn.innerText = quizData.options[i];
        btn.dataset.isCorrect =
            quizData.options[i] === quizData.ans ? "true" : "false";
        btn.addEventListener("click", function selected(e) {
            const isCorrect = btn.dataset.isCorrect === "true";
            if (isCorrect) {
                count++;
                let opt = btn.closest(".opt");
                opt.style.backgroundColor = "green";
                console.log("Correct Answer:", quizData.ans);
                setTimeout(() => {
                    startGame();
                    const queNo = document.getElementById('que-no');
                    queNo.innerText = count.toString();
                    opt.style.backgroundColor = "transparent";
                }, 1000);
            }
            else {
                count = 0;
                let opt = btn.closest(".opt");
                opt.style.backgroundColor = "red";
                console.log("Incorrect Answer:", btn.innerText);
                setTimeout(() => {
                    const queNo = document.getElementById('que-no');
                    queNo.innerText = count.toString();
                    opt.style.backgroundColor = "transparent";
                    startGame();
                }, 1000);
            }
        });
    }
}
