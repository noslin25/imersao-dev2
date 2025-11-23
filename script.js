let cardcontainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("#campo-busca");
let botaoBusca = document.querySelector("#botao-busca");
let dados =  [];

async function iniciarBusca() {
    try {
        let resposta = await fetch("data.json");
        dados = await resposta.json();
        // Não renderiza os cards ao iniciar
    } catch (error) {
        console.error("Erro ao buscar os dados:", error);
    }
}

function realizarBusca() {
    const termo = campoBusca.value;
    const timesFiltrados = filtrarDados(termo);
    renderizarCards(timesFiltrados);
}

function removerAcentos(texto) {
    // Normaliza a string para decompor os caracteres acentuados e remove os acentos
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function filtrarDados(termo) {
    // Filtra os dados com base no nome ou na descrição do time
    return dados.filter(dado => {
        // Remove acentos e converte para minúsculas para uma busca flexível
        const termoBusca = removerAcentos(termo.toLowerCase());
        const nomeTime = removerAcentos(dado.nome.toLowerCase());
        const descricaoTime = removerAcentos(dado.descricao.toLowerCase());
        
        return nomeTime.includes(termoBusca) || descricaoTime.includes(termoBusca);
    });
}

function renderizarCards(dadosParaRenderizar) {
    cardcontainer.innerHTML = ""; // Limpa os cards antigos antes de renderizar os novos
    for (let dado of dadosParaRenderizar) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
         <h2>${dado.nome}</h2>
        <p>Ano de fundação: ${dado.ano}</p>
        <p>${dado.descricao}</p>
        <a href="${dado.Link}" class="btn" target="_blank">Saiba mais</a>
        `;
        cardcontainer.appendChild(article);
    }
}

// Busca ao clicar no botão
botaoBusca.addEventListener("click", () => {
    realizarBusca();
});

iniciarBusca();
   