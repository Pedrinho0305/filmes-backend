import express from "express"
import cors from "cors"
import mysql2 from "mysql2"

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())

app.use(cors())


app.get("/movies", (req, res)=>{
    const selectCommand = "SELECT * FROM filmes_pedro3"

    sql.query(selectCommand, (error, results)=>{
        if(error){
            console.error(error)
        }

        res.json(results)
    })
})

app.post("/add-movie", (req, res)=>{
    const {name, genre, duration, classification} = req.body

    const insertCommand = "INSERT INTO filmes_pedro3(name, genre, duration, classification) VALUES (?,?,?,?)"

    sql.query(insertCommand, [name, genre, duration, classification], (error)=>{
        if(error){
            console.error(error)
        }

        res.status(201).json({message: "Filme adicionado com sucesso!"})
    })
})

app.delete("/delete-movie/:id", (req, res)=>{
    const {id} = req.params

    const deleteCommand = "DELETE FROM filmes_pedro3 WHERE id = ?"

    sql.query(deleteCommand, [id], (error)=>{
        if(error){
            console.error(error)
        }

        res.json("Filme deletado com sucesso!")
    })
    
})

app.put("/update-movie/:id", (req, res) => {
    
    const { name, genre, duration, classification } = req.body;
    
    const { id } = req.params;

    const updateCommand = "UPDATE filmes_pedro3 SET name = ?, genre = ?, duration = ?, classification = ? WHERE id = ?";

    sql.query(updateCommand, [name, genre, duration, classification, id], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro ao atualizar o filme" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Filme não encontrado" });
        }

        res.json({ message: "Filme atualizado com sucesso!" });
    });
});


const sql = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

if (!process.env.VERCEL) {
    app.listen(PORT, ()=>{
        console.log(`Servidor rodando na porta ${PORT}`)
    })
}

export default app

