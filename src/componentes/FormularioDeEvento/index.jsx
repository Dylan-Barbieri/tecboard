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
    const novoEvento = {
      capa: formData.get('capa'),
      tema: temas.find(function (tema) {
        return tema.id === Number(formData.get('tema'))
      }),
      data: new Date(formData.get('dataEvento')),
      titulo: formData.get('nomeEvento')
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