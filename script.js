const pegaPokemon = document.getElementById('pegaPokemon');
mostrarPokemon();

pegaPokemon.addEventListener('keyup', () => {
  if (pegaPokemon.value === '') {
    mostrarPokemon()
  } else {
    nomePokemon(pegaPokemon.value);
  }
});

function nomePokemon(nome) {
  fetch('https://pokeapi.co/api/v2/pokemon/' + nome)
    .then(response => response.json())
    .then(allPokemon => {
      let pokemons = [];
      pokemons.push({
        nome: allPokemon.name,
        imagem: allPokemon.sprites.front_default,
        experiencia:allPokemon.base_experience,
        altura:allPokemon.height,
        largura:allPokemon.weight
      });

      console.log(pokemons);

      let pokemonBoxes = document.querySelector('.pokemon-boxes');
      pokemonBoxes.innerHTML = "";

      pokemons.map(function (valores) {
        pokemonBoxes.innerHTML += `
        <div class="pokemon-box">
        <div class = "div-nomePokemon">
          <p class = "nome-pokemon">`+ valores.nome + `</p>
        </div>
        <img class = "imagem-pokemon" src="`+ valores.imagem + `"> 
        <div class = "div-sobrePokemon">
          <p class = "sobre-pokemon life"> Life: `+ valores.experiencia + `</p>
          <p class = "sobre-pokemon height"> Altura: `+ valores.altura + `</p>
          <p class = "sobre-pokemon weight"> Largura: `+ valores.largura + `</p>
        </div> 
        </div> 
        `
      })
    })
    .catch(error => {
      // Trate o erro aqui sem exibi-lo no console
      console.log('Ocorreu um erro ao buscar o Pokémon:', error.message);
    });
}


function mostrarPokemon() {

  fetch('https://pokeapi.co/api/v2/pokemon?limit=52&offset=0')
    .then(response => response.json())
    .then(allPokemon => {
      let pokemons = [];

      allPokemon.results.map((val) => {
        fetch(val.url)
          .then(response => response.json())
          .then(pokemonSingle => {
            pokemons.push({
              nome: val.name,
              imagem: pokemonSingle.sprites.front_default,
              experiencia:pokemonSingle.base_experience,
              altura:pokemonSingle.height,
              largura:pokemonSingle.weight
            });

            let pokemonBoxes = document.querySelector('.pokemon-boxes');
            pokemonBoxes.innerHTML = "";

            pokemons.map(function (valores) {
              pokemonBoxes.innerHTML += `
              <div class="pokemon-box">
              <div class = "div-nomePokemon">
                <p class = "nome-pokemon">`+ valores.nome + `</p>
              </div>
              <img class = "imagem-pokemon" src="`+ valores.imagem + `"> 
              <div class = "div-sobrePokemon">
                <p class = "sobre-pokemon" id = "life"> Life: `+ valores.experiencia + ` Hp</p>
                <p class = "sobre-pokemon" id = "Altura"> Height: `+ valores.altura + ` m</p>
                <p class = "sobre-pokemon" id = "Largura"> Weight: `+ valores.largura + ` Kg</p>
              </div> 
              </div> 
              `
            })
          })
      })
    });
}

fetch('https://pokeapi.co/api/v2/pokemon/ditto')
  .then(response => response.json())
  .then(allPokemon => console.log(allPokemon));

