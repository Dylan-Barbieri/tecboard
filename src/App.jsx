import { useState } from 'react'
import './App.css'
import { Banner } from './componentes/Banner'
import { FormularioDeEvento } from './componentes/FormularioDeEvento'
import { Tema } from './componentes/Tema'
import { CardEvento } from './componentes/CardEventos'
function App() {



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

  const [eventos, setEventos] = useState([
    {
      capa: 'https://raw.githubusercontent.com/viniciosneves/tecboard-assets/refs/heads/main/imagem_1.png',
      tema: temas[0],
      data: new Date(),
      titulo: 'Mulheres no Front'
    }
  ])



  function adicionarEvento(evento) {
    // eventos.push(evento)
    // console.log('eventos =>', eventos)
    setEventos([...eventos, evento])
  }
  
 //renderização condicional usando &&

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
                  return <CardEvento evento={evento} key={indice} />
                })}
              </div>
            </section>
          )
        })}
      </section>

      {/* <section>
        <Tema tema={temas[0]} />
      </section>
      <section>
        <Tema tema={temas[1]} />
      </section>
      <section>
        <Tema tema={temas[2]} />
      </section>
      <section>
        <Tema tema={temas[3]} />
      </section>
      <section>
        <Tema tema={temas[4]} />
      </section>
      <section>
        <Tema tema={temas[5]} />
      </section> */}
    </main>
  )
}

export default App
