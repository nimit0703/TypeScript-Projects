import { Pokemon } from "./classes/Pokemon.js";

function getPokemonById(id: number) {
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
  const modal = document.getElementById("modal")!;
  const card = document.getElementById("card")!;
  const closeBtn = document.getElementById("close")!;
  const pokemonSec = document.getElementById("pokemons")!;

  for (let i = 0; i < 70; i++) {
    const id = randomNumber(1, 500);
    getPokemonById(id).then(
      (pokemon: {
        abilities: any; type: any ; name: string; img: string }) => {
        const img = document.createElement("img");
        img.src = pokemon.img;
        img.setAttribute("data-pokemon-id", id.toString());
        console.log(pokemon.type[0].type.name ,"type");

        img.addEventListener("click", function () {
          const pokemonId = this.getAttribute("data-pokemon-id");
          const cardImg = document.getElementById("cardImg") as HTMLImageElement;
          cardImg.src = pokemon.img;
          const pokename = document.getElementById( "pokeName" ) as HTMLDivElement;
          pokename.innerText = pokemon.name;
          const poketype = document.getElementById("pokeType") as HTMLDivElement;
          poketype.innerText  = pokemon.type.map((e:any)=>(e.type.name)).toString();
          const pokeabl = document.getElementById("pokeAbl") as HTMLUListElement;
          modal.style.display = "block";
        });
        pokemonSec.appendChild(img);
      }
    );
  }
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });
};

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
