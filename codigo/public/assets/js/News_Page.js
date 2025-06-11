
async function ler() {
    const resposta = await fetch("http://localhost:3000/noticias");
    const dados = await resposta.json();
    return dados; 
}

function cardNoticia(id ,titulo, descricao, foto, data, mediaAvaliacoes){
    return `<a href="./modulos/detalhes/News_Page.html?id=${id}"><div class="noticia">
            <img class="fotoNoticia" src="${foto}" alt="Imagem da notícia">
            <div class="noticia-conteudo">
                <span id="divNomeEstrelas"><h4>${titulo}</h4><img src="../../assets/images/stars${mediaAvaliacoes}.png" alt=""></span>
                <p>${descricao}</p>
                <p style="font-size: 0.8rem; color: gray;">${data}</p>
            </div>
        </div></a>`
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
            noticia.id,
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