const form = document.querySelector("#form-pesquisar");
const input = document.querySelector("#pesquisar");

form.addEventListener("submit", async function(evento) {
    evento.preventDefault();
    const nome = input.value.toLowerCase();
    if (nome == "") {
        document.querySelector("#menssagem").textContent =
            "Digite o nome de um Pokémon";
        document.querySelector("#resultado").hidden = true;
        return;
    }
    const resposta = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${nome}`
    );

    if (resposta.ok == false) {
        document.querySelector("#menssagem").textContent =
            "Pokémon não encontrado";
        document.querySelector("#resultado").hidden = true;
        return;
    }
    const pokemon = await resposta.json();
    document.querySelector("#menssagem").textContent = "";
    document.querySelector("#nome").textContent =
        pokemon.name;
    document.querySelector("#numero").textContent =
        "Nº " + pokemon.id;
    document.querySelector("#imagem").src =
        pokemon.sprites.other["official-artwork"].front_default;
    if (pokemon.types.length == 1) {
        document.querySelector("#tipo").textContent =
            "Tipo: " + pokemon.types[0].type.name;
    }
    else {
        document.querySelector("#tipo").textContent =
            "Tipos: "
            + pokemon.types[0].type.name
            + ", "
            + pokemon.types[1].type.name;
    }
    document.querySelector("#altura").textContent =
        "Altura: " + pokemon.height / 10 + " m";
    document.querySelector("#peso").textContent =
        "Peso: " + pokemon.weight / 10 + " kg";
    document.querySelector("#estatisticas").innerHTML =
        "HP: " + pokemon.stats[0].base_stat + "<br>" +
        "Ataque: " + pokemon.stats[1].base_stat + "<br>" +
        "Defesa: " + pokemon.stats[2].base_stat + "<br>" +
        "Ataque Especial: " + pokemon.stats[3].base_stat + "<br>" +
        "Defesa Especial: " + pokemon.stats[4].base_stat + "<br>" +
        "Velocidade: " + pokemon.stats[5].base_stat;
    document.querySelector("#resultado").hidden = false;
});