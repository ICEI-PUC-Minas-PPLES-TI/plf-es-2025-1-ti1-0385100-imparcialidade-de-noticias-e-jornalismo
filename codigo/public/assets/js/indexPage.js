var pesquisa = ""
async function ler() {
    const resposta = await fetch("http://localhost:3000/noticias"); 
    const dados = await resposta.json();
    return dados; 
}

function cardNoticia(titulo, descricao, foto, data, link){
    return `<a href="${link}"><div class="noticia">
            <img src="${foto}" alt="Imagem da notícia">
            <div class="noticia-conteudo">
                <h4>${titulo}</h4>
                <p>${descricao}</p>
                <p style="font-size: 0.8rem; color: gray;">${data}</p>
            </div>
        </div></a>`
}

function cardNoticia(titulo, descricao, foto, data, link){
    return `<a href="${link}"><div class="noticia">
            <img src="${foto}" alt="Imagem da notícia">
            <div class="noticia-conteudo">
                <h4>${titulo}</h4>
                <p>${descricao}</p>
                <p style="font-size: 0.8rem; color: gray;">${data}</p>
            </div>
        </div></a>`
}


function atualizarPagina(){
    let noticiasMain = document.querySelector("#noticias")

    noticiasMain.innerHTML = ""
    ler().then(dados => {
    dados.forEach((dado)=>{
        noticiasMain.innerHTML += cardNoticia(
            dado.titulo,
            dado.texto,
            dado.thumb,
            dado.data,
            dado.fonte
        )
    })
    });
}

atualizarPagina()