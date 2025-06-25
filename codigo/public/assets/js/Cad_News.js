// Trabalho Interdisciplinar 1 - Aplicações Web
//
// Esse módulo realiza as operações de CRUD a partir de uma API baseada no JSONServer
// O servidor JSONServer fica hospedado na seguinte URL
// https://jsonserver.rommelpuc.repl.co/contatos
//
// Para fazer o seu servidor, acesse o projeto do JSONServer no Replit, faça o 
// fork do projeto e altere o arquivo db.json para incluir os dados do seu projeto.
// URL Projeto JSONServer: https://replit.com/@rommelpuc/JSONServer
//
// Autor: Rommel Vieira Carneiro
// Data: 03/10/2023

userLogadoParaOHeader = sessionStorage.getItem("usuarioCorrente")
if (userLogadoParaOHeader != null){
    if (!userLogadoParaOHeader.admin){
        location.href = "/"
    }
} else {
    location.href = "/"
}


// URL da API JSONServer - Substitua pela URL correta da sua API
const apiUrl = '/noticias';

function displayMessage(mensagem) {
    msg = document.getElementById('msg');
    msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>';
}

function readNoticia(processaDados) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            processaDados(data);
        })
        .catch(error => {
            console.error('Erro ao cadastrar a noticia via API JSONServer:', error);
            displayMessage("Erro ao cadastrar a noticia");
        });
}

function createNoticia(noticia, refreshFunction) {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(noticia),
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Noticia inserida com sucesso");
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao inserir noticia via API JSONServer:', error);
            displayMessage("Erro ao inserir noticia");
        });
}

function updateNoticia(id, noticia, refreshFunction) {
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(noticia),
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Noticia alterada com sucesso");
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao atualizar noticia via API JSONServer:', error);
            displayMessage("Erro ao atualizar noticia");
        });
}

function deleteNoticia(id, refreshFunction) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Noticia removida com sucesso");
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao remover noticia via API JSONServer:', error);
            displayMessage("Erro ao remover noticia");
        });
}
