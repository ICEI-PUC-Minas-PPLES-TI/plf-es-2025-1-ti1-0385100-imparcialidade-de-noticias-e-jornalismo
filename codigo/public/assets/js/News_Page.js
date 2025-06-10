
async function ler() {
    const resposta = await fetch("/noticias"); 
    const dados = await resposta.json();
    return dados; 
}

function cardNoticia(titulo, data, thumb, descricao, fonte){
    return `<div class="noticia">
            <div class="noticia-conteudo">
                <h4>${titulo}</h4>
                <p style="font-size: 0.8rem; color: gray;">Data de Postagem: ${data}</p>
                <img class="fotoNoticia" src="${thumb}" alt="Imagem da notícia">
                <p>${descricao}</p>
                <a href="${fonte}">Link da Noticia</a>
            </div>
        </div>`
}

function atualizarPagina(){
    
    let noticiasMain = document.querySelector("#noticias")

    noticiasMain.innerHTML = ""
    ler().then(dados => {
    dados.forEach((dado)=>{
        noticiasMain.innerHTML += cardNoticia(
            dado.titulo,
            dado.data,
            dado.thumb,
            dado.texto,
            dado.fonte,
            dado.mediaAvaliacoes
        )
    })
    });
}

pesquisaInput = document.querySelector("#pesquisa")

pesquisaInput.addEventListener("input", ()=>{
    atualizarPagina()
})
atualizarPagina()

