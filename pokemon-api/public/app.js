import { Pokemon } from "./classes/Pokemon.js";
function getPokemonById(id) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((responce) => {
        return responce.json();
    })
        .then((data) => {
        let name = data.name;
        let img = data.sprites.other.dream_world.front_default;
        let types = data.types;
        let abilities = data.abilities;
        let forms = data.forms;
        let poke = new Pokemon(name, img, types, abilities, forms);
        return poke;
    });
}
window.onload = function () {
    const modal = document.getElementById("modal");
    const card = document.getElementById("card");
    const closeBtn = document.getElementById("close");
    const pokemonSec = document.getElementById("pokemons");
    for (let i = 0; i < 20; i++) {
        const id = randomNumber(1, 500);
        getPokemonById(id).then((pokemon) => {
            const img = document.createElement("img");
            img.src = pokemon.img;
            img.setAttribute("data-pokemon-id", id.toString());
            console.log(pokemon.type[0].type.name, "type");
            img.addEventListener("click", function () {
                const pokemonId = this.getAttribute("data-pokemon-id");
                const cardImg = document.getElementById("cardImg");
                cardImg.src = pokemon.img;
                const pokename = document.getElementById("pokeName");
                pokename.innerText = pokemon.name;
                const poketype = document.getElementById("pokeType");
                poketype.innerText = pokemon.type.map((e) => (e.type.name)).toString();
                const pokeabl = document.getElementById("pokeAbl");
                modal.style.display = "block";
            });
            pokemonSec.appendChild(img);
        });
    }
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });
};
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
