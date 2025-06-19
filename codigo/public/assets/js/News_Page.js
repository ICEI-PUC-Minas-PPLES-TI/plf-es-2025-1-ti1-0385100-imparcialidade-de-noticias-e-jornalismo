

let userLogado
var stars = 0
const star1 = document.querySelector("#star1")
const star2 = document.querySelector("#star2")
const star3 = document.querySelector("#star3")
const star4 = document.querySelector("#star4")
const star5 = document.querySelector("#star5")
let noticiasMain = document.querySelector("#noticias")
let cometariosMain = document.querySelector("#comentario")
let idNoticia

async function ler(idNoticia) {
    const resposta = await fetch("http://localhost:3000/noticias?id="+idNoticia);
    const dados = await resposta.json();
    return dados; 
}
async function mostrarNotificacao(msg, sucessouErro){
    let sucessoOuErro = "error"
    if (sucessouErro){
        sucessoOuErro = "success"
    }

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    await Toast.fire({
        icon: sucessoOuErro,
        title: msg
    });
}
async function mostrarDuvidaComOk(msg, sucessouErro, descricao = ""){
    let sucessoOuErro = "error"
    let titulo = "Erro inesperado."
    if (sucessouErro){
        sucessoOuErro = "success"
        titulo = "Sucesso!"
    }
    if (descricao){
        await Swal.fire({
            icon: sucessoOuErro,
            title: titulo,
            text: msg,
            footer: descricao
        });
    } else {
        await Swal.fire({
            icon: sucessoOuErro,
            title: titulo,
            text: msg,
        });
    }
}
async function lerComentarios(idNoticia) {
    const resposta = await fetch("http://localhost:3000/comentarios?idNoticia="+idNoticia);
    const dados = await resposta.json();
    return dados;
}
async function lerRespostas(idComentario) {
    const resposta = await fetch("http://localhost:3000/respostas?comentarioId="+idComentario);
    const dados = await resposta.json();
    return dados;
}
async function createAny(url, conteudo) {
    const resposta = await fetch(url, {method: 'POST', body: JSON.stringify(conteudo)})
    const dados = await resposta.json();
    return dados;
}
async function editAny(url, idComentario, conteudo) {
    const resposta = await fetch(url, {method: 'PUT', body: JSON.stringify(conteudo)})
    const dados = await resposta.json();
    return dados;
}
async function addComentario(){
    if (userLogado != null){
        let text = document.querySelector("#inputEnviar").value

        await  createAny("http://localhost:3000/comentarios", {
            stars : stars,
            idNoticia : idNoticia,
            idUsuario : userLogado.id,
            nomeUsurio : userLogado.nome,
            conteudo : text,
            data : new Date().toISOString(),
            likes : []
        })

    } else {
        mostrarNotificacao("Faça login para comentar", false)
    }
}
async function addResposta(comentarioId, conteudo){
    if (userLogado != null){

        await createAny("http://localhost:3000/respostas", {
            comentarioId: comentarioId,
            idUsuario: userLogado.id,
            nomeUsurio: userLogado.nome,
            conteudo: conteudo,
            data: new Date().toISOString()
        })

    } else {
        mostrarNotificacao("Faça login para responder", false)
    }
}
async function addorRemoveComentarioLike(usuarioId, idComentario, removerOuColocar){
    if (userLogado != null){

        await editAny("http://localhost:3000/respostas?comentarioId="+idComentario)

    } else {
        mostrarNotificacao("Faça login para comentar", false)
    }
}
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
function cardRespotas(nomeUsurio,conteudo,data, likes){
    return `<div class="respostas">
                <span class="spanCard">
                    <h3>${nomeUsurio}</h3>
                    <h6>${data}</h6>
                </span>
                <h4>${conteudo}</h4>
            </div>`
}
function cardCometarios(idComentario, idUsuario ,nomeUsurio, conteudo, data, likesQtn){
    return `<div class="comentario" id="divComentario${idComentario}" xmlns="http://www.w3.org/1999/html">
                <span class="tituloEdata">
                    <h3>${nomeUsurio}</h3>
                    <span class="spanDataECoracao">
                        <h6>${data}</h6>
                        <button class="buttonLikeComent">${likesQtn}<ion-icon name="heart-outline" id="coracaoIdComentario${idComentario}"></ion-icon></button>
                    </span>
                </span>
                <h4>${conteudo}</h4>
                <span class="spanInputEButton">
                    <input type="text" id="inputComentario${idComentario}" placeholder="Digite aqui">
                    <button class="btnRespClass" id="BntResp${idComentario}">Responder</button>
                </span>
            </div>`
}
async function atualizarPagina(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (!id){
        await mostrarDuvidaComOk("Erro com a noticia", false, "Nao foi possivel indentificar a noticia que voce procura, voltando a tela inicial")
        window.location.href = "../../index.html"
        return
    }

    noticiasMain.innerHTML = ""
    cometariosMain.innerHTML = ""

    await ler(id).then(noticiaEncontrada => {
        noticiaEncontrada = noticiaEncontrada[0]

        try{
            if (noticiaEncontrada != null){
                idNoticia = noticiaEncontrada.id

                noticiasMain.innerHTML += cardNoticia(
                    noticiaEncontrada.id,
                    noticiaEncontrada.titulo,
                    noticiaEncontrada.texto,
                    noticiaEncontrada.thumb,
                    noticiaEncontrada.data,
                    noticiaEncontrada.mediaAvaliacoes,
                    noticiaEncontrada.fonte
                )
            }
        } catch (t){
            mostrarNotificacao("Erro na requisicao", false)
        }
    });

    await lerComentarios(id).then(comentarios => {

        if (comentarios.length <= 0){
            cometariosMain.insertAdjacentHTML("beforeend", "<h5>Noticia sem comentarios</h5>")
        }


        comentarios.forEach( async (cometario) => {
            // precisei do chat para aprender a usar essa insertAdjacentHTML
            cometariosMain.insertAdjacentHTML("beforeend", cardCometarios(
                cometario.id,
                cometario.idUsuario,
                cometario.nomeUsurio,
                cometario.conteudo,
                cometario.data,
                cometario.likes.length
            ));

            const comentarioAtualDiv = document.querySelector(`#divComentario${cometario.id}`)
            await lerRespostas(cometario.id).then((respostas) => {
                respostas.forEach((resposta) => {
                    if (comentarioAtualDiv){
                        comentarioAtualDiv.innerHTML +=  cardRespotas(
                            resposta.nomeUsurio,
                            resposta.conteudo,
                            resposta.data,
                        )
                    }
                })
            })

            console.log(cometario.id)
            const botaoResposta = document.querySelector(`#BntResp${cometario.id}`);
            const botaoLike = document.querySelector(`#coracaoIdComentario${cometario.id}`)

            if (botaoLike){
                botaoLike.addEventListener("click", async  () => {
                    if (userLogado != null){

                        const likesDoUsuario = cometario.likes.filter((likes) => like.idUsuario == userLogado.id && like.idNoticia == cometario.id)

                        await addorRemoveComentarioLike(userLogado.id, cometario.id, false)

                    } else {
                        mostrarNotificacao("Faça login para curtir", false)
                    }
                })
            }

            if (botaoResposta) {
                botaoResposta.addEventListener("click", async (event)=>{
                    if (userLogado != null){
                        const input = document.querySelector(`#inputComentario${cometario.id}`)


                        if (input.value){
                            await addResposta(cometario.id, input.value)
                        } else{
                            mostrarNotificacao("Comentario sem conteudo", false)
                        }
                    } else {
                        mostrarNotificacao("Faça login para responder", false)
                    }
                })
            }
        });
    })
}
function setStar1(){
    star1.name = "star"
    star2.name = "star-outline"
    star3.name = "star-outline"
    star4.name = "star-outline"
    star5.name = "star-outline"
    stars = 1
}
function setStar2(){
    star1.name = "star"
    star2.name = "star"
    star3.name = "star-outline"
    star4.name = "star-outline"
    star5.name = "star-outline"
    stars = 2
}
function setStar3(){
    star1.name = "star"
    star2.name = "star"
    star3.name = "star"
    star4.name = "star-outline"
    star5.name = "star-outline"
    stars = 3
}
function setStar4(){
    star1.name = "star"
    star2.name = "star"
    star3.name = "star"
    star4.name = "star"
    star5.name = "star-outline"
    stars = 4
}
function setStar5(){
    star1.name = "star"
    star2.name = "star"
    star3.name = "star"
    star4.name = "star"
    star5.name = "star"
    stars = 5
}
function init(){
    userLogado = sessionStorage.getItem("usuarioCorrente")
    if (userLogado != null){
        userLogado = JSON.parse(userLogado)
        document.querySelector("#loginSpan").innerHTML = `Bem vindo, ${userLogado.nome}`
    } else {
        document.querySelector("#loginSpan").innerHTML = `<a href="../login/login.html"><h3>Login</h3></a>`
    }

    star1.addEventListener("click", setStar1)
    star2.addEventListener("click", setStar2)
    star3.addEventListener("click", setStar3)
    star4.addEventListener("click", setStar4)
    star5.addEventListener("click", setStar5)
    document.querySelector("#btnEnviar").addEventListener("click", function (){
        addComentario()
    })

    atualizarPagina()
}

init()


