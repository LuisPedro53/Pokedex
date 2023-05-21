const pegaPokemon = document.getElementById('pegaPokemon');
let loadingContainer = document.querySelector('.loading');
let pokemons = [];
const nomesComLetra = [];
let pokemonsClicados = [];

Requisicao();

//aqui espero 1 segundo para a requisição acontecer, e apos isso aparece os pokemons na tela todos dentro do array
setTimeout(() => {
  mostrarPokemon();
}, 2000);

function Requisicao() {
  fetch('https://pokeapi.co/api/v2/pokemon?limit=52&offset=0')
    .then(response => response.json())
    .then(allPokemon => {

      allPokemon.results.map((val) => {
        fetch(val.url)
          .then(response => response.json())
          .then(pokemonSingle => {
            pokemons.push({
              nome: val.name,
              imagem: pokemonSingle.sprites.front_default,
              experiencia: pokemonSingle.base_experience,
              altura: pokemonSingle.height,
              largura: pokemonSingle.weight,
              id: pokemonSingle.id
            });
          })
      })
    });
}


function mostrarPokemon() {

  let pokemonBoxes = document.querySelector('.pokemon-boxes');
  // Tempo de espera para simular o carregamento

  // Resto do seu código para exibir os pokémons  
  pokemonBoxes.innerHTML = "";
  pokemons.map(function (valores) {
    pokemonBoxes.innerHTML += `
    <div class="pokemon-box">
      <div class = "div-nomePokemon">
        <p class = "nome-pokemon">`+ valores.nome + `</p>
      </div>
      <img class = "imagem-pokemon" src="`+ valores.imagem + `"  data-id="` + valores.id + `">
      <div class = "favorita">

      </div> 
      <div class = "div-sobrePokemon">
        <p class = "sobre-pokemon" id = "life"> Life: `+ valores.experiencia + ` Hp</p>
        <p class = "sobre-pokemon" id = "Altura"> Height: `+ valores.altura + ` m</p>
        <p class = "sobre-pokemon" id = "Largura"> Weight: `+ valores.largura + ` Kg</p>
      </div> 
    </div>`;
  });
  loadingContainer.style.display = 'none';
  // Evento de clique da imagem do Pokémon
  // Array para armazenar os pokémons clicados
  let badges = document.querySelector(".favoritos-badge");
  let imagens = document.querySelectorAll('.imagem-pokemon');
  imagens.forEach(function (imagem) {
    imagem.addEventListener('click', function () {
      // Encontrar o objeto do pokémon clicado com base no ID
      var pokemonObj = pokemons.find(function (pokemon) {
        return pokemon.id === parseInt(this.dataset.id);
      }, this);

      // Verificar se o Pokémon já está no array
      var isDuplicate = pokemonsClicados.some(function (pokemon) {
        return pokemon.id === pokemonObj.id;
      });

      if (!isDuplicate) {
        pokemonsClicados.push(pokemonObj);
      }
      // Adicionar o objeto do pokémon ao array


      console.log('Pokémons clicados:', pokemonsClicados); // Exibir no console os pokémons clicados
      badges.style.display = 'inline-block';
      badges.innerHTML = pokemonsClicados.length;
    });
  });
}


//aqui a cada tecla precionda no campo, é feita uma pesquisa no array, e caso aquela letra for encontrada
//é adicionado na tela os pokemons com aquelas letras
pegaPokemon.addEventListener('keyup', () => {
  if (pegaPokemon.value === '') {
    mostrarPokemon()
    nomesComLetra.length = 0;
  } else {
    // nomePokemon(pegaPokemon.value);
    verificarPokemon(pegaPokemon.value);
  }
});

let favoritos = document.querySelector('#favoritos');

favoritos.addEventListener('click', () => {
  localStorage.setItem('pokemonsClicados', JSON.stringify(pokemonsClicados));
  window.location.href = '/Secundaria/pagina2.html';

})

function verificarPokemon(letra) {
  // Filtrar os nomes que contêm a letra e adicioná-los ao novo array
  nomesComLetra.length = 0; // Limpa o array antes de cada verificação
  pokemons.filter(p => {
    if (p.nome.includes(letra)) {
      nomesComLetra.push(p);

      let pokemonBoxes = document.querySelector('.pokemon-boxes');
      pokemonBoxes.innerHTML = "";

      nomesComLetra.map(function (valores) {
        pokemonBoxes.innerHTML += `
        <div class="pokemon-box">
          <div class="div-nomePokemon">
            <p class="nome-pokemon">`+ valores.nome + `</p>
          </div>
          <img class="imagem-pokemon" src="`+ valores.imagem + `" data-id="` + valores.id + `">
          <div></div>
          <div class="div-sobrePokemon">
            <p class="sobre-pokemon" id="life">Life: `+ valores.experiencia + ` Hp</p>
            <p class="sobre-pokemon" id="Altura">Height: `+ valores.altura + ` m</p>
            <p class="sobre-pokemon" id="Largura">Weight: `+ valores.largura + ` Kg</p>
          </div> 
        </div> 
        `;
      });
      loadingContainer.style.display = 'none';
      // Evento de clique da imagem do Pokémon
      // Array para armazenar os pokémons clicados
      let badges = document.querySelector(".favoritos-badge");
      let imagens = document.querySelectorAll('.imagem-pokemon');
      imagens.forEach(function (imagem) {
        imagem.addEventListener('click', function () {
          // Encontrar o objeto do pokémon clicado com base no ID
          var pokemonObj = nomesComLetra.find(function (pokemon) {
            return pokemon.id === parseInt(this.dataset.id);
          }, this);

          // Verificar se o Pokémon existe e tem um ID válido
          if (pokemonObj && pokemonObj.id) {
            // Verificar se o Pokémon já está no array
            var isDuplicate = pokemonsClicados.some(function (pokemon) {
              return pokemon.id === pokemonObj.id;
            });

            if (!isDuplicate) {
              pokemonsClicados.push(pokemonObj);
            }
          }

          // Adicionar o objeto do pokémon ao array
          console.log('Pokémons clicados:', pokemonsClicados); // Exibir no console os pokémons clicados
          badges.style.display = 'inline-block';
          badges.innerHTML = pokemonsClicados.length;
        });
      });
    }
  });
}
