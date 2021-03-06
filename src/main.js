import { bringRivalPokemon, orderBestPokemonByCP, orderBestPokemonByName, } from './data.js';
import data from './data/pokemon/pokemon.js';

const pokemonNum = document.getElementById("num-pokemon");
const pokemonName = document.getElementById("name-poke");
const pokemonImg = document.getElementById("img-pokemon");
const pokemonType = document.getElementById("type-pokemon");
const pokemonResistant = document.getElementById("resistant-pokemon");
const pokemonWeaknesses = document.getElementById("weaknesses-pokemon");

const pokemons = data.pokemon;
const getUserInput = document.getElementById("pokemon-name-input");
const searchButton = document.getElementById("search-pokemon-btn");
const orderByCPCresc = document.getElementById("btn-cp-crescent");
const orderByCPDecresc = document.getElementById("btn-cp-decrescent");
const orderByNameA_Z = document.getElementById("btn-a-z");
const orderByNameZ_A = document.getElementById("btn-z-a");
const pokemonTableRow = document.querySelector(".pokemon-table-row");


// CLICAR PARA BUSCAR POKÉMON
searchButton.addEventListener("click", event => {
  event.preventDefault();
  document.getElementById("flex-container").className = "";
  document.getElementById("ordering-options").classList.remove("hidden")
  document.getElementById("table-section").classList.remove("hidden")
  const userInput = getUserInput.value;
  const bringPokemon = bringRivalPokemon(pokemons, userInput);

  // EXIBIR CARD
  pokemonImg.innerHTML = `<img class="card-img" src="${bringPokemon.img}"></img>`
  pokemonNum.innerHTML = `Número: ${bringPokemon.num}`
  pokemonName.innerHTML = `Nome: <span class="name-uppercase">${bringPokemon.name}</span>`
  pokemonType.innerHTML = `Tipo(s): <span class="type-uppercase"> ${bringPokemon.type.join(", ")}</span>`
  pokemonResistant.innerHTML = `Resistência(s): <span class="resistant-uppercase"> ${bringPokemon.resistant.join(", ")}</span>`
  pokemonWeaknesses.innerHTML = `Fraqueza(s): <span class="weaknesses-uppercase"> ${bringPokemon.weaknesses.join(", ")}</span>`

  // EXIBIR TABELA PADRÃO
  pokemonTableRow.innerHTML = showTable(orderBestPokemonByCP(pokemons, userInput).decrescentOrder);
})

// TABELA DE POkÉMONS VANTAJOSOS
function showTable(pokemonArray) {
  let row = ""
  for (let pokemon of pokemonArray) {
    row += `
      <tr>
        <td>
          <span class="pokemon-name">${pokemon.name}</span>
          <img class="pokemon-img" src="${pokemon.img}">
        </td>
        <td>${pokemon.num}</td>
        <td>${pokemon.type.join(", ")}</td>
        <td class="pokemon-resistance">${pokemon.resistant.join(", ")}</td>
        <td>${pokemon.stats["max-cp"]}</td>
        <td>${pokemon.stats["base-attack"]}</td>
        <td>${pokemon.stats["base-defense"]}</td>
      </tr>
    `
  }
  return row
}

// EVENTOS DE ORDENAÇÃO DE CP
// CRESCENTE

orderByCPCresc.addEventListener("click", event => {
  event.preventDefault();
  const userInput = getUserInput.value;
  pokemonTableRow.innerHTML = showTable(orderBestPokemonByCP(pokemons, userInput).crescentOrder);
})

// DECRESCENTE
orderByCPDecresc.addEventListener("click", event => {
  event.preventDefault();
  const userInput = getUserInput.value;
  pokemonTableRow.innerHTML = showTable(orderBestPokemonByCP(pokemons, userInput).decrescentOrder);
})

// EVENTOS DE ORDENAÇÃO DE NOME
// A-Z
orderByNameA_Z.addEventListener("click", event => {
  event.preventDefault();
  const userInput = getUserInput.value;
  pokemonTableRow.innerHTML = showTable(orderBestPokemonByName(pokemons, userInput).A_Z);
})

// Z-A
orderByNameZ_A.addEventListener("click", event => {
  event.preventDefault();
  const userInput = getUserInput.value;
  pokemonTableRow.innerHTML = showTable(orderBestPokemonByName(pokemons, userInput).Z_A);
})
