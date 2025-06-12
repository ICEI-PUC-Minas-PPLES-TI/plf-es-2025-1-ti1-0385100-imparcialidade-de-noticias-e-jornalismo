
async function ler() {
    const resposta = await fetch("http://localhost:3000/noticias");
    const dados = await resposta.json();
    return dados; 
}

async function lerComentarios() {
    const resposta = await fetch("http://localhost:3000/comentarios");
    const dados = await resposta.json();
    return dados;
}

async function lerRespostas() {
    const resposta = await fetch("http://localhost:3000/respostas");
    const dados = await resposta.json();
    return dados;
}

async function createAny(url, conteudo) {
    const resposta = await fetch(url, {method: 'POST', body: JSON.stringify(conteudo),})
    const dados = await resposta.json();
    return dados;
}
init()
function init(){
    let userLogado = sessionStorage.getItem("usuarioCorrente")
    userLogado = JSON.parse(userLogado)
    console.log(userLogado)
    if (userLogado != null){
        document.querySelector("#loginSpan").innerHTML = `Bem vindo, ${userLogado.nome}`
    } else {
        document.querySelector("#loginSpan").innerHTML = `<a href="./modulos/login/login.html"><h3>Login</h3></a>`
    }
}

function addComent(){
    let userLogado = sessionStorage.getItem("usuarioCorrente")
    userLogado = JSON.parse(userLogado)
    console.log(userLogado)
    if (userLogado != null){
        document.querySelector("#loginSpan").innerHTML = `Bem vindo, ${userLogado.nome}`
        let text = document.querySelector("#inputEnviar").value
        createAny("http://localhost:3000/cometarios", {
            id : 0,
            idUsuario : userLogado.id,
            nomeUsurio : userLogado.nome,
            conteudo : text,
            data : new Date().toISOString(),
            likes : []
        })
    } else {
        document.querySelector("#loginSpan").innerHTML = `<a href="./modulos/login/login.html"><h3>Login</h3></a>`
    }
}
document.querySelector("#btnEnviar").addEventListener("click", function (){
    addComent()
})

function cardNoticia(id ,titulo, descricao, foto, data, mediaAvaliacoes){
    return `<div class="noticia">
            <img class="fotoNoticia" src="${foto}" alt="Imagem da notícia">
            <div class="noticia-conteudo">
                <span id="divNomeEstrelas"><h4>${titulo}</h4><img src="../../assets/images/stars${mediaAvaliacoes}.png" alt=""></span>
                <p>${descricao}</p>
                <p style="font-size: 0.8rem; color: gray;">${data}</p>
            </div>
        </div>`
}
function cardRespotas(nomeUsurio,conteudo,data){
    return `<div class="respostas">
                <h4>${nomeUsurio}</h4>
                <h7>${data}</h7>
                <h4>${conteudo}</h4>
            </div>`
}
function cardCometarios(idComentario, idUsuario ,nomeUsurio, conteudo, data, likesQtn){
    return `<div class="comentario">
                <span>
                    <h4>${nomeUsurio} likes: ${likesQtn}</h4>
                    <h7>${data}</h7>
                </span>
                <h4>${conteudo}</h4>
                <button id="BntResp${idComentario}">Responder</button>
            </div>`
}

async function atualizarPagina(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    let noticiasMain = document.querySelector("#noticias")
    let cometariosMain = document.querySelector("#comentario")
    noticiasMain.innerHTML = ""
    document.querySelector("#comentario").innerHTML = ""
    let respostas;
    await lerRespostas().then(resposta => {
        respostas = resposta
    })

    await ler().then(dados => {
        let noticia = dados.find(item => item.id == id);
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

    await lerComentarios().then(dados => {
        dados.forEach((dado) => {
            // precisei do chat para aprender a usar essa insertAdjacentHTML
            cometariosMain.insertAdjacentHTML("beforeend", cardCometarios(
                dado.id,
                dado.idUsuario,
                dado.nomeUsurio,
                dado.conteudo,
                dado.data,
                dado.likes.length
            ));

            respostas.filter((resp) => resp.comentarioId == dado.id).forEach((resp2) => {
                cometariosMain.insertAdjacentHTML("beforeend", cardRespotas(
                    resp2.nomeUsurio,
                    resp2.conteudo,
                    resp2.data,
                ));
            });

            const botaoResposta = document.querySelector(`#BntResp${dado.id}`);
            if (botaoResposta) {
                botaoResposta.addEventListener("click", function () {
                    let cont = prompt("Qual sua mensagem?");
                    createAny("http://localhost:3000/respostas", {
                        id: 1,
                        comentarioId: dado.id,
                        idUsuario: 102,
                        nomeUsurio: "Joao",
                        conteudo: cont,
                        data: new Date().toISOString()
                    }).then(() => {
                        atualizarPagina();
                    });
                });
            }
        });
    })
}

atualizarPagina()

