

let userLogado
var stars = 0
const star1 = document.querySelector("#star1")
const star2 = document.querySelector("#star2")
const star3 = document.querySelector("#star3")
const star4 = document.querySelector("#star4")
const star5 = document.querySelector("#star5")
let noticiasMain = document.querySelector("#noticias")
let comentariosMain = document.querySelector("#comentario")
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
async function lerCurtidas(comentarioId, idUsuario) {
    const resposta = await fetch(`http://localhost:3000/gosteis?comentarioId=${comentarioId}&idUsuario=${idUsuario}`);
    const dados = await resposta.json();
    return dados;
}
async function todosUsuariosNoComent(comentarioId) {
    const resposta = await fetch(`http://localhost:3000/gosteis?comentarioId=${comentarioId}`);
    const dados = await resposta.json();
    return dados;
}
async function createAny(url, conteudo) {
    const resposta = await fetch(url, {method: 'POST', body: JSON.stringify(conteudo)})
    const dados = await resposta.json();
    return dados;
}
async function deleteAnyCurtida(idCurtida) {
    const resposta = await fetch(`http://localhost:3000/gosteis/${idCurtida}`, {method: 'DELETE'})
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
async function addOrRemoveCurtida(idComentario){
    if (userLogado != null){
        let mCurtidas
        await lerCurtidas(idComentario ,userLogado.id).then((curtidas) => {

            mCurtidas = curtidas
        })
        console.log(mCurtidas)
        if (mCurtidas.length > 0){
            await deleteAnyCurtida(mCurtidas[0].id)
        } else {
            await  createAny("http://localhost:3000/gosteis", {
                idUsuario : userLogado.id,
                comentarioId : idComentario,
            })
        }
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
function cardComentarios(idComentario, idUsuario ,nomeUsurio, conteudo, data, stars){
    let estrelas
    console.log("eakwgfa"+stars)

    if (stars == 1){
        estrelas = `<ion-icon name="star"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>`
    } else if (stars == 2){
        estrelas = `<ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>`
    } else if (stars == 3){
        estrelas = `<ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>`
    } else if (stars == 4){
        estrelas = `<ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>`
    } else if (stars == 5){
        estrelas = `<ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>`
    } else {
        estrelas = `<ion-icon name="star-outline"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>`
    }

    console.log(estrelas)

    return `<div class="comentario" id="divComentario${idComentario}" xmlns="http://www.w3.org/1999/html">
                <span class="tituloEdata">
                    <h3>${nomeUsurio}</h3>
                    <span>
                        ${estrelas}
                    </span>
                    <span class="spanDataECoracao">
                        <h6>${data}</h6>
                        <button class="buttonLikeComent"> <h2 id="qtnGosteis${idComentario}">0</h2></h3> <ion-icon name="heart-outline" id="coracaoIdComentario${idComentario}"></ion-icon></button>
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
    comentariosMain.innerHTML = ""

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
            comentariosMain.insertAdjacentHTML("beforeend", "<h5>Noticia sem comentarios</h5>")
        }


        comentarios.forEach( async (comentario) => {
            // precisei do chat para aprender a usar essa insertAdjacentHTML
            comentariosMain.insertAdjacentHTML("beforeend", cardComentarios(
                comentario.id,
                comentario.idUsuario,
                comentario.nomeUsurio,
                comentario.conteudo,
                comentario.data,
                comentario.stars
            ));
            console.log(comentario.stars)

            const comentarioAtualDiv = document.querySelector(`#divComentario${comentario.id}`)
            await lerRespostas(comentario.id).then((respostas) => {
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

            console.log(comentario.id)
            const botaoResposta = document.querySelector(`#BntResp${comentario.id}`);
            const botaoLike = document.querySelector(`#coracaoIdComentario${comentario.id}`)
            const qtnGosteis = document.querySelector(`#qtnGosteis${comentario.id}`)

            if (botaoLike){
                await lerCurtidas(comentario.id ,userLogado.id).then((dado) => {
                    if (dado.length > 0){
                        botaoLike.name = "heart"
                    } else {
                        botaoLike.name = "heart-outline"
                    }
                })

                await todosUsuariosNoComent(comentario.id).then((dado) => {
                    qtnGosteis.innerHTML = dado.length
                })

                botaoLike.addEventListener("click", async  (it) => {
                    if (userLogado != null){
                        await addOrRemoveCurtida(comentario.id)
                        await atualizarPagina()
                    } else {
                        mostrarNotificacao("Faça login para curtir", false)
                    }
                })
            }

            if (botaoResposta) {
                botaoResposta.addEventListener("click", async (event)=>{
                    if (userLogado != null){
                        const input = document.querySelector(`#inputComentario${comentario.id}`)
                        await atualizarPagina()

                        if (input.value){
                            await addResposta(comentario.id, input.value)
                            await atualizarPagina()
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
    document.querySelector("#btnEnviar").addEventListener("click", async () => {
        await addComentario()
        await atualizarPagina()
    })

    atualizarPagina()
}

init()


