import './lista-suspensa.estilo.css'

export function ListaSuspensa({ props }) {
    return (
        <select className='lista-suspensa-form' {...props}>
            <option value=""></option>
        </select>
    )
}