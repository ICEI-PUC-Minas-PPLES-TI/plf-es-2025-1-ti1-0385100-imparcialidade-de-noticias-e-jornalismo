
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
