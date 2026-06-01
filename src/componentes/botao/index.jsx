import './botao.estilos.css'

export function Botao({ children, onClick }) {
    return (
        <button className="botao" onClick={onClick}>
            {children}
        </button>   
    )
}