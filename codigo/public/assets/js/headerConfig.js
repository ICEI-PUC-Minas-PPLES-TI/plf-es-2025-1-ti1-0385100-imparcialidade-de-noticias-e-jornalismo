userLogado = sessionStorage.getItem("usuarioCorrente")
if (userLogado != null){
    userLogado = JSON.parse(userLogado)
    if (userLogado.id){

        if (userLogado.admin){
            document.querySelector("#headerButtons").innerHTML +=
                `<a href="/modulos/cadastro/Cad_News.html"><li>CADASTRO DE NOTICIA</li></a>`
        }
    } else {
        userLogado = null
    }
}