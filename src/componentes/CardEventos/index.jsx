import { useState } from 'react'
import './card-evento.estilos.css'
import capaPadrao from '../../assets/hero.png'

export function CardEvento({ evento, temas, aoEditar, aoRemover }) {
    const [editando, setEditando] = useState(false)
    const [form, setForm] = useState({
        capa: evento.capa,
        titulo: evento.titulo,
        data: evento.data.toISOString().slice(0, 10),
        tema: String(evento.tema.id)
    })

    function aoMudar(campo, valor) {
        setForm({ ...form, [campo]: valor })
    }

    function aoSalvar(e) {
        e.preventDefault()
        const tema = temas.find(function (t) {
            return t.id === Number(form.tema)
        })
        aoEditar(evento.id, {
            capa: form.capa,
            titulo: form.titulo,
            data: form.data,
            tema: tema
        })
        setEditando(false)
    }

    if (editando) {
        return (
            <form className='card-evento edicao' onSubmit={aoSalvar}>
                <div className="corpo">
                    <label>
                        URL da capa
                        <input
                            type="text"
                            value={form.capa}
                            onChange={(e) => aoMudar('capa', e.target.value)}
                        />
                    </label>
                    <label>
                        Título
                        <input
                            type="text"
                            value={form.titulo}
                            onChange={(e) => aoMudar('titulo', e.target.value)}
                        />
                    </label>
                    <label>
                        Data
                        <input
                            type="date"
                            value={form.data}
                            onChange={(e) => aoMudar('data', e.target.value)}
                        />
                    </label>
                    <label>
                        Tema
                        <select
                            value={form.tema}
                            onChange={(e) => aoMudar('tema', e.target.value)}
                        >
                            {temas.map(function (t) {
                                return <option key={t.id} value={t.id}>{t.nome}</option>
                            })}
                        </select>
                    </label>
                    <div className="acoes">
                        <button type="submit" className="botao-acao salvar">Salvar</button>
                        <button type="button" className="botao-acao cancelar" onClick={() => setEditando(false)}>Cancelar</button>
                    </div>
                </div>
            </form>
        )
    }

    return (
        <div className='card-evento'>
            <img
                src={evento.capa || capaPadrao}
                alt={evento.titulo}
                onError={(e) => { e.target.src = capaPadrao }}
            />
            <div className="corpo">
                <p className="tag">
                    {evento.tema.nome}
                </p>
                <p className="data">
                    {evento.data.toLocaleDateString('pt-BR')}
                </p>
                <h4 className="titulo">
                    {evento.titulo}
                </h4>
                <div className="acoes">
                    <button type="button" className="botao-acao editar" onClick={() => setEditando(true)}>Editar</button>
                    <button type="button" className="botao-acao excluir" onClick={() => aoRemover(evento.id)}>Excluir</button>
                </div>
            </div>
        </div>
    )
}