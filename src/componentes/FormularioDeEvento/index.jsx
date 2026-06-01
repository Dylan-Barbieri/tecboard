import "./formulario-de-eventos.estilos.css";
import { CampoDeEntrada } from "../CampoDeEntrada";
import { CampoDeFormulario } from "../CampoDeFormulario";
import { Label } from "../Label";
import { TituloFormulario } from "../TituloFormulario";
import { Botao } from "../Botao";
import { ListaSuspensa } from "../ListaSuspensa";

export function FormularioDeEvento() {

  return (
    <form className="form-evento">
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
          <Label htmlFor="dataEvento">
            Data do evento?
          </Label>
          <ListaSuspensa />
        </CampoDeFormulario>
      </div>
      < div className="acoes">
      <Botao>
        Criar Evento
      </Botao>
      </div>
    </form>
  )
}