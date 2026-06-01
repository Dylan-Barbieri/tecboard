import './label.estilos.css'

export function Label({ children, htmlfor}) {
  return(
    <label htmlFor={htmlfor} className="label">
      {children}
    </label>
  )
}