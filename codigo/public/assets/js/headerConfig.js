userLogadoParaOHeader = sessionStorage.getItem("usuarioCorrente")
if (userLogadoParaOHeader != null){

    userLogadoParaOHeader = JSON.parse(userLogadoParaOHeader)
    if (userLogadoParaOHeader.nome){
        document.querySelector("#loginSpan").innerHTML = `Bem vindo, ${userLogadoParaOHeader.nome}`
    }
    if (userLogadoParaOHeader.admin){
        document.querySelector("#loginMenu").innerHTML += "<Button id='btnCadastro'>Cadastro</Button>"

        const btnCadastro = document.querySelector("#btnCadastro")
        if (btnCadastro){
            btnCadastro.addEventListener("click", ()=>{
                window.location = "/modulos/cadastro/Cad_News.html"
            })
        }
    }
    let bntLoginMenu = false


    document.querySelector("#loginSpan").addEventListener("click", ()=>{
        document.querySelector("#loginMenu").style.right = bntLoginMenu ? "-500px" : "0"
        bntLoginMenu = !bntLoginMenu
    })
    document.querySelector("#botaoFecharloginMenu").addEventListener("click", ()=>{
        document.querySelector("#loginMenu").style.right = "-500px"
        bntLoginMenu = false
    })
    document.querySelector("#botaoSair").addEventListener("click", ()=>{
        sessionStorage.removeItem("usuarioCorrente")
        location.reload()
    })

} else {
    document.querySelector("#loginSpan").innerHTML = `<a href="/modulos/login/login.html"><h3>Login</h3></a>`
    document.querySelector("#loginMenu").style.display = "none"
}