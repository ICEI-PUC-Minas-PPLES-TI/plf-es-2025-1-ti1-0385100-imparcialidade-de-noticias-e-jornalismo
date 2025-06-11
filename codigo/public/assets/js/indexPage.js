pesquisaInput = document.querySelector("#pesquisa")



async function ler() {
    const resposta = await fetch("http://localhost:3000/noticias"); 
    const dados = await resposta.json();
    return dados; 
}

function cardNoticia(id ,titulo, descricao, foto, data, mediaAvaliacoes){
    return `<a href="./modulos/detalhes/News_Page.html?id=${id}"><div class="noticia">
            <img class="fotoNoticia" src="${foto}" alt="Imagem da notícia">
            <div class="noticia-conteudo">
                <span id="divNomeEstrelas"><h4>${titulo}</h4><img src="./assets/images/stars${mediaAvaliacoes}.png" alt=""></span>
                <p>${descricao}</p>
                <p style="font-size: 0.8rem; color: gray;">${data}</p>
            </div>
        </div></a>`
}

let filtro = 0

// botaoRelevancia = 0
// botaoRecentes = 1
// botaoAntigas = 2
// botaoMaisAvaliadas = 3
// botaoMenosAvaliadas = 4
// botaoNotasdescrescente = 5
// botaoNotascresncente = 6

function resertCores(){
    document.querySelector("#botaoRelevancia").style.background = "#e0dede"
    document.querySelector("#botaoRecentes").style.background = "#e0dede"
    document.querySelector("#botaoAntigas").style.background = "#e0dede"
    document.querySelector("#botaoMaisAvaliadas").style.background = "#e0dede"
    document.querySelector("#botaoMenosAvaliadas").style.background = "#e0dede"
    document.querySelector("#botaoNotasdescrescente").style.background = "#e0dede"
    document.querySelector("#botaoNotascresncente").style.background = "#e0dede"
}

function coresBotao(){
    resertCores()
    switch (filtro){
        case 0:
            document.querySelector("#botaoRelevancia").style.background = "blue"
            break
        case 1:
            document.querySelector("#botaoRecentes").style.background = "blue"
            break
        case 2:
            document.querySelector("#botaoAntigas").style.background = "blue"
            break
        case 3:
            document.querySelector("#botaoMaisAvaliadas").style.background = "blue"
            break
        case 4:
            document.querySelector("#botaoMenosAvaliadas").style.background = "blue"
            break
        case 5:
            document.querySelector("#botaoNotasdescrescente").style.background = "blue"
            break
        case 6:
            document.querySelector("#botaoNotascresncente").style.background = "blue"
            break
    }
}

document.querySelector("#botaoRelevancia").addEventListener("click", () => {
    filtro = 0
    atualizarPagina()
})
document.querySelector("#botaoRecentes").addEventListener("click", () => {
    filtro = 1
    atualizarPagina()
})
document.querySelector("#botaoAntigas").addEventListener("click", () => {
    filtro = 2
    atualizarPagina()
})
document.querySelector("#botaoMaisAvaliadas").addEventListener("click", () => {
    filtro = 3
    atualizarPagina()
})
document.querySelector("#botaoMenosAvaliadas").addEventListener("click", () => {
    filtro = 4
    atualizarPagina()
})
document.querySelector("#botaoNotasdescrescente").addEventListener("click", () => {
    filtro = 5
    atualizarPagina()
})
document.querySelector("#botaoNotascresncente").addEventListener("click", () => {
    filtro = 6
    atualizarPagina()
})
function atualizarPagina(){
    coresBotao()
    let noticiasMain = document.querySelector("#noticias")

    noticiasMain.innerHTML = ""
    ler().then(dados => {
    if (pesquisaInput.value != ""){
        dados = dados.filter(dado => dado.titulo.toLowerCase().includes(pesquisaInput.value))
    }
    if (filtro == 0){
        dados = dados.sort((dado, dado2) => parseInt(dado2.acessos) - parseInt(dado.acessos))
    } else if (filtro == 1) {
        dados = dados.sort((dado, dado2) => new Date(dado2.data) - new Date(dado.data))
    } else if (filtro == 2) {
        dados = dados.sort((dado, dado2) => new Date(dado.data) - new Date(dado2.data))
    } else if (filtro == 3) {
        dados = dados.sort((dado, dado2) => parseInt(dado2.numAvaliacoes) - parseInt(dado.numAvaliacoes))
    } else if (filtro == 4) {
        dados = dados.sort((dado, dado2) => parseInt(dado.numAvaliacoes) - parseInt(dado2.numAvaliacoes))
    } else if (filtro == 5) {
        dados = dados.sort((dado, dado2) => parseInt(dado2.mediaAvaliacoes) - parseInt(dado.mediaAvaliacoes))
    } else if (filtro == 6) {
        dados = dados.sort((dado, dado2) => parseInt(dado.mediaAvaliacoes) - parseInt(dado2.mediaAvaliacoes))
    }
    dados.forEach((dado)=>{
        noticiasMain.innerHTML += cardNoticia(
            dado.id,
            dado.titulo,
            dado.texto,
            dado.thumb,
            dado.data,
            dado.mediaAvaliacoes,
            dado.fonte
        )
    })
    });
}
pesquisaInput.addEventListener("input", ()=>{
    atualizarPagina()
})
atualizarPagina()

let btnAux = false
document.querySelector("#botaoFiltros").addEventListener("click", ()=>{
    document.querySelector("#filtros").style.left = btnAux ? "-500px" : "0"
    btnAux = !btnAux
})
document.querySelector("#botaoFechar").addEventListener("click", ()=>{
    document.querySelector("#filtros").style.left = "-500px"
    btnAux = false
})