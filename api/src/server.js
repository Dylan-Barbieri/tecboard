import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import pool from './db.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/eventos', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, capa, tema, data, titulo FROM eventos ORDER BY criado_em DESC'
    )
    res.json(rows)
  } catch (erro) {
    console.error(erro)
    res.status(500).json({ erro: 'Erro ao listar eventos' })
  }
})

app.post('/eventos', async (req, res) => {
  const { capa, tema, data, titulo } = req.body
  if (!tema || !data || !titulo) {
    return res.status(400).json({ erro: 'Tema, data e título são obrigatórios' })
  }
  try {
    const { rows } = await pool.query(
      'INSERT INTO eventos (capa, tema, data, titulo) VALUES ($1, $2, $3, $4) RETURNING id, capa, tema, data, titulo',
      [capa || '', tema, data, titulo]
    )
    res.status(201).json(rows[0])
  } catch (erro) {
    console.error(erro)
    res.status(500).json({ erro: 'Erro ao criar evento' })
  }
})

app.put('/eventos/:id', async (req, res) => {
  const { id } = req.params
  const { capa, tema, data, titulo } = req.body
  if (!tema || !data || !titulo) {
    return res.status(400).json({ erro: 'Tema, data e título são obrigatórios' })
  }
  try {
    const { rows } = await pool.query(
      'UPDATE eventos SET capa = $1, tema = $2, data = $3, titulo = $4 WHERE id = $5 RETURNING id, capa, tema, data, titulo',
      [capa || '', tema, data, titulo, id]
    )
    if (rows.length === 0) {
      return res.status(404).json({ erro: 'Evento não encontrado' })
    }
    res.json(rows[0])
  } catch (erro) {
    console.error(erro)
    res.status(500).json({ erro: 'Erro ao atualizar evento' })
  }
})

app.delete('/eventos/:id', async (req, res) => {
  const { id } = req.params
  try {
    const { rowCount } = await pool.query('DELETE FROM eventos WHERE id = $1', [id])
    if (rowCount === 0) {
      return res.status(404).json({ erro: 'Evento não encontrado' })
    }
    res.status(204).end()
  } catch (erro) {
    console.error(erro)
    res.status(500).json({ erro: 'Erro ao excluir evento' })
  }
})

const porta = Number(process.env.PORT) || 3001
app.listen(porta, () => {
  console.log(`tecboard API rodando em http://localhost:${porta}`)
})