
async function ler() {
    const resposta = await fetch("http://localhost:3000/noticias");
    const dados = await resposta.json();
    return dados; 
}

function cardNoticia(titulo, descricao, thumb, data, fonte, tendence){
    return `<div class="noticia">
            <div class="noticia-conteudo">
                <h2>${titulo}</h2>
                <p style="font-size: 0.09 rem; color: gray;">${data}</p>
                <div id="foto">
                <img class="fotoNoticia" src="${thumb}" alt="Imagem da notícia">
                </div>
                <p id="texto">${descricao}</p>
                <a href="${fonte}">Link da Noticia</a>
            </div>
            <img id="up_tendence" class="Tendence" src="../assets/images/a_up_arrow.png" alt="up_tendence_arrow">
            <img id="down_tendence" class="Tendence" src="../assets/images/a_down_arrow.png" alt="down_tendence_arrow">
            <p id="value_tencence">Tendencia: ${tendence}</p>
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
            noticia.fonte,
            noticia.tendence,
        )
    });
}



atualizarPagina()