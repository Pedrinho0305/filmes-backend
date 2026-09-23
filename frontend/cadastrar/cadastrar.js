async function cadastrarFilme() {
    const title = document.getElementById("title")
    const gender = document.getElementById("gender")
    const ageLimit = document.getElementById("ageLimit")
    const duration = document.getElementById("duration")

    if (title.value === "" || gender.value === "" || ageLimit.value === "" || duration.value === "") {
        alert("Preencha todos os campos!")
        return  
    }

    const filme = {
        name: title.value,
        genre: gender.value,
        classification: ageLimit.valueAsNumber,
        duration: duration.valueAsNumber
    }

    const resposta = await fetch("https://filmes-backend-theta.vercel.app/add-movie", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(filme)
    })

    const mensagem = await resposta.json()

    alert(mensagem.message)

    window.location.href = "../frontend/index.html"
}