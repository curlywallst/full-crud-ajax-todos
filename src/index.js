document.addEventListener('DOMContentLoaded', () => {
  const pokemonAddForm = document.querySelector("form")
  pokemonAddForm.addEventListener("submit", addPokemon)
  fetchAllPokemon()
})

function addPokemon(e){
  e.preventDefault()
  debugger;
}

function fetchAllPokemon() {
  fetch("http://localhost:3000/pokemon")
  .then((response) => response.json())
  .then((jsonData) => {
    const pokemonContainer = document.querySelector("#pokemon-container")
    pokemonContainer.innerHTML = renderAllPokemon(jsonData)
    addPokemonListeners()
  })
}


function renderPokemon(pokemon){
  let pokemonCard = document.createElement('div')
  pokemonCard.innerHTML += `
    <div class='card' id='${pokemon.id}'>
      <h2>${pokemon.name}</h2>
      <img src="${pokemon.sprites.front}"/>
    </div>
  `
  document.getElementById("pokemon-container").appendChild(pokemonCard)
  pokemonCard.addEventListener('click', (event) => {
    showPoke(pokemon.id)
  })
}


function addPokemonListeners(){
  let pokemon = document.querySelectorAll('.pokemon-card')
  pokemon.forEach((poke) => {
    poke.querySelector('img').addEventListener('click', (event) => {
      showPoke(poke.querySelector('img').dataset.id)
    })
    poke.querySelector('.pokemon-delete-button').addEventListener('click', () => {
      removePoke(poke.querySelector('img').dataset.id)
    })
    poke.querySelector('form.pokemon-update').addEventListener('submit', (event) => {
      event.preventDefault()

      debugger
      updatePoke(poke)
    })
  })
}

function showPoke(id){
  const container = document.getElementById('pokemon-container')
  container.innerHTML = ""
  fetch(`http://localhost:3000/pokemon/${id}`)
  .then((response) => response.json())
  .then ((jsonData) => {
    renderPokemon(jsonData)
  })
}

function updatePoke(poke){
  let pokeId = parseInt(poke.querySelector('img').dataset.id)

  const pokemon = {
    id: parseInt(pokeId),
    name: poke.querySelector('form.pokemon-update').querySelector("input").value
  }
  const container = document.getElementById('pokemon-container')
  container.innerHTML = ""
  fetch(`http://localhost:3000/pokemon/${parseInt(pokeId)}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application.json',
      'Accept': 'application.json'
    },
    body: JSON.stringify(pokemon)
  })
  .then((response) => response.json())
  .then(fetchAllPokemon)
  .catch(function(error){
    console.log(error.messages)
  })
}