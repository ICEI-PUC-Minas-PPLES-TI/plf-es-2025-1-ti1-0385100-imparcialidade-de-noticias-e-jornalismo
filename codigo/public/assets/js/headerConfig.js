userLogadoParaOHeader = sessionStorage.getItem("usuarioCorrente")
userLogadoParaOHeader = JSON.parse(userLogadoParaOHeader)
if (userLogadoParaOHeader != null){
    document.querySelector("#loginSpan").innerHTML = `Bem vindo, ${userLogadoParaOHeader.nome}`
    document.querySelector("#botaoSair").addEventListener("click", ()=>{
        sessionStorage.removeItem("usuarioCorrente")
        location.reload()
    })

    let bntLoginMenu = false
    document.querySelector("#loginSpan").addEventListener("click", ()=>{
        document.querySelector("#loginMenu").style.right = bntLoginMenu ? "-500px" : "0"
        bntLoginMenu = !bntLoginMenu
    })
    document.querySelector("#botaoFecharloginMenu").addEventListener("click", ()=>{
        document.querySelector("#loginMenu").style.right = "-500px"
        bntLoginMenu = false
    })
} else {
    document.querySelector("#loginSpan").innerHTML = `<a href="/modulos/login/login.html"><h3>Login</h3></a>`
    document.querySelector("#loginMenu").style.display = "none"
}