async function buscarFilmes() {
    // acessar a rota GET do backend, trazer os filmes e mostrar os filmes na tela
    
    const resposta = await fetch("https://filmes-backend-bpfr.vercel.app/") // resposta do backend
    const filmes = await resposta.json() // converte a resposta num objeto JS
    const sectionFilmes = document.querySelector(".filmes")

    filmes.forEach((filme) => {
        console.log(filme)
        sectionFilmes.innerHTML += `
                    <div>
                        <h2>${filme.name}</h2>
                        <p><strong>Gênero:</strong> ${filme.genre}</p>
                        <p><strong>Duração:</strong> ${filme.duration} minutos</p>
                        
                        <p><strong>Classificação indicativa:</strong> ${filme.classification > 0 ? filme.classification + ' anos' : 'Livre'}</p>
                    </div>
                `
    })
}

buscarFilmes()