
async function ler() {
    const resposta = await fetch("http://localhost:3000/noticias");
    const dados = await resposta.json();
    return dados; 
}

function cardNoticia(titulo, descricao, thumb, data, mediaAvaliacoes, fonte){
    return `<div class="noticia">
            <div class="noticia-conteudo">
                <h2>${titulo}</h2>
                <p style="font-size: 0.8rem; color: gray;">${data}</p>
                <div id="foto">
                <img class="fotoNoticia" src="${thumb}" alt="Imagem da notícia">
                </div>
                <p id="texto">${descricao}</p>
                <a href="${fonte}">Fonte</a>
            </div>
        </div>`
}

function atualizarPagina(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    let noticiasMain = document.querySelector("#noticias")
    noticiasMain.innerHTML = ""
    ler().then(dados => {
        let noticia = dados.find(item => item.id == id);
        console.log(noticia)
        noticiasMain.innerHTML += cardNoticia(
            noticia.titulo,
            noticia.texto,
            noticia.thumb,
            noticia.data,
            noticia.mediaAvaliacoes,
            noticia.fonte
        )
    });
}

atualizarPagina()