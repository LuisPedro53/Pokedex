const pokemonsClicados = JSON.parse(localStorage.getItem('pokemonsClicados'));

const pegaPokemon = document.getElementById('pegaPokemon');
let pokemons = [];
// Array que armazenará os nomes que contêm a letra
const nomesComLetra = [];
//Primeiro faço uma requisição

function mostrarPokemon() {
  let pokemonBoxes = document.querySelector('.pokemon-boxes');

  // Tempo de espera para simular o carregamento

  // Resto do seu código para exibir os pokémons  
  pokemonBoxes.innerHTML = "";
  pokemonsClicados.map(function (valores) {
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
}


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


// Função de keyup
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
          <div class = "div-nomePokemon">
            <p class = "nome-pokemon">`+ valores.nome + `</p>
          </div>
          <img class = "imagem-pokemon" src="`+ valores.imagem + `"> 
          <div>
            
          </div>
          <div class = "div-sobrePokemon">
          <p class = "sobre-pokemon" id = "life"> Life: `+ valores.experiencia + ` Hp</p>
          <p class = "sobre-pokemon" id = "Altura"> Height: `+ valores.altura + ` m</p>
          <p class = "sobre-pokemon" id = "Largura"> Weight: `+ valores.largura + ` Kg</p>
         </div> 
        </div> 
        `
      })
    }
  });
}







