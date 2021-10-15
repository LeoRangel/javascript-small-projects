const cep = document.querySelector('#cep')

const showData = (result) => {
    for (const campo in result) {
        if (document.querySelector('#' + campo)) {
            document.querySelector('#' + campo).value = result[campo]
        }
    }
}

// O evento 'blur' é disparado quando se tira o foco do elemento
// Ex.: quando clica-se fora do campo de input após ter digitado
cep.addEventListener("blur", (e) => {

    // Parametros que serão passadas no fetch
    // Trabalhando com servidores diferentes (cross-origin)
    const params = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }

    // Remove o traço
    let cepAdequado = cep.value.replace('-', '')

    fetch(`https://viacep.com.br/ws/${cepAdequado}/json/`, params)
        .then(response => response.json())
        .then(json => showData(json))
        .catch(e => console.error('Error:', e.message))

})