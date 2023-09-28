"use strict";
fetch("https://opentdb.com/api.php?amount=1&category=18&difficulty=medium&type=multiple")
    .then((responce) => {
    return responce.json();
}).then((data) => {
    console.log(data);
});
