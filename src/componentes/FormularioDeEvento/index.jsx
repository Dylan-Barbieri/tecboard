import "./formulario-de-eventos.estilos.css";
import { CampoDeEntrada } from "../CampoDeEntrada";
import { CampoDeFormulario } from "../CampoDeFormulario";
import { Label } from "../Label";
import { TituloFormulario } from "../TituloFormulario";
import { Botao } from "../Botao";
import { ListaSuspensa } from "../ListaSuspensa";

export function FormularioDeEvento({ temas, aoSubmeter }) {
  const temasArr = temas

  function aoFormSubmetido(evento) {
    evento.preventDefault()
    const formData = new FormData(evento.target)
    const titulo = formData.get('nomeEvento')
    const capa = formData.get('capa')
    const data = formData.get('dataEvento')
    const temaId = Number(formData.get('tema'))

    if (!titulo || !data || !temaId) {
      alert('Preencha o nome, a data e o tema do evento.')
      return
    }

    const novoEvento = {
      capa: capa,
      tema: temas.find(function (tema) {
        return tema.id === temaId
      }),
      data: new Date(data),
      titulo: titulo
    }
    aoSubmeter(novoEvento)
  }

  return (
    <form className="form-evento" onSubmit={aoFormSubmetido}>
      <TituloFormulario>
        Preencha para criar um evento:
      </TituloFormulario>
      <div className="campos">
        <CampoDeFormulario>
          <Label htmlFor="nomeEvento">
            Qual o nome do evento?
          </Label>
          <CampoDeEntrada
            type="text"
            id="nomeEvento"
            placeholder='Summer dev hits'
            name='nomeEvento'
          />
        </CampoDeFormulario>
        <CampoDeFormulario>
          <Label htmlFor="capa">
            Qual o endereço da imagem de capa?
          </Label>
          <CampoDeEntrada
            type="text"
            id="capa"
            placeholder='https://...'
            name='capa'
          />
        </CampoDeFormulario>
        <CampoDeFormulario>
          <Label htmlFor="dataEvento">
            Data do evento?
          </Label>
          <CampoDeEntrada
            type="date"
            id="dataEvento"
            name='dataEvento'
          />
        </CampoDeFormulario>
        <CampoDeFormulario>
          <Label htmlFor="tema">
            Tema do Evento
          </Label>
          <ListaSuspensa id="tema" name="tema" itens={temasArr} />
        </CampoDeFormulario>
      </div>
      <div className="acoes">
        <Botao>
          Criar Evento
        </Botao>
      </div>
    </form>
  )
}