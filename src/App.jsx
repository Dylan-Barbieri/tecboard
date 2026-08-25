import { useEffect, useState } from 'react'
import './App.css'
import { Banner } from './componentes/Banner'
import { FormularioDeEvento } from './componentes/FormularioDeEvento'
import { Tema } from './componentes/Tema'
import { CardEvento } from './componentes/CardEventos'

const API_URL = 'http://localhost:3001/eventos'

const temas = [
  {
    id: 1,
    nome: 'front-end'
  },
  {
    id: 2,
    nome: 'back-end'
  },
  {
    id: 3,
    nome: 'devops'
  },
  {
    id: 4,
    nome: 'inteligência artificial'
  },
  {
    id: 5,
    nome: 'data science'
  },
  {
    id: 6,
    nome: 'cloud'
  }
]

function App() {

  const [eventos, setEventos] = useState([])

  function normalizarEvento(evento) {
    const tema = temas.find(function (t) {
      return t.nome === evento.tema
    }) || { id: 0, nome: evento.tema }
    return {
      id: evento.id,
      capa: evento.capa,
      tema: tema,
      data: new Date(evento.data),
      titulo: evento.titulo
    }
  }

  useEffect(function () {
    fetch(API_URL)
      .then(function (resposta) {
        return resposta.json()
      })
      .then(function (eventosAPI) {
        setEventos(eventosAPI.map(normalizarEvento))
      })
      .catch(function (erro) {
        console.error('Erro ao carregar eventos:', erro)
      })
  }, [])

  function adicionarEvento(evento) {
    const corpo = {
      capa: evento.capa,
      tema: evento.tema.nome,
      data: evento.data.toISOString().slice(0, 10),
      titulo: evento.titulo
    }
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(corpo)
    })
      .then(function (resposta) {
        return resposta.json()
      })
      .then(function (eventoCriado) {
        setEventos([...eventos, normalizarEvento(eventoCriado)])
      })
      .catch(function (erro) {
        console.error('Erro ao criar evento:', erro)
        alert('Não foi possível criar o evento. Verifique se a API está rodando.')
      })
  }

  function atualizarEvento(id, evento) {
    const corpo = {
      capa: evento.capa,
      tema: evento.tema.nome,
      data: typeof evento.data === 'string' ? evento.data : evento.data.toISOString().slice(0, 10),
      titulo: evento.titulo
    }
    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(corpo)
    })
      .then(function (resposta) {
        return resposta.json()
      })
      .then(function (eventoAtualizado) {
        setEventos(eventos.map(function (eventoItem) {
          return eventoItem.id === eventoAtualizado.id
            ? normalizarEvento(eventoAtualizado)
            : eventoItem
        }))
      })
      .catch(function (erro) {
        console.error('Erro ao atualizar evento:', erro)
      })
  }

  function removerEvento(id) {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
      .then(function () {
        setEventos(eventos.filter(function (evento) {
          return evento.id !== id
        }))
      })
      .catch(function (erro) {
        console.error('Erro ao excluir evento:', erro)
      })
  }

  return (
    <main>
      <header>
        <img src="/logo.png" alt="Logo" />
      </header>
      <Banner />
      <FormularioDeEvento temas={temas}
        aoSubmeter={adicionarEvento}
      />
      <section className="container">
        {temas.map(function (tema) {
          if (!eventos.some(function(evento){
            return evento.tema.id == tema.id
          })) {
            return null
          };
          return (
            <section key={tema.id}>
              <Tema tema={tema} />
              <div className="eventos">
                {eventos.filter(function (evento) {
                  return evento.tema.id == tema.id
                })
                .map(function (evento, indice) {
                  return <CardEvento
                    evento={evento}
                    temas={temas}
                    aoEditar={atualizarEvento}
                    aoRemover={removerEvento}
                    key={evento.id ?? indice}
                  />
                })}
              </div>
            </section>
          )
        })}
      </section>
    </main>
  )
}

export default App