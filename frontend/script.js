const API_URL = "https://filmes-backend-theta.vercel.app"

async function buscarFilmes() {
    const resposta = await fetch(`${API_URL}/`)

    if (!resposta.ok) {
        console.error("Erro ao buscar filmes")
        return
    }

    const filmes = await resposta.json()
    const sectionFilmes = document.querySelector(".filmes")

    sectionFilmes.innerHTML = ""

    filmes.forEach((filme) => {
        sectionFilmes.innerHTML += `
            <div class="filme-card">
                <h2>${filme.name}</h2>
                <p><strong>Gênero:</strong> ${filme.genre}</p>
                <p><strong>Duração:</strong> ${filme.duration} minutos</p>
                <p><strong>Classificação indicativa:</strong> ${filme.classification > 0 ? filme.classification + ' anos' : 'Livre'}</p>

                <div class="acoes">
                    <button type="button" data-id="${filme.id}" class="btn-editar">Editar</button>
                    <button type="button" data-id="${filme.id}" class="btn-deletar">Excluir</button>
                </div>
            </div>
        `
    })

    document.querySelectorAll(".btn-deletar").forEach((botao) => {
        botao.addEventListener("click", async () => {
            const id = botao.dataset.id
            await deletarFilme(id)
        })
    })

    document.querySelectorAll(".btn-editar").forEach((botao) => {
        botao.addEventListener("click", async () => {
            const id = botao.dataset.id
            const filmeAtual = await buscarFilmePorId(id)
            await editarFilme(id, filmeAtual)
        })
    })
}

async function buscarFilmePorId(id) {
    const resposta = await fetch(`${API_URL}/`)
    const filmes = await resposta.json()
    return filmes.find((filme) => String(filme.id) === String(id))
}

async function deletarFilme(id) {
    const resposta = await fetch(`${API_URL}/delete-movie/${id}`, {
        method: "DELETE"
    })

    const dados = await resposta.json()

    if (!resposta.ok) {
        alert(dados.message || "Erro ao excluir filme.")
        return
    }

    alert(dados.message)
    buscarFilmes()
}

async function editarFilme(id, filmeAtual) {
    const nome = prompt("Novo nome do filme:", filmeAtual.name)
    if (nome === null) return

    const genero = prompt("Novo gênero:", filmeAtual.genre)
    if (genero === null) return

    const duracao = Number(prompt("Nova duração em minutos:", filmeAtual.duration))
    if (Number.isNaN(duracao)) {
        alert("Duração inválida.")
        return
    }

    const classificacao = prompt("Nova classificação indicativa:", filmeAtual.classification || "L")
    if (classificacao === null) return

    const resposta = await fetch(`${API_URL}/update-movie/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: nome,
            genre: genero,
            duration: duracao,
            classification: classificacao
        })
    })

    const dados = await resposta.json()

    if (!resposta.ok) {
        alert(dados.message || "Erro ao atualizar filme.")
        return
    }

    alert(dados.message)
    buscarFilmes()
}

buscarFilmes()